# Correcta Design Rules

This is the working design rule sheet for Correcta. Use it when creating or
reviewing app screens, shared UI components, Google Stitch prompts, and visual
implementation tasks.

The detailed design rationale still lives in `docs/design-system.md`. The
native component rules live in `docs/rules/general/native-component-design.md`.
The connected-card geometry rules live in
`docs/rules/general/linked-surface-groups.md`. This file is the compact current
implementation contract.

## Source Of Truth

- Runtime theme tokens live in `src/theme`.
- Shared UI components live in `src/components/common`.
- Screen-specific composition lives in `src/screens/<ScreenName>`.
- Use React Native primitives and project-approved native components only.
- Do not use DOM elements, browser APIs, CSS files, CSS modules, selectors,
  media queries, pseudo-classes, CSS units, or web-only React conventions.
- Do not use `className`.
- Do not use raw colors, one-off radius values, or one-off spacing when a theme
  token exists.

## Design Thesis

Correcta should feel like a quiet native study desk: precise, calm, tactile, and
trustworthy.

The app is for adult language learners. It should feel focused and premium, not
childish, neon, cartoon-like, over-gamified, or like a web page inside a phone.

The strongest visual signature is careful teacher markup:

- Mark what was correct.
- Mark what was close.
- Mark what needs work.
- Explain the correction without shaming the learner.

## Important Radius Rule

Every rounded component container should use the same continuous-corner system
as the POC cards.

The installed library is `react-native-fast-squircle`. The runtime component is
`FastSquircleView`. The user-facing phrase "VorteRadius" should be interpreted
as this squircle/corner system unless a future task introduces a differently
named package.

Use this rule for cards, buttons, inputs, notices, notification/toast surfaces,
sheets, menus, segmented controls, chips, stat cards, and any other rounded app
container:

```tsx
import FastSquircleView from "react-native-fast-squircle";

<FastSquircleView
    cornerSmoothing={theme.card.cornerSmoothing}
    style={{
        borderRadius: theme.card.radius.compact,
    }}
>
    {children}
</FastSquircleView>;
```

Rules:

- Default rounded component radius is `theme.card.radius.compact` (`24`), which
  matches the POC card section radius.
- Use `cornerSmoothing={theme.card.cornerSmoothing}`. Current value is `1`.
- Use `FastSquircleView` for rounded component containers, not a plain `View`
  with only `borderRadius`.
- Do not introduce new ad hoc radius numbers.
- Do not mix multiple visual radius systems in the same screen.
- Existing older tokens such as `theme.radii.button`, `theme.radii.input`, and
  `theme.radii.card` are legacy/current implementation tokens. New design work
  should move rounded containers toward the POC squircle rule unless there is a
  documented exception.
- Pills and circular controls may still use `theme.radii.pill` when the shape
  must be a true pill or circle, but the surface should still follow the same
  continuous-corner visual language.
- Decorative bridge/cutout geometry in connected cards is not interactive and
  does not need `FastSquircleView`; the actual card items do.
- Connected-card cutouts are a reserved signature treatment. Do not use them
  for ordinary dashboard metrics, list rows, empty-state summaries, or content
  that only needs a normal card.

Reference implementation:

- `src/components/common/ConnectedCard/ConnectedCard.tsx`
- `src/components/common/ConnectedCard/ConnectedCardItem.tsx`
- `src/components/common/Surface/Surface.tsx`

## Color Palette

Theme name: **Scribe Blue**.

Green is reserved for semantic success and correct-answer states only. Do not
use green, teal, mint, or turquoise for brand labels, primary actions, active
tabs, selected controls, focus rings, or normal tonal surfaces.

### Light Theme

