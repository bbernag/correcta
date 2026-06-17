# Monetization Verification

## Scope

- Added a product-level monetization adapter for rewarded learning moments.
- Added allowed rewarded moments for post-session, daily-goal-complete, bonus
  review pack, and rewarded hint paths.
- Added blocked behavior for ad requests during disallowed active-learning
  moments.
- Added unavailable behavior when no rewarded ad provider is configured.
- Added Progress screen monetization status and reward request UI.

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
- Progress rendered monetization status while the core Practice, Review,
  Progress, and Library flows remained usable.

## Notes

- No ad SDK, rewarded ad placement, subscription, purchase flow, or analytics
  event tracking was added.
- The default adapter reports rewarded ads as unavailable and keeps core
  learning available.
- Real provider verification must test earned, cancelled, unavailable, and
  failed reward states before enabling ads.
