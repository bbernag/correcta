# Visual Design & Interaction Polish

Status: partial. Slices 1-13 are implemented and verified as foundation work.
Slice 3 is retained as technical foundation only; Slice 4 approved the native
primitive direction. The ComponentPlayground shared-component checkpoint is
closed, and Home is now the first production screen using the accepted shared
system. The Practice core loop is polished for typing, builder, feedback, and
save/continue actions. Review now has a polished study summary, active card,
deck selection, queue preview, grading controls, and feedback. Progress now has
a polished learning score, linked metrics, weekly activity, mistake breakdown,
achievements, and recommendation flow. Library now has segmented notebook views,
saved-content cards, history badges, retry/removal actions, and empty states.
Platform-native surface and motion polish is complete. Slice 14,
Accessibility And Reduced Motion Audit, has source fixes and iOS evidence;
Android accessibility QA remains pending.

This phase turns the working local MVP into a polished native app experience
before real backend and AI integration. The design target lives in
[docs/design-system.md](../design-system.md). This phase implements that target
in small, reviewable slices.

## Source Context

The plan was refined through the existing ChatGPT Pro Extended planning thread.
Pro Extended produced the implementation sequence and recommended:

- A standalone visual polish phase before backend/AI.
- A first implementation slice for the `Scribe Blue` token theme before
  icons, haptics, components, or screens.
- `lucide-react-native`, `react-native-svg`, and `react-native-pulsar`.
- No extra animation or charting library for this phase.
- Shared wrappers for icons, haptics, motion, and native surfaces.
- Liquid Glass deferred until a concrete production use case exists; no public
  general glass abstraction is retained in the current shared component API.
- Android tonal/elevated surfaces instead of iOS glass imitation.
- Practice flow polish as the highest-priority milestone.

A follow-up Pro Extended prompt requested a design-system-level spec, including
tokens, platform rules, component specs, motion, haptics, copy, screen
blueprints, and QA. This document combines the completed Pro Extended plan with
those stricter design requirements.

A later Pro Extended orchestration checkpoint confirmed that Linked Surface
Groups should become a dedicated Slice 5 before broader shared components or
production screen polish. The current repo implements that production direction
through the shared `Card` compound component under `src/components/common/Card`;
older `CardUnion` wording in planning notes should be read as the linked-surface
`Card` foundation unless the team explicitly chooses to rename it.
ComponentPlayground should become an acceptance gate before Home, Practice,
Review, Progress, and Library adoption.

## Current Checkpoint

As of the latest documentation sync, the shared-component checkpoint, Home
Design Pilot, Practice Core Loop Polish, Review And Feedback Polish, Progress
Polish, Library Polish, and Platform-Native Surface And Motion Polish are
closed. The source contains the linked-surface `Card` family, supporting shared
visual components, ComponentPlayground sections, the first production Home
integration, the polished Practice loop, the polished Review study flow, the
polished Progress learning summary, the segmented Library notebook, and
platform-native press/elevation/ripple refinements. Source audit, automated
checks, iOS route evidence, and Android route evidence are recorded for the
shared checkpoint; iOS Home evidence is recorded for Slice 8, iOS Practice
evidence is recorded for Slice 9, iOS Review evidence is recorded for Slice 10,
iOS Progress evidence is recorded for Slice 11, iOS Library evidence is recorded
for Slice 12, iOS platform-surface/input evidence is recorded for Slice 13, and
iOS accessibility evidence is recorded for Slice 14.

Next:

1. Finish Slice 14 Android accessibility QA when an Android device is
   available.
2. Keep Android and iOS screenshots updated during the final QA pass.

## Goal

Make Correcta feel like a premium native language-learning app: calm, precise,
tactile, trustworthy, and clearly designed for repeated sentence practice.

## Non-Goals

- Real backend integration.
- Real AI provider integration.
- Auth.
- Ads.
- Subscriptions.
- Push notification delivery.
- New persistence architecture.
- Replacing React Navigation.
- Replacing the service architecture.
- Adding Lottie, Skia, Moti, or charting libraries.
- Building future speaking, pronunciation, or social features.
- Making Android copy iOS Liquid Glass.

## Exit Criteria

- Home, Practice, Review, Library, Progress, and ComponentPlayground follow the
  design system.
