# Foundation and App Shell PRD

**Product name:** Correcta
**Document version:** 1.0
**Date:** 2026-06-16
**Document type:** Product Requirements Document
**Scope:** First implementation phase for app scaffolding, native dependency
validation, design-system foundation, reusable components, route shell, and
iOS/Android run verification
**Out of scope:** Learning-loop implementation, backend, AI provider
integration, auth, ads, subscriptions, notifications, persistence-heavy review
flows, and production content generation

---

## Problem Statement

Correcta has a clear product direction and implementation plan, but the app does
not yet have a runnable React Native foundation. The team needs a first phase
that turns the planning docs into a working Expo Dev Client app without jumping
ahead into product features that depend on unvalidated native modules,
navigation, theming, and device builds.

From the user's perspective, the current problem is that the app idea cannot be
tested on iOS or Android yet. Before sentence translation, feedback, review, or
progress features can be built confidently, the project needs a stable runtime,
native library validation, semantic design tokens, reusable UI primitives, and a
native-feeling route shell.

This phase must reduce implementation risk. It should prove that the selected
React Native, Expo Dev Client, New Architecture, Hermes, styling, animation,
gesture, keyboard, storage, date, and navigation decisions work together on
real app targets before the learning product is built on top.

## Solution

Create the Correcta mobile app foundation as a focused first implementation
phase. The deliverable is a runnable Expo Dev Client React Native app with the
project's structure rules, TypeScript conventions, native module validation,
semantic theme system, reusable UI primitives, and navigation shell in place.

The first phase should let a developer or tester:

- Install dependencies.
- Run the app in iOS and Android development environments.
- Confirm native module setup through visible validation screens or checks.
- Switch or preview light and dark theme behavior.
- View reusable components in a simple component playground.
- Move through placeholder app sections using the selected navigation stack.
- Read build notes that document what was validated and what remains risky.

Liquid Glass is included only as a guarded foundation guideline. This PRD should
not require polished Liquid Glass product UI. It should define the expectation
that the app has a reusable glass-surface contract, uses platform support checks,
and has readable fallbacks. If the Liquid Glass library does not pass the early
compatibility spike, the foundation should continue with a normal elevated
surface and document the blocker.

## Phase Gates

- Entry gate: planning docs and repo rules are available, but no app scaffold is
  required.
- Deliverables: runnable Expo Dev Client app, native validation checks,
  semantic themes, reusable UI primitives, placeholder route shell, component
  playground, and iOS/Android build notes.
- Exit gate: the app runs in at least one iOS target and one Android target, and
  unresolved native-library blockers are documented with next actions.

## User Stories

1. As a product owner, I want the Correcta app scaffolded as a real mobile app,
   so that future work can build on a runnable foundation instead of planning
   documents.
2. As a product owner, I want the first phase to stay focused on foundation and
   app shell work, so that the team does not start product screens before the
   native stack is proven.
3. As a developer, I want the project to use Expo Dev Client instead of Expo
   Go, so that native modules can be integrated and tested early.
4. As a developer, I want New Architecture and Hermes enabled from the start, so
   that the app is built on the runtime assumptions used by the technical plan.
5. As a developer, I want the React Native version choice validated against the
   Expo runtime, so that the project does not commit to an unsupported
   combination.
6. As a developer, I want TypeScript strictness configured, so that future
   feature work has reliable type feedback.
7. As a developer, I want linting and formatting configured, so that new files
   follow the same conventions from the first commit.
8. As a developer, I want path aliases configured, so that imports stay readable
   as the app grows.
9. As a developer, I want the source structure to follow the repo's latest
   React Native rules, so that screen-owned code, reusable UI, and shared
   support code have clear ownership.
10. As a developer, I want reusable UI components to live in the common
    component layer, so that product screens do not duplicate foundation UI.
11. As a developer, I want screen-owned code to stay under the owning screen
    boundary, so that the project does not recreate a second feature tree inside
    the component layer.
12. As a developer, I want semantic theme tokens defined before product screens,
    so that screens do not hardcode colors, spacing, radii, or typography.
13. As a developer, I want Unistyles configured early, so that theme-aware
    styling does not depend on a large React Context provider.
14. As a developer, I want light and dark themes available in the foundation, so
    that future components can support both modes from the start.
15. As a developer, I want high-contrast theme readiness considered in the token
    model, so that accessibility can be added without redesigning the theme
    system.
16. As a developer, I want typography, spacing, radius, shadow, and motion
    tokens defined, so that reusable components share a stable visual language.
17. As a designer, I want the component foundation to feel calm, professional,
    and premium, so that it supports the intended language-learning experience.
