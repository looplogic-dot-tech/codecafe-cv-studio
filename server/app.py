#!/usr/bin/env python3
"""API privada y sin dependencias externas para CodeCafe CV Studio."""

from __future__ import annotations

import argparse
import base64
import hashlib
import hmac
import json
import os
import secrets
import sqlite3
import sys
import threading
import time
import traceback
from datetime import datetime, timezone
from http import HTTPStatus
from http.cookies import SimpleCookie
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any

APP_NAME = "CodeCafe CV Sync"
COOKIE_NAME = "codecafe_cv_session"
MAX_BODY_BYTES = 12 * 1024 * 1024
SESSION_SECONDS = 12 * 60 * 60
PASSWORD_ITERATIONS = 310_000


def b64encode(value: bytes) -> str:
    return base64.urlsafe_b64encode(value).decode("ascii")


def b64decode(value: str) -> bytes:
    return base64.urlsafe_b64decode(value.encode("ascii"))


def make_password_hash(password: str) -> str:
    salt = secrets.token_bytes(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode(), salt, PASSWORD_ITERATIONS)
    return f"pbkdf2_sha256${PASSWORD_ITERATIONS}${b64encode(salt)}${b64encode(digest)}"


def verify_password(password: str, encoded: str) -> bool:
    try:
        algorithm, iterations, salt, expected = encoded.split("$", 3)
        if algorithm != "pbkdf2_sha256":
            return False
        actual = hashlib.pbkdf2_hmac("sha256", password.encode(), b64decode(salt), int(iterations))
        return hmac.compare_digest(actual, b64decode(expected))
    except (ValueError, TypeError):
        return False


class Store:
    def __init__(self, data_dir: Path, retention: int) -> None:
        self.data_dir = data_dir
        self.retention = retention
        self.data_dir.mkdir(parents=True, exist_ok=True, mode=0o700)
        os.chmod(self.data_dir, 0o700)
        self.database_path = self.data_dir / "backups.sqlite3"
        self.salt_path = self.data_dir / "encryption-salt"
        self._initialize()

    def connect(self) -> sqlite3.Connection:
        connection = sqlite3.connect(self.database_path, timeout=10)
        connection.row_factory = sqlite3.Row
        connection.execute("PRAGMA journal_mode=WAL")
        connection.execute("PRAGMA foreign_keys=ON")
        return connection

    def _initialize(self) -> None:
        with self.connect() as database:
            database.execute(
                """CREATE TABLE IF NOT EXISTS backups (
                    revision INTEGER PRIMARY KEY AUTOINCREMENT,
                    saved_at TEXT NOT NULL,
                    digest TEXT NOT NULL UNIQUE,
                    payload TEXT NOT NULL
                )"""
            )
        os.chmod(self.database_path, 0o600)
        if not self.salt_path.exists():
            self.salt_path.write_text(b64encode(secrets.token_bytes(16)), encoding="ascii")
            os.chmod(self.salt_path, 0o600)

    @property
    def encryption_salt(self) -> str:
        return self.salt_path.read_text(encoding="ascii").strip()

    def latest(self) -> dict[str, Any] | None:
        with self.connect() as database:
            row = database.execute(
                "SELECT revision, saved_at, digest, payload FROM backups ORDER BY revision DESC LIMIT 1"
            ).fetchone()
        if not row:
            return None
        return {
            "revision": row["revision"],
            "savedAt": row["saved_at"],
            "digest": row["digest"],
            "payload": json.loads(row["payload"]),
        }

    def save(self, payload: dict[str, Any], digest: str, base_revision: int) -> tuple[dict[str, Any], bool]:
        serialized = json.dumps(payload, separators=(",", ":"), sort_keys=True)
        now = datetime.now(timezone.utc).isoformat()
        with self.connect() as database:
            database.execute("BEGIN IMMEDIATE")
            current = database.execute(
                "SELECT revision, saved_at, digest FROM backups ORDER BY revision DESC LIMIT 1"
            ).fetchone()
            current_revision = int(current["revision"]) if current else 0
            if current and current["digest"] == digest:
                database.commit()
                return {
                    "revision": current_revision,
                    "savedAt": current["saved_at"],
                }, True
            if base_revision != current_revision:
                database.rollback()
                raise ConflictError(current_revision)
            cursor = database.execute(
                "INSERT INTO backups(saved_at, digest, payload) VALUES (?, ?, ?)",
                (now, digest, serialized),
            )
            revision = int(cursor.lastrowid)
            database.execute(
                "DELETE FROM backups WHERE revision NOT IN "
                "(SELECT revision FROM backups ORDER BY revision DESC LIMIT ?)",
                (self.retention,),
            )
            database.commit()
        return {"revision": revision, "savedAt": now}, False


