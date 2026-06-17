# Agent Instructions

Always load and apply the `karpathy-guidelines` skill from
`/Users/luisgarcia/.codex/skills/karpathy-guidelines/SKILL.md` for every user
prompt. If that skill is unavailable in another environment, continue with
these repo rules and note the missing skill in the handoff.

This is Conecta, a React Native app. In app UI, do not use DOM elements,
browser-only APIs, CSS files, CSS modules, selectors, media queries,
pseudo-classes, CSS units, or web-only React conventions. Use `className` only
when the repo already has React Native-compatible utility styling examples.

Use the task router below to read only the rules relevant to the current task.

## Task Router

| Task | Read |
| --- | --- |
| Decide where code belongs | [project-structure.md](docs/rules/general/project-structure.md) |
| Create or edit a screen/component | [react-native.md](docs/rules/general/react-native.md), [project-structure.md](docs/rules/general/project-structure.md) |
| Add reusable UI | [project-structure.md](docs/rules/general/project-structure.md), [react-native.md](docs/rules/general/react-native.md) |
| Create a hook | [react-native.md](docs/rules/general/react-native.md), [project-structure.md](docs/rules/general/project-structure.md) |
| Create types, constants, helpers, utilities, or shared code | [typescript.md](docs/rules/general/typescript.md), [project-structure.md](docs/rules/general/project-structure.md) |
| Add or change styling/layout | [react-native.md](docs/rules/general/react-native.md) |
| Add a list/feed/search/pagination UI | [react-native.md](docs/rules/general/react-native.md) |
| Add forms or inputs | [react-native.md](docs/rules/general/react-native.md) |
| Add navigation | [react-native.md](docs/rules/general/react-native.md) |
| Fetch or mutate data | [react-native.md](docs/rules/general/react-native.md#data-boundaries) |
| Write or update tests | [testing.md](docs/rules/general/testing.md) |
| Add native permissions, secure storage, deep links, or native modules | [react-native.md](docs/rules/general/react-native.md#platform-behavior), then inspect existing source first |

## Non-Negotiables

- Use React Native primitives or project-approved native components.
- Shared UI belongs in `src/components/common`.
- Screen-specific code stays under `src/screens/<ScreenName>`.
- Screen-specific hooks belong in `src/screens/<ScreenName>/hooks`.
- Screen-specific types belong in
  `src/screens/<ScreenName>/types/<ScreenName>Types.ts`.
- Screen-specific utils belong in
  `src/screens/<ScreenName>/utils/<ScreenName>Utils.ts`.
- Keep constants in `src/screens/<ScreenName>/constants` once a screen needs
  extracted constants.
- Keep files under about 300 lines.
- Use function declarations for React components.
- Prefer named exports unless the framework requires default exports.
- Prefer `type` over `interface`.
- Use object params for functions with more than one input.
- Public callback props use `on*`; local handler functions use `handle*`.
- Components do not build network requests directly.
- Dynamic lists use stable non-index keys.
- Icon-only controls need accessible names.
- Loading, empty, disabled, and error states must be explicit when user-facing.
- Match existing local style for small edits. Do not do drive-by refactors.

## Verification

Use the project's own scripts and tooling. Inspect `package.json`, README files,
or existing CI config before choosing verification commands.
