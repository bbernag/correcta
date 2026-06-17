# Correcta Native Design System

Status: token system implemented; component and screen polish remains planned
for the Visual Design & Interaction Polish phase.

This document defines the target design system for Correcta before screen
implementation begins. It is intentionally specific so screen work can be built
against shared native UI decisions instead of ad hoc styling.

## Design Thesis

Correcta should feel like a quiet native study desk: precise, calm, tactile,
and trustworthy, with feedback that feels like careful teacher markup rather
than game scoring.

Theme name: **Correction Desk**.

The theme should feel like a calm native study workspace where mistakes are
marked clearly, professionally, and without visual noise.

## Product Personality

Correcta is serious, focused, clear, and encouraging. It should not feel
childish, neon, cartoon-like, over-gamified, or like a web page inside a phone.

The strongest visual signature is the **correction rail**: a restrained status
rail used on feedback surfaces, review cards, and mistake summaries. The rail
borrows from annotated study material: it gives the learner a quick signal
without making mistakes feel punitive.

## Hard Constraints

- Use React Native primitives or project-approved native components.
- Do not use DOM elements, browser APIs, CSS files, selectors, media queries,
  web units, or web-only styling conventions.
- Do not use `className`.
- Shared UI belongs in `src/components/common`.
- Platform and native behavior belongs behind `src/native` or a service.
- Components do not build network requests or own storage workflows.
- Theme values should come from `src/theme`; avoid raw colors in screens.
- Prefer named exports, function declarations, and `type` over `interface`.

## Visual Identity

Use a restrained cool-neutral system with teal as the primary correction accent.
The palette should feel modern and focused without becoming one-note teal. Pro
Extended recommended keeping this direction, with muted teal in light mode and
a more luminous but non-neon teal in dark mode.

### Light Theme Colors

| Token                   | Hex         | Use                                    |
| ----------------------- | ----------- | -------------------------------------- |
| `background.primary`    | `#F5F7F8`   | Main screen background                 |
| `background.secondary`  | `#ECEFF1`   | Quiet grouped background               |
| `surface.primary`       | `#FFFFFF`   | Main cards and inputs                  |
| `surface.elevated`      | `#FBFCFC`   | Raised cards                           |
| `surface.tonal`         | `#E7F0EE`   | Android tonal surfaces, selected tabs  |
| `surface.inverse`       | `#11181B`   | Inverse badges and high-emphasis pills |
| `surface.glassFallback` | `#FFFFFFD9` | iOS glass fallback surface             |
| `text.primary`          | `#11181B`   | Primary readable text                  |
| `text.secondary`        | `#405056`   | Supporting text                        |
| `text.muted`            | `#6D7A7F`   | Captions and low-emphasis labels       |
| `text.inverse`          | `#F7FAFA`   | Text on inverse surfaces               |
| `border.subtle`         | `#D9E1E4`   | Card and input borders                 |
| `border.strong`         | `#AAB8BE`   | Focus-adjacent separators              |
| `accent.primary`        | `#0F766E`   | Primary actions and active tabs        |
| `accent.primaryStrong`  | `#0B5F59`   | Pressed primary action                 |
| `accent.primarySoft`    | `#D7F0EC`   | Accent background                      |
| `accent.secondary`      | `#315C7C`   | Secondary data highlight only          |
| `feedback.success`      | `#15803D`   | Correct results                        |
| `feedback.successSoft`  | `#DFF5E7`   | Correct background                     |
| `feedback.warning`      | `#A15C07`   | Almost-correct and caution             |
| `feedback.warningSoft`  | `#FFF2D6`   | Warning background                     |
| `feedback.danger`       | `#B42318`   | App errors and critical mistakes       |
| `feedback.dangerSoft`   | `#FDE7E5`   | Error background                       |
| `feedback.info`         | `#2D6A8E`   | Hints, explanations                    |
| `feedback.infoSoft`     | `#E2F1F8`   | Informational background               |
| `focus.ring`            | `#12A594`   | Input focus and selected controls      |
| `shadow.tint`           | `#0B1F24`   | Shadow tint                            |

