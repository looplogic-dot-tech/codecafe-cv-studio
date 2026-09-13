# CodeCafe CV Studio 2.0 — Profile Sessions

## Goals

Version 2.0 turns profiles into authenticated local sessions instead of simple workspace groupings.

Each profile owns:

- its CV documents and collections;
- its Professional Library;
- its Google Drive connection state;
- its local unlocked/locked session state;
- optional EC2 access capability (owner/admin only).

## Security model

- Passwords/PINs are never stored in plaintext.
- A PBKDF2-SHA256 verifier is stored per profile.
- Unlock state lives in `sessionStorage`, so closing the browser session locks the profile again.
- Google access tokens are namespaced by profile ID and never shared between profiles.
- Locking a profile removes its active Google token from memory/session scope without deleting Drive files.
- EC2 access is treated as an owner-only capability and is hidden from ordinary profiles.

## Compatibility

- Existing 1.5.x data remains untouched.
- Existing profiles without credentials are treated as legacy profiles and must create a password/PIN the first time 2.0 is opened.
- 2.0 work is isolated on the `release/v2.0.0` branch until tested.

## Planned milestones

1. Session foundation: credential storage, unlock/lock state, per-profile Google token namespace.
2. Profile chooser/lock screen.
3. Remove silent profile switching; switching requires authentication.
4. Owner-only EC2 capability.
5. Migration of legacy localStorage keys into per-profile namespaces.
6. Test migration and rollback path before any production deployment.
