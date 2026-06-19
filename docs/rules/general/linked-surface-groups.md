# Linked Surface Group Rules

## Purpose

Define Correcta's signature linked-card visual pattern. Use this when related
cards should feel like one sculpted native composition instead of a stack of
ordinary separated cards.

This pattern is inspired by the provided reference image: large dark rounded
surfaces on a warm light canvas, joined through narrow gaps by same-color
surface geometry. Correcta owns the implementation and must build it with React
Native views, Unistyles tokens, and project components.

## Terminology

- **Linked Surface Group:** A set of semantically related cards presented as one
  visual composition.
- **Card Union:** The shared component responsible for arranging linked
  surfaces.
- **Union Bridge:** The same-color shape that fills the union gap between
  adjacent cards before canvas cut-ins are layered on top.
- **Union Gap:** The small layout gap that contains the bridge and visible
  canvas cut-ins.
- **Edge Cut-In:** The exposed canvas at either end of a union gap. Its inner
  edge is rounded like a carved semicircle.
- **Interlocking Pair:** A horizontal two-card union whose center gap preserves
  rounded cut-ins at the top and bottom.
- **Union Axis:** The direction in which cards connect: `vertical` or
  `horizontal`.

Do not call this pattern a connector pill, floating bridge, glass bridge, or
merged card.

## Visual Target

- Use a warm near-white canvas rather than pure white.
- Use opaque deep ink or dark teal for primary linked surfaces.
- Use soft near-white or lilac foreground text on dark linked surfaces.
- Use one restrained solid accent, such as soft lavender, for badges, progress,
  selection, and important values.
- Use solid colors only. Do not use gradients for surfaces, progress, buttons,
  pressed states, or decoration.
- Linked surfaces rely on contrast, radius, spacing, and shape. Avoid borders,
  individual shadows, and decoration inside the union.

## Hard Boundaries

- Implement union content with React Native `View`, `Pressable`, flex layout,
  and Unistyles.
- `CardUnion` may use `react-native-svg` `Svg` and `Path` for decorative
  background geometry only. The SVG layer must not own text, controls, touch
  handling, haptics, or accessibility semantics.
- Do not use DOM APIs, CSS masks, `clip-path`, SVG masks, Skia, Canvas, image
  assets, or custom native drawing for this geometry unless a future rule
  explicitly replaces the SVG path approach.
- Card Union surfaces and bridges must be opaque. Translucency creates visible
  overlap seams.
- Do not use Liquid Glass, blur, or translucent materials inside a Card Union.
- Do not hard-code white circles or overlays to create cut-ins. Cut-ins must use
  the active theme canvas token.
- The bridge must never receive touch, focus, haptics, or accessibility events.
- Do not join unrelated cards solely for decoration.

## Component API

Create a shared compound component:

```tsx
<CardUnion axis="vertical" tone="contrast">
  <CardUnion.Item>{content}</CardUnion.Item>
  <CardUnion.Item>{content}</CardUnion.Item>
</CardUnion>
```

Required types:

```ts
type CardUnionAxis = "vertical" | "horizontal";
type CardUnionGap = "compact" | "default" | "relaxed";
```

`CardUnion` should accept:

- `axis`
- `tone`
- `gap`
- `bridgeSpan`, defaulting to `0.7` and clamped between `0.66` and `0.78`
- standard React Native `View` and accessibility props where applicable

`CardUnion.Item` owns card content, padding, pressed state, and accessibility
semantics. The root must generate union bridges automatically between adjacent
items. Do not expose `CardUnion.Bridge` publicly or require screens to position
bridges manually. When the design calls for a full canvas gap between two
cards, split them into separate `CardUnion` groups rather than disabling bridge
geometry inside one group.

All items in one union must use the same opaque surface token.

## Geometry

Linked card surfaces use radius `28` by default, radius `24` when compact, and
radius `32` for hero surfaces. Use padding `20` to `24` for hero cards and `16`
to `20` for compact stat cards.

### SVG Surface Layer

The Card Union visual surface is a decorative SVG path behind normal React
Native content. The SVG draws rounded item silhouettes plus same-color center
bridges, then draws active-canvas cut-outs on top. This keeps each card's
rounded border visible while allowing true concave seams.

The SVG layer must:

