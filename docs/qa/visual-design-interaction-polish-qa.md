# Visual Design & Interaction Polish QA

Status: partial. Slices 1-11 are implemented and verified. The next visual
polish work starts with Slice 12, Library Polish.

Use this checklist when implementing and closing the Visual Design &
Interaction Polish phase.

## Slice 1 Evidence

Date: 2026-06-17

Scope:

- Implemented the Scribe Blue theme tokens in `src/theme`.
- Wired light and dark theme variants through React Native Unistyles.
- Migrated current common primitives and touched screens away from the older
  nested theme token shape.
- Added an app-level Unistyles theme sync hook for OS color-scheme changes.

Automated checks:

- `npm run typecheck`
- `npm run lint`
- `npm run format:check`
- `npm run lint`
- `npm run format:check`

Android QA:

- Device: `Medium Phone API 36.1`
- App id: `com.luisgarcia.correcta`
- Build type: Expo Dev Client debug build
- Light mode: Home, Practice, Review, Progress, and Library were navigated by
  coordinate fallback because the Android accessibility snapshot returned an
  empty filtered tree.
- Dark mode: Android appearance was switched to dark, the dev client was
  relaunched from the Correcta project URL, and Home, Practice, and Library
  were visually verified.
- Live theme switching: Android appearance was toggled from light to dark and
  back to light while the app was running; root and screen backgrounds stayed
  consistent after the screen/root background sync patch.
- Clean final log window showed no current React Native render errors after
  the fixed dark-mode launch.

Local screenshot evidence from this QA pass:

- `/tmp/correcta-fresh-flat-theme.png`
- `/tmp/correcta-practice-light.png`
- `/tmp/correcta-review-light.png`
- `/tmp/correcta-progress-light.png`
- `/tmp/correcta-library-light.png`
- `/tmp/correcta-dark-after-relaunch.png`
- `/tmp/correcta-practice-dark.png`
- `/tmp/correcta-library-dark-final.png`
- `/tmp/correcta-dark-clean-final.png`
- `/tmp/correcta-light-live-fixed.png`
- `/tmp/correcta-dark-live-fixed.png`
- `/tmp/correcta-light-roundtrip-fixed.png`
- `/tmp/correcta-scribe-blue-ios-home.png`
- `/tmp/correcta-scribe-blue-android-home-2.png`

## Slice 2 Evidence

Date: 2026-06-17

Scope:

- Installed `lucide-react-native`, `react-native-svg`, and
  `react-native-pulsar`.
- Added the app haptics wrapper under `src/native/haptics`.
- Added the shared semantic icon registry and `Icon` wrapper under
  `src/components/common/Icon`.
- Added `IconButton` under `src/components/common/IconButton`.
- Added ComponentPlayground icon, IconButton, and haptic examples.
- Routed basic Practice haptics through the wrapper for selection changes,
  answer feedback results, app-level answer-check failures, and save
  confirmations.
- Updated active visual-design docs from `expo-haptics` to
  `react-native-pulsar`.
- Ignored local `.agent-device/` runtime state so project format checks do not
  include daemon metadata.

Automated checks:

- `npm run typecheck`
- `npm run lint`
- `npm run format:check`
- Metro Android bundle probe after restarting with clean cache:
  `curl -s -o /tmp/correcta-android-bundle.out -w "%{http_code} %{size_download}\n" "http://127.0.0.1:8081/index.ts.bundle?platform=android&dev=true&minify=false"`
  returned `200`.

iOS QA:

- Command: `npx expo run:ios --no-bundler`
- Result: build, install, and dev-client launch succeeded.
- Device: `iPhone 17`
- App id: `com.luisgarcia.correcta`
- Runtime path: reload clean Metro bundle -> Home -> Open component check.
- Visual result: ComponentPlayground rendered iconography, IconButton, and
  haptic sections.