- The app has a shared icon system and no direct screen imports from the icon
  library.
- Haptics are wrapped behind `src/native/haptics`.
- Common components support the needed visual variants and states.
- Practice typing and scrambled-word flows feel polished.
- Feedback states are clear, educational, and not punitive.
- Light and dark themes are intentional and readable.
- iOS and Android both feel native using platform-appropriate treatment.
- Reduced motion mode simplifies nonessential animation.
- Icon-only controls have accessible names.
- Existing MVP flow still works:
  Home -> Practice -> Check answer -> Feedback -> Save -> Review/Progress/Library.
- iOS and Android QA evidence is added.

## Design Principles

- Learning content is always more important than decoration.
- Feedback should feel like careful correction, not failure.
- Native platform conventions matter; iOS and Android do not need to be
  visually identical.
- Motion explains state changes and must not slow the practice loop.
- Haptics should mark meaningful moments, not every press.
- Shared components own visual rules; screens compose them.
- Dynamic text and reduced motion are first-class design requirements.

## Dependencies Added For This Phase

Already added during earlier visual-polish slices:

- `lucide-react-native`
- `react-native-svg`
- `react-native-pulsar`

Continue to avoid:

- Moti.
- Lottie.
- Skia.
- Chart libraries.
- Liquid Glass dependency until a concrete production use case exists and an
  iOS spike confirms it is worth adding.

## Files To Create Or Update

Docs:

- `docs/design-system.md`
- `docs/phases/visual-design-interaction-polish.md`
- `docs/qa/visual-design-interaction-polish-qa.md`
- `docs/qa/visual-design-interaction-polish-results.md` after QA

Theme:

- `src/theme/colors.ts`
- `src/theme/spacing.ts`
- `src/theme/radius.ts`
- `src/theme/typography.ts`
- `src/theme/shadows.ts`
- `src/theme/motion.ts`
- `src/theme/themes.ts`
- `src/theme/unistyles.ts`
- `src/theme/index.ts`

Native adapters:

- `src/native/haptics/hapticsService.ts`
- `src/native/haptics/hapticsTypes.ts`
- `src/native/haptics/index.ts`
- `src/native/accessibility/accessibilityService.ts`

Global hooks/utils:

- `src/hooks/useReducedMotionPreference.ts`
- `src/utils/animationUtils.ts`
- `src/utils/accessibilityUtils.ts`
- `src/utils/platformUtils.ts`

Common components:

- `src/components/common/Icon/*`
- `src/components/common/IconButton/*`
- `src/components/common/Card/*`
- `src/components/common/PressableMotionView/*`
- `src/components/common/Chip/*`
- `src/components/common/WordChip/*`
- `src/components/common/ScreenHeader/*`
- `src/components/common/SectionHeader/*`
- `src/components/common/StatCard/*`
- `src/components/common/ProgressBar/*`
- `src/components/common/SegmentedControl/*`
- `src/components/common/EmptyState/*`
- `src/components/common/LoadingState/*`
- `src/components/common/ErrorState/*`
- `src/components/common/ResultBadge/*`
- `src/components/common/FeedbackHighlight/*`

Upgrade existing components:

- `src/components/common/AppText/*`
- `src/components/common/Button/*`
- `src/components/common/Screen/*`
- `src/components/common/Surface/*`
- `src/components/common/TextInput/*`

## Implementation Slices

### Slice 1: Theme Token Design System

Status: done.

Goal: implement the `Scribe Blue` token design system before changing
icons, haptics, common components, or screens.

Tasks:

- Create `src/theme/colors.ts`.
- Create `src/theme/spacing.ts`.
- Create `src/theme/radius.ts`.
- Create `src/theme/typography.ts`.
- Create `src/theme/shadows.ts`.
- Create `src/theme/motion.ts`.
- Create `src/theme/elevation.ts`.
- Create or update `src/theme/themes.ts`.
- Update `src/theme/unistyles.ts`.
- Update `src/theme/index.ts`.
- Preserve compatibility with existing theme consumers or migrate them in this
  slice.
- Add light and dark semantic color tokens from `docs/design-system.md`.
- Add spacing, radius, typography, motion, and elevation tokens from
  `docs/design-system.md`.
- Keep native/system typography; do not add custom fonts.
- Do not install icon, haptics, animation, charting, or glass dependencies in
  this slice.

