
# Implementation Plan: AI Sentence Translation Language App

**Document version:** 1.0  
**Date:** 2026-06-16  
**Purpose:** Step-by-step implementation plan for starting the React Native / Expo Dev Client app with Codex.  
**Goal:** Build a polished local-first MVP before backend, ads, subscriptions, or advanced AI infrastructure.

---

## 1. Starting strategy

Start foundation-first.

Do not begin by building random screens. The correct order is:

> Runtime setup → native library validation → theme/design system → common components → navigation shell → local models/storage → one complete practice loop → review/history/progress → notifications → backend/AI integration → ads/premium.

The first real milestone should be a polished local prototype where the user can:

1. Open the app.
2. See Home.
3. Start practice.
4. Translate a sentence by typing or by scrambled word chips.
5. Submit the answer.
6. Receive animated feedback.
7. Save a word or sentence.
8. Continue to the next sentence.
9. See the session summary.
10. See the result in History.

Do not build the full backend first. Use mock services that return final-shaped data.

---

## 2. Runtime decision

The app should use **Expo Dev Client**, not Expo Go.

Target:

```txt
React Native 0.86+
New Architecture
Hermes
Expo Dev Client
TypeScript
```

Important decision:

- React Native 0.86+ is the target because the app wants modern Android edge-to-edge behavior and current native module compatibility.
- Expo stable may lag the latest React Native release. If stable Expo does not yet support the exact target version, run a compatibility spike before committing.
- Do not add product features until iOS and Android development builds compile with the selected native library stack.

Minimum build checks before feature work:

- iOS simulator development build.
- iOS physical-device development build.
- Android emulator development build.
- Android physical-device development build.
- iOS release/preview build.
- Android release/preview build.

---

## 3. Code style and project conventions

Use the user's existing TypeScript preferences.

### TypeScript style

- Use TypeScript.
- Prefer function declarations over function expressions.
- Prefer descriptive type names.
- Avoid one-letter type names.
- Prefer `Thing[]` over `Array<Thing>`.
- Prefer inference where reasonable.
- Do not add return types unless they improve clarity or are required.
- Keep active form/input state local when possible.
- Use domain-specific names instead of generic names like `data`, `item`, or `value` where clarity matters.

### Conditional rendering preference

Prefer:

```tsx
{isVisible && <Component />}
```

Over:

```tsx
{isVisible ? <Component /> : null}
```

### Tests

Use the Arrange-Act-Assert pattern.

### Prettier config

Use this formatting configuration:

```json
{
    "printWidth": 80,
    "tabWidth": 4,
    "singleQuote": false,
    "trailingComma": "es5",
    "bracketSpacing": false,
    "semi": true,
    "useTabs": false,
    "bracketSameLine": false
}
```

---

## 4. Phase 0 — Repository and native foundation

### Goal

Create the app and prove the native stack builds before implementing product screens.

### Tasks

1. Create the project.
2. Configure TypeScript strict mode.
3. Add ESLint.
4. Add Prettier using the config above.
5. Add path aliases.
6. Configure Expo Dev Client.
7. Configure EAS build profiles:
   - development
   - preview
   - production
8. Enable New Architecture.
9. Confirm Hermes is enabled.
10. Set app identifiers for iOS and Android.
11. Configure environment variables and app config separation.
12. Create a simple placeholder screen.
13. Build on iOS and Android.

### Native libraries to validate early

Install and validate the foundation libraries before the app grows:

```txt
react-native-reanimated
react-native-worklets
react-native-gesture-handler
react-native-screens
react-native-safe-area-context
react-native-keyboard-controller
react-native-unistyles
react-native-mmkv
react-native-nitro-modules
react-native-nitro-fetch
@bernagl/react-native-date
```

Add these only after the first build passes or during controlled spikes:

```txt
@callstack/liquid-glass
react-native-bottom-tabs
@bottom-tabs/react-navigation
@swmansion/react-native-bottom-sheet
react-native-pulsar
@legendapp/list
react-native-nitro-sqlite
```

