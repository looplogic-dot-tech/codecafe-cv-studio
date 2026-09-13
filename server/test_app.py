import json
import tempfile
import unittest
from pathlib import Path

from app import ConflictError, SessionRegistry, Store, make_password_hash, verify_password


class PasswordTests(unittest.TestCase):
    def test_password_hash(self):
        encoded = make_password_hash("correct horse battery staple")
        self.assertTrue(verify_password("correct horse battery staple", encoded))
        self.assertFalse(verify_password("incorrect", encoded))


class StoreTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.store = Store(Path(self.temporary.name), retention=2)

    def tearDown(self):
        self.temporary.cleanup()

    def payload(self, value):
        return {
            "schema": 2,
            "savedAt": "2026-08-31T00:00:00+00:00",
            "workspace": {"value": value},
        }

    def test_current_workspace_snapshot_updates_in_place(self):
        first, unchanged = self.store.save(self.payload("one"), "1" * 64, 0)
        self.assertFalse(unchanged)

        repeated, unchanged = self.store.save(self.payload("one"), "1" * 64, first["revision"])
        self.assertTrue(unchanged)
        self.assertEqual(first["revision"], repeated["revision"])

        second, unchanged = self.store.save(self.payload("two"), "2" * 64, first["revision"])
        self.assertFalse(unchanged)
        self.assertEqual(first["revision"], second["revision"])

        third, unchanged = self.store.save(self.payload("three"), "3" * 64, second["revision"])
        self.assertFalse(unchanged)
        self.assertEqual(first["revision"], third["revision"])

        self.assertEqual("three", self.store.latest()["payload"]["workspace"]["value"])

        # EC2 is one current workspace snapshot. Repeated edits must not create
        # one database row per edit and must not consume a CV slot.
        with self.store.connect() as database:
            self.assertEqual(1, database.execute("SELECT COUNT(*) FROM backups").fetchone()[0])

        self.assertEqual([first["revision"]], [item["revision"] for item in self.store.revisions()])
        self.assertEqual("three", self.store.revision(first["revision"])["payload"]["workspace"]["value"])

    def test_conflict_does_not_overwrite(self):
        first, _ = self.store.save(self.payload("one"), "1" * 64, 0)
        with self.assertRaises(ConflictError):
            self.store.save(self.payload("two"), "2" * 64, 0)
        self.assertEqual(first["revision"], self.store.latest()["revision"])

    def test_authenticated_session_survives_service_restart(self):
        first_registry = SessionRegistry(self.store)
        token, csrf = first_registry.create()
        restarted_registry = SessionRegistry(self.store)
        self.assertEqual(csrf, restarted_registry.validate(token))
        restarted_registry.delete(token)
        self.assertIsNone(SessionRegistry(self.store).validate(token))


if __name__ == "__main__":
    unittest.main()
