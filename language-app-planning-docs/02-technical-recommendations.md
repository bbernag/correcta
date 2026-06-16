# Technical Recommendations: React Native / Expo Dev Client Language App Stack

_Last reviewed: 2026-06-16_

**Document version:** 2.0

**Purpose:** Technical package, architecture, and performance recommendations for starting implementation with Codex or another coding agent.

This document recommends a selective, performance-first React Native stack for the AI sentence translation language app.

_Current decision updates: `@bernagl/react-native-date` is the date library, `zeego` is excluded, Expo packages are treated as optional native modules rather than automatic defaults, `react-native-pulsar` is preferred for rich haptics, `react-native-runtimes` is added only as an advanced performance spike rather than a default MVP dependency, and Software Mansion AI/markdown libraries are future-only unless AI feedback streaming becomes part of MVP._

The app should be built with **Expo Dev Client**, not Expo Go. Expo should be used for EAS Build, prebuild, config plugins, OTA updates, and native-module integration, but the library choices below are not limited to Expo packages. When a non-Expo library is clearly better for performance or native UI, it is recommended.


---

## Codex implementation guardrails

When using Codex, give it these constraints explicitly:

- The app uses **Expo Dev Client**, not Expo Go.
- Do not prioritize Expo packages only because the project uses Expo.
- Prefer native modules, Nitro Modules, JSI-backed libraries, and UI-thread animation tools when they clearly improve performance or native feel.
- Use `@bernagl/react-native-date` for date math, formatting, timezone, and locale work.
- Do not add `zeego`.
- Keep `react-native-runtimes` out of the MVP dependency list; use it only after profiling proves a bottleneck.
- Keep AI generation, validation, moderation, and prompt safety behind service adapters.
- Keep active text-input state local to the screen.
- Avoid large React Context providers for theme or app state.
- Use Unistyles semantic tokens for all styling.
- Build the first vertical slice with mock services before connecting the backend.

---

## 1. Current decisions

### Use these decisions as constraints

- Target **React Native 0.86+**.
- Use **New Architecture** from the start.
- Use **Hermes**.
- Use **Expo Dev Client**, not Expo Go.
- Prioritize native modules, Nitro Modules, JSI, UI-thread animations, and native platform controls.
- Prioritize release-build performance over debug-build convenience.
- Use **`@bernagl/react-native-date`** for date handling.
- Do **not** use **Zeego**.
- Do not choose an Expo package only because the app uses Expo.
- Avoid unmaintained libraries, heavy JS UI kits, and generic cross-platform abstractions that make the app feel less native.

---

## 2. Recommended stack summary

| Area | Primary recommendation | Why |
|---|---|---|
| Runtime | React Native `0.86+`, New Architecture, Hermes, Expo Dev Client | Best baseline for modern native modules, edge-to-edge, Reanimated 4, Nitro Modules, and native UI. |
| Navigation | `@react-navigation/native`, `@react-navigation/native-stack`, `react-native-screens`, `react-native-bottom-tabs`, `@bottom-tabs/react-navigation` | Native stack and native bottom tabs while keeping mature navigation APIs. |
| Edge-to-edge | RN 0.86 built-in edge-to-edge, `react-native-safe-area-context`, optional `@zoontek/react-native-navigation-bar` | Use RN 0.86 built-in behavior first; only add helper libraries when needed. |
| Styling / theming | `react-native-unistyles` v3 | Best fit for fast theme switching, dark mode, variants, and adaptive styling without Context-driven rerenders. |
| Liquid Glass | `@callstack/liquid-glass` | Real iOS Liquid Glass surface support for native-feeling chrome and controls. |
| Native menus | No default menu package; use inline controls first. Optional `@expo/ui/community/menu` or `@react-native-menu/menu` behind an adapter after testing. | No Zeego, no automatic Expo-first choice, and no JS dropdowns for core UX. |
| Native controls | Native/community controls first; selective `@expo/ui` only when it is the best native option. | Expo Dev Client does not mean Expo-first. Choose the best native module per feature. |
| Native sheets / action surfaces | Spike `@swmansion/react-native-bottom-sheet`; evaluate `@lodev09/react-native-true-sheet` only if platform modal sheets test better. | Prefer native sheet mechanics for feedback details, filters, schedule editors, and large action panels. |
| Date/time picker UI | `@react-native-community/datetimepicker` | Native system date/time picker for reminders and quiet hours; separate from `@bernagl/react-native-date` for date math/formatting. |
| Animations | `react-native-reanimated` 4, `react-native-worklets` | Required for high-quality UI-thread animations and modern RN animation patterns. |
| Gestures | `react-native-gesture-handler` 3 | Native-driven gestures for word chips, flashcards, swipe actions, drag/reorder, and cards. |
| Keyboard | `react-native-keyboard-controller` | Critical for a text-input-heavy app; smoother and more controllable than basic keyboard avoidance. |
| Haptics | `react-native-pulsar`; fallback `expo-haptics` only for a simpler MVP | Rich native haptic presets, Reanimated worklet compatibility, and better interaction feedback for a highly animated app. |
| Lists | `@legendapp/list` | Best first choice for history, saved words, review decks, and long dynamic lists. |
| Fallback list | `@shopify/flash-list` v2 | Strong fallback if a specific list screen is better served by FlashList. |
| Server state | `@tanstack/react-query` | Best choice for API cache, retries, mutations, prefetching, and offline-aware sync patterns. |
| API client | `@hey-api/openapi-ts` + TanStack Query plugin | Generate typed API helpers once the backend has an OpenAPI spec. |
| HTTP | `react-native-nitro-fetch` | Nitro-based native HTTP layer; use instead of Axios/fetch for the app API layer. |
| Runtime validation | `zod`; optional `valibot` for hot paths | Zod has the best ecosystem; Valibot is smaller for performance-sensitive validation. |
| Local app state | `@legendapp/state` | Fine-grained updates and local-first patterns; avoids broad global rerenders. |
| Key-value storage | `react-native-mmkv` v4 | Fast sync storage; Nitro-based in v4. Use for preferences, flags, and small cached values. |
| Secure session storage | `react-native-keychain` | Native Keychain/Keystore storage for refresh tokens and sensitive session material. |
| Local database | `react-native-nitro-sqlite` first; benchmark `@op-engineering/op-sqlite` if needed | Use SQLite for history, saved words, mistakes, review queues, mastery states, and offline operations. |
| Dates | `@bernagl/react-native-date` + native ISO/epoch storage | Nitro/C++ date library for high-performance formatting, arithmetic, timezone, locale, and batch operations. |
| Notifications | `expo-notifications` | Currently the safest maintained default for Expo Dev Client. Avoid Notifee because it is archived. |
| Ads | `react-native-google-mobile-ads` | Current best AdMob path for React Native / Expo Dev Client. |
| Charts | `react-native-graph` for performance-focused line/progress charts; Victory Native XL + Skia only if more chart types are needed | Prefer lighter, animated, Skia-based charts for progress analytics. |
| Audio / TTS | `expo-audio`, `expo-speech` for MVP; evaluate `react-native-audio-api` for advanced audio/pronunciation | Keep MVP audio simple, but use Software Mansion Audio API if low-latency audio, waveform, recording, or pronunciation work becomes core. |
| Images | `expo-image` | Better native image performance and caching than the basic React Native Image for many cases. |
| AI mobile SDK | Server-first; optional future `@react-native-ai/apple`, `react-native-executorch`, `react-native-rag` | Keep generation, safety, and moderation server-side first. On-device AI can be future-only. |
| AI feedback rendering | Plain native text first; optional `react-native-streamdown` + `react-native-enriched-markdown` if streaming rich Markdown becomes a product requirement | Do not add streaming markdown complexity unless AI explanations are streamed or formatted heavily. |
| Error reporting | `@sentry/react-native` | Crash reporting, release health, traces, and native error visibility. |
| Release profiling | `react-native-release-profiler`, `reassure`, `react-native-bundle-visualizer` | Profile release-like Hermes behavior, prevent performance regressions, and watch bundle size. |
| Multi-runtime performance | `@react-native-runtimes/core`, `@react-native-runtimes/state` as Phase 2 / spike only | Promising for heavy screens, headless work, and threaded list rendering, but advanced enough that it should be proven with profiling before becoming a dependency. |
| Native pager and sliders | `react-native-pager-view`, `@react-native-community/slider` or Callstack `react-native-slider` | Use native controls for onboarding, placement test paging, review carousels, and goal/strictness sliders. |
| AI/dev performance tools | Software Mansion `argent`, Callstack `agent-device`, Margelo `react-native-skills` as optional tools | Useful for AI-assisted QA, device automation, debugging, and keeping agent work aligned with RN libraries. |
| E2E tests | `maestro` first; `detox` only if needed | Maestro is simpler and fast for product flows. Detox is useful later for deeper native automation. |