### Done when

- Native builds pass.
- Reanimated/Worklets work.
- Gesture Handler works.
- Keyboard Controller works on a text input screen.
- Unistyles theme switching works.
- MMKV can read/write.
- Date formatting works with `@bernagl/react-native-date`.
- Nitro Fetch can make a test request or is mocked behind the app HTTP adapter.

---

## 5. Phase 1 — Design system and styling foundation

### Goal

Create the visual foundation before building feature screens.

### Recommended files

```txt
src/shared/styles/
    tokens.ts
    themes.ts
    unistyles.ts
    typography.ts
    spacing.ts
    radius.ts
    shadows.ts
    motion.ts
```

### Theme model

Create semantic themes:

```txt
lightTheme
darkTheme
highContrastLightTheme
highContrastDarkTheme
```

Use semantic tokens only:

```txt
colors.background.primary
colors.background.secondary
colors.surface.primary
colors.surface.elevated
colors.surface.glass
colors.text.primary
colors.text.secondary
colors.text.inverse
colors.border.subtle
colors.border.strong
colors.accent.primary
colors.accent.secondary
colors.feedback.success
colors.feedback.warning
colors.feedback.error
colors.feedback.info
```

### Dark mode rules

- Use `react-native-unistyles` for theming.
- Do not build a large custom React Context theme provider.
- Do not use raw hex colors inside screens.
- Do not create large inline style objects in render functions.
- Avoid Tailwind-style runtime class strings for hot UI.
- Keep design tokens stable and semantic.
- Glass effects must be optional and platform-aware.
- Support reduce transparency and reduce motion later through accessibility settings.

### Liquid Glass usage

Create:

```txt
src/shared/ui/GlassSurface/
```

Use Liquid Glass only for:

- Bottom navigation.
- Floating practice controls.
- Validation mode selector.
- Level selector.
- Goal progress pill.
- Session summary overlay.
- Achievement modal.
- Header filters.

Do not use Liquid Glass behind:

- Main sentence text.
- Translation input.
- Correction explanations.
- Long paragraphs.
- Charts with important labels.

On Android, use elevated Material-like surfaces instead of fake iOS glass.

### Done when

- Light and dark themes work.
- Basic tokens are defined.
- `Screen`, `Surface`, `GlassSurface`, `AppText`, and `Button` are theme-aware.
- A small component playground screen demonstrates the visual language.

---

## 6. Phase 2 — Shared UI component library

### Goal

Build reusable UI primitives before feature screens.

### Required shared components

```txt
src/shared/ui/
    AppText/
    Screen/
    Surface/
    GlassSurface/
    Button/
    IconButton/
    TextInput/
    Chip/
    WordChip/
    SentenceCard/
    FeedbackCard/
    FeedbackHighlight/
    ProgressRing/
    ProgressBar/
    BottomSheet/
    EmptyState/
    LoadingState/
    ErrorState/
    ListItem/
    StatCard/
    Header/
```

### Critical components

#### SentenceCard

Used in Practice, History, Saved Sentences, Review, and notification previews.

Should support:

- Source sentence.
- Target language.
- Audio button.
- Save action.
- Difficulty label.
- Topic label.
- Light/dark mode.

#### WordChip

Used for Sentence Builder / scrambled words.

Should support:

- Normal state.
- Pressed state.
- Selected state.
- Disabled state.
- Correct state.
- Incorrect state.
- Animated enter/exit.
- Haptic feedback.

#### FeedbackHighlight

Used to show:

- Wrong word.
- Missing word.
- Extra word.
- Word order issue.
- Punctuation issue.
- Spelling issue.
- Tense issue.

This component is part of the app's differentiation.

### Done when

- Components can render in light and dark mode.
- Components avoid raw colors.
- Components have clear props and variants.
- Components do not require backend data.
- Component playground covers the major states.

---

## 7. Phase 3 — Navigation shell

### Goal

Create the app shell before feature logic.

### Recommendation

Use React Navigation directly with native stack and native bottom tabs.