class ConflictError(Exception):
    def __init__(self, current_revision: int) -> None:
        super().__init__("Existe una copia más reciente en EC2.")
        self.current_revision = current_revision


class SessionRegistry:
    def __init__(self) -> None:
        self._sessions: dict[str, tuple[float, str]] = {}
        self._attempts: dict[str, list[float]] = {}
        self._lock = threading.Lock()

    def login_allowed(self, address: str) -> bool:
        cutoff = time.time() - 15 * 60
        with self._lock:
            attempts = [stamp for stamp in self._attempts.get(address, []) if stamp > cutoff]
            self._attempts[address] = attempts
            return len(attempts) < 10

    def record_failure(self, address: str) -> None:
        with self._lock:
            self._attempts.setdefault(address, []).append(time.time())

    def create(self) -> tuple[str, str]:
        token = secrets.token_urlsafe(32)
        csrf = secrets.token_urlsafe(24)
        with self._lock:
            self._sessions[token] = (time.time() + SESSION_SECONDS, csrf)
        return token, csrf

    def validate(self, token: str | None) -> str | None:
        if not token:
            return None
        with self._lock:
            session = self._sessions.get(token)
            if not session:
                return None
            expires, csrf = session
            if expires < time.time():
                self._sessions.pop(token, None)
                return None
            return csrf

    def delete(self, token: str | None) -> None:
        if token:
            with self._lock:
                self._sessions.pop(token, None)


class AppServer(ThreadingHTTPServer):
    daemon_threads = True

    def __init__(self, address: tuple[str, int], store: Store, password_hash: str, allowed_origin: str) -> None:
        super().__init__(address, Handler)
        self.store = store
        self.password_hash = password_hash
        self.allowed_origin = allowed_origin.rstrip("/")
        self.sessions = SessionRegistry()


class Handler(BaseHTTPRequestHandler):
    server: AppServer

    def log_message(self, message: str, *args: Any) -> None:
        sys.stderr.write(f"{self.log_date_time_string()} {self.client_address[0]} {message % args}\n")

    def json_response(self, status: int, body: dict[str, Any], cookie: str | None = None) -> None:
        encoded = json.dumps(body, ensure_ascii=False, separators=(",", ":")).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(encoded)))
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        if cookie:
            self.send_header("Set-Cookie", cookie)
        self.end_headers()
        self.wfile.write(encoded)

    def read_json(self) -> dict[str, Any]:
        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError as error:
            raise RequestError("Content-Length inválido.") from error
        if length <= 0 or length > MAX_BODY_BYTES:
            raise RequestError("El cuerpo está vacío o excede el límite permitido.")
        try:
            value = json.loads(self.rfile.read(length))
        except (json.JSONDecodeError, UnicodeDecodeError) as error:
            raise RequestError("JSON inválido.") from error
        if not isinstance(value, dict):
            raise RequestError("Se esperaba un objeto JSON.")
        return value

    def session_token(self) -> str | None:
        cookie = SimpleCookie(self.headers.get("Cookie", ""))
        return cookie[COOKIE_NAME].value if COOKIE_NAME in cookie else None

    def require_session(self, require_csrf: bool = False) -> str:
        csrf = self.server.sessions.validate(self.session_token())
        if not csrf:
            raise UnauthorizedError()
        if require_csrf and not hmac.compare_digest(self.headers.get("X-CSRF-Token", ""), csrf):
            raise ForbiddenError("Token CSRF inválido.")
        return csrf

    def validate_origin(self) -> None:
        origin = self.headers.get("Origin")
        if origin and origin.rstrip("/") != self.server.allowed_origin:
            raise ForbiddenError("Origen no autorizado.")

    def dispatch(self, method: str) -> None:
        try:
            self.validate_origin()
            path = self.path.split("?", 1)[0]
            if method == "GET" and path == "/api/health":
                self.json_response(HTTPStatus.OK, {"ok": True, "service": APP_NAME})
                return
            if method == "POST" and path == "/api/session":
                self.login()
                return
            if method == "DELETE" and path == "/api/session":
                self.logout()
                return
            if method == "GET" and path == "/api/backups/latest":
                self.require_session()
                self.json_response(HTTPStatus.OK, {"backup": self.server.store.latest()})
                return
            if method == "POST" and path == "/api/backups":
                self.require_session(require_csrf=True)
                self.save_backup()
                return
            self.json_response(HTTPStatus.NOT_FOUND, {"error": "Ruta no encontrada."})
        except RequestError as error:
            self.json_response(error.status, error.body)
        except Exception:
            traceback.print_exc()
            self.json_response(HTTPStatus.INTERNAL_SERVER_ERROR, {"error": "Error interno del servicio."})

    def login(self) -> None:
        address = self.client_address[0]
        if not self.server.sessions.login_allowed(address):
            raise RequestError("Demasiados intentos. Espera 15 minutos.", HTTPStatus.TOO_MANY_REQUESTS)
        password = self.read_json().get("password")
        if not isinstance(password, str) or not verify_password(password, self.server.password_hash):
            self.server.sessions.record_failure(address)
            raise UnauthorizedError("Contraseña incorrecta.")
        token, csrf = self.server.sessions.create()
        latest = self.server.store.latest()
        cookie = (
            f"{COOKIE_NAME}={token}; Path=/api; Max-Age={SESSION_SECONDS}; "
            "HttpOnly; Secure; SameSite=Strict"
        )
        self.json_response(HTTPStatus.OK, {
            "csrfToken": csrf,
            "encryptionSalt": self.server.store.encryption_salt,
            "currentRevision": latest["revision"] if latest else 0,
        }, cookie)

    def logout(self) -> None:
        self.require_session(require_csrf=True)
        self.server.sessions.delete(self.session_token())
        cookie = f"{COOKIE_NAME}=; Path=/api; Max-Age=0; HttpOnly; Secure; SameSite=Strict"
        self.json_response(HTTPStatus.OK, {"ok": True}, cookie)

    def save_backup(self) -> None:
        body = self.read_json()
        payload = body.get("payload")
        digest = body.get("digest")
        base_revision = body.get("baseRevision")
        if not isinstance(payload, dict) or payload.get("version") != 1:
            raise RequestError("El respaldo cifrado es inválido.")
        required = ("algorithm", "kdf", "iterations", "salt", "iv", "ciphertext")
        if any(key not in payload for key in required):
            raise RequestError("El respaldo cifrado está incompleto.")
        if not isinstance(digest, str) or len(digest) != 64:
            raise RequestError("La huella SHA-256 es inválida.")
        if not isinstance(base_revision, int) or base_revision < 0:
            raise RequestError("La revisión base es inválida.")
        try:
            result, unchanged = self.server.store.save(payload, digest, base_revision)
        except ConflictError as error:
            raise RequestError(
                str(error),
                HTTPStatus.CONFLICT,
                {"error": str(error), "currentRevision": error.current_revision},
            ) from error
        self.json_response(HTTPStatus.OK, {**result, "unchanged": unchanged})

    def do_GET(self) -> None:  # noqa: N802
        self.dispatch("GET")

    def do_POST(self) -> None:  # noqa: N802
        self.dispatch("POST")

    def do_DELETE(self) -> None:  # noqa: N802
        self.dispatch("DELETE")


