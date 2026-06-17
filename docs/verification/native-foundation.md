# Native Foundation Verification

## Runtime Decision

- Scaffold source: `create-expo-app@4.0.0` using the blank TypeScript template.
- Expo SDK: `~56.0.12`.
- React Native: `0.85.3`.
- React: `19.2.3`.
- New Architecture: Expo SDK 56 / React Native 0.85 default path. The SDK 56
  config schema rejects the older explicit `newArchEnabled` field.
- JavaScript engine: Expo SDK 56 / React Native 0.85 default path. The SDK 56
  config schema rejects the older explicit top-level `jsEngine` field.
- App runtime: Expo Dev Client.

## Compatibility Note

The planning docs target React Native 0.86+. The latest official Expo scaffold
available during setup resolved to React Native 0.85.3. The app starts from the
Expo-compatible runtime instead of manually forcing an unsupported React Native
version. Revisit the RN 0.86+ target when Expo publishes a compatible SDK or
the project chooses a controlled canary spike.

## Required Validation

- TypeScript check: passed with `npm run typecheck`.
- ESLint check: passed with `npm run lint`.
- Expo config resolution: passed with `npx expo config --type public`.
- Expo Doctor: passed with `npx expo-doctor`.
- Prettier check: passed with `npm run format:check`.
- iOS simulator development build: passed with
  `npx expo run:ios --device "iPhone 16"` on the iOS 18.3 iPhone 16
  simulator.
- iOS physical-device development build: not run yet.
- Android emulator development build: blocked because `emulator` is not on
  `PATH` and `adb devices` reports no attached devices.
- Android physical-device development build: not run yet.
- Preview or release build: not run yet.

## Known Setup Notes

- The first scaffold dependency install failed because the user npm cache had a
  permission error. Use a project-local temporary npm cache for installs until
  the global npm cache ownership is fixed.
- The app config uses the installed Expo SDK 56 path: `ios.deploymentTarget`
  is set directly, while `expo-build-properties` currently applies Android
  build properties only.
- The first iOS simulator run failed at `pod install` because
  `ios.deploymentTarget` was `16.0`, while the installed Expo podspec requires
  iOS `16.4`. The app config now uses `16.4`.
- The next iOS simulator run built and installed the app, but Metro initially
  failed because `babel-preset-expo` was only available as Expo's nested
  dependency. Adding the SDK-matched `babel-preset-expo@~56.0.15` fixed Metro
  resolution.
- The successful iOS simulator run built native dependencies, installed the
  dev client, opened the app, and bundled `index.ts`. A screenshot confirmed
  the Home screen rendered behind Expo Dev Client's onboarding sheet.
- `react-native-nitro-fetch` provides an Expo config plugin and is registered
  in `app.json`. `react-native-mmkv` and `react-native-nitro-modules` use
  normal React Native autolinking in the installed packages.
- Expo Doctor excludes selected packages from React Native Directory metadata
  checks only: `react-native-nitro-fetch` is a deliberate Nitro dependency,
  `@bernagl/react-native-date` has no directory metadata, and
  `expo-modules-jsi` is pulled through Expo. These still require native build
  validation before product feature work.