- React Native accessibility result: icon-only buttons exposed labels such as
  "Open settings example", "Saved example selected", and "Play success haptic
  example"; selected state was exposed for the selected saved example.
- Haptics result: tapped "Play success haptic example"; the app stayed
  responsive and did not crash.
- Tool note: `agent-device` could relaunch the iOS app, but its iOS snapshot
  runner was locked by another daemon. This pass used the Simulator UI through
  Computer Use and `xcrun simctl io` for screenshot evidence.
- Runtime path: Home -> Start Practice -> type answer -> Submit answer ->
  Feedback.
- Result: feedback rendered after the Pulsar-backed result haptic call.

Android QA:

- Command: `npx expo run:android --no-bundler`
- Result: build, install, and dev-client launch succeeded.
- Device: `Medium Phone API 36.1`
- App id: `com.luisgarcia.correcta`
- Runtime path: dev launcher -> `Correcta, http://10.0.2.2:8081` -> Home ->
  Open component check.
- Visual result: ComponentPlayground rendered iconography, IconButton, and
  haptic sections.
- Haptics result: tapped the success haptic example; the app stayed responsive
  and did not crash.
- Tool note: Android filtered accessibility snapshots were sparse after app
  load, so this pass used raw coordinates and screenshots for visual evidence.
- Metro note: the first reload after installing Lucide/SVG hit a stale Metro
  file-map resolver error for `lucide-react-native`. Restarting Metro with
  `npx expo start --dev-client --clear --port 8081` fixed the bundle.
- Runtime path: Home -> Start Practice -> Skip -> Feedback.
- Result: feedback rendered after the Pulsar-backed skipped-result haptic
  call.
- Android filtered accessibility snapshots remained sparse in both the Practice
  and ComponentPlayground checks, so this pass used raw device coordinates and
  screenshots for navigation evidence.

Local screenshot evidence from this QA pass:

- `/tmp/correcta-pulsar-android-home.png`
- `/tmp/correcta-pulsar-android-practice-final.png`
- `/tmp/correcta-pulsar-android-feedback.png`
- `/tmp/correcta-slice2-android-error.png`
- `/tmp/correcta-slice2-android-home.png`
- `/tmp/correcta-slice2-android-component-playground-top.png`
- `/tmp/correcta-slice2-android-component-playground-haptics.png`
- `/tmp/correcta-slice2-android-haptic-post-tap.png`
- `/tmp/correcta-slice2-ios-component-playground.png`

## Slice 3 Evidence

Date: 2026-06-18

Scope:

- Added exported type files for AppText, Button, Screen, Surface, and
  TextInput.
- Upgraded AppText with the full semantic tone set used by the design system.
- Upgraded Button with primary, secondary, tertiary, ghost, danger, and success
  variants; small, medium, and large sizes; leading/trailing icons; loading
  state; disabled state; press state; and Android ripple color.
- Upgraded Screen with typed background and safe-area variants while preserving
  the existing `edges` escape hatch.
- Upgraded Surface with flat, card, elevated, tonal, inverse, success, warning,
  danger, and info variants plus correction rail support.
- Upgraded TextInput with label, helper, focused, error, success, disabled,
  leading icon, and trailing icon states.
- Added ComponentPlayground sections for typography, buttons, inputs, and
  surfaces.
- Added the `lock` semantic icon registry entry for disabled input examples.

Automated checks:

- `npm run typecheck`
- `npm run lint`
- `npm run format:check`

iOS QA:

- Device: `iPhone 17` simulator.
- Build type: Expo Dev Client debug build.
- Metro command: `npx expo start --dev-client --clear --port 8081 --offline`.
- Runtime path: development build launcher ->
  `Correcta, http://192.168.68.100:8081` -> Home -> Open component check.
- Visual result: ComponentPlayground rendered Typography, Buttons, Inputs, and
  Surfaces sections.