### Dark Theme Colors

| Token                   | Hex         | Use                               |
| ----------------------- | ----------- | --------------------------------- |
| `background.primary`    | `#0E1315`   | Main dark background              |
| `background.secondary`  | `#121A1D`   | Grouped dark background           |
| `surface.primary`       | `#171F22`   | Main cards and inputs             |
| `surface.elevated`      | `#1D282C`   | Raised cards                      |
| `surface.tonal`         | `#18302F`   | Android tonal selected surfaces   |
| `surface.inverse`       | `#F5F7F8`   | Inverse badges                    |
| `surface.glassFallback` | `#182125D9` | iOS glass fallback surface        |
| `text.primary`          | `#F4F8F8`   | Primary readable text             |
| `text.secondary`        | `#C4D0D3`   | Supporting text                   |
| `text.muted`            | `#8C9A9F`   | Captions and low-emphasis labels  |
| `text.inverse`          | `#11181B`   | Text on inverse surfaces          |
| `border.subtle`         | `#2A383D`   | Card and input borders            |
| `border.strong`         | `#43565C`   | Focus-adjacent separators         |
| `accent.primary`        | `#41C7BA`   | Primary actions and active tabs   |
| `accent.primaryStrong`  | `#7DE2D8`   | High-emphasis accent text         |
| `accent.primarySoft`    | `#173D3A`   | Accent background                 |
| `accent.secondary`      | `#9FB7D1`   | Secondary data highlight only     |
| `feedback.success`      | `#5FD28A`   | Correct results                   |
| `feedback.successSoft`  | `#183A27`   | Correct background                |
| `feedback.warning`      | `#F2B84B`   | Almost-correct and caution        |
| `feedback.warningSoft`  | `#3D2E16`   | Warning background                |
| `feedback.danger`       | `#FF7A70`   | App errors and critical mistakes  |
| `feedback.dangerSoft`   | `#3F1F1D`   | Error background                  |
| `feedback.info`         | `#73B7FF`   | Hints, explanations               |
| `feedback.infoSoft`     | `#172E42`   | Informational background          |
| `focus.ring`            | `#5ADFD3`   | Input focus and selected controls |
| `shadow.tint`           | `#000000`   | Shadow tint                       |

## Typography

Use system fonts first:

- iOS: system San Francisco through React Native defaults.
- Android: system Roboto through React Native defaults.
- Do not add a custom font in this phase unless native builds and text
  rendering need it after visual QA.

### Text Roles

All typography should be exposed through `AppText` variants.

| Role         | Size | Line height | Weight | Use                                |
| ------------ | ---: | ----------: | ------ | ---------------------------------- |
| `display`    |   34 |          40 | 700    | Home hero, major completion states |
| `titleLarge` |   28 |          34 | 700    | Screen-level feature titles        |
| `title`      |   22 |          28 | 700    | Card titles, major sections        |
| `subtitle`   |   17 |          24 | 600    | Screen subtitles, card summaries   |
| `sentence`   |   24 |          34 | 600    | Source sentence in Practice        |
| `answer`     |   18 |          26 | 500    | User answer and corrected answer   |
| `body`       |   16 |          24 | 400    | Primary reading text               |
| `bodyStrong` |   16 |          24 | 600    | Inline emphasis                    |
| `bodySmall`  |   14 |          20 | 400    | Secondary explanations             |
| `label`      |   13 |          18 | 600    | Chips, tabs, compact labels        |
| `caption`    |   12 |          16 | 500    | Metadata and timestamps            |
| `button`     |   16 |          20 | 700    | Button labels                      |
| `metric`     |   30 |          36 | 700    | Key stat values                    |

Dynamic type rules:

- Never use fixed-height containers for sentence, feedback, or error text.
- Let important text wrap; do not truncate learning content by default.
- Use `numberOfLines` only for metadata, labels, or card previews.
- Use tabular numeric variants for streaks, counts, progress values, and
  percentages.
- Keep captions secondary. Do not put critical information only in caption text.