| Token                            | Hex         | Use                                           |
| -------------------------------- | ----------- | --------------------------------------------- |
| `canvas`                         | `#F8F7F1`   | Warm app canvas and connected-card cutouts    |
| `backgroundPrimary`              | `#F6F7FA`   | Main screen background                        |
| `backgroundSecondary`            | `#EEF1F5`   | Grouped areas and secondary backgrounds       |
| `surfacePrimary`                 | `#FFFFFF`   | Cards, inputs, and main surfaces              |
| `surfaceElevated`                | `#FBFCFE`   | Raised cards and floating panels              |
| `surfaceTonal`                   | `#E8EEF8`   | Selected areas and quiet panels               |
| `surfaceInverse`                 | `#111827`   | Rare inverse surfaces                         |
| `surfaceGlassFallback`           | `#FFFFFFE6` | Compact iOS glass fallback only               |
| `textPrimary`                    | `#111827`   | Primary text                                  |
| `textSecondary`                  | `#3F4B5B`   | Supporting text                               |
| `textMuted`                      | `#6B7280`   | Metadata, captions, helper text               |
| `textInverse`                    | `#F9FAFB`   | Text on inverse surfaces                      |
| `borderSubtle`                   | `#D9DEE7`   | Subtle borders and separators                 |
| `borderStrong`                   | `#AAB4C3`   | Strong separators and active outlines         |
| `accentPrimary`                  | `#2F5DA8`   | Primary action and active state               |
| `accentPrimaryStrong`            | `#22477F`   | Pressed or strong primary accent              |
| `accentPrimarySoft`              | `#E2EBFA`   | Selected and secondary accent surfaces        |
| `accentSecondary`                | `#4F6F8F`   | Secondary accent and info-adjacent UI         |
| `feedbackSuccess`                | `#16803C`   | Correct result only                           |
| `feedbackSuccessSoft`            | `#E3F5EA`   | Correct result background                     |
| `feedbackWarning`                | `#B26A00`   | Almost correct, caution, pending review       |
| `feedbackWarningSoft`            | `#FFF1D6`   | Warning background                            |
| `feedbackDanger`                 | `#B42318`   | Incorrect result, destructive actions, errors |
| `feedbackDangerSoft`             | `#FDE8E6`   | Error background                              |
| `feedbackInfo`                   | `#496A91`   | Hints, neutral explanations, teacher notes    |
| `feedbackInfoSoft`               | `#E6EEF8`   | Info background                               |
| `focusRing`                      | `#4778D6`   | Focus state                                   |
| `shadowTint`                     | `#111827`   | Shadow tint                                   |
| `surfaceContrast`                | `#062B2D`   | Reserved connected-card surface               |
| `surfaceContrastAccent`          | `#CDC6FF`   | Reserved connected-card accent                |
| `surfaceContrastForeground`      | `#F3EEFF`   | Reserved connected-card primary text          |
| `surfaceContrastMutedForeground` | `#D9D4F6`   | Reserved connected-card muted text            |
| `surfaceContrastFocus`           | `#C8BEFF`   | Reserved connected-card focus                 |
| `surfaceContrastOutline`         | `#E8E3FF`   | Reserved connected-card outline               |
| `surfaceContrastPressed`         | `#103A3D`   | Reserved connected-card pressed state         |

### Dark Theme

