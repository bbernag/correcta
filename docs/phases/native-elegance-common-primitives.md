# Native Elegance Pass For Common Primitives And Glass

Status: implemented and verified on iOS simulator and Android emulator. This
phase ran after Slice 3 and before adding new shared visual components.

Historical note: this Slice 4 document describes the temporary glass fallback
that existed during the native elegance pass. Slice 13 later retired the public
general glass abstraction because no approved production use case remained.

## Status Correction

Slice 3 completed the technical primitive foundation: typed APIs, variants,
states, icons, loading, disabled, focus, helper, error, success, and surface
rails exist. It did not approve the visual design. The current
ComponentPlayground samples are too generic, card-heavy, and web-like to be the
final native direction.

## Goal

Make the existing primitives feel premium, native, elegant, tactile, and
appropriate for repeated language practice before they are reused across new
components and screens.

## Non-Goals

- No new backend, AI, auth, ads, subscriptions, or persistence work.
- No DOM, CSS, selectors, media queries, `className`, browser APIs, or web-only
  conventions.
- No Android imitation of iOS Liquid Glass.
- No glass behind long reading content, sentence prompts, answers, or feedback
  explanations.
- No new shared components beyond the primitives needed for this pass.

## Native Visual Direction

iOS should feel like a quiet Apple-native study surface: soft depth, restrained
glass on compact floating controls, clear typography, and fewer visible borders.
Android should feel native through tonal/elevated surfaces, clear ripple,
measured elevation, and stronger containment where needed.

The visual signature remains the correction rail, but it should be slimmer and
more editorial: a precise annotation mark, not a heavy warning stripe.

## Liquid Glass Rules

Use a shared platform-material abstraction before adopting any required Liquid
Glass dependency. The earlier public glass fallback was retired in Slice 13.

- iOS: allow glass only for compact controls, floating headers, tab/floating
  action backgrounds, small menus, and session overlays.
- Android: use tonal or elevated fallback surfaces with ripple; never fake iOS
  translucency.
- Forbidden: glass behind sentence text, answer text, input fields, feedback
  explanations, long cards, progress labels, or any dense learning content.

Dependency decision:

1. Build a narrowly scoped fallback only after a concrete production use case is
   approved.
2. Verify fallback in iOS and Android light/dark mode.
3. Spike the Liquid Glass dependency only if the fallback cannot achieve the
   desired native iOS feel.
4. Keep dependency usage behind a shared wrapper so screens never import it.

## Component Specs

### AppText

Use system typography only. Screen titles should feel like native large-title
hierarchy, not web hero text. Labels and captions should be quieter and tighter.
Learning text must wrap naturally and never live in fixed-height containers.

### Button

Primary buttons should be calm Scribe Blue filled actions with 52 dp height,
soft radius, no heavy border, and compact icon spacing. Secondary buttons should
feel like native tonal controls, not pale cards. Ghost buttons should be text or
icon-led and visually quiet. Loading should preserve width and replace only the
leading icon area with an activity indicator. Disabled buttons should use muted
surface treatment, not washed-out brand color.

### IconButton

Icon buttons should feel like native toolbar controls. Floating iOS material
treatment requires a concrete production use case. Android should use tonal
circles/squircles with ripple. Touch target remains at least 44 dp.

### Screen

Screens should avoid stacked card demos. Use native spacing, clear safe areas,
and one primary content rhythm. Backgrounds should be calm and allow surfaces
to breathe.

### Surface

Default surfaces should not all look like bordered cards. Use borders only when
separation is needed. Prefer soft fill, subtle shadow on iOS, and tonal
elevation on Android. Status surfaces use a slim correction rail plus semantic
copy, not loud full-card color.

### Platform Material Treatment

No public shared component currently exists for general glass/material use.
Future variants, if approved, should be narrowly scoped to compact controls such
as floating controls, header controls, tab bars, overlays, or menus. Long-form
content is not allowed inside material treatment.

### TextInput

Inputs should look like native composition fields: stable height, subtle fill,
minimal border, strong focus clarity, and helper/error text close to the field.
Focus should not flood the full field with brand color. Success and error states
must include icon/text cues, not color alone.

### ComponentPlayground

Redesign it as a native QA surface, not a pile of cards. Group examples into
compact sections with native headers, fewer nested surfaces, and side-by-side
state comparisons. It should make bad visual decisions obvious.

