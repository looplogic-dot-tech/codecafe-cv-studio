#!/usr/bin/env python3
"""Private dependency-free API for CodeCafe CV Studio."""
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
SESSION_SECONDS = 30 * 24 * 60 * 60
PASSWORD_ITERATIONS = 310_000
MAX_RECOVERY_FILES = 7


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


class ConflictError(Exception):
    pass


class Store:
    def __init__(self, data_dir: Path) -> None:
        self.data_dir = data_dir
        self.data_dir.mkdir(parents=True, exist_ok=True, mode=0o700)
        os.chmod(self.data_dir, 0o700)
        self.database_path = self.data_dir / "workspace.sqlite3"
        self.salt_path = self.data_dir / "encryption-salt"
        self.recovery_dir = self.data_dir / "active-day-recovery"
        self.recovery_dir.mkdir(parents=True, exist_ok=True, mode=0o700)
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
                """CREATE TABLE IF NOT EXISTS workspace_state (
                    id INTEGER PRIMARY KEY CHECK(id = 1),
                    saved_at TEXT NOT NULL,
                    digest TEXT NOT NULL,
                    payload TEXT NOT NULL
                )"""
            )
            database.execute(
                """CREATE TABLE IF NOT EXISTS sessions (
                    token_hash TEXT PRIMARY KEY,
                    csrf TEXT NOT NULL,
                    expires_at REAL NOT NULL
                )"""
            )
        os.chmod(self.database_path, 0o600)
        if not self.salt_path.exists():
            self.salt_path.write_text(b64encode(secrets.token_bytes(16)), encoding="ascii")
            os.chmod(self.salt_path, 0o600)

    @property
    def encryption_salt(self) -> str:
        return self.salt_path.read_text(encoding="ascii").strip()

    def load(self) -> dict[str, Any] | None:
        with self.connect() as database:
            row = database.execute(
                "SELECT saved_at, digest, payload FROM workspace_state WHERE id = 1"
            ).fetchone()
        if not row:
            return None
        return {
            "savedAt": row["saved_at"],
            "digest": row["digest"],
            "payload": json.loads(row["payload"]),
        }

    def _write_daily_recovery(self, current: sqlite3.Row) -> None:
        day = datetime.now(timezone.utc).strftime("%Y-%m-%d")
        target = self.recovery_dir / f"codecafe-cv-{day}.recovery.json"
        if target.exists():
            return
        target.write_text(
            json.dumps(
                {
                    "savedAt": current["saved_at"],
                    "digest": current["digest"],
                    "payload": json.loads(current["payload"]),
                },
                ensure_ascii=False,
                separators=(",", ":"),
            ),
            encoding="utf-8",
        )
        os.chmod(target, 0o600)
        files = sorted(self.recovery_dir.glob("codecafe-cv-*.recovery.json"), key=lambda p: p.stat().st_mtime, reverse=True)
        for old in files[MAX_RECOVERY_FILES:]:
            old.unlink(missing_ok=True)

    def save(self, payload: dict[str, Any], digest: str, base_digest: str) -> tuple[dict[str, Any], bool]:
        serialized = json.dumps(payload, separators=(",", ":"), sort_keys=True)
        now = datetime.now(timezone.utc).isoformat()
        with self.connect() as database:
            database.execute("BEGIN IMMEDIATE")
            current = database.execute(
                "SELECT saved_at, digest, payload FROM workspace_state WHERE id = 1"
            ).fetchone()
            current_digest = str(current["digest"]) if current else ""
            if current and current_digest == digest:
                database.commit()
                return {"savedAt": current["saved_at"], "digest": current_digest}, True
            if base_digest != current_digest:
                database.rollback()
                raise ConflictError("Existe una copia más reciente en EC2.")
            if current:
                self._write_daily_recovery(current)
            database.execute(
                """INSERT INTO workspace_state(id, saved_at, digest, payload)
                   VALUES(1, ?, ?, ?)
                   ON CONFLICT(id) DO UPDATE SET
                     saved_at = excluded.saved_at,
                     digest = excluded.digest,
                     payload = excluded.payload""",
                (now, digest, serialized),
            )
            database.commit()
        return {"savedAt": now, "digest": digest}, False

    def create_session(self, token: str, csrf: str, expires_at: float) -> None:
        token_hash = hashlib.sha256(token.encode("utf-8")).hexdigest()
        with self.connect() as database:
            database.execute("DELETE FROM sessions WHERE expires_at < ?", (time.time(),))
            database.execute(
                "INSERT OR REPLACE INTO sessions(token_hash, csrf, expires_at) VALUES (?, ?, ?)",
                (token_hash, csrf, expires_at),
            )

    def validate_session(self, token: str) -> str | None:
        token_hash = hashlib.sha256(token.encode("utf-8")).hexdigest()
        with self.connect() as database:
            row = database.execute(
                "SELECT csrf, expires_at FROM sessions WHERE token_hash = ?",
                (token_hash,),
            ).fetchone()
            if not row or float(row["expires_at"]) < time.time():
                database.execute("DELETE FROM sessions WHERE token_hash = ?", (token_hash,))
                return None
        return str(row["csrf"])

    def delete_session(self, token: str) -> None:
        token_hash = hashlib.sha256(token.encode("utf-8")).hexdigest()
        with self.connect() as database:
            database.execute("DELETE FROM sessions WHERE token_hash = ?", (token_hash,))