---

## 3. Baseline runtime recommendation

### Use

```txt
react-native 0.86+
new architecture
hermes
expo-dev-client
expo-build-properties
expo-updates
```

### Why

React Native 0.86 is the target because it includes broader Android 15+ edge-to-edge support and newer DevTools improvements. Expo Dev Client gives the project Expo’s build/update tooling without limiting the app to Expo Go.

### Rules

- Do not develop the real app in Expo Go after native modules are added.
- Keep New Architecture enabled from the beginning.
- Test every native module in an actual development build.
- Test performance in release builds on real devices.
- Include one low-end Android device in performance testing.
- Pin native module versions more carefully than pure JS packages.
- Use `expo prebuild --clean` in CI before release builds to catch native configuration drift.

---

## 4. Navigation and app shell

### Recommended libraries

```txt
@react-navigation/native
@react-navigation/native-stack
react-native-screens
react-native-safe-area-context
react-native-bottom-tabs
@bottom-tabs/react-navigation
```

### Recommendation

Use React Navigation directly, but use native primitives wherever possible:

- `@react-navigation/native-stack` for stack navigation.
- `react-native-screens` for native screen containers.
- `react-native-bottom-tabs` with `@bottom-tabs/react-navigation` for native bottom tabs.
- `react-native-safe-area-context` for safe-area handling.

### Main tabs

- Home.
- Practice.
- Review.
- Progress.
- Library / Saved.

Keep the tab count to five or fewer.

### Expo Router decision

Do not use Expo Router by default.

Expo Router is productive, but it is not a performance advantage by itself. Since this app cares about native shell control, explicit navigation configuration, and native tabs, direct React Navigation is the cleaner default.

---

## 5. Edge-to-edge behavior

### Recommended libraries

```txt
react-native-safe-area-context
react-native-screens
react-native-unistyles
```

Optional:

```txt
@zoontek/react-native-navigation-bar
```

### Recommendation

For React Native 0.86+, rely on RN’s built-in Android edge-to-edge support first.

Do **not** add `react-native-edge-to-edge` by default on RN 0.86+. Add it only if a real issue appears after testing on the target Android versions.

Use `@zoontek/react-native-navigation-bar` only if the app needs direct Android navigation bar style control.

### App-specific rules

- Main visual surfaces can extend edge-to-edge.
- Sentence cards and translation inputs must respect readable safe areas.
- Bottom tabs and floating submit bars must respect safe-area insets.
- Keyboard behavior must be tested with gesture navigation and three-button Android navigation.
- Do not place critical text under status/navigation bars.

---

## 6. Styling, design system, and dark mode

## Primary recommendation: `react-native-unistyles` v3

```txt
react-native-unistyles
react-native-nitro-modules
```

Use Unistyles as the styling foundation.

### Why

Dark mode and visual polish matter, but performance matters more. Avoid a theme system that forces broad React rerenders through Context.

Unistyles is the best fit because it supports:

- Theme-aware styles.
- Adaptive light/dark themes.
- Variants.
- Runtime values.
- StyleSheet-like API.
- Nitro/C++ based internals.
- Theme switching without rerendering large parts of the component tree.

### Dark mode architecture

Use semantic tokens, not raw colors inside components.

Recommended structure:

```txt
src/styles/
    themes.ts
    typography.ts
    spacing.ts
    radii.ts
    shadows.ts
    stylesheet.ts
```

Example theme shape:

```ts
export const lightTheme = {
    colors: {
        background: "#F7F6F2",
        surface: "#FFFFFF",
        surfaceElevated: "#F0EFEB",
        textPrimary: "#1F2933",
        textSecondary: "#667085",
        border: "#D6D3CC",
        primary: "#1E3A8A",
        success: "#157F3B",
        warning: "#B7791F",
        error: "#B42318",
        mistakeWrongWord: "#B42318",
        mistakeMissingWord: "#B7791F",
        mistakeWordOrder: "#1E3A8A",
    },
    spacing: {
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 24,
        xxl: 32,
    },
    radii: {
        sm: 8,
        md: 12,
        lg: 20,
        xl: 28,
        pill: 999,
    },
};

export const darkTheme = {
    ...lightTheme,
    colors: {
        background: "#0F1115",
        surface: "#171A21",
        surfaceElevated: "#20242D",
        textPrimary: "#F5F7FA",
        textSecondary: "#A7ADB7",
        border: "#333846",
        primary: "#8EA7FF",
        success: "#5FD18A",
        warning: "#F0B44C",
        error: "#FF8A7A",
        mistakeWrongWord: "#FF8A7A",
        mistakeMissingWord: "#F0B44C",
        mistakeWordOrder: "#8EA7FF",
    },
};
```

Register themes once:

```ts
import {StyleSheet} from "react-native-unistyles";

StyleSheet.configure({
    themes: {
        light: lightTheme,
        dark: darkTheme,
    },
    settings: {
        adaptiveThemes: true,
    },
});
```

Use styles like this:

```tsx
import {StyleSheet} from "react-native-unistyles";

export function SentenceCard({sentence}: {sentence: string}) {
    return (
        <View style={styles.card}>
            <Text style={styles.label}>Sentence to translate</Text>
            <Text style={styles.sentence}>{sentence}</Text>
        </View>
    );
}

const styles = StyleSheet.create((theme) => ({
    card: {
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.border,
        borderRadius: theme.radii.xl,
        borderWidth: 1,
        padding: theme.spacing.xl,
    },
    label: {
        color: theme.colors.textSecondary,
        fontSize: 14,
        marginBottom: theme.spacing.sm,
    },
    sentence: {
        color: theme.colors.textPrimary,
        fontSize: 28,
        fontWeight: "700",
        lineHeight: 34,
    },
}));
```