- Use theme tokens for `surfaceContrast`, `canvas`, radius, gap, cut-out
  thickness, and bridge span.
- Be absolutely positioned behind item content.
- Use `pointerEvents="none"`.
- Be hidden from accessibility.
- Be measured from actual item layout so variable-height content still works.
- Preserve rounded per-card silhouettes. Do not replace a multi-item union with
  one full-height rounded rectangle.

The React Native item layer must:

- Own text, icons, actions, haptics, focus, accessibility labels, and pressed
  state.
- Keep item backgrounds transparent so the SVG silhouette remains the only
  surface shape.
- Use opacity or internal overlays for press feedback; do not redraw a separate
  rounded card background above the SVG.

### Vertical Union

For vertically stacked cards:

- Use a default `8` point Union Gap.
- Fill the gap through the SVG silhouette, not through a separate View bridge.
- Layer active-canvas cut-ins over the left and right edges in the SVG.
- Size each cut-in to about `15%` of the card width by default (span `0.7`),
  leaving a narrower `70%` center bridge.
- Keep each cut-in visually slim, about `8` points tall or the measured Union
  Gap height when the gap is smaller, and center it within the Union Gap. The
  cut-in should look like a short horizontal slot, not a large circular bite.
- Draw the bridge slightly underneath each cut-in's rounded inner edge so the
  visible bridge ends are curved. Do not let the bridge rectangle start exactly
  where the cut-in ends.
- Round the inner edge of the left cut-in to face inward: `)`.
- Round the inner edge of the right cut-in to face inward: `(`.
- The visible shape should read as `)===(`, not `(===)`.
- Keep the cards' full corner radii. Do not square their adjoining corners.

Recommended structure:

```tsx
<View style={styles.cardUnionRoot}>
  <CardUnionSurface pointerEvents="none" />
  <CardUnion.Item>{content}</CardUnion.Item>
  <View style={styles.unionGap} pointerEvents="none" />
  <CardUnion.Item>{content}</CardUnion.Item>
</View>
```

The SVG cut-in path must use:

```ts
bridgeWidth = measuredUnionWidth * bridgeSpan
slotWidth = (measuredUnionWidth - bridgeWidth) / 2
slotHeight = min(measuredUnionGapHeight, cardUnion.bridge.cutoutThickness)
slotY = midpointBetweenAdjacentItems - slotHeight / 2
```

Round only the inner side of each side cut-out. A left cut-out should have
rounded right corners; a right cut-out should have rounded left corners.

### Horizontal Union

For paired stat cards:

- Use a default `8` point horizontal gap.
- Fill the gap through the SVG silhouette.
- Layer active-canvas cut-ins over the top and bottom edges in the SVG.
- Keep each cut-in visually slim, about `10` points tall, so the center gap
  does not become an hourglass notch.
- Round the inner edge of the top and bottom cut-ins so the center bridge reads
  as the inverse of a standalone pill.
- The remaining canvas must create opposing semicircular cut-ins at the top and
  bottom.
- Both cards must stretch to the same row height.

The horizontal cut-in path must use:

```ts
slotCenterX = midpointBetweenAdjacentItems
slotWidth = gapBetweenItems + cardUnion.bridge.cutoutThickness
slotHeight = cardUnion.bridge.cutoutThickness
```

The top cut-out rounds its bottom corners. The bottom cut-out rounds its top
corners.

## Layering And Layout

- Render the SVG surface below card items.
- Use `zIndex: 0` for the SVG surface and `zIndex: 1` for item content.
- Keep the Card Union root and gap slots at `overflow: "visible"`.
- Items may use `overflow: "hidden"` to clip their own pressed overlays.
- Do not use per-item elevation or shadows inside a union.
- Use one SVG surface token for the full union geometry. Do not give each item
  its own opaque React Native background.
- Vertical unions may contain variable-height items.
- Horizontal Interlocking Pairs must have equal heights and normally contain
  exactly two items.
- Do not create cross-shaped, four-directional, or grid-intersection unions.

## Platform Behavior

- Card Union geometry must be identical on iOS and Android.
- Card Unions use opaque tonal surfaces on both platforms.
- Do not apply iOS glass treatment to union items or bridges.
- Do not add Android elevation independently to individual union items.
- Prefer high surface-to-canvas contrast over shadows for this pattern.
- Edge Cut-Ins must reveal the current theme canvas token, never a
  platform-specific hard-coded color.

