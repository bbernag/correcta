# AI Rules Index

These rule files define reusable guidance for AI assistants and developers
working in the Conecta React Native app.

These rules are intentionally compact. `AGENTS.md` contains always-on project
boundaries. The files below are task-specific and should be read only when
relevant.

## General Rule Files

| File | Scope |
| --- | --- |
| [general/project-structure.md](./general/project-structure.md) | Conecta source buckets, screen colocation, reusable UI, support files, promotion rules, imports, file size |
| [general/react-native.md](./general/react-native.md) | React Native components, styling, accessibility, data boundaries, hooks, lists, forms, navigation |
| [general/typescript.md](./general/typescript.md) | TypeScript, exports, functions, constants, errors |
| [general/testing.md](./general/testing.md) | Test scope, React Native component tests, mocking, assertions, commands |

## Precedence

1. The root `AGENTS.md` task router decides which rule files to read.
2. These general rules define the reusable baseline.
3. The current repo's source code, package scripts, README files, and CI config
   define local conventions when no explicit rule exists.
4. User instructions override these docs for the current task.

## New Code vs Existing Code

- Apply the conventions to new code and to touched files when the change is
  already in scope.
- For minimal edits to older files, match the existing file style instead of
  mixing patterns inside one file.
- Do not run drive-by refactors to modernize files unrelated to the task.