### Performance rules

- Do not use React Context for theme values in hot UI.
- Do not create styles inline inside frequently rendered list rows.
- Do not generate dynamic style objects on every render for history rows, word rows, or chips.
- Use Unistyles variants for component states.
- Use semantic tokens for mistake colors and status colors.
- Keep layout tokens shared across light and dark themes.

### Tailwind-style alternatives

Do not use Tailwind styling as the default for this app.

`NativeWind` and `Uniwind` can be productive, but this app’s goal is premium native UI, predictable performance, dark mode, and native-feeling motion. Use Unistyles as the foundation.

Use Uniwind only if the team strongly prefers Tailwind syntax after prototyping. Do not mix Unistyles, NativeWind, and Uniwind in the core component system.

---

## 7. Native UI, Liquid Glass, menus, sheets, and native controls

### Recommended libraries

```txt
@callstack/liquid-glass
@swmansion/react-native-bottom-sheet
@react-native-community/datetimepicker
```

Conditional libraries only after a screen-level spike:

```txt
@expo/ui
@react-native-menu/menu
@lodev09/react-native-true-sheet
```

Do not use:

```txt
zeego
```

### Decision rule

This is an Expo Dev Client app, but Expo libraries should not be chosen automatically. Use Expo packages when they are the best native option for the specific feature. Use non-Expo native modules when they are faster, more mature, or closer to platform behavior.

### Liquid Glass recommendation

Use `@callstack/liquid-glass` for iOS 26 Liquid Glass surfaces.

Use it for:

- Bottom navigation background.
- Floating practice controls.
- Validation mode chip.
- Hint / skip control group.
- Session summary overlay.
- Achievement modal header.
- Small action panels.

Do not use it for:

- Main sentence card background.
- Translation input background.
- Long feedback explanations.
- Dense charts.
- Full-screen backgrounds.
- All cards on the screen.

### Liquid Glass requirements

- Build with Xcode 26+.
- Use Expo Dev Client, not Expo Go.
- Always check `isLiquidGlassSupported`.
- Always define fallback styles.
- Test readability over light and dark backgrounds.
- Avoid stacking many glass views.
- Avoid animating too many glass surfaces at the same time.

Example usage direction:

```tsx
import {
    LiquidGlassView,
    isLiquidGlassSupported,
} from "@callstack/liquid-glass";

export function PracticeActionBar({children}: {children: React.ReactNode}) {
    return (
        <LiquidGlassView
            interactive
            effect="regular"
            style={[
                styles.container,
                !isLiquidGlassSupported && styles.fallback,
            ]}
        >
            {children}
        </LiquidGlassView>
    );
}
```

### Menus and action surfaces

Do **not** use `zeego` for this project.

Default approach:

- Avoid dropdowns where inline controls are clearer.
- Use segmented controls or chips for validation mode.
- Use inline swipe/actions for saved words where possible.
- Use a sheet for richer action surfaces.
- Keep all menus behind an app adapter so the implementation can change without touching feature code.

Recommended adapter shape:

```txt
src/components/native/MenuActionSurface.tsx
src/components/native/NativeSheet.tsx
src/components/native/ValidationModeSelector.tsx
```

Use native menus only for small, simple action lists:

- More menu.
- Sentence overflow actions.
- Saved word secondary actions.
- Review deck secondary actions.

For these small menus, evaluate `@expo/ui/community/menu` and `@react-native-menu/menu` in a short spike. `@expo/ui/community/menu` wraps SwiftUI Menu/ContextMenu on iOS and Jetpack Compose DropdownMenu on Android, while `@react-native-menu/menu` is the direct community menu package. Pick one only after testing RN 0.86, New Architecture, Android, iOS, accessibility, long-press behavior, and EAS Build.

Do not install both menu libraries permanently unless a specific platform bug forces it.

### Native sheets

Use sheets for bigger interactions:

- Mistake explanation detail.
- Review filters.
- Notification schedule editor.
- Topic selector.
- Goal editor.
- Session summary actions.
- Saved-word detail.

Primary sheet spike:

```txt
@swmansion/react-native-bottom-sheet
```

Why this is the preferred spike:

- Native sheet mechanics.
- Inline and modal sheet components.
- No hard dependency on Reanimated or Gesture Handler for the sheet mechanics.
- Good fit for a React Native 0.86 / New Architecture app where JS can be busy during AI feedback, list updates, or chart rendering.

Fallback sheet option:

```txt
@lodev09/react-native-true-sheet
```

Use this if the product needs a more platform-presented, true native modal sheet feel and it tests better than Software Mansion's sheet in the app.

Do **not** use `@gorhom/bottom-sheet` as the default for this project right now. It is a strong library, but the app is targeting RN 0.86 and Reanimated 4. Keep it as a fallback only if the newer native-sheet options do not pass the product's needs.

### Native controls

Use native/community controls first when the app needs a real platform picker or selector.

Recommended for notification time/date picking:

```txt
@react-native-community/datetimepicker
```

Use this for:

- Reminder time picker.
- Quiet hours picker.
- Custom daily goal reset time if exposed.

This is separate from `@bernagl/react-native-date`. The date package handles date math, formatting, localization, timezone, and scheduling calculations. The date/time picker handles the native UI for choosing a date or time.

Use `@expo/ui` selectively only when it is better than the community/native module for a specific component:

- A specific SwiftUI/Jetpack Compose control looks or behaves better.
- The component is stable on the app's RN/Expo version.
- It passes Android, iOS, accessibility, and performance testing.

Do not use `@expo/ui` as the entire design system. Keep app-specific surfaces in React Native views styled with Unistyles.

---

## 8. Animations, gestures, haptics, and keyboard

### Recommended libraries

```txt
react-native-reanimated
react-native-worklets
react-native-gesture-handler
react-native-keyboard-controller
react-native-pulsar
# optional fallback only: expo-haptics
```

### Animation requirements

Use Reanimated for:

- Sentence card enter/exit.
- Submit button feedback.
- Mistake highlight reveal.
- Word-chip selection.
- Word-chip reorder.
- Flashcard flip.
- Progress ring/bar fill.
- Streak/achievement celebration.
- Swipe actions.
- Bottom sheet interactions.
- Keyboard-aware transitions.

### Gesture requirements

Use Gesture Handler for:

- Scrambled word chip taps.
- Dragging/reordering selected word chips.
- Swipe-to-skip sentence.
- Flashcard swipes.
- Long-press sentence actions.
- Pull-to-refresh history/progress where needed.

### Keyboard requirements

Use `react-native-keyboard-controller` for:

- Translation input screen.
- Sticky submit button above keyboard.
- Practice screen with text input.
- Feedback screen with retry input.
- Settings forms.

Avoid basic `KeyboardAvoidingView` for important screens.

### Haptics recommendation

Use `react-native-pulsar` as the default haptics library. The app depends heavily on tactile feedback for chip selection, answer submission, correction feedback, saved-word confirmation, and level-up moments.

