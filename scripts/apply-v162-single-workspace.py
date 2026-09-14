#!/usr/bin/env python3
from pathlib import Path
import re

# --- server/app.py ---------------------------------------------------------
server = Path("server/app.py")
text = server.read_text(encoding="utf-8")

store_start = text.find("class Store:")
session_start = text.find("class SessionRegistry:")
if store_start == -1 or session_start == -1:
    raise SystemExit("v1.6.2: server Store/SessionRegistry boundary not found")

store_block = '''class Store:\n    def __init__(self, data_dir: Path) -> None:\n        self.data_dir = data_dir\n        self.data_dir.mkdir(parents=True, exist_ok=True, mode=0o700)\n        os.chmod(self.data_dir, 0o700)\n        self.database_path = self.data_dir / "workspace.sqlite3"\n        self.salt_path = self.data_dir / "encryption-salt"\n        self._initialize()\n\n    def connect(self) -> sqlite3.Connection:\n        connection = sqlite3.connect(self.database_path, timeout=10)\n        connection.row_factory = sqlite3.Row\n        connection.execute("PRAGMA journal_mode=WAL")\n        connection.execute("PRAGMA foreign_keys=ON")\n        return connection\n\n    def _initialize(self) -> None:\n        with self.connect() as database:\n            database.execute(\n                """CREATE TABLE IF NOT EXISTS workspace_state (\n                    id INTEGER PRIMARY KEY CHECK(id = 1),\n                    saved_at TEXT NOT NULL,\n                    digest TEXT NOT NULL,\n                    payload TEXT NOT NULL\n                )"""\n            )\n            database.execute(\n                """CREATE TABLE IF NOT EXISTS sessions (\n                    token_hash TEXT PRIMARY KEY,\n                    csrf TEXT NOT NULL,\n                    expires_at REAL NOT NULL\n                )"""\n            )\n        os.chmod(self.database_path, 0o600)\n        if not self.salt_path.exists():\n            self.salt_path.write_text(b64encode(secrets.token_bytes(16)), encoding="ascii")\n            os.chmod(self.salt_path, 0o600)\n\n    @property\n    def encryption_salt(self) -> str:\n        return self.salt_path.read_text(encoding="ascii").strip()\n\n    def latest(self) -> dict[str, Any] | None:\n        with self.connect() as database:\n            row = database.execute(\n                "SELECT saved_at, digest, payload FROM workspace_state WHERE id = 1"\n            ).fetchone()\n        if not row:\n            return None\n        return {\n            "savedAt": row["saved_at"],\n            "digest": row["digest"],\n            "payload": json.loads(row["payload"]),\n        }\n\n    def _active_day_recovery(self, current: sqlite3.Row) -> None:\n        recovery_dir = self.data_dir / "active-day-recovery"\n        recovery_dir.mkdir(parents=True, exist_ok=True, mode=0o700)\n        os.chmod(recovery_dir, 0o700)\n        day = datetime.now(timezone.utc).date().isoformat()\n        target = recovery_dir / f"codecafe-cv-{day}.recovery.json"\n        if target.exists():\n            return\n        recovery = {\n            "savedAt": current["saved_at"],\n            "digest": current["digest"],\n            "payload": json.loads(current["payload"]),\n        }\n        temporary = target.with_suffix(target.suffix + ".tmp")\n        temporary.write_text(json.dumps(recovery, ensure_ascii=False, indent=2), encoding="utf-8")\n        os.chmod(temporary, 0o600)\n        temporary.replace(target)\n        recoveries = sorted(\n            recovery_dir.glob("codecafe-cv-*.recovery.json"),\n            key=lambda item: item.name,\n            reverse=True,\n        )\n        for old in recoveries[7:]:\n            old.unlink(missing_ok=True)\n\n    def save(self, payload: dict[str, Any], digest: str, base_digest: str) -> tuple[dict[str, Any], bool]:\n        serialized = json.dumps(payload, separators=(",", ":"), sort_keys=True)\n        now = datetime.now(timezone.utc).isoformat()\n        with self.connect() as database:\n            database.execute("BEGIN IMMEDIATE")\n            current = database.execute(\n                "SELECT saved_at, digest, payload FROM workspace_state WHERE id = 1"\n            ).fetchone()\n            if current and current["digest"] == digest:\n                database.commit()\n                return {"digest": current["digest"], "savedAt": current["saved_at"]}, True\n            current_digest = str(current["digest"]) if current else ""\n            if base_digest != current_digest:\n                database.rollback()\n                raise ConflictError(current_digest)\n            if current:\n                self._active_day_recovery(current)\n            database.execute(\n                """INSERT INTO workspace_state(id, saved_at, digest, payload)\n                   VALUES (1, ?, ?, ?)\n                   ON CONFLICT(id) DO UPDATE SET\n                     saved_at = excluded.saved_at,\n                     digest = excluded.digest,\n                     payload = excluded.payload""",\n                (now, digest, serialized),\n            )\n            database.commit()\n        return {"digest": digest, "savedAt": now}, False\n\n    def create_session(self, token: str, csrf: str, expires_at: float) -> None:\n        token_hash = hashlib.sha256(token.encode("utf-8")).hexdigest()\n        with self.connect() as database:\n            database.execute("DELETE FROM sessions WHERE expires_at < ?", (time.time(),))\n            database.execute(\n                "INSERT OR REPLACE INTO sessions(token_hash, csrf, expires_at) VALUES (?, ?, ?)",\n                (token_hash, csrf, expires_at),\n            )\n\n    def validate_session(self, token: str) -> str | None:\n        token_hash = hashlib.sha256(token.encode("utf-8")).hexdigest()\n        with self.connect() as database:\n            row = database.execute(\n                "SELECT csrf, expires_at FROM sessions WHERE token_hash = ?",\n                (token_hash,),\n            ).fetchone()\n            if not row or float(row["expires_at"]) < time.time():\n                database.execute("DELETE FROM sessions WHERE token_hash = ?", (token_hash,))\n                return None\n        return str(row["csrf"])\n\n    def delete_session(self, token: str) -> None:\n        token_hash = hashlib.sha256(token.encode("utf-8")).hexdigest()\n        with self.connect() as database:\n            database.execute("DELETE FROM sessions WHERE token_hash = ?", (token_hash,))\n\n\nclass ConflictError(Exception):\n    def __init__(self, current_digest: str) -> None:\n        super().__init__("Existe una copia más reciente en EC2.")\n        self.current_digest = current_digest\n\n\n'''
text = text[:store_start] + store_block + text[session_start:]

