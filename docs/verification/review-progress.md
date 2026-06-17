# Review and Progress Verification

## Scope

- Added Review decks for recommended cards, word flashcards, sentence
  flashcards, mistake cards, and Sentence Builder review.
- Added review card reveal and grade handling through the review workflow
  service.
- Added Progress metrics, daily goal, weekly activity, achievements, reminder
  preferences, backend AI status, and monetization status.
- Derived Review and Progress data from local repositories and service
  boundaries instead of screen-local fixtures.

## Automated Checks

- TypeScript check: passed with `npm run typecheck`.
- ESLint check: passed with `npm run lint`.
- Prettier check: passed with `npm run format:check`.
- Whitespace check: passed with `git diff --check`.

## Runtime Checks

- iOS simulator check: passed on `iPhone 17`.
- Android emulator check: passed on `Medium Phone API 36.1`.
- After one completed Practice attempt with saved content, Review showed:
    - Recommended deck with `2` due.
    - Word flashcards with `1` due.
    - Sentence flashcards with `1` due.
    - Mistake cards with `0` due.
    - Sentence Builder with `1` due.
    - a due card for `Necesito un café.`.
- Progress showed:
    - `1` completed attempt.
    - `100%` accuracy.
    - `2` saved items.
    - `2` due review cards.
    - `0` difficult cards.
    - `44` XP.
    - daily goal progress at `1/5` attempts.

## Notes

- Review grading state updates are implemented locally; the runtime pass
  verified deck/card rendering, not every grade branch.
- Progress includes backend AI and monetization status cards, but those cards
  currently describe adapter readiness rather than live provider integrations.
- Push notifications, remote recommendations, and paid subscription behavior
  were not added in this phase.
