# Local Domain Services Verification

## Scope

- Added shared Correcta product contracts for language pairs, practice
  sentences, validation results, feedback, saved content, review items,
  progress snapshots, notification preferences, and service interfaces.
- Added MMKV-backed local repositories for preferences, practice history, saved
  words, saved sentences, review queue items, and notification preferences.
- Added deterministic mock sentence, validation, and teacher feedback services.
- Added local progress and session summary derivation from repository records.
- Added validation parsing that rejects malformed validation-shaped payloads
  before UI rendering.
- Extended the component check route so it can exercise the native and domain
  foundations together.

## Automated Checks

- TypeScript check: passed with `npm run typecheck`.
- ESLint check: passed with `npm run lint`.
- Prettier check: passed with `npm run format:check`.

## Runtime Check

- Android emulator route check: passed on `Medium_Phone_API_36.1`.
- The component check route reported:
    - `MMKV ready`
    - `Nitro Fetch adapter ready`
    - `5 mock sentences`
    - `1 attempt record`
    - `1 word, 1 sentence`
    - `1 due review item`
    - `1 completed attempt`
    - `Malformed validation rejected`

## Notes

- The local domain validation uses fixed IDs so repeated checks update the same
  records instead of filling local storage with duplicates.
- No backend, auth, AI provider, notification scheduling, ads, or subscription
  behavior was added in this phase.
