# Notifications and Reminders Verification

## Scope

- Added local notification preference storage for reminder enabled state,
  reminder preset, reminder time, daily practice reminders, review reminders,
  quiet hours, and selected days.
- Added scheduled reminder metadata storage through a local repository.
- Added a reminder service that derives scheduled daily practice and review
  reminders from local preferences plus due review data.
- Added Progress screen controls for toggling reminders, choosing reminder
  presets, and toggling review reminders.
- Added non-guilt reminder copy and route metadata for Practice and Review.

## Automated Checks

- TypeScript check: passed with `npm run typecheck`.
- ESLint check: passed with `npm run lint`.
- Prettier check: passed with `npm run format:check`.
- Whitespace check: passed with `git diff --check`.

## Runtime Checks

- iOS simulator check: passed on `iPhone 17` as part of the Progress screen
  pass.
- Android emulator check: passed on `Medium Phone API 36.1` as part of the
  Progress screen pass.
- Progress rendered reminder preferences and local reminder state after
  Practice created due review data.

## Notes

- This phase currently verifies local reminder preferences and schedule
  metadata only.
- No native notification permission prompt, OS-level scheduling API, delivered
  notification, or notification-open routing was verified.
- Native delivery should remain a separate phase because it requires device
  permission handling and manual delivery checks.