| Token                            | Hex         | Use                                           |
| -------------------------------- | ----------- | --------------------------------------------- |
| `canvas`                         | `#070B10`   | Dark app canvas and connected-card cutouts    |
| `backgroundPrimary`              | `#0D1117`   | Main screen background                        |
| `backgroundSecondary`            | `#121822`   | Grouped areas and secondary backgrounds       |
| `surfacePrimary`                 | `#171E28`   | Cards, inputs, and main surfaces              |
| `surfaceElevated`                | `#1E2633`   | Raised cards and floating panels              |
| `surfaceTonal`                   | `#202A3A`   | Selected areas and quiet panels               |
| `surfaceInverse`                 | `#F6F7FA`   | Rare inverse surfaces                         |
| `surfaceGlassFallback`           | `#171E28E6` | Compact iOS glass fallback only               |
| `textPrimary`                    | `#F4F7FB`   | Primary text                                  |
| `textSecondary`                  | `#C6CFDB`   | Supporting text                               |
| `textMuted`                      | `#8E9AAC`   | Metadata, captions, helper text               |
| `textInverse`                    | `#111827`   | Text on inverse surfaces                      |
| `borderSubtle`                   | `#2B3545`   | Subtle borders and separators                 |
| `borderStrong`                   | `#46566D`   | Strong separators and active outlines         |
| `accentPrimary`                  | `#7DA6F7`   | Primary action and active state               |
| `accentPrimaryStrong`            | `#A9C5FF`   | Pressed or strong primary accent              |
| `accentPrimarySoft`              | `#1D3357`   | Selected and secondary accent surfaces        |
| `accentSecondary`                | `#9EB4CC`   | Secondary accent and info-adjacent UI         |
| `feedbackSuccess`                | `#5FD28A`   | Correct result only                           |
| `feedbackSuccessSoft`            | `#163522`   | Correct result background                     |
| `feedbackWarning`                | `#F0B35A`   | Almost correct, caution, pending review       |
| `feedbackWarningSoft`            | `#3A2A12`   | Warning background                            |
| `feedbackDanger`                 | `#FF7A70`   | Incorrect result, destructive actions, errors |
| `feedbackDangerSoft`             | `#3D1E1C`   | Error background                              |
| `feedbackInfo`                   | `#98B8E8`   | Hints, neutral explanations, teacher notes    |
| `feedbackInfoSoft`               | `#182A43`   | Info background                               |
| `focusRing`                      | `#9BBEFF`   | Focus state                                   |
| `shadowTint`                     | `#000000`   | Shadow tint                                   |
| `surfaceContrast`                | `#0A292D`   | Reserved connected-card surface               |
| `surfaceContrastAccent`          | `#C8C0FF`   | Reserved connected-card accent                |
| `surfaceContrastForeground`      | `#F4EFFF`   | Reserved connected-card primary text          |
| `surfaceContrastMutedForeground` | `#C9C4E9`   | Reserved connected-card muted text            |
| `surfaceContrastFocus`           | `#CDC5FF`   | Reserved connected-card focus                 |
| `surfaceContrastOutline`         | `#273F47`   | Reserved connected-card outline               |
| `surfaceContrastPressed`         | `#123D43`   | Reserved connected-card pressed state         |

### Color Rules

- Use `accentPrimary` for primary actions, active tabs, selected segmented
  controls, main progress indicators, and primary links.
- Use `accentPrimarySoft` for secondary actions, selected filters, and quiet
  active states.
- Use `surfaceTonal` for grouped controls and neutral selected areas.
- Use `Surface`, `StatCard`, or simple list rows for normal cards and metrics.
- Use `ConnectedCard` only when the content is truly one signature grouped
  module and the linked geometry improves hierarchy.
- Use feedback colors only for learning state and semantic system state.
- Do not use gradients for backgrounds, borders, buttons, progress indicators,
  pressed states, or decoration.
- Do not use color as the only signal for success, warning, danger, selected,
  disabled, or error states.

## Typography

Use system fonts:

- iOS: San Francisco through React Native defaults.
- Android: Roboto through React Native defaults.

All visible app copy should use `AppText` unless a native component requires a
native text prop.

| Variant      | Size | Line height | Weight | Use                              |
| ------------ | ---: | ----------: | ------ | -------------------------------- |
| `display`    |   34 |          40 | 700    | Rare major completion state      |
| `titleLarge` |   28 |          34 | 700    | Screen-level feature titles      |
| `title`      |   22 |          28 | 700    | Major sections and card headings |
| `subtitle`   |   17 |          24 | 600    | Section summaries                |
| `sentence`   |   24 |          34 | 600    | Source sentence in Practice      |
| `answer`     |   18 |          26 | 500    | User answer and corrected answer |
| `body`       |   16 |          24 | 400    | Primary reading text             |
| `bodyStrong` |   16 |          24 | 600    | Inline emphasis                  |
| `bodySmall`  |   14 |          20 | 400    | Secondary explanations           |
| `label`      |   13 |          18 | 600    | Chips, tabs, compact labels      |
| `caption`    |   12 |          16 | 500    | Metadata and timestamps          |
| `button`     |   16 |          20 | 700    | Button labels                    |
| `metric`     |   30 |          36 | 700    | Key stat values                  |

Typography rules:

- Sentence, answer, feedback, and error text must wrap.
- Do not truncate learning content by default.
- Use `numberOfLines` only for metadata, labels, and previews.
- Do not scale font size from viewport width.
- Keep letter spacing at `0`.
- Use tabular-looking numeric treatment for counts, percentages, progress, and
  streak-style values when available.