Do not use Expo Router by default for this app because explicit navigation control is more important than file-based routing here.

### Structure

```txt
RootNavigator
    BootScreen
    OnboardingNavigator
    AppNavigator
        MainTabs
            HomeStack
            PracticeStack
            ReviewStack
            ProgressStack
            LibraryStack
        ModalStack
            SettingsScreen
            WordDetailsScreen
            SentenceDetailsScreen
            ValidationModeScreen
            NotificationSettingsScreen
            SessionSummaryScreen
```

### Main tabs

```txt
Home
Practice
Review
Progress
Library
```

Library can contain:

- Saved Words.
- Saved Sentences.
- Mistake Notebook.
- History.

### Done when

- App can switch between tabs.
- Native stack transitions work.
- Modal screens work.
- Safe areas are correct.
- Android edge-to-edge behavior is correct.
- Bottom navigation feels native.

---

## 8. Phase 4 — Domain types and local-first architecture

### Goal

Define product data before backend integration.

### Core domain entities

```txt
UserProfile
LanguagePair
LearningGoal
UserLevel
ValidationMode
InputMode
PracticeSentence
SentenceWordChip
UserTranslation
ValidationResult
AcceptedTranslation
Mistake
MistakeCategory
WordRecord
SentenceRecord
ReviewItem
PracticeSession
PracticeSessionSummary
NotificationPreference
Achievement
ProgressSnapshot
```

### Storage split

Use:

- MMKV for small fast key/value state.
- SQLite for structured learning data.
- TanStack Query later for remote/server state.
- Legend-State for app-level reactive state only where useful.

### MMKV data

Store:

- Onboarding completion.
- Theme preference.
- Language pair.
- Current level.
- Validation mode preference.
- Input mode preference.
- Notification preferences.
- Feature flags.
- Temporary draft answer.

### SQLite data

Store:

- Practice history.
- Saved words.
- Saved sentences.
- Mistakes.
- Mistake categories.
- Review queue.
- Mastery state.
- Practice sessions.
- Progress snapshots.

### Done when

- Domain types exist.
- Mock repositories exist.
- MMKV adapter exists.
- SQLite adapter interface exists, even if implementation is minimal.
- App can save and read a local practice history item.

---

## 9. Phase 5 — Service adapter layer

### Goal

Keep backend and AI provider replaceable.

### Create service interfaces

```txt
src/shared/api/
    httpClient.ts
    apiError.ts
    queryClient.ts

src/features/practice/services/
    sentenceService.ts
    validationService.ts
    teacherFeedbackService.ts

src/features/review/services/
    reviewService.ts

src/features/progress/services/
    progressService.ts

src/features/notifications/services/
    notificationService.ts
```

### Start with mock services

```txt
sentenceService.mock.ts
validationService.mock.ts
teacherFeedbackService.mock.ts
reviewService.mock.ts
progressService.mock.ts
```

### Later remote implementations

```txt
sentenceService.remote.ts
validationService.remote.ts
teacherFeedbackService.remote.ts
reviewService.remote.ts
progressService.remote.ts
```

### AI-facing service methods

Screens should call product-level methods, not raw AI provider methods:

```txt
generateSentence()
validateTranslation()
explainMistake()
generateReviewItems()
generateWeeklyReport()
```

### Done when

- Practice screen can use mock services.
- Service responses match final expected data shapes.
- Screens do not know whether data came from mock, local, backend, or AI.

---

## 10. Phase 6 — First vertical slice: complete practice loop

### Goal

Build one complete polished learning loop before expanding the app.

### Flow

```txt
Home
→ Start practice
→ Practice screen
→ Submit answer
→ Feedback screen
→ Save word/sentence
→ Continue
→ Session summary
→ History item saved
```

### Required for first vertical slice

- Mock onboarding state.
- One language pair.
- One user level.
- One sentence source.
- Typing input mode.
- Sentence Builder / scrambled words mode.
- Submit button.
- Mock validation.
- Feedback screen.
- Mistake highlighting.
- Accepted alternatives.
- Save sentence.
- Save word.
- Continue button.
- Session summary.
- Local history persistence.