Exit:

- Theme exports are stable and typed.
- Existing screens still compile and render.
- Current components can consume the new tokens.
- No screen work depends on raw colors added in this phase.

Evidence:

- Typecheck, lint, and Prettier checks pass.
- Android emulator light-mode navigation was verified across Home, Practice,
  Review, Progress, and Library.
- Android emulator dark-mode rendering was verified on Home, Practice, and
  Library after a clean dev-client relaunch.
- React Native Unistyles is explicitly synced to the OS color scheme through a
  top-level hook because Android dev-client runtime verification showed that
  native navigation chrome could switch before Unistyles content styles did.

### Slice 2: Icons And Haptics Foundation

Status: done.

Goal: add native feedback infrastructure without changing every screen.

Tasks:

- Install `lucide-react-native`, `react-native-svg`, and
  `react-native-pulsar`.
- Create `Icon` wrapper and registry.
- Create `IconButton`.
- Create haptics adapter in `src/native/haptics`.
- Add examples to ComponentPlayground.

Exit:

- Icons render from registry.
- Icon-only controls require accessible names.
- Haptics wrapper is callable.
- iOS and Android builds pass.

Evidence:

- Typecheck, lint, and Prettier checks pass.
- iOS build, install, and dev-client launch succeeded.
- Android build, install, and dev-client launch succeeded.
- ComponentPlayground renders semantic registry icons, IconButton variants, and
  haptic test actions on iOS and Android.
- iOS accessibility exposes icon-only controls with accessible labels and
  selected state.
- Android accessibility snapshots remained sparse after app load, so this pass
  used screenshots and coordinate fallback for modal navigation.

### Slice 3: Upgrade Existing Common Components

Status: partial. Technical primitive APIs are done; visual direction is not
approved.

Goal: make current primitives support the new design without breaking screens.

Tasks:

- Add AppText variants.
- Add Button variants, icon support, loading, disabled, and press states.
- Add Screen background and safe-area variants.
- Add Surface variants and correction rail support.
- Add TextInput focus, helper, error, success, and icon states.

Exit:

- Existing screens compile.
- ComponentPlayground shows upgraded primitives.

Evidence:

- Typecheck, lint, and Prettier checks pass.
- iOS simulator runtime check shows the upgraded primitive examples in
  ComponentPlayground.
- AppText exposes typed variants and semantic tones from the design system.
- Button supports typed variants, sizes, leading/trailing icons, loading,
  disabled, and press states while preserving existing call sites.
- Screen supports typed background and safe-area variants while preserving the
  existing `edges` override.
- Surface supports typed hierarchy variants, status variants, and correction
  rails.
- TextInput supports focused, helper, error, success, disabled, and icon states.
- ComponentPlayground shows upgraded typography, button, input, and surface
  examples.
- User visual review rejected the current samples as too generic, card-heavy,
  and not native/elegant enough. Treat this slice as technical foundation only.

### Slice 4: Native Elegance Pass For Common Primitives And Glass

Status: done.

Plan: [native-elegance-common-primitives.md](native-elegance-common-primitives.md)

Goal: turn the existing primitive APIs into an approved native visual language
before adding more shared components.

Exit:

- ComponentPlayground no longer looks like generic web card UI.
- Existing primitives feel native and elegant in iOS and Android light/dark
  mode.
- The temporary glass fallback from this historical slice was retired in Slice
  13 because no approved production use case remained.
- Android uses tonal/elevated native treatment instead of fake iOS glass.

### Slice 5: Card And Linked Surface Foundation

Status: done. The shared `Card` compound component, linked-surface tokens, and
focused playground examples exist in source. Source audit, automated checks, and
iOS/Android route evidence are recorded.

Goal: establish Linked Surface Groups as a tested shared layout primitive before
applying the new direction to production screens.

Tasks:

- Add or extend Unistyles tokens for `canvas`, `surfaceContrast`,
  `surfaceContrastForeground`, `surfaceContrastMutedForeground`,
  `surfaceContrastAccent`, `surfaceContrastPressed`, `surfaceContrastFocus`,
  `Card` radii, gaps, bridge overlap, and min/default/max bridge spans.