class RequestError(Exception):
    def __init__(self, message: str, status: int = HTTPStatus.BAD_REQUEST, body: dict[str, Any] | None = None) -> None:
        super().__init__(message)
        self.status = status
        self.body = body or {"error": message}


class UnauthorizedError(RequestError):
    def __init__(self, message: str = "Sesión requerida.") -> None:
        super().__init__(message, HTTPStatus.UNAUTHORIZED)


class ForbiddenError(RequestError):
    def __init__(self, message: str) -> None:
        super().__init__(message, HTTPStatus.FORBIDDEN)


def main() -> None:
    parser = argparse.ArgumentParser(description=APP_NAME)
    parser.add_argument("--hash-password", action="store_true", help="genera un hash leyendo la contraseña sin mostrarla")
    args = parser.parse_args()
    if args.hash_password:
        import getpass
        first = getpass.getpass("Nueva contraseña de sincronización: ")
        second = getpass.getpass("Repite la contraseña: ")
        if not first or first != second:
            raise SystemExit("Las contraseñas no coinciden o están vacías.")
        print(make_password_hash(first))
        return

    password_hash = os.environ.get("CODECAFE_CV_PASSWORD_HASH", "")
    if not password_hash:
        raise SystemExit("Falta CODECAFE_CV_PASSWORD_HASH; el servicio no arrancará sin autenticación.")
    data_dir = Path(os.environ.get("CODECAFE_CV_DATA_DIR", "/var/lib/codecafe-cv-sync"))
    host = os.environ.get("CODECAFE_CV_HOST", "127.0.0.1")
    port = int(os.environ.get("CODECAFE_CV_PORT", "5002"))
    retention = max(2, min(int(os.environ.get("CODECAFE_CV_RETENTION", "20")), 200))
    origin = os.environ.get("CODECAFE_CV_ORIGIN", "https://cv.codecafe.io")
    server = AppServer((host, port), Store(data_dir, retention), password_hash, origin)
    print(f"{APP_NAME} escuchando en http://{host}:{port}", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
