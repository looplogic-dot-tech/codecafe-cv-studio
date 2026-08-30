import json
import tempfile
import unittest
from pathlib import Path

from app import ConflictError, Store, make_password_hash, verify_password


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
            "version": 1,
            "algorithm": "AES-GCM",
            "kdf": "PBKDF2-SHA256",
            "iterations": 250000,
            "salt": "salt",
            "iv": "iv",
            "ciphertext": value,
        }

    def test_versioning_deduplication_and_retention(self):
        first, unchanged = self.store.save(self.payload("one"), "1" * 64, 0)
        self.assertFalse(unchanged)
        repeated, unchanged = self.store.save(self.payload("one"), "1" * 64, first["revision"])
        self.assertTrue(unchanged)
        self.assertEqual(first["revision"], repeated["revision"])
        second, _ = self.store.save(self.payload("two"), "2" * 64, first["revision"])
        third, _ = self.store.save(self.payload("three"), "3" * 64, second["revision"])
        self.assertEqual("three", self.store.latest()["payload"]["ciphertext"])
        with self.store.connect() as database:
            self.assertEqual(2, database.execute("SELECT COUNT(*) FROM backups").fetchone()[0])
        self.assertGreater(third["revision"], second["revision"])

    def test_conflict_does_not_overwrite(self):
        first, _ = self.store.save(self.payload("one"), "1" * 64, 0)
        with self.assertRaises(ConflictError):
            self.store.save(self.payload("two"), "2" * 64, 0)
        self.assertEqual(first["revision"], self.store.latest()["revision"])


if __name__ == "__main__":
    unittest.main()
