# TypeScript Rules

Use this file for reusable TypeScript guidance. Local naming, import, and
error-type rules should come from this repo's existing code, formatter, linter,
and TypeScript configuration.

## Types

- Use `type` aliases for object shapes. Do not use `interface` unless a library
  extension or declaration merge specifically requires it.
- Prefer specific types over `any`.
- Use `unknown` at untrusted boundaries, then narrow it.
- Model fixed string values with unions or existing enums instead of loose
  strings.
- Use React Native types for native style and event props, such as
  `StyleProp<ViewStyle>`, `StyleProp<TextStyle>`, `StyleProp<ImageStyle>`,
  `ListRenderItem<T>`, and relevant `NativeSyntheticEvent` types.
- Type navigation params with the selected navigation library's recommended
  pattern when the project supports typed routes.
- Prefer `as const` or `satisfies` for fixed route names, config maps, status
  maps, and variant maps.
- Avoid `React.FC` unless the repo already uses it consistently.
- Keep shared request and response shapes in the service or model layer. UI view
  models belong near the consuming UI.
- Mark type-only imports with `import type`.

## Exports and Functions

- Use named exports unless a framework or registry requires a default export.
- Use function declarations for React components. Plain helpers may be arrow
  constants.
- Use object parameters when a function takes more than one input.
  Standard React and React Native callback signatures may follow the API shape
  expected by the framework or component.
- Memoized components should keep the implementation as a function declaration.
  Export the memoized alias only when memoization is actually needed.
- Use early returns to keep functions flat and readable.
- Keep public barrels small. Export internals only when tests or documented
  consumers need them.
- Prefix intentionally unused parameters with `_`.

## Constants and Named Values

Name values that carry product or domain meaning before using them:

- Analytics event names, tracking keys, screen names, route names, and query
  parameters.
- Route names, deep-link paths, URL segments, storage keys, request header
  names, and native configuration keys.
- Feature flag names and environment variable names.
- Status values, enum-like strings, mode values, sizes, durations, timeouts,
  breakpoints, z-indexes, and animation values.

Do not constant-ify harmless literals such as `0`, `1`, empty strings, boolean
literals, or direct copy with no business meaning.

## Errors and Logging

- Throw typed errors for configuration and request failures. A typed error is
  an `Error` subclass or discriminated error object with a stable `code`, safe
  message, and optional status or retry metadata.
- Sanitize URLs and error messages so tokens, headers, and secrets are not
  exposed.
- Do not log tokens, headers, secrets, one-time codes, or sensitive URLs.
- Low-level requesters throw but do not log. Callers choose fallback behavior
  and log level.

## Formatting and Lint

- Let the project formatter and linter be authoritative.
- Keep files under about 300 lines. Split by responsibility before a file
  becomes hard to reason about.