# Replace dispatch method completely.
dispatch_start = text.find("    def dispatch(self, method: str) -> None:")
login_start = text.find("    def login(self) -> None:", dispatch_start)
if dispatch_start == -1 or login_start == -1:
    raise SystemExit("v1.6.2: dispatch/login boundary not found")

dispatch_block = '''    def dispatch(self, method: str) -> None:\n        try:\n            self.validate_origin()\n            path = self.path.split("?", 1)[0]\n            if method == "GET" and path == "/api/health":\n                self.json_response(HTTPStatus.OK, {"ok": True, "service": APP_NAME})\n                return\n            if method == "POST" and path == "/api/session":\n                self.login()\n                return\n            if method == "GET" and path == "/api/session":\n                csrf = self.require_session()\n                latest = self.server.store.latest()\n                self.json_response(HTTPStatus.OK, {\n                    "csrfToken": csrf,\n                    "encryptionSalt": self.server.store.encryption_salt,\n                    "currentDigest": latest["digest"] if latest else "",\n                })\n                return\n            if method == "DELETE" and path == "/api/session":\n                self.logout()\n                return\n            if method == "GET" and path == "/api/workspace":\n                self.require_session()\n                self.json_response(HTTPStatus.OK, {"workspace": self.server.store.latest()})\n                return\n            if method == "POST" and path == "/api/workspace":\n                self.require_session(require_csrf=True)\n                self.save_workspace()\n                return\n            self.json_response(HTTPStatus.NOT_FOUND, {"error": "Ruta no encontrada."})\n        except RequestError as error:\n            self.json_response(error.status, error.body)\n        except Exception:\n            traceback.print_exc()\n            self.json_response(HTTPStatus.INTERNAL_SERVER_ERROR, {"error": "Error interno del servicio."})\n\n'''
text = text[:dispatch_start] + dispatch_block + text[login_start:]

# Session responses use the workspace digest.
text = re.sub(
    r'"currentRevision": latest\["revision"\] if latest else 0,',
    '"currentDigest": latest["digest"] if latest else "",',
    text,
)

# Replace save handler.
save_start = text.find("    def save_backup(self) -> None:")
do_get_start = text.find("    def do_GET(self) -> None:", save_start)
if save_start == -1 or do_get_start == -1:
    raise SystemExit("v1.6.2: save handler boundary not found")

save_block = '''    def save_workspace(self) -> None:\n        body = self.read_json()\n        payload = body.get("payload")\n        digest = body.get("digest")\n        base_digest = body.get("baseDigest")\n        if not isinstance(payload, dict):\n            raise RequestError("El espacio de trabajo debe ser un objeto JSON.")\n        is_plain_workspace = payload.get("schema") in (1, 2)\n        is_legacy_encrypted = payload.get("version") == 1 and payload.get("algorithm") == "AES-GCM"\n        if not is_plain_workspace and not is_legacy_encrypted:\n            raise RequestError("Los datos no corresponden a CodeCafe CV Studio.")\n        if not isinstance(digest, str) or len(digest) != 64:\n            raise RequestError("La huella SHA-256 es inválida.")\n        if not isinstance(base_digest, str):\n            raise RequestError("La huella base es inválida.")\n        try:\n            result, unchanged = self.server.store.save(payload, digest, base_digest)\n        except ConflictError as error:\n            raise RequestError(\n                str(error),\n                HTTPStatus.CONFLICT,\n                {"error": str(error), "currentDigest": error.current_digest},\n            ) from error\n        self.json_response(HTTPStatus.OK, {**result, "unchanged": unchanged})\n\n'''
text = text[:save_start] + save_block + text[do_get_start:]