18. As a designer, I want a component playground screen, so that foundational
    components can be reviewed without waiting for product flows.
19. As a designer, I want components shown in light and dark mode, so that
    contrast and visual quality can be evaluated early.
20. As a designer, I want Liquid Glass treated as a progressive enhancement, so
    that iOS-specific polish does not make Android or unsupported iOS versions
    look broken.
21. As a designer, I want glass-like surfaces to have readable fallbacks, so
    that important text and controls remain usable on every platform.
22. As a developer, I want Reanimated and Worklets validated, so that future
    sentence cards, feedback, chips, and progress animations can run on the UI
    thread.
23. As a developer, I want Gesture Handler validated, so that future word chips,
    swipe actions, and review gestures have a native gesture foundation.
24. As a developer, I want Screens and Safe Area handling validated, so that the
    app shell respects native navigation and device insets.
25. As a developer, I want Keyboard Controller validated on a real text input,
    so that the future practice screen can keep typing smooth.
26. As a developer, I want MMKV validated with a simple read/write check, so
    that preferences can later be stored locally with confidence.
27. As a developer, I want the date library validated with a formatting or
    timezone check, so that future streaks, reminders, history, and reports have
    a proven date foundation.
28. As a developer, I want Nitro module setup validated, so that Nitro-based
    dependencies do not become a late integration surprise.
29. As a developer, I want the HTTP adapter boundary planned but not connected
    to backend AI yet, so that future services can swap mock and remote
    implementations without changing screens.
30. As a developer, I want React Navigation configured directly, so that the app
    has explicit native stack and tab control.
31. As a developer, I want native bottom-tab behavior validated or clearly
    documented as a spike, so that the app shell can become native-feeling
    without blocking the scaffold.
32. As a user, I want to open the app and see a stable placeholder Home section,
    so that the foundation feels like the start of a real app.
33. As a user, I want to navigate to placeholder Practice, Review, Progress, and
    Library sections, so that the main product areas are represented.
34. As a user, I want placeholder screens to respect safe areas, so that the app
    feels native on notched phones and Android edge-to-edge devices.
35. As a user, I want text and buttons to be readable in both themes, so that
    the app feels polished even before product content exists.
36. As a developer, I want a reusable Screen component, so that future screens
    consistently handle safe areas, background, and layout.
37. As a developer, I want a reusable AppText component, so that typography,
    color, and accessibility defaults are centralized.
38. As a developer, I want a reusable Surface component, so that cards and
    panels use semantic theme tokens instead of one-off styles.
39. As a developer, I want a reusable Button component, so that press states,
    disabled states, loading states, and accessible labels are consistent.
40. As a developer, I want a reusable TextInput component, so that labels,
    native text input props, validation states, and keyboard behavior are
    handled consistently.
41. As a developer, I want an optional reusable GlassSurface component contract,
    so that glass effects can be added behind a platform-aware abstraction.
42. As a developer, I want icon-only controls to require accessible names, so
    that reusable components do not create inaccessible UI patterns.
43. As a developer, I want loading, empty, disabled, and error states to be
    explicit in reusable components when applicable, so that future screens
    inherit clear behavior.
44. As a developer, I want components to use React Native primitives, so that no
    web-only host elements or browser conventions enter the app.
45. As a developer, I want component files to stay small and focused, so that
    the foundation remains easy to review.
46. As a developer, I want the code conventions for function declarations,
    named exports, and type aliases applied from the start, so that the scaffold
    matches the repo rules.
47. As a developer, I want iOS and Android simulator, emulator, and device run
    results documented when available, so that native readiness is visible.
48. As a developer, I want release or preview build notes documented, so that
    debug-only success is not mistaken for production readiness.
49. As a developer, I want known native blockers and dependency spike results
    recorded, so that unresolved module issues do not disappear.
50. As a future implementer, I want this phase to end with clear next steps, so
    that the next PRD can focus on the mocked practice loop.

## Implementation Decisions

- Build the first phase as a foundation and app-shell milestone, not as a full
  product MVP.
- Use Expo Dev Client, New Architecture, Hermes, and TypeScript as the runtime
  baseline.
- Validate React Native and Expo compatibility before committing to product
  feature work. If the exact target runtime is not supported by stable Expo,
  perform a compatibility spike and document the selected version path.
- Follow the repo's latest React Native structure rules: screen-owned code uses
  the screen ownership boundary, reusable UI uses the common component layer,
  and broadly shared support code uses the matching top-level support modules.