class SessionRegistry:
    def __init__(self, store: Store) -> None:
        self._store = store
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
        expires_at = time.time() + SESSION_SECONDS
        with self._lock:
            self._sessions[token] = (expires_at, csrf)
        self._store.create_session(token, csrf, expires_at)
        return token, csrf

    def validate(self, token: str | None) -> str | None:
        if not token:
            return None
        with self._lock:
            session = self._sessions.get(token)
            if session:
                expires, csrf = session
                if expires >= time.time():
                    return csrf
                self._sessions.pop(token, None)
        return self._store.validate_session(token)

    def delete(self, token: str | None) -> None:
        if token:
            with self._lock:
                self._sessions.pop(token, None)
            self._store.delete_session(token)


class AppServer(ThreadingHTTPServer):
    daemon_threads = True

    def __init__(self, address: tuple[str, int], store: Store, password_hash: str, allowed_origin: str) -> None:
        super().__init__(address, Handler)
        self.store = store
        self.password_hash = password_hash
        self.allowed_origin = allowed_origin.rstrip("/")
        self.sessions = SessionRegistry(store)


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
            if method == "GET" and path == "/api/session":
                csrf = self.require_session()
                current = self.server.store.load()
                self.json_response(HTTPStatus.OK, {
                    "csrfToken": csrf,
                    "encryptionSalt": self.server.store.encryption_salt,
                    "currentDigest": current["digest"] if current else "",
                })
                return
            if method == "DELETE" and path == "/api/session":
                self.logout()
                return
            if method == "GET" and path == "/api/workspace":
                self.require_session()
                self.json_response(HTTPStatus.OK, {"workspace": self.server.store.load()})
                return
            if method == "POST" and path == "/api/workspace":
                self.require_session(require_csrf=True)
                self.save_workspace()
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
        current = self.server.store.load()
        cookie = f"{COOKIE_NAME}={token}; Path=/api; Max-Age={SESSION_SECONDS}; HttpOnly; Secure; SameSite=Strict"
        self.json_response(HTTPStatus.OK, {
            "csrfToken": csrf,
            "encryptionSalt": self.server.store.encryption_salt,
            "currentDigest": current["digest"] if current else "",
        }, cookie)

    def logout(self) -> None:
        self.require_session(require_csrf=True)
        self.server.sessions.delete(self.session_token())
        cookie = f"{COOKIE_NAME}=; Path=/api; Max-Age=0; HttpOnly; Secure; SameSite=Strict"
        self.json_response(HTTPStatus.OK, {"ok": True}, cookie)

    def save_workspace(self) -> None:
        body = self.read_json()
        payload = body.get("payload")
        digest = body.get("digest")
        base_digest = body.get("baseDigest")
        if not isinstance(payload, dict):
            raise RequestError("El respaldo debe ser un objeto JSON.")
        is_plain_workspace = payload.get("schema") in (1, 2)
        is_legacy_encrypted = payload.get("version") == 1 and payload.get("algorithm") == "AES-GCM"
        if not is_plain_workspace and not is_legacy_encrypted:
            raise RequestError("El respaldo no corresponde a CodeCafe CV Studio.")
        if not isinstance(digest, str) or len(digest) != 64:
            raise RequestError("La huella SHA-256 es inválida.")
        if not isinstance(base_digest, str):
            raise RequestError("La huella base es inválida.")
        try:
            result, unchanged = self.server.store.save(payload, digest, base_digest)
        except ConflictError as error:
            current = self.server.store.load()
            raise RequestError(
                str(error),
                HTTPStatus.CONFLICT,
                {"error": str(error), "currentDigest": current["digest"] if current else ""},
            ) from error
        self.json_response(HTTPStatus.OK, {**result, "unchanged": unchanged})

    def do_GET(self) -> None:  # noqa: N802
        self.dispatch("GET")

    def do_POST(self) -> None:  # noqa: N802
        self.dispatch("POST")

    def do_DELETE(self) -> None:  # noqa: N802
        self.dispatch("DELETE")


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
    origin = os.environ.get("CODECAFE_CV_ORIGIN", "https://cv.codecafe.io")
    server = AppServer((host, port), Store(data_dir), password_hash, origin)
    print(f"{APP_NAME} escuchando en http://{host}:{port}", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