## Spacing

Use a small token scale. Values are React Native numbers.

| Token                      | Value | Use                              |
| -------------------------- | ----: | -------------------------------- |
| `spacing.none`             |     0 | Resets                           |
| `spacing.xxs`              |     2 | Tiny separators                  |
| `spacing.xs`               |     4 | Icon/text micro gap              |
| `spacing.sm`               |     6 | Dense chip padding               |
| `spacing.md`               |     8 | Compact internal spacing         |
| `spacing.lg`               |    12 | Control padding                  |
| `spacing.xl`               |    16 | Standard card padding            |
| `spacing.2xl`              |    20 | Large card padding               |
| `spacing.3xl`              |    24 | Screen section gap               |
| `spacing.4xl`              |    32 | Major screen rhythm              |
| `spacing.5xl`              |    40 | Hero spacing                     |
| `spacing.6xl`              |    48 | Empty state spacing              |
| `spacing.7xl`              |    64 | Rare large vertical gap          |
| `spacing.screenHorizontal` |    20 | Default screen side padding      |
| `spacing.screenVertical`   |    16 | Default screen top/bottom rhythm |
| `spacing.cardPadding`      |    16 | Standard card padding            |
| `spacing.cardGap`          |    12 | Gap inside grouped cards         |
| `spacing.sectionGap`       |    24 | Gap between screen sections      |
| `spacing.controlGap`       |     8 | Gap between controls             |

Layout rules:

- Screen horizontal padding defaults to `spacing.screenHorizontal`.
- Card internal padding defaults to `spacing.cardPadding`.
- Dense cards may use `spacing.lg`.
- Section gap defaults to `spacing.sectionGap`.
- Icon and label gap should use `spacing.xs` or `spacing.sm`.
- Do not use viewport-driven font scaling.

## Radius

Cards should stay restrained. Controls can be rounder when it communicates
touchability.

| Token           | Value | Use                         |
| --------------- | ----: | --------------------------- |
| `radius.none`   |     0 | Flush sections              |
| `radius.xs`     |     6 | Small badges                |
| `radius.sm`     |    10 | Small cards and controls    |
| `radius.md`     |    14 | Cards and surfaces          |
| `radius.lg`     |    18 | Buttons and text inputs     |
| `radius.xl`     |    22 | Elevated cards              |
| `radius.2xl`    |    28 | Sheets                      |
| `radius.3xl`    |    34 | Large overlays              |
| `radius.card`   |    22 | Primary card shape          |
| `radius.input`  |    18 | Text inputs                 |
| `radius.button` |    16 | Buttons                     |
| `radius.chip`   |   999 | Chips                       |
| `radius.pill`   |   999 | Pills and circular controls |
| `radius.sheet`  |    28 | Sheets                      |
| `radius.modal`  |    30 | Modal-style overlays        |

Use continuous corner behavior where the platform supports it. Cards may be
softer than the earlier 8px draft, but rounded shapes must still communicate a
native learning workspace rather than a playful bubble UI.

## Elevation And Surface Hierarchy

Surface hierarchy:

1. `background.primary`: screen base.
2. `surface.primary`: normal cards and inputs.
3. `surface.elevated`: important cards and floating controls.
4. `surface.tonal`: selected or Android-native elevated treatment.
5. `surface.inverse`: rare high-emphasis badges.

iOS:

- Use subtle shadow tokens for elevated surfaces.
- Use opacity and shadow sparingly. The app should not look like stacked cards.
- Use glass fallback only on compact controls, not reading surfaces.

| Token                  | Shadow color  | Opacity | Radius | Offset                   | Use                               |
| ---------------------- | ------------- | ------: | -----: | ------------------------ | --------------------------------- |
| `elevation.ios.level0` | `shadow.tint` |       0 |      0 | `{width: 0, height: 0}`  | Flat surfaces                     |
| `elevation.ios.level1` | `shadow.tint` |    0.06 |      8 | `{width: 0, height: 2}`  | Normal cards                      |
| `elevation.ios.level2` | `shadow.tint` |    0.08 |     14 | `{width: 0, height: 6}`  | Elevated cards, inputs            |
| `elevation.ios.level3` | `shadow.tint` |     0.1 |     22 | `{width: 0, height: 12}` | Floating controls, feedback panel |
| `elevation.ios.level4` | `shadow.tint` |    0.14 |     32 | `{width: 0, height: 18}` | Modals, session summary overlays  |

