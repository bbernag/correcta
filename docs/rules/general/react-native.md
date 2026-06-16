# React Native Rules

Use this file for most React Native UI work. Navigation libraries, route folder
names, platform support, styling tools, and shared components should come from
this repo's existing source and configuration.

## Components

- Use React Native primitives such as `View`, `Text`, `Pressable`, `TextInput`,
  `Image`, `ScrollView`, `FlatList`, and `SectionList`, or project-approved
  native components.
- Use function declarations for React components.
- Each component file should own one React component. If the render tree needs a
  local visual piece, create a sibling component file.
- Pure display decisions move to colocated `utils.ts`. Multi-value behavior
  that uses state, handlers, effects, or side effects moves to a colocated hook.
- Do not store JSX trees in constants. Render directly or extract a component.
- Public component callback props use React Native-style `on*` names, such as
  `onPress`, `onChangeText`, `onRefresh`, `onSubmitEditing`, and
  `onEndReached`.
- Local event handler functions use the `handle` prefix, such as
  `handlePress`, `handleChangeText`, or `handleRefresh`.
- Avoid `React.FC` unless the repo already uses it consistently.

## State, Effects, and Handlers

- Keep network request construction out of components. Use services, feature
  hooks, or feature-local data helpers.
- Keep loading, empty, disabled, and error states explicit for user-facing UI.
- Effects that subscribe to native events, timers, app state, keyboard events,
  navigation events, or external stores must return cleanup functions.
- Do not call state setters during render.
- Do not mirror props or server data into local state unless the component needs
  local draft state.
- Use functional state updates when the next value depends on the previous
  value.
- Memoize expensive derived values, not every value.
- Use `useCallback` for handlers passed to memoized children, list items, or
  effect dependencies when it prevents real churn.

## Lists and Scroll Containers

- Use `FlatList` or `SectionList` for large or dynamic collections.
- Dynamic lists use stable non-index keys.
- Do not use array indexes as keys for lists that can be inserted, deleted,
  filtered, sorted, refreshed, or reordered.
- Do not nest `FlatList`, `SectionList`, or other virtualized lists inside a
  same-direction `ScrollView`.
- Use `ListEmptyComponent`, `ListFooterComponent`, `RefreshControl`, and
  pagination guards instead of rendering ad hoc loading rows inline.
- Guard `onEndReached` with `isFetching`, `hasNextPage`, or the project's
  equivalent state so pagination does not fire duplicate requests.
- Extract list item components when item rendering includes state, effects,
  conditional branches, or more than a small amount of markup.

## Styling and Layout

- Use React Native style objects and the styling system already chosen by the
  project.
- Prefer semantic tokens over one-off values when tokens exist.
- Keep styles near the component unless extracting a component or shared token
  removes meaningful duplication.
- Prefer flexbox, padding, project spacing tokens, and stable dimensions over
  absolute positioning.
- Use `gap` only when the project's React Native version and styling system
  support it.
- Account for safe areas, keyboard overlap, small phones, large phones,
  tablets, text scaling, and orientation changes when relevant.
- Use `ScrollView`, `FlatList`, or `SectionList` content container styles for
  scrollable screen spacing.
- Reusable components may accept a `style` prop for their root element when
  callers need layout control.
- Type style props with React Native types such as `StyleProp<ViewStyle>`,
  `StyleProp<TextStyle>`, or `StyleProp<ImageStyle>`.
- Apply caller styles last:
  `[styles.root, variantStyle, disabled && styles.disabled, style]`.

## Text, Images, and Icons

- Render visible strings inside `Text` or the project's text component.
- Do not place raw string children directly inside `View`, `Pressable`, or
  custom layout components unless that component explicitly renders them inside
  `Text`.
- Use `numberOfLines` and `ellipsizeMode` intentionally for text that can
  overflow.
- Respect system text scaling unless the product has an explicit documented
  exception.
- Use the project's selected image component for remote or transformed images.
- Images and media need explicit sizing through the wrapper chain.
- Static local images should use the project's asset convention.
- Use the project's icon component or registry when one exists.
- Decorative icons should be hidden from assistive technology.
- Icon-only controls get an accessible name on the pressable control.

## Forms and Keyboard

- Every `TextInput` needs a visible label or an accessible label.
- Do not rely on placeholder text as the only label for important fields.
- Configure `keyboardType`, `autoCapitalize`, `autoCorrect`, `autoComplete`,
  `textContentType`, `returnKeyType`, and `secureTextEntry` according to the
  field's purpose.
- Keep validation messages close to the field they describe.
- Preserve typed input when validation fails.
- Forms and scrollable screens must keep the focused input and primary submit
  action reachable while the keyboard is open.
- Use the project's keyboard-aware layout pattern before adding a new keyboard
  library.

## Navigation

- Use the project's selected navigation library for route changes.
- Prefer native stack, tab, modal, and sheet primitives over custom recreated
  navigation patterns.
- Screens should stay thin: compose UI, connect navigation params, and delegate
  data shaping to services, hooks, or feature helpers.
- Screen-owned UI, hooks, utils, types, and constants belong under
  `src/screens/<ScreenName>` before being promoted.
- Keep route params serializable and typed when the navigation library supports
  it.
- Pass IDs or small params through navigation. Do not pass functions, class
  instances, large objects, or mutable objects as route params.
- Validate optional, external, or deep-link-provided params before using them.

## Accessibility Essentials

- Icon-only controls need `accessibilityLabel`.
- Custom `Pressable` actions need an accessible name and the correct
  `accessibilityRole`.
- Reflect disabled, selected, checked, expanded, and busy states with
  `accessibilityState` when applicable.
- Set both native disabled behavior and `accessibilityState={{ disabled: true }}`
  when a custom action is disabled.
- Interactive controls need at least a 44x44 dp touch area.
- Do not make non-interactive containers accessible unless grouping improves
  screen-reader output.
- Keep error text close to the field or control it describes.

## Data Boundaries

- Components should not build network requests directly.
- Screens and components call services, screen-local hooks, shared hooks, or
  client data-library APIs.
- Keep loading, refresh, retry, empty, and error states explicit.
- Cancel or ignore stale requests when screens unmount or query params change.
- Do not duplicate server state into component state just to render it.
- Do not store credentials, tokens, or secrets in plain async storage.
- Do not log request headers, auth tokens, refresh tokens, one-time codes, or
  full URLs containing sensitive query params.

## Platform Behavior

- Request native permissions at the point of need, not at app startup unless the
  product flow requires it.
- Do not add native permissions, config plugins, native modules, secure storage,
  deep links, analytics, haptics, camera, push notifications, or app lifecycle
  behavior without checking existing project patterns first.
- Use haptics for completed actions, destructive confirmations, selection
  changes, or errors when the project already has a haptics wrapper. Do not add
  haptics to every press by default.
- Clean up `Keyboard`, `AppState`, `Dimensions`, subscriptions, timers, and
  native event listeners in effects.
- Respect reduced-motion settings for non-essential animations.