## Motion And Haptics

- Never scale one Card Union item independently. This visually tears the union
  apart.
- When the entire union is one action, animate the complete `CardUnion` root.
- When items have separate actions, use a clipped pressed overlay without scale.
- Union gaps, bridges, and cut-ins must not resize or morph during presses.
- The bridge remains decorative and must not trigger haptics.
- Focus indicators for separately interactive items should be rendered inside
  the selected item's bounds rather than around the complete union.

## Tokens

Extend Unistyles tokens with:

```ts
colors: {
  canvas,
  surfaceContrast,
  surfaceContrastForeground,
  surfaceContrastMutedForeground,
  surfaceContrastAccent,
  surfaceContrastPressed,
  surfaceContrastFocus,
  surfaceContrastOutline,
}

cardUnion: {
  radius: { compact: 24, default: 28, hero: 32 },
  gap: { compact: 6, default: 8, relaxed: 12 },
  padding: { compact: 16, default: 20, hero: 24 },
  bridge: {
    capRadius: 999,
    cutoutThickness: 8,
    spanDefault: 0.7,
    spanMin: 0.66,
    spanMax: 0.78,
  },
}
```

`surfaceContrast` and its bridge must resolve to the same opaque color value.
Dark mode must preserve visible contrast between `canvas` and `surfaceContrast`;
do not automatically invert the pattern into bright white cards.

## Playground Requirements

Add examples for:

- Two-card vertical union.
- Three-card vertical union.
- Horizontal Interlocking Pair.
- `compact`, `default`, and `relaxed` gaps.
- Bridge spans of `66%`, `70%`, and `78%`.
- Light and dark themes.
- Separately pressable items.
- One pressable union.
- Dynamic Type and multiline content.
- Narrow and wide device widths.

Include a debug example with temporary outlines around items, gap slots, and
the measured SVG surface. Verify that there are no one-pixel seams at `1x`,
`2x`, or `3x` density.

## Files And Architecture

```txt
src/components/common/CardUnion/
  CardUnion.tsx
  CardUnionSurface.tsx
  CardUnionTypes.ts
  CardUnionUtils.ts
  index.ts
```

The shared component owns all gap and bridge geometry. Screen code may choose
axis, tone, gap, and content, but must not recreate the union with
screen-specific absolute-positioning values.

Tests must cover:

- Vertical and horizontal axes.
- Default `70%` bridge span.
- Span clamping between `66%` and `78%`.
- Decorative bridge accessibility behavior.
- Shared surface-token enforcement.
- Separate-item and whole-group press behavior.
- Light and dark token resolution.

## Anti-Patterns

- Ordinary cards separated only by margin when they are intended to form a
  union.
- A narrow connector spanning less than `66%`.
- A connector wider than `78%` that removes the visible cut-ins.
- A freestanding rounded pill visible between cards, such as `(===)`.
- Rectangular or sharp-ended cut-ins.
- Hard-coded white notch shapes.
- Different colors, opacity, borders, shadows, or elevation between the bridge
  and cards.
- Individual card shadows visible inside the union gap.
- Scaling one item while adjacent items remain stationary.
- A bridge rendered above card content.
- A bridge intercepting gestures or appearing in the accessibility tree.
- Using translucent surfaces where bridge overlap becomes visible.
- A multi-item union drawn as one large rounded rectangle that erases the
  individual card borders.
- Joining unrelated cards solely for decoration.

## Acceptance Checklist

- Related cards form a Linked Surface Group rather than an ordinary card stack.
- A real light canvas cut-in remains visible between cards.
- The Union Bridge fills `66%` to `78%` of the shared edge; default is `70%`.
- Vertical unions leave rounded cut-ins at the left and right edges.
- Horizontal unions leave opposing rounded cut-ins at the top and bottom.
- Cards and bridges use the exact same opaque surface token.
- No gradients, blur, glass, masks, or image-based geometry are used.
- No visible seams appear where the SVG surface meets the item content.
- The bridge has no shadow, border, accessibility role, or touch handling.
- Individual union items do not scale independently.
- Horizontal Interlocking Pairs remain equal-height with Dynamic Type enabled.
- Cut-ins reveal the active theme canvas rather than a hard-coded color.
- The geometry renders consistently on iOS and Android.