- Create or refine `src/components/common/Card/*`.
- Add `Card` and `Card.Item` compound anatomy.
- Support vertical and horizontal axes.
- Support two or more vertical items.
- Support a two-item horizontal interlocking pair.
- Default `bridgeSpan` to `0.7` and clamp it between `0.66` and `0.78`.
- Generate bridges internally between adjacent items.
- Use the same opaque surface token for every item and bridge.
- Render bridges below items and exclude them from touch, haptics, and
  accessibility.
- Preserve visible canvas cut-ins.
- Use a small overlap to prevent density-dependent hairline seams.
- Keep horizontal paired items equal in height.
- Keep union geometry stable during pressed, focused, and loading states.
- Do not independently scale an interactive item inside a union.
- Do not use gradients, blur, glass, masks, image assets, SVG geometry, Skia,
  Canvas, or custom native drawing.
- Add focused `Card` linked-surface examples to ComponentPlayground without
  redesigning the whole playground in this slice.

Exit:

- `Card` geometry matches the documented Linked Surface Group rules.
- The bridge occupies `66%` to `78%` of the shared edge.
- Rounded canvas cut-ins remain visible.
- Vertical and horizontal variants work on iOS and Android.
- Light and dark theme tokens are validated.
- Accessibility and pointer behavior are tested.
- Focused playground examples are approved.

Out of scope:

- Home redesign.
- Practice redesign.
- New product behavior.
- Repository or service changes.
- Platform material work.
- Broad common-component redesign.
- Backend, notification, or monetization work.

### Slice 6: Supporting Shared Visual Components

Status: done. The main supporting components exist in source and are covered by
ComponentPlayground. Automated checks and iOS/Android route evidence are
recorded.

Goal: create or restyle the remaining reusable UI building blocks before screen
polish.

Tasks:

- Add `PressableMotionView` only when the existing press primitive does not
  already satisfy the required behavior.
- Add `Chip` and `WordChip`.
- Add `ScreenHeader` and `SectionHeader`.
- Add `StatCard`, `ProgressBar`, and `SegmentedControl`.
- Add shared empty/loading/error states.
- Add `ResultBadge` and `FeedbackHighlight`.
- Keep `StatCard` focused on metric content and state, not union geometry.
  Screens compose `StatCard` inside `Card` when metrics are semantically
  related.
- Use solid colors only for progress bars, badges, tabs, chips, and pressed
  states.
- Do not include a glass fallback in this slice. Linked-surface `Card` must not
  depend on glass.

Exit:

- Every component appears in ComponentPlayground.
- Reduced motion is respected by animated components.
- Icon-only controls have accessible labels.

### Slice 7: ComponentPlayground Acceptance Gate

Status: done. ComponentPlayground contains the shared component review surface,
and source audit, automated checks, iOS evidence, and Android evidence are
recorded before production screen adoption.

Goal: make ComponentPlayground the visual QA source.

Tasks:

- Verify ComponentPlayground as a coherent native component index grouped by
  actions, inputs, selection controls, feedback, status and progress, surfaces
  and Linked Surface Groups, headers and navigation-adjacent elements, and
  empty/loading/error states.
- Show supported variants and sizes.
- Show light and dark themes.
- Show enabled, pressed, focused, disabled, and loading states where applicable.
- Show long copy and multiline content.
- Show Dynamic Type, reduced motion, accessibility labels/state, and iOS/Android
  behavior.
- Keep screen-specific logic in
  `src/screens/ComponentPlayground/hooks/useComponentPlaygroundViewModel.ts`.

Exit:

- Design system can be reviewed from one screen.
- Production-screen adoption does not begin until the shared visual system has
  been reviewed in the playground and evidence has been recorded.

### Slice 8: Home Design Pilot

Status: done.

Goal: use Home as the first production integration of the accepted shared
system.

Expected files:

- `src/screens/Home/components/DailyPracticeHeroCard.tsx`
- `src/screens/Home/components/QuickStatGrid.tsx`
- `src/screens/Home/components/TeacherTipCard.tsx`
- `src/screens/Home/components/ContinueLearningCard.tsx`
- `src/screens/Home/hooks/useHomeViewModel.ts`
- `src/screens/Home/types/homeTypes.ts`
- `src/screens/Home/utils/homeUtils.ts`

Tasks:

