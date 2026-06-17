# Practice Feedback Loop Verification

## Scope

- Added the first complete local Practice flow from Home into a focused
  sentence prompt.
- Added typing and Sentence Builder input modes, progressive hints, skip, and
  disabled-submit behavior for empty answers.
- Added mock translation validation, feedback rendering, accepted-answer
  display, save word, save sentence, next prompt, retry-ready state, and session
  summary behavior.
- Stored completed and skipped attempts through local repositories so later
  History, Review, and Progress screens can consume the same records.
- Updated the shared `Screen` and Practice typing input so keyboard dismissal
  leaves Submit reachable on iOS and Android.

## Automated Checks

- TypeScript check: passed with `npm run typecheck`.
- ESLint check: passed with `npm run lint`.
- Prettier check: passed with `npm run format:check`.
- Whitespace check: passed with `git diff --check`.

## Runtime Checks

- iOS simulator check: passed on `iPhone 17`.
- Android emulator check: passed on `Medium Phone API 36.1`.
- The checked happy path was:
    - Home rendered with `Start practice`.
    - Practice opened to `Sentence 1 of 5`.
    - `I need a coffee.` was entered for `Necesito un café.`.
    - Keyboard dismissal left `Submit answer` reachable.
    - Submit rendered `Correct`, `100%`, the learner answer, and the accepted
      answer.
    - Save word and save sentence actions completed.

## Notes

- Android React Native accessibility output was sparse during QA, so Android
  verification used screenshots plus coordinate taps as visual evidence.
- The custom keyboard toolbar rendered on Android, but the native keyboard
  checkmark was the reliable dismissal path in the emulator.
- Real AI validation, auth, backend sync, notifications, and ads were not part
  of this phase.
