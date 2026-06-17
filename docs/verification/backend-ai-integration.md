# Backend and AI Integration Verification

## Scope

- Added backend AI status contracts that list the app's expected backend
  endpoint surface and safety rules.
- Added remote sentence, translation validation, and teacher feedback service
  factories that match the app's local service interfaces.
- Added contract-version headers for remote learning requests.
- Added runtime parsing for remote practice sentences, validation results, and
  teacher feedback before data reaches UI code.
- Added recoverable errors for malformed or unavailable remote learning
  responses.
- Kept screens wired to product-level service boundaries, so mock and remote
  implementations can be swapped without changing screen code.

## Automated Checks

- TypeScript check: passed with `npm run typecheck`.
- ESLint check: passed with `npm run lint`.
- Prettier check: passed with `npm run format:check`.
- Whitespace check: passed with `git diff --check`.

## Runtime Checks

- iOS simulator check: passed on `iPhone 17` with the default local mock
  service configuration.
- Android emulator check: passed on `Medium Phone API 36.1` with the default
  local mock service configuration.
- Progress rendered backend AI status from the app service boundary.
- Practice, Review, Progress, and Library continued to work with local mock
  services after the backend-ready adapters were added.

## Notes

- No real backend base URL is configured by default, so the runtime status is
  local/mock mode.
- No live AI provider, auth token, production API, or generated API client was
  connected in this phase.
- Live backend verification must include success, timeout, malformed, unsafe,
  and server-error fixtures before enabling remote mode by default.