- React Native accessibility result: the loading button exposed disabled and
  busy state; the disabled input exposed disabled state; helper, success, and
  error text were present near the fields.
- Screenshot: `/tmp/correcta-slice3-ios-component-playground.png`.

Android QA:

- Not run in this slice because `agent-device apps --platform android` returned
  `DEVICE_NOT_FOUND`.

Known follow-ups:

- Android runtime visual QA for the upgraded primitive examples still belongs
  in a device pass before closing the full visual polish phase.
- Slice 4 will add the missing shared primitives such as chips, stat cards,
  progress bars, segmented controls, and feedback highlights.
- Slice 4 will add the missing shared primitives such as chips, stat cards,
  progress bars, segmented controls, and feedback highlights.

## General

- App launches successfully.
- Main tabs still work.
- Existing MVP flow still works:
  Home -> Practice -> Check answer -> Feedback -> Save -> Review/Progress/Library.
- No service logic moved into UI components.
- No network requests added to UI components.
- No DOM, browser APIs, CSS files, selectors, web units, media queries, or
  `className` usage added.
- Shared UI lives in `src/components/common`.
- Screen-specific hooks, types, and utils follow the project folder rules.
- Files stay around the 300-line target unless there is a clear reason.
- Light mode looks intentional.
- Dark mode looks intentional.

## Slice 5-7 Evidence

Recorded before starting Home polish.

Current pass, 2026-06-20:

- Source audit passed for the shared `Card` linked-surface family, supporting
  shared visual components, and ComponentPlayground route ownership.
- `Card.Item` keeps linked-surface geometry stable by avoiding independent scale
  transforms inside the group.
- `PocCard` is treated as internal/experimental and is not exported from the
  public common-component barrel.
- `npm run typecheck`, `npm run lint`, and `npm run format:check` pass.
- iOS simulator launch and Home -> Open component check route pass on
  `iPhone 17`.
- iOS screenshots: `/tmp/correcta-slice5-7-ios-launch.png` and
  `/tmp/correcta-slice5-7-ios-component-check-top.png`.
- Android emulator `Medium_Phone_API_36.1` was rebuilt with
  `npm run android -- --no-bundler` after the stale dev client failed with
  `Cannot find native module 'ExpoUI'`.
- Android Home, ComponentPlayground top, fixed input examples, and linked-card
  examples rendered after rebuild.
- Android screenshots:
  `/tmp/correcta-slice5-7-android-after-rebuild.png`,
  `/tmp/correcta-slice5-7-android-component-check-top.png`,
  `/tmp/correcta-slice5-7-android-component-check-mid-fixed.png`, and
  `/tmp/correcta-slice5-7-android-component-check-linked-card.png`.

- `Card` linked-surface examples render in ComponentPlayground.
- Vertical linked surfaces preserve visible canvas cut-ins.
- Horizontal linked surfaces keep paired items equal-height.
- Bridges and cut-ins do not receive touch, focus, haptics, or accessibility.
- `Card` and `PocCard` responsibilities are documented before broad feature
  usage.
- Supporting components render in ComponentPlayground: `Chip`, `WordChip`,
  `ProgressBar`, `SegmentedControl`, `StatCard`, `ResultBadge`,
  `FeedbackHighlight`, `EmptyState`, `LoadingState`, and `ErrorState`.
- ComponentPlayground is reviewed as the shared visual acceptance gate.
- `npm run typecheck`, `npm run lint`, and `npm run format:check` pass.
- iOS and Android ComponentPlayground screenshots are captured.
- The app shell still launches after the shared-component checkpoint on iOS and
  Android.
- Text is readable on every surface.
- Empty states, loading states, disabled states, and error states are explicit.
- Icon-only controls have accessible names.
- Dynamic lists use stable non-index keys.

## Design System

- `docs/design-system.md` is implemented as the source of truth.
- `Scribe Blue` is the active planned theme.
- Theme tokens exist for colors, spacing, radius, typography, shadow/elevation,
  and motion.