### Done when

A tester can complete a 5-sentence session with no backend.

---

## 11. Phase 7 — Practice screen implementation details

Build Practice in this order.

### 1. Static layout

Show:

- Close/back action.
- Level chip.
- Session progress count.
- Source sentence card.
- Input area.
- Hint button.
- Skip button.
- Submit button.
- Validation mode chip.

### 2. Typing input

Rules:

- Keep input text local to the screen.
- Do not store every keystroke globally.
- Disable submit until there is an answer.
- Keep keyboard movement smooth.
- Avoid screen jump when keyboard appears.

### 3. Sentence Builder / scrambled words

Rules:

- Beginner users see it by default.
- Advanced users type by default and can enable it optionally.
- Tapping a chip moves it into the answer area.
- Tapping a selected chip removes it.
- Clear button resets the answer.
- Submit validates the built sentence.
- Use Reanimated for movement and state transitions.
- Use haptics for chip selection/removal.
- Track whether the answer came from typing or Sentence Builder.

### 4. Validation mode selector

Modes:

- Practice.
- Soft.
- Balanced.
- Strict.

Use mock validation responses at first.

### 5. Feedback transition

After submit:

1. Disable input.
2. Show checking state.
3. Animate into feedback.
4. Show result status.
5. Highlight mistakes progressively.
6. Show correct translation.
7. Show accepted alternatives.
8. Offer Save Sentence and Continue.

---

## 12. Phase 8 — Feedback system

### Goal

Make correction the strongest part of the app.

### Feedback should support

- Correct.
- Almost correct.
- Partially correct.
- Incorrect.
- Needs retry.

### Feedback data shape should include

```txt
resultStatus
score
userAnswer
bestTranslation
acceptedTranslations
mistakes[]
wordsToReview[]
sentencesToReview[]
shortExplanation
simpleExplanation
grammarNote
validationMode
inputMode
```

### Mistake categories

```txt
wrong_word
missing_word
extra_word
wrong_tense
wrong_word_order
wrong_preposition
spelling
punctuation
capitalization
article
meaning_changed
naturalness
formality
```

### Done when

- A mock incorrect answer shows exact highlights.
- A mock almost-correct answer shows a simple explanation.
- A mock correct answer shows accepted alternatives.
- Save actions work.
- Feedback animations feel calm and premium.

---

## 13. Phase 9 — History, saved content, and review

### History

Build after the first practice loop.

History item fields:

```txt
sourceSentence
userAnswer
bestTranslation
resultStatus
validationMode
inputMode
mistakes
date
topic
level
wasSkipped
```

History features:

- View previous attempts.
- Filter by incorrect/correct/skipped/saved.
- Retry sentence.
- Save sentence.
- Save words.

### Saved Words

Fields:

```txt
word
translation
exampleSentence
timesMissed
masteryStatus
lastPracticedAt
source
```

Statuses:

```txt
new
learning
difficult
improving
learned
```

### Review MVP

Start with:

- Word flashcards.
- Sentence flashcards.
- Mistake cards.
- Sentence Builder review.

### Done when

- Wrong words are saved automatically.
- Saved words can be reviewed.
- Saved sentences can be reviewed.
- A user can retry a previous mistake.

---

## 14. Phase 10 — Progress and motivation

### MVP progress screen

Show:

- Sentences completed.
- Accuracy.
- Words learned.
- Difficult words.
- Mistakes by category.
- Weekly activity.
- Current level progress.

### Motivation

Add:

- Daily goal.
- Weekly consistency.
- XP.
- Achievements.
- Session summary.
- Weekly report later.

Do not over-gamify. Keep it professional.

### Done when

- Session summary shows progress.
- Progress screen reads from local data.
- Mistake categories are visible.
- Daily goal progress works.

---

## 15. Phase 11 — Notifications

### Add notifications after local learning data exists

Do not add notifications before the app knows:

- User goal.
- User weak words.
- Review due items.
- Preferred time.
- Quiet hours.
- Current level.
- Language pair.

### Notification types

- Daily practice reminder.
- Word of the day.
- Sentence challenge.
- Review reminder.
- Goal reminder.
- Weekly summary.

### Rules

- User-controlled.
- Configurable frequency.
- Quiet hours.
- Never guilt-based.
- No excessive notification volume.

### Done when

- User can configure reminders.
- App can schedule a local reminder.
- Notification text can be generated from local review data.

---

## 16. Phase 12 — Backend and AI integration

### Add backend after local prototype works

The app should be backend-ready but not backend-dependent during early implementation.

### Backend/AI responsibilities

- Generate level-appropriate sentences.
- Validate translations.
- Return accepted alternatives.
- Classify mistakes.
- Generate simple explanations.
- Generate weekly reports.
- Enforce content safety.
- Avoid restricted content.

### App responsibilities

- Render sentence.
- Capture user answer.
- Send answer for validation.
- Render feedback.
- Persist results.
- Build review queue.
- Show progress.

### Safety requirements

AI should behave like a teacher and avoid:

- Adult sexual content.
- Racist content.
- Hateful content.
- Discriminatory content.
- Graphic violence.
- Harassment.
- Extremist content.
- Self-harm content.
- Illegal instructions.
- Offensive stereotypes.
- Degrading examples.

### Done when

- Mock services can be swapped for remote services.
- Screens do not change when the backend is connected.
- AI results are validated before rendering.
- Unsafe or malformed responses fail gracefully.

---

## 17. Phase 13 — Ads and monetization

Add ads late.

Create an adapter first:

```txt
adService.showSessionEndAd()
adService.showRewardedHintAd()
adService.showRewardedReviewAd()
adService.showRewardedStreakFreezeAd()
```

Allowed ad moments:

- After session summary.
- Before optional bonus session.
- After daily goal completion.
- Rewarded hint.
- Rewarded review pack.

Never show ads:

- While typing.
- Before feedback.
- During feedback.
- During flashcards.
- Immediately after a wrong answer.

---

## 18. Folder structure

Recommended feature-based structure:

```txt
src/
    app/
        App.tsx
        providers/
        navigation/
        config/

    shared/
        ui/
        styles/
        motion/
        api/
        storage/
        analytics/
        notifications/
        ads/
        types/
        utils/

    entities/
        user/
        sentence/
        word/
        mistake/
        review/
        progress/

    features/
        onboarding/
        home/
        practice/
        feedback/
        history/
        savedWords/
        savedSentences/
        mistakeNotebook/
        review/
        progress/
        settings/
        notifications/
        achievements/

    services/
        teacher/
        sentenceGeneration/
        validation/
        reports/
```

Feature folder shape:

```txt
src/features/practice/
    components/
        PracticeHeader.tsx
        SentencePromptCard.tsx
        TranslationInput.tsx
        ScrambledWordsInput.tsx
        PracticeActions.tsx
    screens/
        PracticeScreen.tsx
    services/
        practiceSessionService.ts
    state/
        practiceSessionReducer.ts
    types/
        practiceTypes.ts
    utils/
        buildSentenceFromChips.ts
```

---

## 19. Suggested first two-week sprint

### Week 1 — Foundation and UI system

#### Day 1

- Decide exact runtime path: Expo stable/canary with RN 0.86+ compatibility spike if needed.
- Create project.
- Configure TypeScript, linting, formatting, path aliases.
- Configure Expo Dev Client.
- Confirm iOS and Android development builds.

#### Day 2

- Install native foundation libraries.
- Configure Reanimated, Worklets, Gesture Handler, Screens, Safe Area, Keyboard Controller.
- Build after each group.

#### Day 3

- Configure Unistyles.
- Add light/dark themes.
- Add typography, spacing, radius, shadows, motion tokens.
- Add `Screen`, `AppText`, `Surface`, `Button`, `TextInput`.

#### Day 4