Android:

- Prefer tonal/elevated surfaces over iOS-style translucency.
- Use Android ripple on pressable surfaces where supported.
- Keep selected surfaces visibly contained.
- Do not fake iOS glass.
- Do not use heavy shadows.

| Token                      | Elevation | Surface treatment                         | Use                               |
| -------------------------- | --------: | ----------------------------------------- | --------------------------------- |
| `elevation.android.level0` |         0 | `surface.primary` or `background.primary` | Flat surfaces                     |
| `elevation.android.level1` |         1 | `surface.primary`                         | Normal cards                      |
| `elevation.android.level2` |         3 | `surface.elevated`                        | Elevated cards, inputs            |
| `elevation.android.level3` |         6 | `surface.elevated` with stronger border   | Floating controls, feedback panel |
| `elevation.android.level4` |         8 | `surface.elevated` with overlay treatment | Modals, session summary overlays  |

## Iconography

Recommended dependencies:

- `lucide-react-native`
- `react-native-svg`

Rules:

- Screens must not import icons directly. Use `src/components/common/Icon`.
- Register icons in `src/components/common/Icon/iconRegistry.ts`.
- Use stroke width `2`.
- Use rounded line caps and joins.
- Default icon size is `20`.
- Dense icon size is `16`.
- Tab icon size is `22`.
- Hero/stat icon size is `24`.
- Empty state icon size is `32`.
- Do not use icons where a clear text label is better.

Recommended semantic registry names:

| Name       | Suggested icon      | Use                  |
| ---------- | ------------------- | -------------------- |
| `home`     | Home                | Home tab             |
| `practice` | PencilLine          | Practice tab and CTA |
| `review`   | Repeat2             | Review tab           |
| `library`  | BookOpen            | Library tab          |
| `progress` | ChartNoAxesCombined | Progress tab         |
| `settings` | Settings            | Header action        |
| `save`     | Bookmark            | Save word/sentence   |
| `saved`    | BookmarkCheck       | Saved state          |
| `skip`     | SkipForward         | Skip sentence        |
| `hint`     | Lightbulb           | Hint                 |
| `check`    | Check               | Correct/submit       |
| `close`    | X                   | Clear/dismiss        |
| `clear`    | RotateCcw           | Clear selected words |
| `warning`  | TriangleAlert       | Warning feedback     |
| `error`    | CircleX             | App error            |
| `success`  | CircleCheck         | Correct result       |
| `info`     | Info                | Explanation          |
| `word`     | WholeWord           | Saved word           |
| `sentence` | MessageSquareText   | Saved sentence       |
| `mistake`  | Highlighter         | Mistake notebook     |
| `streak`   | Flame               | Streak               |
| `goal`     | Target              | Daily goal           |
| `accuracy` | Gauge               | Accuracy             |
| `time`     | Clock               | Practice time        |

Icon-only controls require an `accessibilityLabel`, role, state when applicable,
and at least a 44 by 44 touch target.

## OS-Native Direction

| Area            | iOS                                                                   | Android                                                              |
| --------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Navigation      | Native bottom tabs, soft active accent, optional translucent fallback | Native bottom tabs, tonal active item, stronger selected containment |
| Headers         | Spacious, quiet, large-title feeling when useful                      | Compact, clear, top-aligned hierarchy                                |
| Cards           | White/elevated surfaces with subtle shadow                            | Tonal elevated surfaces with clear boundaries                        |
| Inputs          | Soft focus ring, gentle surface change                                | Stronger outline/fill contrast, keyboard-safe spacing                |
| Press feedback  | Scale/opacity plus subtle haptic                                      | Ripple plus subtle scale only when helpful                           |
| Haptics         | Selection/success/warning on meaningful actions                       | Use if supported; never depend on haptics for feedback               |
| Sheets/overlays | May use glass fallback for compact controls                           | Use tonal elevated surface, no glass imitation                       |
| Dark mode       | Deep cool surfaces with soft contrast                                 | Similar tokens, stronger containment and ripple visibility           |
| Keyboard        | Preserve input visibility and submit flow                             | Preserve keyboard checkmark and dismissal behavior                   |