- Add hero practice card and primary CTA.
- Add linked summary and progress surfaces where semantically related.
- Add horizontal stat pairs.
- Add teacher tip and continue learning sections.
- Add rounded segmented controls or filters only where already required.
- Add solid progress treatment.
- Add icons and progress animation.
- Use real product copy and variable data.
- Cover loading, empty, and error states.
- Do not introduce screen-local copies of `Card` linked-surface geometry.
- Do not refactor Home product logic unless required for visual integration.

Exit:

- Home has one obvious next action and looks polished in light/dark mode.

Evidence:

- `HomeScreen` now composes the production Home pilot from screen-owned
  components and `useHomeViewModel`.
- The Home view model reads the existing local services for preferences,
  practice sentences, progress, review queue, saved words, and saved sentences.
- The hero, quick stats, teacher tip, and continue-learning sections use shared
  components rather than local copies of linked-surface or progress geometry.
- Loading, empty, and error states are explicit.
- Typecheck, lint, and Prettier checks pass.
- iOS simulator launch succeeded for app id `com.luisgarcia.correcta`.
- iOS visual evidence: `/tmp/correcta-slice8-ios-home.png`.

### Slice 9: Practice Core Loop Polish

Status: done.

Goal: make the core loop feel excellent.

Expected files:

- `src/screens/Practice/components/PracticeHeader.tsx`
- `src/screens/Practice/components/TranslationInputPanel.tsx`
- `src/screens/Practice/components/ScrambledWordsInput.tsx`
- `src/screens/Practice/components/SelectedWordsRow.tsx`
- `src/screens/Practice/components/WordBank.tsx`
- `src/screens/Practice/components/PracticeActionBar.tsx`
- `src/screens/Practice/components/ResultBanner.tsx`
- `src/screens/Practice/components/MistakeHighlights.tsx`
- `src/screens/Practice/components/AcceptedAlternatives.tsx`
- `src/screens/Practice/hooks/usePracticeAnimations.ts`
- `src/screens/Practice/hooks/usePracticeViewModel.ts`

Tasks:

- Upgrade sentence card and input panel.
- Do not force linked-surface `Card` onto every Practice surface. Use it only
  where adjacent content is semantically related.
- Preserve keyboard behavior, input focus, sentence-builder interaction,
  validation state, and stable action placement.
- Add scrambled-word beginner mode.
- Animate word chip selection.
- Add checking state.
- Reveal feedback with teacher-like correction treatment.
- Add accessible state announcements.
- Add haptics for submit, result, save, and skip.

Exit:

- Home -> Practice -> Check answer -> Feedback -> Save -> Continue feels
  premium and remains keyboard-safe on iOS and Android.

Evidence:

- `PracticeScreen` now composes the production Practice loop through
  `usePracticeViewModel` and screen-owned Slice 9 components.
- The existing `usePracticeSession` state machine, validation, retry, save, and
  summary flow are preserved.
- Typing mode uses the shared `TextInput`, stable action bar, explicit checking
  state, and `Check answer` copy.
- Builder mode uses screen-owned `ScrambledWordsInput`, `SelectedWordsRow`, and
  `WordBank` components with selected/disabled word-chip states.
- Feedback uses a teacher-style result banner, accepted answer alternatives,
  compact save actions, a primary continuation action, and a separate mistake
  focus surface.
- Submit, result, save, selection, and skip haptics are covered by existing
  haptic paths plus the new submit impact.
- Checking, feedback, and summary states announce through React Native
  accessibility APIs.
- Typecheck, lint, and Prettier checks pass.
- iOS simulator launch succeeded for app id `com.luisgarcia.correcta`.
- iOS visual evidence:
  `/tmp/correcta-slice9-ios-practice-answering.png`,
  `/tmp/correcta-slice9-ios-practice-builder.png`, and
  `/tmp/correcta-slice9-ios-practice-feedback.png`.

### Slice 10: Review And Feedback Polish

Status: done.

Goal: make Review feel like an intentional study area.

Tasks:

- Add review summary card.
- Add icon-driven deck cards.
- Add queue preview and due states.
- Improve empty/error states.
- Add press and haptic feedback.

Exit:

- Review clearly tells the user what to practice next.

Evidence:

- `ReviewScreen` now composes a screen-owned `useReviewViewModel` over the
  existing review deck workflow.
- Review shows a summary card, active study card, queue preview, and icon-driven
  deck cards with due counts and selected state.