Use `expo-haptics` only if the MVP needs the smallest possible haptics surface and the team decides to defer richer haptic patterns.

### Haptics rules

Use haptics lightly:

- Soft tap on chip select.
- Stronger feedback on submit.
- Success haptic when answer is correct.
- Gentle warning haptic for incorrect answer.
- Small confirmation when saving a word/sentence.

Do not use haptics repeatedly during text input.

---

## 9. Sentence builder / scrambled words UI

This app has an optional beginner mode where the user builds the target-language translation using scrambled word chips.

### Required libraries

```txt
react-native-reanimated
react-native-worklets
react-native-gesture-handler
react-native-keyboard-controller
react-native-pulsar
# optional fallback only: expo-haptics
```

### UI behavior

- The source sentence appears at the top.
- The answer area accepts selected word chips.
- The word bank shows scrambled target-language words.
- Tapping a chip moves it into the answer area.
- Tapping a selected chip removes it from the answer area.
- Dragging should allow reordering when enabled.
- The user can clear the answer.
- The user can submit the built sentence.
- Advanced users can disable this and type normally.

### Performance rules

- Use stable IDs for chips.
- Keep chip state local to the screen.
- Do not update global state on every chip tap.
- Use Reanimated shared values only for animation state.
- Do not create new chip style objects during every render.
- Keep haptics short and infrequent.

---

## 10. Lists and large data screens

### Recommended libraries

```txt
@legendapp/list
@shopify/flash-list
```

### Primary recommendation

Use `@legendapp/list` first for:

- History.
- Saved words.
- Saved sentences.
- Mistake notebook.
- Review queues.
- Notification history.
- Long progress-detail screens.

Use `@shopify/flash-list` only as a fallback for screens where it performs better in real benchmarks.

### Performance rules

- Avoid expensive row components.
- Precompute derived row labels.
- Avoid formatting dates inside row render functions.
- Avoid heavy shadows inside long lists.
- Use stable item keys.
- Keep row animations simple.
- Paginate or window history aggressively.
- Store normalized list data in SQLite.

---

## 11. Server state, API client, and HTTP

### Recommended libraries

```txt
@tanstack/react-query
@hey-api/openapi-ts
react-native-nitro-fetch
zod
valibot
```

### HTTP recommendation

Use:

```txt
react-native-nitro-fetch
```

Use it as the app’s API transport layer instead of Axios.

Why:

- Native/Nitro path.
- Drop-in fetch-like API.
- Good fit for performance-focused React Native.
- Better future path for prefetching and workletized mapping.

### TanStack Query usage

Use TanStack Query for:

- User profile.
- Current learning plan.
- Sentence generation requests.
- Answer validation requests.
- Saved words/sentences sync.
- Review deck sync.
- Progress summaries.
- Notification preferences sync.

### API generation

Use `@hey-api/openapi-ts` after the backend has an OpenAPI spec.

Recommended direction:

- Generate typed API functions.
- Generate request/response types.
- Integrate with TanStack Query.
- Keep backend contracts versioned.

### Runtime validation

Use `zod` for:

- API response validation.
- AI output shape validation.
- Form validation in non-hot settings screens.

Use `valibot` only if a specific hot path needs a smaller/faster validator.

### Performance rules

- Do not validate translation input through a heavy schema on every keystroke.
- Do not run AI response parsing on the UI thread if the payload is large.
- Normalize server data before writing to SQLite.
- Use optimistic updates for save/unsave actions.
- Queue offline mutations for saved words, saved sentences, and completed review items.

---

## 12. Local state management

### Recommended library

```txt
@legendapp/state
```

### Use local state for

- Current practice session.
- Current sentence.
- Scrambled word chip state.
- Selected validation mode.
- Draft translation input.
- UI preferences.
- Theme setting.
- User session state after token load.

### Do not use global state for

- Every keystroke in the translation input.
- Every chip animation frame.
- Every Reanimated value.
- Server cache data already managed by TanStack Query.
- Large history data better stored in SQLite.

### Why not Redux by default

Redux Toolkit is solid, but it is not necessary here. The app benefits more from fine-grained state updates, local-first patterns, and less boilerplate.

---

## 13. Storage, session handling, and offline data

## 13.1 Secure session storage

### Recommended library

```txt
react-native-keychain
```

Use for:

- Refresh token.
- Sensitive auth material.
- Optional encrypted user secrets.

Do not store tokens in AsyncStorage or plain MMKV.

### Session model

Recommended session layers:

1. Access token in memory.
2. Refresh token in Keychain/Keystore.
3. User preferences in MMKV.
4. User-generated learning data in SQLite.
5. Server cache in TanStack Query.

## 13.2 Key-value storage

### Recommended library

```txt
react-native-mmkv
```

Use for:

- Theme preference.
- Language pair.
- Validation mode.
- Last selected topic.
- Feature flags.
- Onboarding completed.
- Small local counters.
- Last app open timestamp.

Do not use MMKV as the main database.

## 13.3 Local database

### Primary recommendation

```txt
react-native-nitro-sqlite
```

### Alternative to benchmark

```txt
@op-engineering/op-sqlite
```

### Use SQLite for

- Practice history.
- Saved words.
- Saved sentences.
- Mistakes.
- Mistake categories.
- Review schedules.
- Flashcard states.
- Mastery status.
- Weekly summaries.
- Offline sync queue.

### Recommendation

Start with `react-native-nitro-sqlite` because it aligns with the app’s Nitro Modules direction.

Benchmark `@op-engineering/op-sqlite` before final database lock-in if:

- Migrations become complex.
- Expo/RN compatibility issues appear.
- Query throughput is not good enough.
- Background/off-thread behavior needs different tradeoffs.

### ORM decision

Do not add an ORM by default.

Start with:

- Small repository layer.
- Raw SQL for hot paths.
- Explicit migrations.
- Typed result mappers.

Add `drizzle-orm` only if developer productivity clearly improves and the selected SQLite library has a clean integration.

---

## 14. Dates and time

## Primary recommendation: `@bernagl/react-native-date`

### Recommended libraries

```txt
@bernagl/react-native-date
react-native-nitro-modules
```

Also use native primitives for storage boundaries:

```txt
Date
UTC ISO strings
epoch milliseconds
```

### Why this is the default

Use `@bernagl/react-native-date` because the app will render, group, schedule, and compare many dates across:

- Practice history.
- Saved words.
- Saved sentences.
- Review queues.
- Spaced repetition schedules.
- Streaks.
- Daily goal resets.
- Weekly reports.
- Notification times.
- Progress charts.

The library is powered by C++ and Nitro Modules, provides native localization, timezone helpers, date arithmetic, comparisons, relative time, and async batch operations.

### Storage model

Store dates as:

- UTC ISO strings for synced server data.
- Epoch milliseconds for high-frequency local event timestamps.
- `localDayKey` strings for grouping, such as `2026-06-16`.
- User timezone separately when needed for reminders and daily goals.

Example model:

