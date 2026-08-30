import importlib.util
import unittest
from pathlib import Path


HELPER_PATH = Path(__file__).parents[1] / "deploy" / "enable-nginx-api.py"
SPEC = importlib.util.spec_from_file_location("enable_nginx_api", HELPER_PATH)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC and SPEC.loader
SPEC.loader.exec_module(MODULE)


class NginxHelperTests(unittest.TestCase):
    def setUp(self):
        self.configuration = """server {
    listen 80;
    server_name cv.codecafe.io;
}
server {
    listen 443 ssl;
    server_name cv.codecafe.io;
    location / { try_files $uri /index.html; }
}
server {
    listen 443 ssl;
    server_name atlas.codecafe.io;
}
"""

    def test_adds_include_only_to_cv_https(self):
        updated = MODULE.add_include(self.configuration)
        self.assertEqual(1, updated.count(MODULE.INCLUDE_LINE.strip()))
        cv_https = [block for _, _, block in MODULE.server_blocks(updated) if "listen 443 ssl" in block and "cv.codecafe.io" in block][0]
        self.assertIn(MODULE.INCLUDE_LINE.strip(), cv_https)

    def test_is_idempotent(self):
        once = MODULE.add_include(self.configuration)
        self.assertEqual(once, MODULE.add_include(once))

    def test_stops_when_https_target_is_missing(self):
        with self.assertRaises(ValueError):
            MODULE.add_include("server { listen 80; server_name cv.codecafe.io; }")


if __name__ == "__main__":
    unittest.main()
