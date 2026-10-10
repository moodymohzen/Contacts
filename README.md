# Contact Manager

A small Arabic-first contact dashboard backed by Firebase Firestore.

## Run locally

Serve this folder over HTTP (ES modules do not work from `file://`). In VS Code, you can use the Live Server extension, or run this command if Python is installed:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000`. The main `index.html` is the user-facing sign-in and contacts page; `dtacontact.html` is the secondary administration dashboard. The dashboard page has a client-side password gate; it is a convenience barrier only, not security. The password is present in the downloaded page source and can be bypassed, so do not rely on it to protect the dashboard or Firestore data.

## Firestore data

The dashboard connects to the Firestore database with ID `contactsid` and reads two top-level collections:

- `contacts`: `name` (or `fullName`), `phone` (or `phoneNumber` / `mobile`), and optionally `userId`.
- `users`: `name` (or `fullName` / `displayName`), `email`, `phone`, and optionally `role`.

The field aliases allow existing documents to be displayed without migration. New contacts are saved to `contacts` with `name`, `phone`, `createdAt`, and, when selected, `userId`. Existing company and email fields are preserved in Firestore but are not shown on contact cards, searched, collected by the form, or included in VCF exports.

The users page supports adding users and editing their name, password, email, and type. A user-details action opens a dedicated in-app view with all user document fields and linked contacts; password values are masked by default. Contact links are matched by user document ID, `userid`/`uid`, username, or user email fields. The type selector offers manager, supervisor, and user; an existing custom type remains selectable when editing that user. Updating an existing user changes only those four fields and leaves other document fields (such as `userid`) untouched. Existing field names and capitalization are retained; new users use `username`, `password`, `Email`, and `Type`.

Contact cards include call and WhatsApp links when a phone number is available, plus an export action that shares or downloads a vCard (`.vcf`) for importing into a phone's contacts. The contacts page downloads all saved contacts together in one multi-entry `contacts.vcf` file without opening the device share dialog.

The main `index.html` page offers a convenience sign-in using the email and password fields already stored in Firestore, then displays contacts linked by user document ID or the supported user identity fields. It supports adding and deleting contacts, importing multiple contacts from a VCF file (including quoted-printable names, declared character sets, and UTF-16 files), searching by name or phone, exporting the signed-in user's contacts as one VCF file, and changing the stored password. Selecting a contact opens a separate in-page details view with its available non-identifying fields and contact actions. The current user ID is kept in tab-scoped session storage so reloading the page in the same tab restores the display; signing out clears it. `dtacontact.html` is the secondary administration dashboard.

This sign-in is only client-side display filtering, not authentication or access control: the browser reads both entire collections, passwords are stored in Firestore, and Firestore rules may still allow direct access to other records. Do not describe this setup as private or encrypted. Use Firebase Authentication and owner-based Firestore rules for real per-user isolation.

Firestore security rules must allow the intended users to read both collections, create and delete contact documents, and create/update user documents. Do not enable unrestricted public writes for a production database; add Firebase Authentication and enforce appropriate ownership/role rules before exposing write access.