## Spacing And Screen Padding

Spacing tokens are React Native numbers.

| Token              | Value | Use                               |
| ------------------ | ----: | --------------------------------- |
| `none`             |     0 | Resets                            |
| `xxs`              |     2 | Tiny separators                   |
| `xs`               |     4 | Icon/text micro gap               |
| `sm`               |     6 | Dense chip padding                |
| `md`               |     8 | Compact internal spacing          |
| `lg`               |    12 | Control padding                   |
| `xl`               |    16 | Standard card padding             |
| `2xl`              |    20 | Large card padding                |
| `3xl`              |    24 | Screen section gap                |
| `4xl`              |    32 | Major screen rhythm               |
| `5xl`              |    40 | Hero spacing                      |
| `6xl`              |    48 | Empty-state spacing               |
| `7xl`              |    64 | Rare large vertical gap           |
| `screenHorizontal` |    20 | Default screen side padding       |
| `screenVertical`   |    16 | Default screen top/bottom padding |
| `cardPadding`      |    16 | Standard card padding             |
| `cardGap`          |    12 | Gap inside grouped cards          |
| `sectionGap`       |    24 | Gap between screen sections       |
| `controlGap`       |     8 | Gap between controls              |

Screen rules:

- Use `Screen` for standard screen layout.
- Default horizontal padding is `theme.spacing.screenHorizontal` (`20`).
- Default vertical padding is `theme.spacing.screenVertical` (`16`).
- Default screen child gap is `theme.spacing.sectionGap` (`24`).
- Scrollable screens should use the `Screen` keyboard-aware scroll behavior.
- List screens should use list content container spacing, not nested same-axis
  scroll containers.
- Preserve safe areas and bottom tab spacing.
- Keep focused inputs and primary submit actions reachable above the keyboard.

## Radius And Shape Tokens

Existing runtime radius tokens:

| Token           | Value | Current use                  |
| --------------- | ----: | ---------------------------- |
| `radius.none`   |     0 | Flush sections               |
| `radius.xs`     |     6 | Tiny badges                  |
| `radius.sm`     |    10 | Small internal surfaces      |
| `radius.md`     |    14 | Legacy medium surfaces       |
| `radius.lg`     |    18 | Legacy controls              |
| `radius.xl`     |    22 | Legacy elevated cards        |
| `radius.2xl`    |    28 | Sheets                       |
| `radius.3xl`    |    34 | Large overlays               |
| `radius.card`   |    22 | Legacy standalone card shape |
| `radius.input`  |    18 | Legacy text inputs           |
| `radius.button` |    16 | Legacy buttons               |
| `radius.chip`   |   999 | Pills                        |
| `radius.pill`   |   999 | Pills and circles            |
| `radius.sheet`  |    28 | Sheets                       |
| `radius.modal`  |    30 | Modal containers             |

Current card radius tokens:

| Token                  | Value | Use                                   |
| ---------------------- | ----: | ------------------------------------- |
| `card.radius.compact`  |    24 | Default POC/squircle component radius |
| `card.radius.default`  |    28 | Connected-card default radius         |
| `card.radius.hero`     |    32 | Large connected-card radius           |
| `card.cornerSmoothing` |     1 | Continuous corner smoothing           |

Design rule:

- Treat `theme.card.radius.compact` plus `theme.card.cornerSmoothing` as the
  default rounded component contract for new design work.
- Use larger `theme.card.radius` values only when the surface size and hierarchy
  require it.
- Do not create new radius tokens without updating this document and
  `src/theme`.

## Cards And Surfaces

Use cards to group learning content, not to decorate every section.

Shared surface family:

- `Surface`: standalone rounded container.
- `StatCard`: normal metric card using a white outlined surface.
- `ConnectedCard`: reserved linked surface group with bridge/cutout geometry.
- `NoticeCard`: status/feedback notice built on `ConnectedCard`.
- No general shared glass component is currently approved. Compact platform
  material treatment needs a concrete production use case before implementation.

Card rules:

- Use normal outlined surfaces for ordinary metrics, list rows, and dashboard
  summaries.
- Use connected surfaces only when related content reads as one sculpted
  signature system.
