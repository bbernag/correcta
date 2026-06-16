# Testing Rules

Use this file for reusable React Native testing expectations. Exact framework,
file locations, setup files, and commands should come from this repo's package
scripts, source tree, and CI config.

## What to Test

- Add or update tests when behavior changes, not only when structure changes.
- Prefer focused tests for helpers, services, hooks, and complex UI states.
- Do not update tests to match broken behavior. Fix the behavior.
- Test explicit loading, empty, and error states for async UI.
- Test pressed, disabled, loading, empty, error, pagination, refresh, and form
  validation states when those states affect user behavior.
- Test navigation effects by asserting the user-visible result or the typed
  navigation call at the screen boundary.

## React Native Testing

- Use React Native Testing Library for component tests. Do not import DOM
  Testing Library utilities for native components.
- Prefer queries by role, label text, display value, placeholder text, and text
  content.
- Use `testID` only for structural anchors when accessibility queries are
  ambiguous or unavailable.
- Render components with the same providers they require in the app through a
  shared `renderWithProviders` helper.
- Use fake timers for debounce, timeout, interval, animation, and delayed
  loading behavior.
- Avoid broad snapshots of screens. Prefer behavior assertions and small
  snapshots only for stable, intentional output.
- Structure tests with Arrange, Act, and Assert sections.

## File Naming and Location

- Colocate tests with the owning screen, component, hook, service, or utility
  unless the repo documents a separate integration-test location.
- Test support filenames should follow the owner name.
- Keep scenario-specific fixtures and mocks close to the test.
- Test files should follow the owner they test. Do not create shared test
  helpers until more than one test needs them.

## Mocking

- Mock at module boundaries, not deep internals.
- Promote mocks only when multiple tests use them.
- Mock network clients or `fetch` at the layer the project owns.
- Do not hardcode environment reads in tests when the project provides setup or
  config helpers.
- Mock project wrappers for storage, haptics, linking, permissions, analytics,
  network clients, and native modules before mocking low-level native APIs.

## Assertions

- Query by role, label text, display value, and accessibility state first for
  UI behavior.
- Use test IDs for structural anchors only when native accessibility queries are
  ambiguous or the project has a documented convention.
- Prefer testing public behavior over private implementation details.
- Export internals only when a test genuinely needs them.
- Do not assert DOM nodes, CSS classes, CSS styles, or browser-only behavior in
  React Native component tests.
- Prefer behavior assertions over broad snapshots.

## Commands

- Inspect `package.json` before choosing test commands.
- Run the narrowest relevant test command first, then the project's required
  verification command before handoff when available.
- Run focused tests when behavior changed.