```ts
export type UserTimePreferences = {
    timezone: string;
    dailyGoalResetHour: number;
    quietHoursStart: string;
    quietHoursEnd: string;
};

export type PracticeEvent = {
    id: string;
    occurredAtMs: number;
    occurredAtIso: string;
    localDayKey: string;
    timezone: string;
};
```

### Use `@bernagl/react-native-date` for

- Formatting history dates.
- Formatting weekly report ranges.
- Formatting notification copy.
- Timezone-aware “today” checks.
- Daily goal reset boundaries.
- Quiet hours.
- Review scheduling.
- Spaced repetition intervals.
- Streak calculations.
- Difference in days/weeks.
- Date grouping for lists.
- Batch formatting for long history lists.

### Performance rules

- Do not format dates inside every render of a long list.
- Precompute and store `localDayKey` for history sections.
- Use batch formatting for large history/progress views.
- Keep timestamps as numbers in hot local database operations.
- Convert to display strings at view-model boundaries, not inside row components.
- Avoid Moment.js.
- Avoid Luxon by default.
- Avoid Day.js by default.
- Avoid `date-fns` by default unless a specific helper is missing and the added bundle cost is justified.

---

## 15. Notifications

### Recommended library

```txt
expo-notifications
```

### Why

Use `expo-notifications` even though this is an Expo Dev Client app and not Expo Go, because it is currently the safest maintained default for scheduling, presenting, receiving, and responding to notifications in an Expo/EAS setup.

Do not use Notifee by default because the repository is archived/read-only.

### Use notifications for

- Daily practice reminder.
- Word of the day.
- Sentence challenge.
- Mistake review reminder.
- Goal reminder.
- Weekly report ready.
- Quiet, non-guilt-based reactivation.

### Rules

- Store notification preferences in MMKV and sync them to the server if needed.
- Store scheduled notification metadata in SQLite.
- Use `@bernagl/react-native-date` for local timezone and quiet-hour logic.
- Never send too many notifications.
- Let the user disable each notification category.
- Never include sensitive content in notifications.

---

## 16. Ads and monetization

### Recommended library

```txt
react-native-google-mobile-ads
```

### Use for

- Rewarded ads after session summary.
- Rewarded bonus hints.
- Rewarded streak freeze.
- Non-intrusive ad after daily goal completion.

### Rules

- Never show ads while typing.
- Never show ads before correction feedback.
- Never show ads inside feedback.
- Never show ads immediately after an incorrect answer.
- Load ad assets outside the critical practice flow.
- Track ad-related drop-off.

### Future subscriptions

If paid plans are added later, consider:

```txt
react-native-purchases
```

Use it only when subscriptions are real, not during MVP.

---

## 17. Charts, graphics, and progress UI

### Recommended libraries

```txt
react-native-graph
@shopify/react-native-skia
react-native-reanimated
```

Optional if the app later needs many chart types:

```txt
victory-native
```

### Use for

- Accuracy trend.
- Words learned vs. difficult words.
- Mistake categories.
- Practice calendar.
- Level progress.
- Review success rate.

### Recommendation

Use `react-native-graph` first for polished, animated line/progress charts. It is a better fit for this app's small number of high-quality progress visuals than a broad charting system.

Use Victory Native XL only if the app needs several chart families that would be expensive to build manually.

### Rules

- Do not overbuild analytics.
- Keep charts simple.
- Precompute chart data outside render.
- Avoid charts on the main practice screen.
- Use animations only when they clarify progress.
- Avoid rendering large chart datasets on the critical practice path.

---

## 18. Audio, speech, and pronunciation

### Recommended MVP libraries

```txt
expo-audio
expo-speech
```

### Advanced audio spike

```txt
react-native-audio-api
```

### Use for

- Playing sentence audio.
- Speaking target-language sentences.
- Speaking saved words.
- Speaking saved sentences.

### Recommendation

Use `expo-audio` and `expo-speech` for the first version if the app only needs simple playback and text-to-speech.

Evaluate `react-native-audio-api` if the product adds pronunciation scoring, waveform feedback, low-latency recording, audio effects, or advanced listening exercises. Do not add it during MVP unless audio becomes a core differentiator.

---

## 19. Images and icons

### Recommended libraries

```txt
expo-image
@expo/vector-icons
```

### Use `expo-image` for

- Cached illustrations.
- Profile images if needed.
- Remote images for future content packs.

### Icon rules

- Use a small icon set.
- Do not import many icon packs.
- Prefer simple line icons.
- Do not use icons as the only indicator of mistake type.

---

## 20. AI, teacher behavior, and AI developer tools

### Recommendation

Keep AI generation, validation, moderation, and safety on the backend.

The mobile app should call your backend through:

```txt
react-native-nitro-fetch
@tanstack/react-query
@hey-api/openapi-ts
zod
```

### Why server-first AI

- Better moderation.
- Easier prompt updates.
- Centralized validation rules.
- Better analytics.
- Lower risk of unsafe sentence generation.
- Easier model/provider changes.

### Optional future on-device AI

Evaluate later:

```txt
@react-native-ai/apple
@react-native-ai/dev-tools-plugin
react-native-executorch
react-native-rag
@react-native-rag/executorch
react-native-skills
```

Use only for optional local features, such as lightweight hints, offline explanations, embeddings, pronunciation helpers, local semantic search over saved words/sentences, or privacy-sensitive local operations. Do not depend on on-device AI for MVP sentence generation or validation.

Use `react-native-rag` and `@react-native-rag/executorch` only if the app later needs local RAG, embeddings, semantic search, or offline AI over the user's saved words, sentences, and mistake history.

Use `react-native-skills` as an optional developer/AI-workflow reference, not as a runtime dependency, unless the product explicitly adds mobile agent skills.

### Optional AI feedback rendering

Use plain native text for MVP feedback explanations. Evaluate these only if the app needs rich or streamed AI explanations:

```txt
react-native-streamdown
react-native-enriched-markdown
remend
```

Do not use Markdown rendering for simple one-paragraph corrections. Add it only for streamed explanations, formatted grammar notes, tables, or lesson-like feedback.

---

## 21. Forms and validation

### Recommended libraries

```txt
react-hook-form
zod
@hookform/resolvers
valibot
```

### Use React Hook Form for

- Onboarding forms.
- Settings.
- Notification preferences.
- Profile setup.
- Goal setup.

### Do not use form libraries for

- The main translation input hot path.
- Every keystroke in practice.
- Scrambled word chip state.

For the practice input, use local component state and submit validation only.

---

## 22. Observability and performance profiling

### Recommended libraries

```txt
@sentry/react-native
react-native-release-profiler
reassure
react-native-bundle-visualizer
```

### Use Sentry for

- JS crashes.
- Native crashes.
- Release health.
- Slow app starts.
- API failure visibility.
- Navigation traces.

### Use release profiling for

- Practice screen startup.
- History list scroll.
- Saved words list scroll.
- Feedback render time.
- Sentence builder chip interactions.
- Chart rendering.

### Performance rules

- Profile release builds.
- Test on low-end Android.
- Capture slow screens before optimizing blindly.
- Add Reassure checks for expensive component regressions.
- Run bundle visualization before major releases.
- Track time-to-first-practice.
- Track correction feedback latency.

---

## 23. Testing

