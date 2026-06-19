# Native Component Design Rules

## Purpose

Define Correcta's native component system for an Expo Dev Client React Native app.
Components must be built in-house, styled with React Native Unistyles, and placed
in the correct shared or screen-level folders. The goal is a polished, tactile,
dense native UI system that feels intentional across iOS and Android without
copying external source code, external component APIs, or web patterns.

These rules are inspired by the level of polish, anatomy, and state coverage in
HeroUI Native, but Correcta owns its implementation, tokens, naming, and
component behavior.

## Design Target

Correcta components should feel elegant, native, compact, and premium. Avoid
generic flat cards, large empty padding, plain borders, and demo-like styling.
Every component should communicate hierarchy through shape, depth, typography,
tint, motion, and state.

Use a coherent system grouped by purpose: actions, feedback, forms, navigation,
surfaces, data display, and utilities. Each component should expose a small,
predictable API and have consistent anatomy, variants, sizes, disabled states,
loading states, accessibility behavior, and dark/light treatment.

Related cards may form a Linked Surface Group: distinct content containers that
are visually joined through their gaps so they read as one sculpted system. Read
[linked-surface-groups.md](./linked-surface-groups.md) before implementing this
pattern.

## Hard Boundaries

- Do not use DOM APIs, CSS files, CSS modules, CSS selectors, media queries,
  browser APIs, web-only assumptions, Next.js patterns, or `className`.
- Do not install HeroUI Native or copy its source code, dependency choices,
  exact internals, or APIs without adapting them to Correcta.
- Do not put shared reusable UI inside screen folders. Shared UI belongs in
  `src/components/common`.
- Do not style with inline one-off values except for unavoidable runtime
  measurements. Use Unistyles tokens and variants.
- Do not use gradients in component backgrounds, borders, progress indicators,
  buttons, pressed states, or decorative fills.
- Do not use Liquid Glass, blur, or translucent materials inside linked card
  unions.

## Component Anatomy Rules

Prefer compound components when anatomy improves clarity:

```tsx
<Button>
  <Button.Icon />
  <Button.Label>Save</Button.Label>
</Button>

<Toast>
  <Toast.Title>Saved</Toast.Title>
  <Toast.Description>Your changes were synced.</Toast.Description>
  <Toast.Action>Undo</Toast.Action>
  <Toast.Close />
</Toast>
```

Compound parts must read parent context for size, variant, disabled, pressed,
and semantic tone. They must not require duplicate props.

String children may be supported for simple labels, but explicit compound parts
are preferred in examples and for components with icons, actions, helper text,
or nested anatomy.

Every shared interactive component must define its root, text parts, optional
icon/action parts, disabled behavior, accessibility props, and stable test hooks
when state or behavior is nontrivial.

## Visual Language Rules

Use dense native spacing:

- `xs`: `4`
- `sm`: `8`
- `md`: `12`
- `lg`: `16`
- `xl`: `20`
- `2xl`: `24`

Use rounded geometry:

- Buttons and controls: radius `12` for `sm`, `14` for `md`, `16` for `lg`.
- Standalone cards and panels: radius `20` to `24`.
- Linked card surfaces: fixed radius `28`.
- Inputs: height `48` to `52`, radius `20` to `24`.
- Search inputs and compact selector shells may use a full pill radius.
- Tab and segmented-control shells use a pill radius with a `4` point inner
  inset.
- Toasts: radius `20`.
- Icon-only controls: square with full visual balance, not circles by default
  unless the component is explicitly designed that way.

Use layered surfaces:

- `canvas`: warm near-white app canvas in light mode and the equivalent dark
  theme canvas in dark mode.
- `surfaceBase`: app background.
- `surfaceRaised`: cards, sheets, grouped controls.
- `surfacePressed`: active press overlay.
- `surfaceOverlay`: toast, dialog, floating elements.
- `surfaceTonal`: tinted semantic containers.
- `surfaceContrast`: opaque deep ink or dark teal linked surface.

Use one restrained solid accent, such as soft lavender, for badges, progress,
selection, and important values. Progress indicators should use solid segments
or a solid fill and track. Never use gradient progress fills.

Use separators at `StyleSheet.hairlineWidth` with low opacity. Separators
should be inset to align with content, not full-width by default.

Use elevation intentionally:

- Level 0: flat background.
- Level 1: subtle grouped surfaces.
- Level 2: raised cards/buttons.
- Level 3: floating toasts, menus, sheets.
- Level 4: modal overlays.

iOS shadows should be soft, low-opacity, and vertical. Android should use
`elevation` plus tonal background changes. Never fake iOS glass on Android.

## Platform Rules