# Remove obsolete retention wiring.
text = re.sub(r'\n\s*# Conserva hasta doscientas[^\n]*\n\s*retention =[^\n]*', '', text)
text = text.replace('Store(data_dir, retention)', 'Store(data_dir)')

# No old terminology is allowed in the deployed backend.
if re.search(r'revision|revisi[oó]n', text, flags=re.I):
    raise SystemExit("v1.6.2: old storage-history terminology remains in server/app.py")
server.write_text(text, encoding="utf-8")

# --- src/cloud.ts ----------------------------------------------------------
cloud = Path("src/cloud.ts")
text = cloud.read_text(encoding="utf-8")

type_start = text.find("export type ServerSession = {")
type_end = text.find("export type RuntimeCloudConfig = {", type_start)
if type_start == -1 or type_end == -1:
    raise SystemExit("v1.6.2: cloud server type block not found")
new_types = '''export type ServerSession = {\n  csrfToken: string;\n  encryptionSalt: string;\n  currentDigest: string;\n};\n\nexport type ServerWorkspace = {\n  savedAt: string;\n  digest: string;\n  payload: unknown;\n} | null;\n\n'''
text = text[:type_start] + new_types + text[type_end:]

api_start = text.find("export async function connectServer(password: string)")
api_end = text.find("export async function loadRuntimeCloudConfig()", api_start)
if api_start == -1 or api_end == -1:
    raise SystemExit("v1.6.2: cloud server API block not found")
new_api = '''export async function connectServer(password: string): Promise<ServerSession> {\n  return api<ServerSession>("/api/session", {\n    method: "POST",\n    body: JSON.stringify({ password }),\n  });\n}\n\nexport async function restoreServerSession(): Promise<ServerSession> {\n  return api<ServerSession>("/api/session");\n}\n\nexport async function disconnectServer(csrfToken: string): Promise<void> {\n  await api("/api/session", { method: "DELETE", headers: { "X-CSRF-Token": csrfToken } });\n}\n\nexport async function loadServerBackup(): Promise<ServerWorkspace> {\n  const result = await api<{ workspace: ServerWorkspace }>("/api/workspace");\n  return result.workspace;\n}\n\nexport async function saveServerBackup(\n  payload: unknown,\n  digest: string,\n  baseDigest: string,\n  csrfToken: string,\n): Promise<{ digest: string; savedAt: string; unchanged: boolean }> {\n  return api("/api/workspace", {\n    method: "POST",\n    headers: { "X-CSRF-Token": csrfToken },\n    body: JSON.stringify({ payload, digest, baseDigest }),\n  });\n}\n\n'''
text = text[:api_start] + new_api + text[api_end:]
if re.search(r'revision|revisi[oó]n', text, flags=re.I):
    raise SystemExit("v1.6.2: old storage-history terminology remains in src/cloud.ts")
cloud.write_text(text, encoding="utf-8")

# --- src/App.tsx -----------------------------------------------------------
app = Path("src/App.tsx")
text = app.read_text(encoding="utf-8")

replacements = [
    ("serverRevisionRef", "serverDigestRef"),
    ("serverRevision", "serverDigest"),
    ("setServerRevision", "setServerDigest"),
    ("currentRevision", "currentDigest"),
    ("result.revision", "result.digest"),
    ("backup.revision", "backup.digest"),
    ("selectedRevision", "selectedCopy"),
    ("setSelectedRevision", "setSelectedCopy"),
    ("loadRevision", "loadCopy"),
]
for old, new in replacements:
    text = text.replace(old, new)

text = text.replace('const [serverDigest, setServerDigest] = useState(0);', 'const [serverDigest, setServerDigest] = useState("");')
text = text.replace('const serverDigestRef = useRef(0);', 'const serverDigestRef = useRef("");')
text = text.replace('setServerDigest(0);', 'setServerDigest("");')
text = text.replace('serverDigestRef.current = 0;', 'serverDigestRef.current = "";')

# Any leftover human-facing wording is removed as well.
text = re.sub(r'revisi[oó]n', 'copia', text, flags=re.I)
text = re.sub(r'revision', 'copy', text, flags=re.I)

if re.search(r'revision|revisi[oó]n', text, flags=re.I):
    raise SystemExit("v1.6.2: old storage-history terminology remains in src/App.tsx")
app.write_text(text, encoding="utf-8")

print("v1.6.2 applied: EC2 now uses one singleton workspace state keyed by digest; old storage-history protocol removed.")
