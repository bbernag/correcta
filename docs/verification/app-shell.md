# App Shell Verification

## Scope

- Configured Unistyles themes with semantic colors, spacing, radii,
  typography, shadows, and motion tokens.
- Added common `Screen`, `AppText`, `Surface`, `Button`, and `TextInput`
  components under `src/components/common`.
- Added direct React Navigation routing with a native stack, native bottom tabs,
  and a modal component-check route.
- Added placeholder route owners for Home, Practice, Review, Progress, Library,
  and ComponentPlayground.
- Added small MMKV, native date, and Nitro Fetch service boundaries plus a
  native foundation check action.

## Automated Checks

- TypeScript check: passed with `npm run typecheck`.
- ESLint check: passed with `npm run lint`.
- Expo config resolution: passed with `npx expo config --type public`.
- Expo Doctor: passed with `npx expo-doctor`.
- Prettier check: passed with `npm run format:check`.

## Native Checks

- iOS simulator development build: passed with
  `npx expo run:ios --device "iPhone 16"`.
- iOS physical-device development build: not run yet.
- Android debug build: passed with `./gradlew assembleDebug` from the generated
  `android` project.
- Android emulator development build: passed with `npx expo run:android` on
  `Medium_Phone_API_36.1`.
- Android physical-device development build: not run yet.
- Native foundation check screen: passed on Android emulator. The component
  check route reported MMKV storage, native date formatting, and Nitro Fetch
  adapter readiness.