iOS may use Liquid Glass-like treatment only where it adds value: floating
toasts, overlay controls, navigation-adjacent surfaces, and compact cards over
rich backgrounds. Use translucency, blur, tint, border highlights, and shadow
together. Do not apply glass to every card.

Android must use native tonal/elevated treatment: opaque or near-opaque
surfaces, semantic tonal fills, elevation, and state overlays. Avoid
blur-as-glass unless the platform implementation is deliberate and tested.

Respect safe areas on all floating components. Default horizontal inset is `16`.
Toast top and bottom offsets must add safe-area insets plus component tokens.

## Motion And Haptics

All pressable components must support feedback:

- `scaleHighlight`: default for most controls.
- `scaleRipple`: Android-forward or high-emphasis touch feedback.
- `scaleOnly`: quiet controls.
- `none`: static or accessibility-reduced contexts.

Default press scale is `0.97` for buttons and `0.985` for large surfaces.
Press-in should feel immediate; release should spring back.

Support local animation disablement and cascading animation disablement through
child parts when the component has compound anatomy.

Use Pulsar haptics sparingly:

- Light impact for primary successful actions.
- Warning/error notification haptics for destructive or failed actions.
- No haptics for disabled, loading, repeated, or background updates.

Respect reduced motion. Disable non-essential transforms and replace them with
opacity or state changes.

## Toast Rules

Toast anatomy must support `Toast`, `Toast.Title`, `Toast.Description`,
`Toast.Action`, and `Toast.Close`.

Toast variants:

- `default`: neutral raised surface.
- `accent`: Correcta brand tint.
- `success`: positive confirmation.
- `warning`: caution.
- `danger`: destructive or failed action.

Toast placement supports `top` and `bottom`. Default to bottom for
action-related feedback and top for system/status feedback.

Toast behavior:

- Default duration: `4000ms`.
- Persistent mode when explicitly requested by prop.
- `onHide` fires after dismissal animation completes.
- Action callbacks receive a hide function.
- Close button must be icon-only, accessible, and at least `32x32`.

Toast layout:

- Width fills available space minus safe-area-aware horizontal insets.
- Minimum height is `56`.
- Standard padding is `14` horizontal and `12` vertical.
- Title is semibold, with one or two lines max.
- Description is smaller, muted, and two lines max unless persistent.
- Icon is left, content is center, and actions are right or bottom-row when
  crowded.

Swipe-to-dismiss must feel rubbery: drag follows the finger with resistance past
threshold, dismisses after threshold, and springs back otherwise. Top toasts
dismiss upward; bottom toasts dismiss downward.

Toast provider must live near the app root as `CorrectaToastProvider`. It owns
queue, defaults, max visible count, safe-area insets, keyboard-aware wrapper,
and global hide/show methods through `useCorrectaToast`.

Keyboard behavior: bottom toasts must move above the keyboard. The wrapper must
use native keyboard events or the existing keyboard library in the app, not web
layout assumptions.

## Button Rules

Button anatomy must support `Button`, `Button.Label`, and optional
`Button.Icon`.

Sizes:

- `sm`: height `34`, horizontal padding `12`, label `13`, icon `16`, gap `6`.
- `md`: height `42`, horizontal padding `16`, label `15`, icon `18`, gap `8`.
- `lg`: height `50`, horizontal padding `20`, label `16`, icon `20`, gap `10`.

Icon-only:

- `sm`: `34x34`.
- `md`: `42x42`.
- `lg`: `50x50`.
- Must require an accessibility label.

Variants:

- `primary`: filled brand/accent, strongest action.
- `secondary`: tonal brand/accent, medium emphasis.
- `tertiary`: raised neutral surface, medium-low emphasis.
- `outline`: transparent with semantic border.
- `ghost`: transparent, state overlay only.
- `danger`: filled destructive.
- `dangerSoft`: destructive tonal.

Loading:

- Loading buttons disable press events.
- Show spinner in the leading position or replace label for icon-only mode.
- Preserve button width unless intentionally compacting through a documented
  layout transition.
- Loading label may change to an action-specific phrase, not just "Loading".

Disabled:

- Disable gestures, haptics, and press feedback.
- Reduce opacity to `0.45` or use disabled tokens.
- Preserve layout and accessibility state.

Pressed:

- Apply scale plus overlay.
- Overlay opacity should be subtle: `0.08` to `0.14`.
- Do not darken text independently from the container unless tokenized.

Focus:

- For keyboard, TV, or external input, show a `2` point focus ring outside the
  button with brand color at high contrast.
- Focus ring must not change layout.

## Surface, Input, And Control Rules

Surfaces should use internal padding `12` to `18`, rounded corners, subtle tint,
and optional elevation. Cards need headers, content, separators, and actions
when useful.