### Recommended libraries/tools

```txt
jest
@testing-library/react-native
maestro
detox
```

### Recommendation

Use:

- Jest for pure functions and view-models.
- React Native Testing Library for components.
- Maestro for core user flows.
- Detox only if deeper native automation becomes necessary.

### Test priorities

- Onboarding.
- Starting practice.
- Typing answer.
- Building sentence from scrambled words.
- Submitting answer.
- Receiving feedback.
- Saving words/sentences.
- Reviewing flashcards.
- Notification preference setup.
- Dark mode rendering.

---

## 24. Build, release, and updates

### Recommended libraries/tools

```txt
expo-dev-client
expo-build-properties
expo-updates
eas-cli
```

### Use EAS for

- Development builds.
- Preview builds.
- Production builds.
- iOS signing.
- Android signing.
- OTA updates.

### OTA update rules

Use OTA updates for:

- UI copy changes.
- Prompt copy changes that live in the client.
- Non-native bug fixes.
- Small UI adjustments.

Do not rely on OTA updates for:

- Native module changes.
- Permission changes.
- New native capabilities.
- App Store / Play Store policy-sensitive changes.

---

## 25. Recommended install groups

Exact versions should be chosen at implementation time based on the Expo SDK/RN version being used.

### Foundation

```bash
npm install @react-navigation/native @react-navigation/native-stack
npm install react-native-bottom-tabs @bottom-tabs/react-navigation
npx expo install react-native-screens react-native-safe-area-context
npx expo install expo-dev-client expo-build-properties expo-updates
```

### Styling and native UI

```bash
npm install react-native-unistyles react-native-nitro-modules
npm install @callstack/liquid-glass
npm install @swmansion/react-native-bottom-sheet
npx expo install @react-native-community/datetimepicker
```

Conditional native UI spikes:

```bash
npx expo install @expo/ui
npm install @react-native-menu/menu
npm install @lodev09/react-native-true-sheet
```

### Animation, gestures, keyboard, and haptics

```bash
npx expo install react-native-reanimated react-native-worklets
npm install react-native-gesture-handler
npm install react-native-keyboard-controller
npm install react-native-pulsar
# Optional fallback only:
# npx expo install expo-haptics
```

### Lists

```bash
npm install @legendapp/list
npm install @shopify/flash-list
```

### API, HTTP, and validation

```bash
npm install @tanstack/react-query
npm install @hey-api/openapi-ts
npm install react-native-nitro-fetch
npm install zod valibot
```

### State and storage

```bash
npm install @legendapp/state
npm install react-native-mmkv
npm install react-native-keychain
npm install react-native-nitro-sqlite
```

Optional database benchmark:

```bash
npm install @op-engineering/op-sqlite
```

### Dates

```bash
npm install @bernagl/react-native-date react-native-nitro-modules
```

### Notifications, ads, media, and charts

```bash
npx expo install expo-notifications
npm install react-native-google-mobile-ads
npx expo install expo-audio expo-speech expo-image
# Optional advanced audio:
# npm install react-native-audio-api
npm install react-native-graph
npx expo install @shopify/react-native-skia
# Optional if broader chart types are needed:
# npm install victory-native
```

### Forms, monitoring, and tests

```bash
npm install react-hook-form @hookform/resolvers
npm install @sentry/react-native
npm install react-native-release-profiler
npm install --save-dev reassure react-native-bundle-visualizer
npm install --save-dev jest @testing-library/react-native maestro
```

### Optional AI and rich-feedback spikes

```bash
# Only if streaming rich AI feedback becomes a product requirement:
npm install react-native-streamdown react-native-enriched-markdown remend

# Only if local AI/RAG becomes a future product requirement:
npm install react-native-executorch react-native-rag @react-native-rag/executorch
```

---

## 26. Libraries not recommended as defaults

| Library / category | Reason |
|---|---|
| Zeego | Project decision: do not use it. Keep menu actions behind an adapter and evaluate `@expo/ui/community/menu` or `@react-native-menu/menu` only if a true native menu is needed. |
| `@gorhom/bottom-sheet` as default | Strong and widely used, but not the default for this RN 0.86/Reanimated 4 performance target. Spike `@swmansion/react-native-bottom-sheet` first. |
| Axios | Not needed if using Nitro Fetch; no mobile-native performance advantage. |
| Notifee | Repository is archived/read-only; do not use as a new dependency. |
| Moment.js | Large and unnecessary; use `@bernagl/react-native-date`. |
| Luxon | Avoid by default; use `@bernagl/react-native-date` for timezone/date handling. |
| Day.js | Avoid by default; use only if a tiny non-native utility is needed outside hot paths. |
| date-fns | Avoid by default now that `@bernagl/react-native-date` is the date choice. Add only for a specific missing helper. |
| AsyncStorage for hot paths | Too slow for frequent preferences and not appropriate for sensitive data. |
| `react-native-runtimes` as default architecture | Useful advanced performance tool, but too complex for P0. Add only after profiling proves the main JS runtime is the bottleneck. |
| `react-native-quick-sqlite` | Deprecated in favor of `react-native-nitro-sqlite`. |
| `react-native-wishlist` | Interesting Margelo list prototype, but not the production default over Legend List / FlashList. |
| `react-native-filament` | Excellent for 3D rendering, but unnecessary for this language-learning app. |
| Heavy JS UI kits | The app needs native-feeling UI, not a generic cross-platform component kit. |
| React Native Paper / NativeBase / UI Kitten as primary UI | Useful for some apps, but not aligned with this app’s premium native UI goal. |
| Tamagui as primary UI | Powerful and maintained, but better when web/native sharing is a top priority. Native UI is higher priority here. |
| Expo Router as default | Good productivity tool, but not required and not a performance advantage. |
| `react-native-edge-to-edge` as default on RN 0.86 | RN 0.86 has improved edge-to-edge; add only if testing shows a real need. |
| Form libraries for practice input | The translation input should be lightweight and local. |
| Large animation helper kits | Use Reanimated and Gesture Handler directly for critical interactions. |

---

## 27. Recommended architecture map

```txt
src/
    app/
        App.tsx
        providers/
            query-client.tsx
            keyboard-provider.tsx
            sentry-provider.tsx
    navigation/
        root-navigator.tsx
        tabs.tsx
        linking.ts
    styles/
        themes.ts
        typography.ts
        spacing.ts
        radii.ts
        stylesheet.ts
    features/
        onboarding/
        practice/
            screens/
            components/
            sentence-builder/
            feedback/
            state/
        review/
        saved/
        progress/
        history/
        settings/
        notifications/
    api/
        client.ts
        generated/
        schemas/
    db/
        migrations/
        repositories/
        schema.sql
    storage/
        mmkv.ts
        keychain.ts
    dates/
        dates.ts
        day-keys.ts
        review-schedule.ts
    analytics/
    testing/
```

---

## 28. Performance-specific implementation rules

### Practice screen

- Keep the current sentence and draft answer local.
- Do not write to SQLite on every keystroke.
- Do not call global state on every keystroke.
- Use keyboard-controller for sticky submit controls.
- Animate feedback using Reanimated.
- Only call the backend on submit, hint request, skip, or sentence load.

