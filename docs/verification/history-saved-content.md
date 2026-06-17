# History and Saved Content Verification

## Scope

- Added Library as the local learning record surface for attempts, saved words,
  saved sentences, and mistake groups.
- Added attempt filters for all, correct, almost, needs work, and skipped
  records.
- Added Library overview counts for attempts, words, sentences, and due review
  items.
- Added retry and saved-content removal actions from Library records.
- Derived Library display records from local history, saved content, due review
  items, and mock sentence data instead of duplicating screen-specific data
  shapes.

## Automated Checks

- TypeScript check: passed with `npm run typecheck`.
- ESLint check: passed with `npm run lint`.
- Prettier check: passed with `npm run format:check`.
- Whitespace check: passed with `git diff --check`.

## Runtime Checks

- iOS simulator check: passed on `iPhone 17`.
- Android emulator check: passed on `Medium Phone API 36.1`.
- After completing one local Practice attempt and saving content, Library
  showed:
    - `1` attempt.
    - saved word and saved sentence counts.
    - `2` due review cards.
    - the correct attempt for `Necesito un café.`.
    - learner answer and best translation as `I need a coffee.`.
    - retry and remove saved actions.

## Notes

- The current Library implementation is local-first and MMKV-backed.
- Mistake groups are available from recorded validation details, but the
  verified happy path had no mistakes to display.
- Backend sync, remote history, and analytics were not added in this phase.