Inputs must have clear label, value, placeholder, helper text, error text,
disabled state, focused state, and optional leading/trailing icon. Focused
inputs use border or ring plus tonal fill change. Error state overrides focus
color but should not remove focus visibility.

Controls such as switches, checkboxes, segmented controls, chips, and sliders
must have semantic selected, unselected, disabled, and pressed states. Minimum
touch target is `44x44`; compact visuals may sit inside larger hit slop.

Use Card Union for related modules; continue using standalone cards for
unrelated content. Rounded inputs should use a solid tonal fill, not a
border-only floating rectangle. Focused inputs receive a solid focus ring and a
subtle tonal fill change without changing radius or size. Badges and timers use
compact solid pills.

## Component Playground Rules

Create playground screens that show components grouped by category, not as
random demo cards. Each component page must show variants, sizes, icon usage,
loading, disabled, dark mode, long text, accessibility labels, and platform
differences.

Include dense examples with realistic Correcta copy. Do not use placeholder-only
content like "Card title" or "Button".

## Tokens To Define

Define Unistyles tokens for:

```ts
colors: {
  background,
  foreground,
  mutedForeground,
  border,
  focusRing,
  surfaceBase,
  surfaceRaised,
  surfaceOverlay,
  surfacePressed,
  surfaceTonal,
  canvas,
  surfaceContrast,
  surfaceContrastForeground,
  surfaceContrastMutedForeground,
  surfaceContrastAccent,
  surfaceContrastPressed,
  surfaceContrastFocus,
  surfaceContrastOutline,
  accent,
  accentForeground,
  accentSoft,
  success,
  successSoft,
  warning,
  warningSoft,
  danger,
  dangerSoft,
  disabled,
  disabledForeground,
}

spacing: { xs, sm, md, lg, xl, "2xl" }
radius: { sm, md, lg, xl, "2xl", pill }
typography: { caption, bodySm, body, bodyStrong, titleSm, title }
elevation: { none, level1, level2, level3, level4 }
motion: { fast, normal, slow, pressScale, surfacePressScale }
opacity: { pressed, disabled, separator, overlay }
hitSlop: { compact, standard }
cardUnion: { radius, gap, padding, bridge: { span, edgeOverlap, cutoutThickness, capRadius } }
controls: { inputHeight, inputRadius, segmentedHeight, segmentedInset, segmentedRadius }
```

Every token must have light and dark values. Semantic tokens must map to
accessible foreground/background pairs.

## Anti-Patterns

- Flat white cards with only borders.
- Oversized padding.
- Unstyled `Pressable`.
- Generic gray for every state.
- Gradients used as a shortcut for hierarchy, progress, selection, or polish.
- Platform-inaccurate glass.
- Missing accessibility labels for icon-only actions.
- One-off colors, radii, shadows, and animation values.
- Screen-specific variants leaking into shared components.
- Dependency additions for visual polish unless approved.

## Files And Architecture

Shared components:

```txt
src/components/common/AppText/
src/components/common/Button/
src/components/common/CardUnion/
src/components/common/GlassSurface/
src/components/common/IconButton/
src/components/common/Surface/
src/components/common/TextInput/
src/components/common/Toast/
src/components/common/<ComponentName>/
```

Each interactive shared component folder should include:

```txt
ComponentName.tsx
ComponentName.styles.ts
ComponentName.types.ts
index.ts
ComponentName.test.tsx
```

Tests are required for stateful or interactive components. Pure presentational
subcomponents can be covered through their parent component test when that is
clearer.

Providers:

```txt
src/components/common/Toast/CorrectaToastProvider.tsx
src/components/common/Toast/useCorrectaToast.ts
```

Tokens and theme setup belong with the Unistyles theme configuration, not inside
components. Component styles consume tokens only.

Screen-specific composition belongs in:

```txt
src/screens/<ScreenName>/components/
```

## Acceptance Checklist

- Uses React Native and Unistyles only; no DOM, CSS, selectors, media queries,
  browser APIs, or `className`.
- Shared reusable UI is under `src/components/common`.
- Component APIs are Correcta-owned and not copied blindly.
- Light and dark mode are tokenized and accessible.
- iOS and Android have platform-appropriate depth, surface, and feedback.
- Buttons include variants, sizes, icons, icon-only mode, loading, disabled,
  pressed, focus, and accessibility states.
- Toasts include compound anatomy, variants, placement, swipe dismiss, animation
  control, duration, persistent mode, safe areas, keyboard behavior, actions,
  close, and `onHide`.
- Press feedback, haptics, and reduced motion are implemented consistently.
- Minimum touch target is respected.
- Playground covers all states with realistic content.
- No component looks like a plain generic flat card.
- Related cards use the Linked Surface Group and Card Union rules when they
  should feel visually connected.