- Light and dark semantic color tokens match `docs/design-system.md`.
- Spacing, radius, typography, motion, and elevation tokens match
  `docs/design-system.md`.
- Screens avoid raw colors where touched.
- AppText variants match the typography system.
- Button variants cover primary, secondary, tertiary, ghost, danger, and
  success.
- Surface variants cover flat, card, elevated, tonal, inverse, and status
  surfaces.
- TextInput supports focus, helper, error, success, disabled, and icon states.
- Icon registry is used instead of direct screen imports from the icon library.
- Haptics are routed through `src/native/haptics`.
- Reduced motion is available through a shared hook.

## ComponentPlayground

- Typography section exists.
- Surface section exists.
- Button section exists.
- Icon button section exists.
- Chip section exists.
- Word chip section exists.
- Text input section exists.
- Progress section exists.
- Feedback states section exists.
- Empty/loading/error states section exists.
- Haptics test actions exist.
- Reduced motion status is visible or testable.
- Light and dark examples are available if theme switching is supported.

## Practice Flow

Typing mode:

- User can type an answer.
- Keyboard does not cover the input.
- Submit button reads "Check answer".
- Check answer is disabled when answer is empty.
- Check answer is enabled when answer exists.
- Checking state appears after submit.
- Feedback appears after checking.
- Save word works.
- Save sentence works.
- Continue works.
- Practice history updates.

Scrambled words mode:

- Word bank renders.
- Tapping a word selects it.
- Tapping a selected word removes it.
- Clear action resets selected words.
- Disabled selected words cannot be selected again from the bank.
- Submit validates the selected answer.
- Word chips have accessible names and selected/disabled states.
- Animations do not cause layout jumps.
- Reduced motion disables spatial chip movement.

Feedback:

- Correct state looks positive.
- Almost-correct state looks educational, not punitive.
- Incorrect state is clear but not harsh.
- Feedback uses "Needs work" for normal incorrect learning results.
- Mistakes are visible without relying only on color.
- Correct answer is readable.
- Explanation is readable.
- Accepted alternatives are readable.
- Save actions appear after feedback content.
- Continue action is visually primary after feedback.

## Home

- Screen has one clear primary next action.
- Daily practice hero card is visually dominant but not oversized.
- Quick stats are scannable.
- Review queue and difficult words are visible when data exists.
- Empty/new-user state explains how to start.
- Progress animation runs once and does not loop.
- Header actions have accessible labels.

## Review

- Review summary card explains what is due.
- Deck cards include icons, labels, counts, and due status.
- Active review card appears before the deck list when due cards exist.
- Revealed answer exposes Known, Unsure, and Difficult grading controls without
  hiding the primary actions behind the tab bar.
- Empty state explains how saved words and mistakes create review content.
- Press feedback feels responsive.
- Haptics are not excessive.
- Review completion state is clear.

## Slice 10 Evidence

Recorded before starting Progress polish.

Current pass, 2026-06-20:

- `ReviewScreen` uses `useReviewViewModel` and screen-owned Review components.
- Summary metrics, active card, queue preview, deck cards, empty state, error
  state, reveal feedback, and grade feedback are implemented.
- `npm run typecheck`, `npm run lint`, and `npm run format:check` pass.
- Metro status probe returned `packager-status:running`.
- iOS simulator launch passed on `iPhone 17` for app id
  `com.luisgarcia.correcta`.
- iOS screenshots:
  `/tmp/correcta-slice10-ios-review.png` and
  `/tmp/correcta-slice10-ios-review-revealed.png`.

## Library

- Segmented control is accessible and exposes selected state.
- Words, Sentences, and History views are visually distinct but consistent.
- Saved word cards show mastery or review state.
- Saved sentence cards show source and translation clearly.
- History cards show result state and timestamp.
- Empty states are specific to each segment.
- Long lists remain usable.

## Progress