## Liquid Glass Decision

Do not make a Liquid Glass dependency required for this phase.

Build `GlassSurface` first with a safe fallback:

- iOS fallback: `surface.glassFallback`, subtle border, mild shadow, optional
  backdrop-like opacity only on compact controls.
- Android fallback: `surface.tonal` or `surface.elevated`, clear border, ripple
  on interactive controls.

Liquid Glass may apply only after a separate iOS build spike proves
compatibility. Even then, it is allowed only for:

- Bottom tab background.
- Floating Practice action bar.
- Validation mode chip/menu.
- Small header action surfaces.
- Session summary overlay.
- Compact floating controls.

Liquid Glass must not be used behind:

- Main sentence text.
- Translation input.
- Feedback explanations.
- Mistake details.
- Long list cards.
- Progress labels.
- Any text-heavy content.

Reason: learning content must stay readable before it is decorative.

## Component Specs

### AppText

Files:

- `src/components/common/AppText/AppText.tsx`
- `src/components/common/AppText/AppTextTypes.ts`
- `src/components/common/AppText/index.ts`

Variants: all typography roles in this document.

Requirements:

- Theme-driven size, line height, weight, and color.
- Semantic color prop, defaulting to `text.primary`.
- Support `numberOfLines`, selectable text, and accessibility props.
- Use dynamic type behavior where React Native supports it.
- Do not hard-code raw colors in consumers.

### Button

Files:

- `src/components/common/Button/Button.tsx`
- `src/components/common/Button/ButtonTypes.ts`
- `src/components/common/Button/index.ts`

Variants:

- `primary`: filled accent.
- `secondary`: tonal accent.
- `tertiary`: transparent text/action.
- `ghost`: quiet inline action.
- `danger`: destructive or app-error action.
- `success`: confirmation action when needed.

Sizes: `small`, `medium`, `large`.

States: default, pressed, focused, loading, disabled.

Rules:

- Optional left/right icon through `Icon`.
- Minimum touch target: 44 by 44.
- Loading state replaces action icon with an activity indicator.
- Disabled state must be visually clear and exposed through accessibility state.
- Press animation: scale to `0.98` on iOS, ripple on Android, reduced motion
  uses opacity only.

### IconButton

Files:

- `src/components/common/IconButton/IconButton.tsx`
- `src/components/common/IconButton/IconButtonTypes.ts`
- `src/components/common/IconButton/index.ts`

Variants: `ghost`, `surface`, `tonal`, `danger`.

Sizes:

- `small`: visual icon 16, target 44.
- `medium`: visual icon 20, target 44.
- `large`: visual icon 24, target 48.

Rules:

- `accessibilityLabel` is required.
- Use `accessibilityRole="button"`.
- Expose selected/disabled states.
- Optional haptic type, default none.

### Surface

Files:

- `src/components/common/Surface/Surface.tsx`
- `src/components/common/Surface/SurfaceTypes.ts`
- `src/components/common/Surface/index.ts`

Variants: `flat`, `card`, `elevated`, `tonal`, `inverse`, `success`,
`warning`, `danger`, `info`.

Rules:

- Default radius: `radius.md`.
- Default padding: `space.6`.
- Status surfaces use the correction rail when they contain feedback.
- Platform-specific elevation is handled inside `Surface`, not per screen.

### GlassSurface

Files:

- `src/components/common/GlassSurface/GlassSurface.tsx`
- `src/components/common/GlassSurface/GlassSurfaceTypes.ts`
- `src/components/common/GlassSurface/index.ts`