## Anti-Patterns To Remove

- Generic bordered card stacks.
- Chunky web-like buttons.
- Too many pills or rounded cards.
- Heavy outlines around every surface.
- Glass used decoratively behind reading content.
- Large blocks of pale brand color.
- Component demos that do not resemble real app usage.

## Token Adjustments

Keep Scribe Blue. Do not return to green, teal, mint, or turquoise for brand,
actions, focus, active tabs, selected controls, or tonal surfaces. Green remains
only for success feedback. Consider adding primitive aliases for glass tint,
hairline border, native separator, pressed overlay, and disabled fill if the
current tokens force heavy borders or washed-out states.

## Motion And Haptics

Use one restrained motion language: press scale/opacity, short focus
transitions, and subtle feedback reveal. Do not animate typing. Haptics should
remain meaningful: selection, submit, save, success, warning, and app-level
failure only.

## Accessibility

Dynamic type must not clip learning content. Icon-only controls need accessible
names. Loading, disabled, selected, busy, and error states must be exposed.
Visual states cannot rely on color alone. All interactive controls need at
least a 44 dp target.

## Files To Touch

- `src/components/common/AppText/*`
- `src/components/common/Button/*`
- `src/components/common/IconButton/*`
- `src/components/common/Screen/*`
- `src/components/common/Surface/*`
- `src/components/common/TextInput/*`
- `src/screens/ComponentPlayground/*`
- `src/theme/*` only if token gaps block the native direction.

Do not touch app services, domain workflows, storage, backend adapters, or
screen business logic.

## Exit Criteria

- ComponentPlayground no longer looks like generic web card UI.
- The primitives feel native on iOS and Android using platform-appropriate
  treatment.
- No general public glass abstraction remains unless a concrete production use
  case is approved.
- Buttons, inputs, icon buttons, and surfaces have approved light and dark
  visual states.
- Learning content remains more readable than decorative surfaces.
- Android does not look like copied iOS glass.

## QA Plan

- Run typecheck, lint, and format check.
- Launch iOS simulator and Android emulator.
- Capture ComponentPlayground screenshots in light and dark mode.
- Verify button, input, surface, icon button, disabled, loading, error, success,
  and any approved platform-material states.
- Verify no React Native runtime errors or LogBox overlays.

## QA Evidence

Date: 2026-06-18

Automated checks:

- `npm run typecheck`
- `npm run lint`
- `npm run format:check`

iOS simulator evidence:

- Home loaded from Metro and navigated to ComponentPlayground.
- ComponentPlayground top:
  `/tmp/correcta-native-elegance-ios-playground-top.png`
- Button/input states:
  `/tmp/correcta-native-elegance-ios-playground-mid.png`
- Surface and glass fallback:
  `/tmp/correcta-native-elegance-ios-playground-bottom.png`
- Icon button and haptics section:
  `/tmp/correcta-native-elegance-ios-playground-controls.png`
- Foundation check result:
  `/tmp/correcta-native-elegance-ios-foundation-result.png`

Android emulator evidence:

- Booted `Medium_Phone_API_36.1`, loaded Correcta from the 8081 dev-client
  Metro target, and navigated to ComponentPlayground.
- ComponentPlayground top:
  `/tmp/correcta-native-elegance-android-playground-top.png`
- Input and surface states:
  `/tmp/correcta-native-elegance-android-playground-mid.png`
- Glass fallback and icon buttons:
  `/tmp/correcta-native-elegance-android-playground-glass.png`
- Foundation check result:
  `/tmp/correcta-native-elegance-android-foundation-result.png`

Notes:

- Android React Native accessibility snapshots remain sparse for this app, so
  Android navigation used screenshot-guided coordinate fallback where refs were
  unavailable.
- Metro logged a React Navigation deprecation warning during QA, but no visible
  RedBox or LogBox overlay appeared on iOS or Android.

## AI Implementation Checklist

- Treat Slice 3 visuals as rejected.
- Build or refine a narrowly scoped shared wrapper before applying any platform
  material treatment.
- Remove unnecessary borders from default surfaces.
- Reduce card stacking in ComponentPlayground.
- Make primary buttons native, calm, and Scribe Blue.
- Make secondary controls tonal, not card-like.
- Keep status colors semantic.
- Verify dynamic type and accessibility state.
- Capture screenshots before claiming visual approval.