### Sentence builder

- Keep chip order local.
- Use stable chip IDs.
- Use Reanimated for movement.
- Use Gesture Handler for drag/reorder.
- Avoid global state for animation state.

### Feedback screen

- Render the simple correction first.
- Render advanced explanation progressively.
- Highlight mistakes with accessible labels, not color alone.
- Save wrong words after result confirmation, not while animating.

### History and saved words

- Store in SQLite.
- Use `@legendapp/list`.
- Precompute list view models.
- Precompute date group labels.
- Avoid expensive shadows.
- Avoid inline formatting.

### Dark mode

- Use Unistyles adaptive themes.
- Use semantic tokens.
- Do not use React Context to pass colors to hot components.
- Keep system, light, and dark options.
- Test Liquid Glass fallback in both themes.

### Dates

- Store hot timestamps as numbers.
- Store sync timestamps as ISO strings.
- Use `@bernagl/react-native-date` for formatting, timezone, and arithmetic.
- Use batch date operations for long lists where possible.

---

## 29. Final recommended P0 dependency list

Use these as the initial required stack:

```txt
@react-navigation/native
@react-navigation/native-stack
react-native-screens
react-native-safe-area-context
react-native-bottom-tabs
@bottom-tabs/react-navigation
react-native-unistyles
react-native-nitro-modules
@callstack/liquid-glass
@swmansion/react-native-bottom-sheet
@react-native-community/datetimepicker
react-native-reanimated
react-native-worklets
react-native-gesture-handler
react-native-keyboard-controller
@legendapp/list
@legendapp/state
@tanstack/react-query
@hey-api/openapi-ts
zod
react-native-nitro-fetch
react-native-mmkv
react-native-keychain
react-native-nitro-sqlite
@bernagl/react-native-date
expo-notifications
react-native-pulsar
expo-audio
expo-speech
expo-image
react-native-google-mobile-ads
@sentry/react-native
```

Add only when needed:

```txt
@expo/ui
@react-native-menu/menu
@lodev09/react-native-true-sheet
@shopify/flash-list
victory-native
@shopify/react-native-skia
valibot
react-hook-form
@hookform/resolvers
react-native-release-profiler
reassure
react-native-bundle-visualizer
react-native-purchases
@op-engineering/op-sqlite
@zoontek/react-native-navigation-bar
@react-native-ai/apple
@react-native-ai/dev-tools-plugin
@react-native-runtimes/core
@react-native-runtimes/state
react-native-graph
react-native-audio-api
react-native-executorch
react-native-skills
react-native-pager-view
@react-native-community/slider
react-native-fast-shimmer
react-native-enriched-markdown
react-native-streamdown
react-native-rag
@react-native-rag/executorch
remend
react-native-svg
react-native-quick-crypto
```

Do not add:

```txt
zeego
axios
notifee
moment
luxon
dayjs
date-fns
nativewind
uniwind
react-native-paper
nativebase
react-native-quick-sqlite
react-native-wishlist
react-native-filament
@react-native-runtimes/* as default P0 architecture
```

---


---

## 30.1 Repository audit update: Margelo, Callstack, and Software Mansion

This is a targeted audit of the public organization pages, relevant repositories, and product/blog guidance from Margelo, Callstack, Software Mansion, and Software Mansion Labs. It is **not** a claim that every single repository in those organizations belongs in this app. I filtered for maintained libraries that fit this app's native UI, performance, animation, AI, and Expo Dev Client goals. This section overrides any earlier Expo-first choice when a better maintained native library exists.

### Margelo additions

| Library | Decision | Use in this app |
|---|---|---|
| `react-native-nitro-fetch` | Keep as default | Main HTTP layer for app API calls. |
| `react-native-nitro-sqlite` | Keep as default | Local database for history, mistakes, saved words, review queues, and offline sync. |
| `react-native-mmkv` | Keep as default | Fast key-value preferences and small cached values. |
| `react-native-runtimes` | Add as Phase 2 / spike only | Use only for isolated heavy screens, threaded list rendering, headless preparation, or background sync when profiling proves the main JS runtime is blocked. |
| `react-native-release-profiler` | Add as recommended performance tooling | Use to measure release-like Hermes behavior. |
| `react-native-graph` | Add as recommended chart library | Use for high-performance progress trends and learning analytics. |
| `react-native-quick-crypto` | Optional | Add only if local crypto, hashing, signing, or Node-compatible crypto APIs are required. |
| `react-native-skills` | Optional developer/AI tooling | Useful as a reference for AI-agent workflows and mobile agent skills, not required for MVP runtime. |
| `react-native-worklets-core` | Not default | Avoid adding unless a dependency requires it. Use Software Mansion `react-native-worklets` / Reanimated for this app's animation worklets. |
| `react-native-filament` | Do not add | 3D rendering is not needed. |
| `react-native-wishlist` | Do not add | Interesting prototype, but not the production list default. Use Legend List first. |
| `react-native-quick-sqlite` | Do not add | Deprecated in favor of `react-native-nitro-sqlite`. |

### Callstack additions

| Library | Decision | Use in this app |
|---|---|---|
| `@callstack/liquid-glass` | Keep as default for iOS glass surfaces | Use for iOS Liquid Glass chrome, floating controls, and small action surfaces. |
| `react-native-bottom-tabs` + `@bottom-tabs/react-navigation` | Keep as default | Native bottom tabs with React Navigation integration. |
| `react-native-pager-view` | Add when needed | Onboarding, placement-test pages, review carousels, and horizontally paged learning tools. |
| `@react-native-community/slider` / Callstack slider | Add when needed | Goal intensity, validation strictness, notification frequency, and audio speed controls. |
| `react-native-fast-shimmer` | Optional | Loading placeholders for Home, Review, and Progress. Do not use on the practice hot path unless needed. |
| `reassure` | Add to performance testing | Prevent expensive component regressions in CI. |
| `react-native-bundle-visualizer` | Add to release hygiene | Watch bundle size before releases. |
| `agent-device` | Optional AI/dev tool | Device automation and AI-agent testing support, not runtime dependency. |
| `react-native-paper` | Do not use as core UI | Maintained, but not aligned with the native/premium UI goal. |
| `repack` | Do not use by default | Useful for specific bundling/code-splitting needs, but not a default Expo Dev Client choice. |

### Software Mansion additions