Variants: `tabBar`, `floatingControl`, `overlay`, `chip`.

Rules:

- Use safe fallback first.
- Do not put long text content inside glass surfaces.
- Android uses tonal fallback.
- The component owns platform differences.

### TextInput

Files:

- `src/components/common/TextInput/TextInput.tsx`
- `src/components/common/TextInput/TextInputTypes.ts`
- `src/components/common/TextInput/index.ts`

States: default, focused, filled, error, success, disabled.

Rules:

- Supports label, helper text, error text, leading icon, trailing icon.
- Focus changes border to `focus.ring` and surface to accent soft background.
- Error state uses both color and visible label/icon.
- Must remain keyboard-safe in Practice.

### Chip

Files:

- `src/components/common/Chip/Chip.tsx`
- `src/components/common/Chip/ChipTypes.ts`
- `src/components/common/Chip/index.ts`

Variants: `neutral`, `selected`, `accent`, `success`, `warning`, `danger`,
`info`.

Rules:

- Use for level, validation mode, filters, mastery, and mistake type.
- Optional icon.
- Selected state must not rely on color alone.
- Target at least 44 high when interactive.

### WordChip

Files:

- `src/components/common/WordChip/WordChip.tsx`
- `src/components/common/WordChip/WordChipTypes.ts`
- `src/components/common/WordChip/index.ts`

States: default, selected, correct, incorrect, disabled.

Rules:

- Used for scrambled sentence mode.
- Tapping selects or removes a word.
- Selected and disabled states must be accessible.
- Animate placement only when reduced motion is off.

### ProgressBar

Files:

- `src/components/common/ProgressBar/ProgressBar.tsx`
- `src/components/common/ProgressBar/ProgressBarTypes.ts`
- `src/components/common/ProgressBar/index.ts`

Rules:

- Animated value changes with reduced-motion fallback.
- Exposes accessible progress value.
- Uses semantic colors, not raw status colors.

### SegmentedControl

Files:

- `src/components/common/SegmentedControl/SegmentedControl.tsx`
- `src/components/common/SegmentedControl/SegmentedControlTypes.ts`
- `src/components/common/SegmentedControl/index.ts`

Rules:

- Use for Library views and Practice input mode.
- Selection pill animates with Reanimated.
- Reduced motion changes selected state instantly.
- Each item exposes selected state.

### ScreenHeader

Files:

- `src/components/common/ScreenHeader/ScreenHeader.tsx`
- `src/components/common/ScreenHeader/ScreenHeaderTypes.ts`
- `src/components/common/ScreenHeader/index.ts`

Rules:

- Title, optional subtitle, optional left/right actions.
- Right actions use `IconButton`.
- Avoid duplicating native header behavior where React Navigation already owns
  it.

### SectionHeader

Files:

- `src/components/common/SectionHeader/SectionHeader.tsx`
- `src/components/common/SectionHeader/SectionHeaderTypes.ts`
- `src/components/common/SectionHeader/index.ts`

Rules:

- Title, optional supporting text, optional action.
- Used inside screen content, never as a replacement for screen title.

### StatCard

Files:

- `src/components/common/StatCard/StatCard.tsx`
- `src/components/common/StatCard/StatCardTypes.ts`
- `src/components/common/StatCard/index.ts`

Rules:

- Icon, label, value, optional delta, optional progress.
- Use `metric` typography for the value.
- Use tabular numbers.
- Keep labels short.

### EmptyState, LoadingState, ErrorState

Files:

- `src/components/common/EmptyState/*`
- `src/components/common/LoadingState/*`
- `src/components/common/ErrorState/*`

Rules:

- Icon, title, body, optional action.
- Empty states tell the user what creates content.
- Error states state what failed and the next action.
- Loading states should not imply fake progress.

### ResultBadge

Files:

- `src/components/common/ResultBadge/ResultBadge.tsx`
- `src/components/common/ResultBadge/ResultBadgeTypes.ts`
- `src/components/common/ResultBadge/index.ts`

Variants: `correct`, `almost`, `incorrect`, `saved`, `reviewDue`.