- Progress hero card summarizes improvement clearly.
- Stat cards use tabular numbers.
- Progress bars expose accessible values.
- Weekly activity is readable in light and dark mode.
- Mistake breakdown does not rely only on color.
- Recommendation card points to the next useful learning action.
- Status and integration controls stay visually separate from learning
  progress.
- No charting library is required.

## Slice 11 Evidence

Recorded before starting Library polish.

Current pass, 2026-06-20:

- `ProgressScreen` uses screen-owned Progress components and local derived view
  records from `progressUtils`.
- Hero progress, linked metric pairs, weekly activity, mistake breakdown,
  achievements, recommendation, and status sections are implemented.
- `npm run typecheck`, `npm run lint`, and `npm run format:check` pass.
- Metro status probe returned `packager-status:running`.
- iOS simulator launch passed on `iPhone 17` for app id
  `com.luisgarcia.correcta`.
- `agent-device` iOS snapshots verified the Progress scroll area from top
  metrics through recommendation/status controls.
- iOS screenshots:
  `/tmp/correcta-slice11-ios-progress-top.png`,
  `/tmp/correcta-slice11-ios-progress-mid.png`,
  `/tmp/correcta-slice11-ios-progress-achievements.png`, and
  `/tmp/correcta-slice11-ios-progress-status.png`.

## iOS QA

- Native bottom tabs look correct.
- Safe areas are respected.
- Keyboard does not cover Practice input.
- Practice screen does not jump awkwardly when keyboard opens or closes.
- Press animations feel responsive.
- Haptics are subtle and not excessive.
- Reduced motion setting is respected.
- Large text does not clip cards.
- VoiceOver reads icon-only buttons correctly.
- Important feedback result is announced when useful.
- Glass surfaces, if enabled, do not reduce readability.
- Dark mode surfaces are separated clearly.

## Android QA

- Native bottom tabs look correct.
- Back behavior still works.
- Keyboard checkmark path still works.
- Keyboard dismissal still works.
- Android ripple appears where appropriate.
- Touch targets feel large enough.
- Practice input remains usable with keyboard open.
- TalkBack reads icon-only buttons correctly.
- Reduced motion setting is respected.
- Dark mode is readable.
- Tonal/elevated surfaces look intentional.
- No fake iOS glass treatment dominates Android.
- Progress bars and chips are readable.
- Coordinate/screenshot QA remains possible if the accessibility tree is sparse.

## Accessibility

- Icon-only controls have `accessibilityLabel`.
- Buttons expose disabled/loading state where applicable.
- Segmented controls expose selected state.
- Word chips expose selected and disabled state.
- Progress bars expose current values.
- Touch targets are at least 44 by 44, with 48 by 48 preferred on Android.
- Important text wraps instead of clipping.
- Feedback is not communicated by color alone.
- State announcements are used only for meaningful changes:
    - "Checking answer."
    - "Almost correct. Two issues found."
    - "Sentence saved."
    - "Review completed."
    - "Validation mode set to strict."

## Performance

- No noticeable typing lag in Practice.
- No slow tab switching.
- No long animation jank in the main flow.
- Long Library/History lists remain usable.
- Reduced motion simplifies animations.
- Release builds feel at least as smooth as debug builds.

## Verification Commands

Inspect `package.json` and use project scripts:

- `npm run typecheck`
- `npm run lint`
- `npm run format:check`
- `npm run ios`
- `npm run android`

Current known scripts:

- `npm run typecheck`
- `npm run lint`
- `npm run format:check`
- `npm run android`
- `npm run ios`

## QA Evidence To Record

Create `docs/qa/visual-design-interaction-polish-results.md` after
implementation with:

- Device/simulator names.
- OS versions.
- Build type: debug or release.
- Commands run.
- Screens tested.
- Screenshots captured.
- Known issues.
- Pass/fail result for iOS.
- Pass/fail result for Android.