| Library | Decision | Use in this app |
|---|---|---|
| `react-native-reanimated` | Keep as default | Main animation engine. |
| `react-native-worklets` | Keep as default | Worklets foundation for Reanimated and performance-sensitive logic. |
| `react-native-gesture-handler` | Keep as default | Chip gestures, flashcards, swipes, drag/reorder. |
| `react-native-screens` | Keep as default | Native screen containers. |
| `react-native-keyboard-controller` | Keep as default | Keyboard-heavy practice screens. |
| `@swmansion/react-native-bottom-sheet` | Keep as preferred sheet spike | Use if it passes app-specific testing; fallback to `@gorhom/bottom-sheet` only if feature gaps appear. |
| `react-native-pulsar` | Add as default haptics | Rich native haptic presets and worklet-compatible feedback for animated interactions. |
| `react-native-audio-api` | Optional advanced audio | Add if pronunciation, waveform, recording, or low-latency listening features become core. |
| `react-native-executorch` | Optional future on-device AI | Evaluate for embeddings, speech, or local AI features after MVP. |
| `react-native-rag` | Optional future local AI/RAG | Use only if the app needs private semantic search or local AI over saved words, sentences, and mistakes. |
| `@react-native-rag/executorch` | Optional future local AI integration | Add with `react-native-rag` only when using ExecuTorch-backed embeddings/LLMs on device. |
| `react-native-streamdown` | Optional future AI feedback renderer | Use only if feedback explanations stream token-by-token or need robust Markdown while streaming. |
| `react-native-enriched-markdown` | Optional | Use only if AI explanations need rich Markdown rendering/editing. |
| `react-native-detour` | Optional future growth/referral tool | Consider only if deferred deep links become important for referrals, shared decks, or marketing campaigns. |
| `react-native-svg` | Add when needed | Icons, small vector assets, custom progress visuals, and chart helpers. |
| `argent` | Optional AI/dev tool | Native app inspection, profiling, and agentic debugging support. |

---

## 30.2 Decision on `react-native-runtimes`

### Recommendation

Add `react-native-runtimes` to the document, but **do not make it a default MVP dependency**.

It is one of the most interesting performance libraries for this project, especially if the app later has very large History, Review, Saved Words, or AI-preparation screens. However, it is currently best treated as an advanced architecture tool that should be added only after profiling proves that normal optimization is not enough.

### Use it when profiling proves one of these problems

- The History screen blocks the main JS runtime during large list work.
- Review queues or saved-word screens perform heavy preparation before navigation.
- Local sync, spaced repetition scheduling, or mistake analytics compete with the main UI runtime.
- The app needs to prewarm a heavy screen before navigation.
- A background/headless task needs to prepare data without affecting practice-screen interactions.
- A list surface remains slow even after using `@legendapp/list`, row memoization, precomputed view models, SQLite pagination, and release-build profiling.

### Do not use it for

- Normal app state.
- Simple screens.
- The first MVP practice loop.
- Basic sentence-builder chip state.
- Replacing TanStack Query, Legend State, MMKV, or SQLite.
- Fixing performance problems that are actually caused by bad renders, inline styles, unstable callbacks, or large synchronous JSON parsing.

### State rule

Keep app state in the existing stack:

```txt
@legendapp/state
@tanstack/react-query
react-native-mmkv
react-native-nitro-sqlite
```

Use `@react-native-runtimes/state` only when data must be shared across isolated runtimes. It should not replace the app's normal state management.

### Adoption path

1. Build MVP without multiple JS runtimes.
2. Profile release builds on low-end Android.
3. Optimize list rows, database pagination, memoization, style generation, date formatting, and JSON parsing first.
4. Add `react-native-release-profiler`, Reassure checks, and bundle analysis.
5. Spike `@react-native-runtimes/core` on one isolated screen only.
6. Keep a feature flag so it can be disabled if it introduces instability.

### Install only during the spike

```bash
npm install @react-native-runtimes/core @react-native-runtimes/state
```

---
## 31. Sources checked

- React Native 0.86 release notes: https://reactnative.dev/blog
- React Native versions: https://reactnative.dev/versions
- Margelo Nitro Modules: https://nitro.margelo.com/
- Margelo Nitro Fetch: https://github.com/margelo/react-native-nitro-fetch
- Margelo Nitro SQLite: https://github.com/margelo/react-native-nitro-sqlite
- `@bernagl/react-native-date`: https://bbernag.github.io/react-native-date/
- `@bernagl/react-native-date` GitHub: https://github.com/bbernag/react-native-date
- Callstack Liquid Glass: https://github.com/callstack/liquid-glass
- Software Mansion Reanimated: https://swmansion.com/blog/reanimated-4-is-new-but-also-very-familiar-b926dd59aa40/
- Software Mansion Gesture Handler 3: https://swmansion.com/blog/introducing-gesture-handler-3-0-hook-based-api-deeper-reanimated-integration-more-9185b0c8e305/
- Software Mansion products: https://swmansion.com/products/
- React Native Keyboard Controller: https://docs.expo.dev/versions/latest/sdk/keyboard-controller/
- Margelo keyboard handling deep dive: https://blog.margelo.com/deep-dive-in-keyboard-handling
- Unistyles v3 docs: https://www.unistyl.es/v3/tutorial/intro
- Unistyles npm: https://www.npmjs.com/package/react-native-unistyles
- Legend List docs: https://legendapp.com/open-source/list/v3/overview/
- Vercel v0 iOS app write-up: https://vercel.com/blog/how-we-built-the-v0-ios-app
- `@react-native-menu/menu`: https://github.com/react-native-menu/menu
- Expo UI MenuView docs: https://docs.expo.dev/versions/latest/sdk/ui/drop-in-replacements/menu/
- React Native Community DateTimePicker docs: https://docs.expo.dev/versions/latest/sdk/date-time-picker/
- Software Mansion React Native Bottom Sheet repo: https://github.com/software-mansion-labs/react-native-bottom-sheet
- True Sheet repo: https://github.com/lodev09/react-native-true-sheet
- Expo Notifications: https://docs.expo.dev/versions/latest/sdk/notifications/
- Expo Push Notifications setup: https://docs.expo.dev/push-notifications/push-notifications-setup/
- Notifee archived repository status: https://github.com/invertase/notifee
- React Native edge-to-edge helper guidance: https://github.com/zoontek/react-native-edge-to-edge

- Margelo GitHub organization repositories: https://github.com/margelo
- React Native Runtimes docs: https://margelo.github.io/react-native-runtimes/
- React Native Runtimes GitHub: https://github.com/margelo/react-native-runtimes
- React Native Runtimes releases: https://github.com/margelo/react-native-runtimes/releases
- Awesome Nitro Modules: https://github.com/soynerdito/awesome-nitro-modules
- Margelo React Native Graph: https://github.com/margelo/react-native-graph
- Margelo React Native Release Profiler: https://github.com/margelo/react-native-release-profiler
- Callstack GitHub organization repositories: https://github.com/callstack
- Callstack React Native Bottom Tabs: https://github.com/callstackincubator/react-native-bottom-tabs
- Callstack Reassure: https://github.com/callstack/reassure
- Callstack Agent Device: https://github.com/callstackincubator/agent-device
- Software Mansion GitHub organization repositories: https://github.com/software-mansion
- Software Mansion Pulsar docs: https://docs.swmansion.com/pulsar/sdk/react-native/
- Software Mansion Audio API: https://github.com/software-mansion-labs/react-native-audio-api
- Software Mansion ExecuTorch: https://github.com/software-mansion-labs/react-native-executorch
- Software Mansion Argent: https://github.com/software-mansion-labs/argent

- Software Mansion Labs React Native Streamdown: https://github.com/software-mansion-labs/react-native-streamdown
- Software Mansion Labs React Native RAG: https://github.com/software-mansion-labs/react-native-rag
- Software Mansion Labs React Native Detour: https://github.com/software-mansion-labs/react-native-detour
