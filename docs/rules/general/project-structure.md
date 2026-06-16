# Project Structure Rules

Use this file for Conecta structure and colocation rules. New code should follow
these buckets and ownership rules. Apply them to touched files when the change
is already in scope.

## Top-Level Buckets

Use these top-level buckets under `src/`:

```text
src/
  App.tsx
  assets/
  components/
    common/
  constants/
  contexts/
  helpers/
  hooks/
  native/
  router/
  screens/
  services/
  state/
  theme/
  types/
  utils/
```

## Ownership and Colocation

Code lives as close as possible to where it is used.

1. Used by a single screen, feature, component, or flow: keep it local.
2. Shared by multiple files in the same feature: move it to the feature root.
3. Reused across unrelated features: promote it to the project's shared
   folders.

Do not use `src/components` as a second `src/screens` tree. Top-level
components are for reusable UI, not screen-specific implementation details.

## Screen-Specific Code

Screen-specific UI, hooks, helpers, constants, and types stay under the screen
when no other owner uses them.

```text
src/screens/Tables/
  TablesScreen.tsx
  components/
    TableHeader.tsx
    TableFooter.tsx
  hooks/
    useTableFilters.ts
  utils.ts
  types.ts
  constants.ts
```

If a screen grows into a multi-file feature, the screen folder remains the
ownership boundary until code is reused outside that screen.

## Reusable UI

Reusable UI belongs under `src/components/common/<ComponentName>`.

```text
src/components/common/Table/
  Table.tsx
  TableHeader.tsx
  TableFooter.tsx
  hooks/
    useStickyHeader.ts
  utils.ts
  types.ts
  constants.ts
```

This is appropriate only when the component is reusable UI, not when it is a
screen-specific implementation detail.

Each component file should own one React component. If the render tree needs a
local visual piece, create a sibling component file. Pure display decisions move
to colocated `utils.ts`. Multi-value behavior that uses state, handlers,
effects, or side effects moves to a colocated hook.

## Support File Naming

- React component files use PascalCase names.
- Small owners can start with `utils.ts`, `types.ts`, and `constants.ts`.
  Split into dedicated folders once multiple support files are needed.
- Avoid creating empty structure upfront.
- Hooks are `useXxx` and live in the nearest owner.
- Use top-level `src/hooks`, `src/utils`, `src/types`, and `src/constants` for
  broadly reusable code.
- Use screen-local or component-local hooks, utils, types, and constants when
  the code belongs to one owner.
- Do not create both `helpers/` and `utils/` inside the same owner. Prefer
  `utils/` for pure helpers unless existing source says otherwise.
- Use `.ios.tsx`, `.android.tsx`, `.native.tsx`, or platform-specific support
  files only when behavior genuinely differs by platform.
- Keep platform-specific files small and limited to the platform behavior.
- Do not create empty folders or placeholder files for possible future reuse.

## Promotion Rules

Promote code only when reuse is real.

- A screen-only helper stays with that screen or its owning feature.
- A component-only helper stays in its folder.
- A helper reused by multiple screens in the same feature moves to that feature
  root when such an owner exists.
- A helper reused across unrelated features moves to a top-level shared folder,
  such as `src/components/common`, `src/hooks`, `src/utils`, or `src/types`.

Never promote because a second consumer might appear later.

## Imports

- Use the import style required by the project.
- Keep public barrels small.
- Export internals only when tests or documented consumers need them.
- Component files should import supporting hooks, utils, types, and constants
  instead of accumulating helper functions inline.
- Use named exports unless a framework or registry requires a default export.
- Use function declarations for React components.

## File Size

Files should stay under about 300 lines. When a file approaches that limit or
becomes hard to reason about, split by responsibility: sibling components,
custom hooks, constants, pure helpers, local types, request mapping, or
loading/empty/error views.

Screen folders should not become shared roots by accident. If multiple screens
share the same state, services, models, or UI, promote that code to the nearest
real shared owner.