- Do not join unrelated cards for decoration.
- Connected-card bridges and cutouts are decorative only: no touch, focus,
  haptics, or accessibility events.
- Connected surfaces use opaque colors. Do not use blur or translucent glass
  inside connected-card unions.
- Use `surfaceContrast` for high-emphasis connected cards.
- Use `canvas` for cutouts so the carved shape matches the active theme.
- Do not put cards inside cards.
- Do not rely on shape alone for hierarchy.
- Keep learning content more prominent than the container shape.

Card geometry tokens:

| Token                                   | Value |
| --------------------------------------- | ----: |
| `card.gap.compact`                      |     6 |
| `card.gap.default`                      |     8 |
| `card.gap.relaxed`                      |    12 |
| `card.padding.compact`                  |    16 |
| `card.padding.default`                  |    20 |
| `card.padding.hero`                     |    24 |
| `card.bridge.capRadius`                 |   999 |
| `card.bridge.cutoutThickness`           |     8 |
| `card.bridge.edgeOverlap`               |     1 |
| `card.bridge.horizontalOverlap.compact` |    16 |
| `card.bridge.horizontalOverlap.default` |    20 |
| `card.bridge.horizontalOverlap.hero`    |    24 |
| `card.bridge.span.horizontal.compact`   |   0.4 |
| `card.bridge.span.horizontal.default`   |   0.4 |
| `card.bridge.span.horizontal.hero`      |   0.4 |
| `card.bridge.span.vertical.compact`     |   0.8 |
| `card.bridge.span.vertical.default`     |  0.74 |
| `card.bridge.span.vertical.hero`        |  0.74 |

## Buttons

Buttons should be compact, native, and easy to scan.

Variants:

- `primary`: filled accent, strongest action.
- `secondary`: tonal accent, medium emphasis.
- `tertiary`: neutral tonal surface.
- `ghost`: transparent, quiet inline action.
- `danger`: destructive or error action.
- `success`: confirmation action when needed.

Rules:

- All button containers should use the shared squircle radius rule.
- Minimum touch target is `44x44`.
- Button text uses `AppText` variant `button`.
- Optional icons must come from `Icon`.
- Loading buttons show `ActivityIndicator` and expose busy state.
- Disabled buttons expose `accessibilityState.disabled`.
- Press feedback uses opacity/scale and Android ripple where available.
- Do not use green buttons except for semantic success.
- Do not create one-off button colors or one-off button radius values.

## Inputs

Inputs should feel like calm native study controls, not floating web fields.

Rules:

- Every input needs a visible label or meaningful accessibility label.
- Input containers should use the shared squircle radius rule.
- Default input height should stay around `52`.
- Use `theme.colors.surfacePrimary` for default fill.
- Use `theme.colors.surfaceElevated` plus `focusRing` for focused state.
- Error and success states need color, icon, and text; never color alone.
- Helper/error text should sit close to the field.
- Preserve typed input when validation fails.
- Keep inputs and submit actions reachable above the keyboard.
- Do not rely on placeholder text as the only label.

## Notices, Toasts, And Notifications

Use `NoticeCard` for in-app status feedback that belongs in the learning flow.
It composes `ConnectedCard`, so it inherits the continuous-corner rule and the
reserved connected-surface treatment.

Notice tones:

- `success`: correct or saved.
- `warning`: almost correct or caution.
- `danger`: incorrect, destructive, or failed.
- `info`: hints, notes, teacher explanations.

Rules:

- Status must not be color-only. Include icon and text.
- Feedback after user action should be announced politely to screen readers
  when appropriate.
- Notices should use calm copy and teacher-like language.
- Toasts are planned as shared UI. When implemented, they must use the same
  squircle radius rule, safe-area-aware placement, keyboard awareness, action
  support, close support, duration, and reduced-motion behavior.
- Push notifications and reminder UI should be gentle and user-controlled. No
  guilt, streak threats, or pressure copy.

## Iconography

Use `lucide-react-native` through `src/components/common/Icon`.

Rules:

- Screens must not import lucide icons directly.
- Register icons in `src/components/common/Icon/iconRegistry.ts`.
- Default stroke width is `2`.
- Use rounded line caps and joins.
- Prefer curved or circular glyphs over hard 90-degree arrow shapes, square
  containers, and sharp warning triangles when a softer semantic alternative
  exists.