- Empty and error states use the accepted shared state components.
- Reveal and grade actions use haptic feedback and accessibility
  announcements.
- Typecheck, lint, and Prettier checks pass.
- iOS simulator launch succeeded for app id `com.luisgarcia.correcta`.
- iOS visual evidence:
  `/tmp/correcta-slice10-ios-review.png` and
  `/tmp/correcta-slice10-ios-review-revealed.png`.

### Slice 11: Progress Polish

Status: done.

Goal: make progress feel motivating without heavy analytics.

Tasks:

- Add hero progress card.
- Add stat grid.
- Use Linked Surface Groups for related metrics, achievements, trends, and
  status summaries.
- Add mistake breakdown bars.
- Add weekly activity row.
- Add recommendation card.
- Animate progress bars with reduced-motion fallback.

Exit:

- Progress gives a clear sense of improvement using native views, not charts.

Evidence:

- `ProgressScreen` now composes a screen-owned dashboard with a hero progress
  card, linked metric pairs, weekly activity, mistake breakdown bars,
  achievements, recommendation, and status controls.
- Existing local services remain the source of truth; Progress derives view
  records in `progressUtils`.
- Progress bars use the shared animated `ProgressBar`, which already respects
  reduced motion.
- Typecheck, lint, and Prettier checks pass.
- Metro status probe returned `packager-status:running`.
- iOS simulator launch succeeded for app id `com.luisgarcia.correcta`.
- iOS visual evidence:
  `/tmp/correcta-slice11-ios-progress-top.png`,
  `/tmp/correcta-slice11-ios-progress-mid.png`,
  `/tmp/correcta-slice11-ios-progress-achievements.png`, and
  `/tmp/correcta-slice11-ios-progress-status.png`.

### Slice 12: Library Polish

Status: done.

Goal: make saved content feel like a personal learning notebook.

Tasks:

- Add segmented control for Words, Sentences, History.
- Improve saved word, sentence, and history cards.
- Add mastery chips and mistake badges.
- Polish retry actions, removal flows, and empty states.
- Prefer ordinary list grouping where linked geometry does not express a real
  relationship.

Exit:

- Library content feels organized and useful without adding complex new filters.

Evidence:

- `LibraryScreen` now uses a screen-owned segment state for Words, Sentences,
  and History.
- Saved word cards show mastery, review state, saved date, and mistake badges.
- Saved sentence cards show source and translation as separate labeled content
  with reason, saved date, and review chips.
- History keeps the result filter inside the History segment and shows mistake
  notebook entries plus attempt cards with result, timestamp, score, retry, and
  saved-removal actions.
- Typecheck, lint, and Prettier checks pass.
- Metro status probe returned `packager-status:running`.
- iOS simulator launch succeeded for app id `com.luisgarcia.correcta`.
- iOS visual evidence:
  `/tmp/correcta-slice12-ios-library-words.png`,
  `/tmp/correcta-slice12-ios-library-sentences.png`,
  `/tmp/correcta-slice12-ios-library-history-top.png`, and
  `/tmp/correcta-slice12-ios-library-history-attempts.png`.

### Slice 13: Platform-Native Surface And Motion Polish

Status: done.

Goal: platform-specific polish without Android pretending to be iOS.

Tasks:

- Validate press feedback.
- Validate haptic restraint.
- Validate reduced-motion fallbacks.
- Validate keyboard transitions.
- Validate safe-area behavior.
- Validate native focus behavior.
- Validate Android tonal and elevation treatment.
- Use iOS platform-material treatment only where it has a concrete use outside
  linked-surface `Card`.
- Keep linked-surface `Card` opaque and solid on both platforms.
- Do not create or retain a general glass abstraction without an approved
  production use case.
- Do not add gradients.

Exit:

- No readability regressions.
- Android does not look like an iOS clone.
- Linked-surface `Card` remains solid, opaque, and platform-consistent.

Evidence:

- `PressableMotionView` now uses platform-specific default press scale and a
  no-transform transition when reduced motion is enabled.
- `Chip` and `SegmentedControl` expose Android ripple feedback while keeping
  existing iOS press treatment.
- Theme shadows now choose iOS shadow props on iOS and Android elevation on
  Android.