- Use direct React Navigation instead of Expo Router for this phase.
- Build a native stack, native-aware tab shell, modal route area, and
  placeholder product sections for Home, Practice, Review, Progress, and
  Library.
- Keep placeholder screens thin. They should prove navigation, safe areas,
  theme usage, and route ownership without implementing learning logic.
- Use Unistyles as the styling and theme foundation.
- Define semantic tokens for colors, typography, spacing, radii, shadows, and
  motion before building product screens.
- Do not use a broad React Context provider for theme values in hot UI.
- Do not use Tailwind-style runtime class strings as the default styling
  foundation.
- Build reusable UI primitives first: Screen, AppText, Surface, Button,
  TextInput, and a component playground.
- Include GlassSurface as a guarded reusable component contract only if the
  compatibility spike succeeds. It must check platform support and provide a
  readable non-glass fallback.
- Treat Liquid Glass as in scope for foundation guidelines and optional
  validation, but out of scope for polished product-specific glass usage.
- Use Liquid Glass only for appropriate chrome or floating surfaces later; do
  not use it behind primary learning text, translation input, long
  explanations, charts, or dense reading content.
- Validate Reanimated, Worklets, Gesture Handler, Screens, Safe Area handling,
  Keyboard Controller, MMKV, Nitro module setup, Nitro Fetch adapter readiness,
  and the date library with visible checks or documented proof.
- Use the selected date library for date handling validation, even if the app
  does not yet implement streaks, reminders, review schedules, or weekly
  reports.
- Keep HTTP and service boundaries mocked or adapter-only. No backend, AI, auth,
  ads, or subscription integration should be added in this phase.
- Use function declarations for React components.
- Use named exports unless a framework or registry requires otherwise.
- Use type aliases for object shapes unless a native library extension requires
  an interface.
- Keep files under about 300 lines and split by responsibility before a file
  becomes hard to review.
- Do not create empty folders or placeholder files for speculative future reuse.
- Document build and run results for iOS and Android, including any simulator,
  emulator, physical-device, preview, or release-build constraints.

## Testing Decisions

- Tests should verify external behavior, not implementation details.
- Reusable UI components should be tested through rendered output, accessible
  names, press behavior, disabled/loading states, and theme-visible behavior.
- The theme module should be tested through token availability and component
  behavior, not through snapshots of internal style objects.
- Navigation should be tested by asserting that the expected placeholder
  sections can mount and route transitions expose the expected user-visible
  screen names.
- Native validation should be handled with a mix of automated checks where
  practical and documented manual verification where native modules require
  actual device or build confirmation.
- Keyboard behavior should be verified with a text input screen that confirms
  the focused field and submit area remain reachable.
- Storage validation should prove that a small preference can be written and
  read back through the selected key-value storage module.
- Date validation should prove that a date can be formatted or interpreted
  through the selected date module.
- Gesture and animation validation should prove that at least one simple
  interaction can animate or respond through the selected native libraries.
- Accessibility expectations should be included in component tests for buttons,
  icon-only controls, and text inputs.
- Snapshot tests should be avoided for broad screens. Use targeted assertions
  for stable component output only when they add value.
- The project should use the narrowest relevant command first, then document
  broader build/run verification before handoff.
- Prior art is limited because the app scaffold does not exist yet. Testing
  patterns should therefore follow the repo's React Native testing rules:
  React Native Testing Library for component behavior, Arrange-Act-Assert
  structure, colocated tests, and behavior-first assertions.

## Out of Scope

- Learning flows: full onboarding, placement test, sentence generation,
  Sentence Builder, answer validation, teacher feedback, accepted translations,
  mistake highlighting, and practice session state.
- Learning data: saved words, saved sentences, Mistake Notebook, History
  persistence, Review decks, Progress charts, weekly reports, local SQLite
  schema, migrations, and offline sync.
- Integrations: notifications, auth, backend APIs, AI providers, AI safety
  prompts, ads, subscriptions, audio, TTS, pronunciation, production analytics,
  and advanced charts.
- Full Liquid Glass product UI beyond guarded foundation support and fallback
  rules.

## Further Notes

- This PRD should be implemented before the mocked practice-loop PRD.
- The success criterion is a runnable app foundation, not a useful language
  learning session.
- Liquid Glass is not fully out of scope, but it must not block the scaffold.
  The right first-phase behavior is to prove or defer the glass surface
  abstraction while keeping a normal native surface fallback.
- The next phase should start only after the native stack can run on iOS and
  Android and the reusable UI layer is stable enough for Practice, Feedback,
  History, and Review screens.
- Any native library that fails validation should be documented with the failing
  platform, build type, command, and observed failure before choosing a
  replacement.