- Dense icon size is `16`.
- Default icon size is `20`.
- Tab icon size is `22`.
- Hero/stat icon size is `24`.
- Empty-state icon size is `32`.
- Icon-only controls require accessible names and at least a `44x44` target.

## Elevation And Motion

Elevation tokens:

- `shadows.surface`: selected raised surfaces only.
- `shadows.elevated`: elevated cards and inputs.
- `shadows.floating`: floating controls and feedback panels.
- `shadows.overlay`: modals and overlays.

Motion tokens:

- `motion.pressOpacity`: `0.88`.
- `motion.disabledOpacity`: `0.48`.

Rules:

- iOS uses subtle shadow.
- Android uses elevation and tonal/ripple feedback.
- Use haptics only for meaningful events: success, warning, destructive action,
  save, selection, and completion.
- Respect reduced motion.
- Motion should explain state changes, not entertain.
- Do not use confetti-heavy or arcade-like celebration.

## Screen Rules

Home:

- Primary goal is the next useful learning action.
- Keep "Start practice" dominant.
- Show daily goal, review due, and recent mistake insight without dashboard
  clutter.

Practice:

- Sentence prompt and answer area are the main objects.
- Input mode, hints, submit, skip, and feedback must stay reachable.
- Feedback should feel like teacher markup, not scoring.

Review:

- Cards should feel like focused study cards.
- Reveal and grade controls must be easy to tap repeatedly.
- Empty deck states should guide the learner back to practice.

Library:

- Saved content should feel valuable and organized.
- Use stable list keys and explicit empty/loading/error states.
- Mistake groups should read as lessons.

Progress:

- Motivate without guilt.
- Use calm metrics, daily goal, weekly activity, reminders, and achievements.
- Avoid leaderboards, coins, gems, or pressure tactics.

## Copy Rules

Use precise, teacher-like copy.

Use:

- "This translation works."
- "Close. Check the tense."
- "Review this mistake."
- "Save this sentence."
- "Practice due cards."
- "You finished today's goal."

Avoid:

- "You failed."
- "Oopsie."
- "Crush it."
- "Unlock epic rewards."
- "Keep your streak alive or lose it."
- "Boss level."
- "Leaderboard."

## Accessibility Rules

- Dynamic text must work.
- Reduced motion must work.
- Icon-only controls need `accessibilityLabel`.
- Custom pressable controls need role and state.
- Disabled, selected, checked, expanded, and busy states must be exposed through
  `accessibilityState`.
- Color cannot be the only state indicator.
- Touch targets must be at least `44x44`.
- Error text must stay close to the field or control it describes.
- Decorative bridge/cutout geometry must be hidden from accessibility.
- Dark mode must preserve contrast.

## Anti-Patterns

Do not use:

- DOM, CSS files, CSS modules, selectors, media queries, pseudo-classes, or
  browser APIs.
- `className`.
- Gradients for app surfaces, borders, buttons, progress, pressed states, or
  decoration.
- Neon or rainbow palettes.
- Green as brand, navigation, primary action, or active state.
- Mascots, childish illustrations, or noisy game mechanics.
- Generic flat cards with weak hierarchy.
- Large empty padding.
- Nested cards inside cards.
- Screen-specific variants leaking into shared components.
- Raw colors, raw spacing, raw radius, or one-off shadows.
- Blur/glass behind long learning content.
- Confetti-heavy celebration or guilt-based reminders.

## Before Shipping A New Component

Check:

- It uses React Native primitives or project-approved native components.
- Shared reusable UI lives in `src/components/common`.
- Screen-specific UI lives under `src/screens/<ScreenName>`.
- Styles consume `src/theme` tokens.
- Rounded containers follow the POC squircle rule.
- All states are explicit: default, pressed, focused, loading, disabled,
  selected, success, warning, danger, error, and empty where relevant.
- Icon-only controls have accessible names.
- Text wraps and does not overlap at mobile sizes.
- Dark mode is covered.
- Reduced motion is covered for non-essential animation.
- The component does not add dependencies without approval.