- The public general glass abstraction was removed from shared common exports,
  ComponentPlayground, and Expo UI showcase examples.
- `NoticeCard` and `PocCard.Section` use solid tone fills only; no gradients are
  used for notice hierarchy.
- Linked-surface `Card` remains opaque and solid.
- `npm run typecheck`, `npm run lint`, and `npm run format:check` pass.
- iOS simulator launch, ComponentPlayground surface review, and Practice input
  with keyboard open passed.

### Slice 14: Accessibility And Reduced Motion Audit

Status: partial. Source fixes and iOS runtime evidence are complete; Android
accessibility QA remains pending because `agent-device apps --platform android`
returned `DEVICE_NOT_FOUND`.

Goal: make the polished UI usable.

Tasks:

- Add accessible labels to all icon-only controls.
- Add roles and states.
- Add useful state announcements.
- Verify touch targets.
- Verify dynamic text.
- Verify reduced motion.
- Verify contrast in light and dark mode.

Exit:

- Accessibility QA passes on iOS and Android.

Evidence so far:

- Shared `Button`, `IconButton`, and `Chip` preserve component-owned
  accessibility state while still accepting caller accessibility props.
- Shared `SegmentedControl` accepts option hints and keeps selected button state
  visible in iOS snapshots.
- Shared `NativeSlider` exposes `accessibilityValue`.
- Practice builder word chips now distinguish word-bank options, selected words,
  and already-added words.
- Practice save actions announce saved word and saved sentence confirmations.
- Review deck options expose explicit deck labels and selected state.
- Progress reminder presets expose radio semantics and checked state.
- Light-mode success and warning tokens were darkened to clear normal-text
  contrast against their soft backgrounds.
- `useReducedMotion` defaults to motion-safe behavior until the native reduce
  motion value resolves.
- `npm run typecheck`, `npm run lint`, and `npm run format:check` pass.
- iOS runtime checks passed for Home, ComponentPlayground selection examples,
  Practice input mode and builder chips, Review deck options, Progress top
  metrics, Library segments, and dark-mode Home.

Remaining:

- Android accessibility QA.
- Device-level reduced-motion toggle verification; the available iOS
  `agent-device settings animations off` command returned unsupported.

### Slice 15: Final QA And Evidence

Goal: close the phase with verified evidence.

Tasks:

- Run `npm run typecheck`.
- Run `npm run lint`.
- Run `npm run format:check`.
- Run iOS debug.
- Run Android debug.
- Run release builds if feasible.
- Test the full MVP flow.
- Capture screenshots.
- Add `docs/qa/visual-design-interaction-polish-results.md`.

Exit:

- Current MVP behavior remains intact and visual QA evidence exists.

## Recommended Commit Order

1. `docs: add visual design polish phase plan`
2. `feat: add correction desk theme tokens`
3. `feat: add icon and haptics foundations`
4. `feat: add common primitive API foundation`
5. `feat: add native elegance primitive pass`
6. `feat: add card linked surface foundation`
7. `feat: add supporting shared visual components`
8. `feat: redesign component playground acceptance gate`
9. `feat: polish home design pilot`
10. `feat: polish practice core loop`
11. `feat: polish review feedback flows`
12. `feat: polish progress screen`
13. `feat: polish library screen`
14. `feat: add platform-native surface and motion polish`
15. `fix: improve accessibility and reduced motion handling`
16. `docs: add visual polish QA evidence`

## Slice Dependencies

- Slice 5 and Slice 6 are source-implemented and verified through
  ComponentPlayground.
- Slice 7 is closed; Home is unblocked as the next production integration pilot.
- Home is the production integration pilot and blocks Practice.
- Practice blocks Review because Review consumes Practice outcomes.
- Progress, Library, and platform-native surface/motion polish are closed.
  Accessibility and reduced motion audit is the next documented slice.
- Accessibility requirements are continuous and must not be deferred entirely
  to Slice 14.

## Risks

- Too much design work before a usable slice: keep every slice demonstrable in
  ComponentPlayground or the app.
- Over-polishing low-value screens before Practice: prioritize Practice after
  foundations.
- Android visual mismatch: use Android tonal surfaces and ripple instead of iOS
  glass.
- Animation performance: do not animate typing state or large lists heavily.
- Accessibility regressions: require accessible labels for icon-only controls
  and test dynamic text early.