- Add `GlassSurface`.
- Add `SentenceCard`.
- Add `WordChip`.
- Add `FeedbackCard`.
- Add component playground screen.

#### Day 5

- Configure navigation shell.
- Add tabs.
- Add modal stack.
- Add placeholder screens.
- Confirm native tab behavior, edge-to-edge behavior, and safe areas.

### Week 2 — First product loop

#### Day 6

- Define domain types.
- Add mock sentence service.
- Add mock validation service.
- Add local practice session reducer.

#### Day 7

- Build Practice screen with typed input.
- Add submit behavior.
- Add loading/checking state.

#### Day 8

- Build Sentence Builder / scrambled words input.
- Add chip animations.
- Add beginner/advanced mode logic.

#### Day 9

- Build Feedback screen.
- Add mistake highlights.
- Add accepted alternatives.
- Add save word/sentence actions.

#### Day 10

- Add local persistence.
- Add basic History screen.
- Add basic Session Summary screen.
- Test full flow end-to-end.

---

## 20. Performance rules from day one

- Keep text input state local.
- Avoid global state for every screen.
- Avoid large React Context providers.
- Avoid inline object styles in hot components.
- Use Unistyles variants and semantic tokens.
- Use Reanimated for UI-thread animations.
- Use Gesture Handler for gesture-heavy components.
- Use Keyboard Controller for text input screens.
- Use Legend List for long lists.
- Use SQLite for history/review data.
- Batch local writes when possible.
- Profile release builds, not only debug builds.
- Test on low-end Android early.
- Do not add `react-native-runtimes` until profiling proves it is needed.

---

## 21. What not to build first

Do not start with:

- Full backend.
- Auth.
- Payments.
- Ads.
- Advanced AI prompt chains.
- Complex progress charts.
- Full notification system.
- Social features.
- Speaking/pronunciation.
- Multi-runtime architecture.
- Offline sync.
- Every review mode.
- Every screen in the PRD.

Start with:

> Translate one sentence → get useful feedback → save mistakes → review later.

---

## 22. Codex first task prompt

Use this as the first implementation prompt for Codex:

```txt
Start the React Native / Expo Dev Client implementation for the AI Sentence Translation Language App.

Read these files first:

1. 01-app-description-and-prd.md
2. 02-technical-recommendations.md
3. 03-implementation-plan.md

Begin with Phase 0 and Phase 1 only.

Requirements:
- Use TypeScript.
- Use the provided Prettier config.
- Prefer function declarations.
- Prefer descriptive type names.
- Prefer Thing[] over Array<Thing>.
- Avoid unnecessary return types.
- Use Expo Dev Client, not Expo Go.
- Target React Native 0.86+ with New Architecture and Hermes.
- Do not use Zeego.
- Use @bernagl/react-native-date for date handling.
- Use Unistyles for styling and dark mode.
- Create semantic theme tokens before feature screens.
- Do not add backend, auth, ads, or AI provider logic yet.
- Create mock service interfaces only where needed.

Deliver Phase 0/1 foundation:
- Project config.
- TypeScript/lint/prettier/path aliases.
- Native foundation package setup.
- Unistyles configuration.
- Light and dark themes.
- Initial shared UI components: Screen, AppText, Surface, Button, TextInput.
- A component playground screen showing light/dark mode.
- iOS/Android build notes.
```

---

## 23. MVP completion definition

The MVP is ready when:

- User can complete onboarding.
- User can start a practice session.
- User can translate by typing.
- Beginner user can use scrambled word chips.
- Advanced user can keep typing by default.
- User can submit an answer.
- App can validate with Practice, Soft, Balanced, and Strict modes.
- App can highlight mistakes.
- App can show a correct translation and accepted alternatives.
- App can explain mistakes simply.
- User can save words and sentences.
- Wrong words are automatically saved.
- User can review saved/wrong content.
- User can see History.
- User can see basic Progress.
- User can configure notifications.
- Ads appear only at non-disruptive moments.
- App avoids inappropriate content.
- UI feels polished, professional, native, animated, and fast.
```
