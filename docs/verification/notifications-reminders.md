# Notifications and Reminders Verification

## Scope

- Added local notification preference storage for reminder enabled state,
  reminder preset, reminder time, daily practice reminders, review reminders,
  quiet hours, and selected days.
- Added scheduled reminder metadata storage through a local repository.
- Added a reminder service that derives scheduled daily practice and review
  reminders from local preferences plus due review data.
- Added `expo-notifications` as the native notification runtime and configured
  the Expo plugin with the `correcta-reminders` default channel.
- Added a native notification adapter that requests permission at reminder
  enablement time, creates the Android reminder channel, cancels stale native
  schedules, schedules due reminders through the OS, and records native
  permission/schedule status in reminder state.
- Updated reminder schedule calculation so native schedules honor the selected
  reminder days and move reminders out of quiet hours before scheduling.
- Added notification-response routing for reminder payloads that target
  Practice, Review, or Progress.
- Added Progress screen controls for toggling reminders, choosing reminder
  presets, and toggling review reminders.
- Added Progress screen copy that exposes whether native reminders are
  scheduled, blocked, waiting for permission, or absent.
- Added non-guilt reminder copy and route metadata for Practice and Review.

## Automated Checks

- TypeScript check: passed with `npm run typecheck`.
- ESLint check: passed with `npm run lint`.
- Prettier check: passed with `npm run format:check`.
- Whitespace check: passed with `git diff --check`.

## Runtime Checks

- iOS dev client rebuild: passed with `npx expo run:ios --device "iPhone 17"`;
  CocoaPods installed `ExpoNotifications` and the rebuilt app opened.
- iOS simulator runtime check: passed on `iPhone 17`; the previous native
  module error, `Cannot find native module 'ExpoPushTokenManager'`, was cleared
  after rebuilding the dev client.
- iOS native permission prompt: passed; pressing **Turn on** in the Progress
  reminders card displayed the system prompt, `"Correcta" Would Like to Send
You Notifications`.
- iOS native scheduling: passed after allowing permission; the Progress
  reminders card reported `2 device reminders scheduled`.
- iOS simulated push injection: `xcrun simctl push booted
com.luisgarcia.correcta -` sent a Review payload successfully, but no
  tappable notification banner was exposed in the simulator snapshot, so
  notification-open routing remains implemented but not runtime-verified.
- Android emulator check: passed on `Medium Phone API 36.1` as part of the
  Progress screen pass.
- Progress rendered reminder preferences and local reminder state after
  Practice created due review data.

## Notes

- This phase now verifies local reminder preferences, schedule metadata, iOS
  native permission prompting, and iOS native schedule creation.
- Android native permission/channel behavior, delivered local notification
  behavior, and notification-open tap routing still need runtime evidence before
  this phase can move from partial to done.