Rules:

- Include icon and text.
- Do not rely only on color.
- Used in Practice feedback and Review cards.

### FeedbackHighlight

Files:

- `src/components/common/FeedbackHighlight/FeedbackHighlight.tsx`
- `src/components/common/FeedbackHighlight/FeedbackHighlightTypes.ts`
- `src/components/common/FeedbackHighlight/index.ts`

Variants: `missingWord`, `extraWord`, `wrongOrder`, `wrongTense`,
`spelling`, `punctuation`, `acceptedAlternative`.

Rules:

- Use badges, underline/rail, and labels with color.
- Must work in dark mode.
- Must remain readable with dynamic text.

## Motion

Principles:

- Motion explains state changes.
- Motion supports the learning loop.
- Motion must not slow typing.
- Motion must not make text harder to read.
- Avoid decorative loops.

Motion tokens:

| Token               | Value | Use                            |
| ------------------- | ----: | ------------------------------ |
| `duration.instant`  |     0 | Reduced motion                 |
| `duration.micro`    |    90 | Press response                 |
| `duration.fast`     |   140 | Focus and chip transitions     |
| `duration.normal`   |   220 | Feedback reveal                |
| `duration.emphasis` |   320 | Completion state only          |
| `duration.slow`     |   420 | Large non-blocking transitions |

Spring tokens:

| Token             | Damping | Stiffness | Mass | Use                                |
| ----------------- | ------: | --------: | ---: | ---------------------------------- |
| `spring.press`    |      18 |       420 |  0.7 | Button, chip, card press           |
| `spring.snappy`   |      20 |       320 |  0.8 | Word chip select/remove            |
| `spring.soft`     |      24 |       220 |    1 | Card entrance, panel reveal        |
| `spring.emphasis` |      22 |       260 |  0.9 | Feedback result, save confirmation |
| `spring.settle`   |      30 |       160 |    1 | Large layout changes, summaries    |

Reduced motion:

- Disable spatial entrance animations.
- Disable chip movement animations.
- Disable spring scale except basic opacity.
- Keep feedback reveal as instant or short opacity transition.

## Haptics

Recommended dependency: `expo-haptics`, wrapped in `src/native/haptics`.

API:

- `selection()`
- `impactLight()`
- `impactMedium()`
- `success()`
- `warning()`
- `error()`

Mapping:

| Moment                    | Haptic        |
| ------------------------- | ------------- |
| Word chip select          | `selection`   |
| Validation mode change    | `selection`   |
| Submit tapped             | `impactLight` |
| Correct result            | `success`     |
| Almost correct            | `warning`     |
| Incorrect learning result | `warning`     |
| Save word or sentence     | `success`     |
| Review completed          | `success`     |
| Skip sentence             | `impactLight` |
| App-level failure         | `error`       |

Do not trigger haptics for every keystroke, screen mount, list scroll, passive
progress update, or normal text focus.

## Screen Blueprints

### Home

Purpose: calm learning dashboard with one obvious next action.

Hierarchy:

1. Screen header: Correcta, today's practice.
2. Daily practice hero card with progress and primary CTA.
3. Quick stat grid: daily goal, review queue, difficult words, accuracy.
4. Teacher tip card.
5. Continue learning card.

Visual treatment:

- Hero card uses `surface.elevated`, accent rail, primary CTA.
- Stat cards use `StatCard`.
- Icons clarify the stat type but never replace labels.

Animation:

- Hero fades in.
- Progress fills once.
- Stat cards enter with subtle opacity only.

### Practice

Purpose: the core study loop and the highest-priority visual surface.

Hierarchy:

1. Practice header with session progress, level chip, validation chip.
2. Sentence prompt card.
3. Input mode selector.
4. Typing input or scrambled word builder.
5. Practice action bar.
6. Feedback panel after submit.

Visual treatment:

- Sentence card uses large `sentence` type.
- Input area is stable and keyboard-safe.
- Feedback panel uses correction rail and `ResultBadge`.
- Mistake details use `FeedbackHighlight`.

