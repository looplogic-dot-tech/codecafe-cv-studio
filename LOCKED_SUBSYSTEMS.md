# Locked subsystems — baseline 1.6.4.10.2.1

The following subsystems are considered acceptably functional and are FROZEN until the user explicitly asks to unlock/improve them.

## 1. Section controls
Protected behavior includes:
- add/remove/restore configurable CV sections and fields
- editable section titles and reset controls
- section visibility reflected immediately in Live Preview
- ES/EN section controls and labels

Do not refactor, restyle, rename, relocate, or change state semantics for these controls while this lock is active.

## 2. Library + synchronization
Protected behavior includes:
- My CVs / CV Library open, create, open, duplicate, rename, move, archive, restore, delete
- Professional Library workflows
- current-document preservation when opening/closing the library
- local workspace persistence
- EC2 synchronization behavior
- Google Drive synchronization behavior
- autosave/update-in-place semantics: saving an existing CV updates that CV and must not create a new document/revision copy as a separate CV

Do not change storage schema, sync semantics, document identity, library workflow, or cloud behavior while this lock is active.

## 3. Print editor / PDF path
Protected behavior includes:
- current Print Editor controls
- Live Preview pagination
- manual page breaks
- one Live Preview page => one printed/PDF page
- no print-control UI in output
- no blank trailing/interleaved pages
- current margins/page geometry

`src/printEditorV3.ts` and the 1.6.4.9 print behavior are frozen. Do not change print CSS, print DOM cloning, page geometry, page-break logic, print controls, or PDF/print handlers while this lock is active.

## Change rule
A future correction or feature must preserve all three locked subsystems. If a requested feature appears to require changes to any locked subsystem, stop and identify the dependency first. Do not modify it unless the user explicitly authorizes unlocking that subsystem.

Visual polish and improvements to these areas are deferred intentionally and are not part of current corrective work.
