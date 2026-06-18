# Visual Design & Interaction Polish

Status: partial. Slices 1-3 are implemented as foundation work. Slice 3 is not
the approved final visual direction; a native elegance pass is planned next.

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
- Liquid Glass only as an iOS-only spike behind a fallback `GlassSurface`.
- Android tonal/elevated surfaces instead of iOS glass imitation.
- Practice flow polish as the highest-priority milestone.

A follow-up Pro Extended prompt requested a design-system-level spec, including
tokens, platform rules, component specs, motion, haptics, copy, screen
blueprints, and QA. This document combines the completed Pro Extended plan with
those stricter design requirements.

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

## Dependencies To Add

Add only when starting implementation:

- `lucide-react-native`
- `react-native-svg`
- `react-native-pulsar`

Do not add:

- Moti.
- Lottie.
- Skia.
- Chart libraries.
- Liquid Glass dependency until the fallback design is implemented and an iOS
  spike confirms it is worth adding.

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
- `src/components/common/AnimatedPressable/*`
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
- `src/components/common/GlassSurface/*`

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

Status: planned.

Plan: [native-elegance-common-primitives.md](native-elegance-common-primitives.md)

Goal: turn the existing primitive APIs into an approved native visual language
before adding more shared components.

Exit:

- ComponentPlayground no longer looks like generic web card UI.
- Existing primitives feel native and elegant in iOS and Android light/dark
  mode.
- `GlassSurface` fallback exists and is only used in approved compact contexts.
- Android uses tonal/elevated native treatment instead of fake iOS glass.

### Slice 5: Add New Shared Visual Components

Goal: create the reusable UI building blocks before screen polish.

Tasks:

- Add `AnimatedPressable`.
- Add `Chip` and `WordChip`.
- Add `ScreenHeader` and `SectionHeader`.
- Add `StatCard`, `ProgressBar`, and `SegmentedControl`.
- Add shared empty/loading/error states.
- Add `ResultBadge` and `FeedbackHighlight`.
- Add `GlassSurface` fallback.

Exit:

- Every component appears in ComponentPlayground.
- Reduced motion is respected by animated components.
- Icon-only controls have accessible labels.

### Slice 6: ComponentPlayground Redesign

Goal: make ComponentPlayground the visual QA source.

Tasks:

- Add sections for typography, surfaces, buttons, icon buttons, chips, word
  chips, inputs, progress, feedback states, empty/loading/error states, haptics,
  and reduced motion.
- Keep screen-specific logic in
  `src/screens/ComponentPlayground/hooks/useComponentPlaygroundViewModel.ts`.

Exit:

- Design system can be reviewed from one screen.

### Slice 7: Home Polish

Goal: make Home feel like a calm learning dashboard.

Expected files:

- `src/screens/Home/components/DailyPracticeHeroCard.tsx`
- `src/screens/Home/components/QuickStatGrid.tsx`
- `src/screens/Home/components/TeacherTipCard.tsx`
- `src/screens/Home/components/ContinueLearningCard.tsx`
- `src/screens/Home/hooks/useHomeViewModel.ts`
- `src/screens/Home/types/HomeTypes.ts`

Tasks:

- Add hero practice card and primary CTA.
- Add quick stat grid.
- Add teacher tip and continue learning sections.
- Add icons and progress animation.

Exit:

- Home has one obvious next action and looks polished in light/dark mode.

### Slice 8: Practice Polish

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
- Add scrambled-word beginner mode.
- Animate word chip selection.
- Add checking state.
- Reveal feedback with teacher-like correction treatment.
- Add accessible state announcements.
- Add haptics for submit, result, save, and skip.

Exit:

- Home -> Practice -> Check answer -> Feedback -> Save -> Continue feels
  premium and remains keyboard-safe on iOS and Android.

### Slice 9: Review Polish

Goal: make Review feel like an intentional study area.

Tasks:

- Add review summary card.
- Add icon-driven deck cards.
- Add queue preview and due states.
- Improve empty/error states.
- Add press and haptic feedback.

Exit:

- Review clearly tells the user what to practice next.

### Slice 10: Library Polish

Goal: make saved content feel like a personal learning notebook.

Tasks:

- Add segmented control for Words, Sentences, History.
- Improve saved word, sentence, and history cards.
- Add mastery chips and mistake badges.
- Improve empty states.

Exit:

- Library content feels organized and useful without adding complex new filters.

### Slice 11: Progress Polish

Goal: make progress feel motivating without heavy analytics.

Tasks:

- Add hero progress card.
- Add stat grid.
- Add mistake breakdown bars.
- Add weekly activity row.
- Add recommendation card.
- Animate progress bars with reduced-motion fallback.

Exit:

- Progress gives a clear sense of improvement using native views, not charts.

### Slice 12: Native Polish And GlassSurface Spike

Goal: platform-specific polish without Android pretending to be iOS.

Tasks:

- Finalize `GlassSurface` fallback.
- Use iOS glass-like fallback only on compact controls.
- Use Android tonal/elevated fallback.
- Run an iOS-only Liquid Glass dependency spike if still wanted.

Exit:

- No readability regressions.
- Android does not look like an iOS clone.

### Slice 13: Accessibility And Reduced Motion Pass

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

### Slice 14: Final QA And Evidence

Goal: close the phase with verified evidence.

Tasks:

- Run `yarn typecheck`.
- Run `yarn lint`.
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
6. `feat: add shared visual components`
7. `feat: redesign component playground`
8. `feat: polish home screen`
9. `feat: polish practice screen interactions`
10. `feat: polish review screen`
11. `feat: polish library screen`
12. `feat: polish progress screen`
13. `feat: add platform visual polish`
14. `fix: improve accessibility and reduced motion handling`
15. `docs: add visual polish QA evidence`

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