Animation:

- Input focus animates border/surface.
- Submit changes to checking state.
- Feedback reveals with short fade/translate.
- Word chips animate only when reduced motion is off.

### Review

Purpose: make review queues feel intentional, not like a plain list.

Hierarchy:

1. Screen header.
2. Review summary card.
3. Review deck cards.
4. Queue preview.
5. Empty state when no review content exists.

Visual treatment:

- Deck cards use icons, counts, due labels, and progress.
- Empty state explains that saved words and mistakes create review content.

### Library

Purpose: personal learning notebook.

Hierarchy:

1. Screen header.
2. Segmented control: Words, Sentences, History.
3. Filter/search area if data supports it.
4. Word, sentence, or history cards.

Visual treatment:

- Saved words show mastery chip and mistake count.
- Saved sentences show source, translation, and review state.
- History items show result badge and timestamp.

### Progress

Purpose: simple learning report without heavy analytics.

Hierarchy:

1. Screen header.
2. Progress hero card.
3. Stat grid.
4. Mistake breakdown bars.
5. Weekly activity row.
6. Recommendation card.

Visual treatment:

- Use native bars and cards, no charting library.
- Progress values expose accessible labels.

### ComponentPlayground

Purpose: visual QA surface for the design system.

Sections:

- Typography.
- Surfaces.
- Buttons.
- Icon buttons.
- Chips.
- Word chips.
- Inputs.
- Progress.
- Feedback states.
- Empty/loading/error states.
- Haptics test actions.
- Reduced motion status.

## Practice Flow Detail

Typing mode:

- Default for advanced users.
- The input has clear label, helper text, focus state, and submit state.
- Empty answer disables submit.
- Checking state locks submit and shows clear progress.

Scrambled words mode:

- Optional beginner mode.
- Word bank shows all candidate words as `WordChip`.
- Selected answer area uses selected `WordChip` instances in order.
- Tapping a bank word moves it to selected area.
- Tapping a selected word removes it.
- Clear action resets selected words.
- Disabled bank words remain visible but unavailable.
- Submit validates the built sentence.

Feedback reveal:

- Result badge appears first.
- Correct answer appears before explanations.
- Mistake highlights show labels and status colors.
- Explanation is calm and specific.
- Save actions appear after the feedback content.
- Continue action is primary.

Feedback language:

- Correct: "Correct"
- Almost correct: "Almost correct"
- Incorrect: "Needs work"
- Missing word: "Missing word"
- Extra word: "Extra word"
- Wrong order: "Word order"
- Wrong tense: "Tense"
- Spelling: "Spelling"
- Punctuation: "Punctuation"

## Copy Rules

- Use plain, active labels.
- A button label says exactly what happens.
- Use "Check answer", not "Submit".
- Use "Save sentence" and "Save word", not "Bookmark".
- Empty states explain what creates content.
- Error states explain what failed and the next action.
- Feedback should teach, not scold.

## Implementation Order

1. Add phase and QA docs.
2. Implement the `Correction Desk` theme tokens in `src/theme`.
3. Add icon and haptics dependencies.
4. Add icon and haptics wrappers.
5. Upgrade existing common components.
6. Add new shared visual components.
7. Redesign ComponentPlayground.
8. Polish Home.
9. Polish Practice.
10. Polish Review.
11. Polish Library.
12. Polish Progress.
13. Add platform-specific GlassSurface/native polish.
14. Run accessibility, reduced motion, and device QA.

## Design Risks

- Risk: too many components before screens.
  Mitigation: every new component must appear in ComponentPlayground or be
  removed before phase close.
- Risk: visual polish becomes decorative.
  Mitigation: prioritize Practice feedback and learning clarity.
- Risk: Android feels like copied iOS.
  Mitigation: use tonal surfaces and ripple on Android, not glass imitation.
- Risk: mistakes feel punitive.
  Mitigation: use "Needs work" and warning haptics, not error haptics, for
  normal learning mistakes.
- Risk: animations cause typing lag.
  Mitigation: never animate typing state or long list items heavily.
