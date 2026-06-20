# Correcta Google Stitch Design Brief

Use this document as the design prompt and product brief for Google Stitch. The
goal is to generate a complete native mobile design direction for Correcta that
we can implement in the existing React Native and Expo app.

## Master Prompt

Design a premium native mobile language-learning app called Correcta. Correcta
helps people practice translation one sentence at a time, then gives precise,
teacher-like feedback that turns mistakes into saved review material. The app
should feel like a quiet native study desk: calm, focused, tactile, serious,
encouraging, and trustworthy.

Create a full design system and screen set for iOS and Android using the
existing Scribe Blue visual direction. The design should include light mode,
dark mode, reusable component states, tab navigation, onboarding, home,
practice, feedback, review, library, progress, reminders, settings, and empty,
loading, disabled, error, and success states. Use solid colors, crisp hierarchy,
native controls, rounded surfaces, carefully marked feedback, and restrained
motion. Avoid childish gamification, mascots, neon colors, generic dashboard UI,
web-page layouts, gradients, excessive decoration, and green as a brand color.

## Product Summary

Correcta is a focused language-learning app for translation practice.

The user receives a sentence in one language, translates it, submits the answer,
gets feedback, saves useful words or sentences, and reviews mistakes later. The
app is not a chatbot and should not feel like a social feed. It is a structured
practice tool where every answer can become learning material.

The core loop:

1. Receive a sentence prompt.
2. Translate it by typing or building from word chips.
3. Submit the answer.
4. Get correction feedback.
5. Save important words or sentences.
6. Review mistakes and saved material later.
7. Improve progress over repeated sessions.

## Audience

Design for adult learners who want a serious study companion.

- Beginner learners need confidence, clear prompts, hints, and gentle feedback.
- Intermediate learners need accuracy, alternate valid translations, and mistake
  patterns.
- Advanced learners need nuance, strictness options, and concise teacher notes.
- Busy learners need short sessions, daily goals, reminders, and quick review.
- Goal-oriented learners need progress, streak-like motivation, and saved
  material without a noisy game layer.

## Product Principles

- Focused learning: each screen should make the next learning action obvious.
- Feedback is the product: correction screens need the most visual care.
- Multiple answers can be correct: design should support accepted alternatives,
  nuance, strictness, and teacher notes.
- Mistakes become lessons: wrong words, recurring patterns, and saved sentences
  should feel useful, not punitive.
- Motivation without guilt: goals, reminders, achievements, and progress should
  be calm and optional.
- Native first: layouts should feel like real iOS and Android app surfaces, not
  a web page inside a phone.
- Learning content over decoration: the sentence, answer, correction, and next
  action should always dominate the screen.

## Current App Structure

The existing app uses React Native, Expo, native bottom tabs, React Navigation,
Unistyles, lucide-react-native icons, react-native-svg, MMKV local storage, and
Expo UI experiments.

Primary app tabs:

- Home
- Practice
- Review
- Progress
- Library

Development and design-check screens:

- Component Playground
- Expo UI Showcase
- POC Card Benchmark
- Existing Card Benchmark

The Stitch design should focus on the production product surfaces first. The
dev screens can be represented as internal design-system validation screens.

## Navigation Model

Use a native bottom tab shell with five main destinations.

- Home: daily practice entry, current goal, recent learning, quick actions.
- Practice: sentence prompt, answer composition, hints, checking, feedback,
  save actions, summary.
- Review: recommended decks, flashcards, reveal answer, grade known/unsure/
  difficult.
- Progress: daily goal, weekly activity, accuracy, saved material, achievements,
  reminders, backend/AI and monetization status.
- Library: history, saved words, saved sentences, mistake notebook, filters, and
  retry actions.

Navigation should feel compact, stable, and native. Avoid oversized marketing
headers or decorative hero sections inside the app.

## Design Thesis

Correcta should feel like a quiet native study desk. The experience should be:

- Precise, like careful teacher markup.
- Calm, like a focused study session.
- Tactile, like cards and notes arranged on a desk.
- Trustworthy, like a professional learning tool.
- Encouraging, without becoming playful or childish.

The signature visual should be an annotated feedback note: the app marks what
was correct, what was close, what needs work, and why.

## Visual Identity

Theme name: Scribe Blue.

Scribe Blue is a restrained blue and ink system with warm canvas backgrounds,
crisp white or dark study surfaces, and a limited set of semantic colors. The
palette should feel editorial and academic, not corporate SaaS and not a game.

Do not use green as the main brand or active state. Green is reserved for
correct answers and success states only.

## Color Palette

Use these tokens as the source of truth. Stitch may improve visual composition,
but it should preserve the token roles and color intent.

### Light Mode

| Role       | Token                 | Hex         | Usage                                 |
| ---------- | --------------------- | ----------- | ------------------------------------- |
| Canvas     | canvas                | `#F8F7F1`   | Warm app base and linked-card cut-ins |
| Background | background.primary    | `#F6F7FA`   | Main screen background                |
| Background | background.secondary  | `#EEF1F5`   | Secondary bands and grouped areas     |
| Surface    | surface.primary       | `#FFFFFF`   | Cards, sheets, inputs                 |
| Surface    | surface.elevated      | `#FBFCFE`   | Raised cards and overlays             |
| Surface    | surface.tonal         | `#E8EEF8`   | Muted blue surfaces                   |
| Surface    | surface.inverse       | `#111827`   | Inverse foreground areas              |
| Surface    | surface.glassFallback | `#FFFFFFE6` | Compact iOS glass fallback only       |
| Text       | text.primary          | `#111827`   | Primary text                          |
| Text       | text.secondary        | `#3F4B5B`   | Body and supporting text              |
| Text       | text.muted            | `#6B7280`   | Metadata and captions                 |
| Text       | text.inverse          | `#F9FAFB`   | Text on inverse surfaces              |
| Border     | border.subtle         | `#D9DEE7`   | Subtle separators                     |
| Border     | border.strong         | `#AAB4C3`   | Strong outlines and focus structure   |
| Accent     | accent.primary        | `#2F5DA8`   | Primary action, active state          |
| Accent     | accent.primaryStrong  | `#22477F`   | Pressed primary action                |
| Accent     | accent.primarySoft    | `#E2EBFA`   | Selected chips and soft emphasis      |
| Accent     | accent.secondary      | `#4F6F8F`   | Secondary accent and metadata         |
| Success    | feedback.success      | `#16803C`   | Correct answer and success only       |
| Success    | feedback.successSoft  | `#E3F5EA`   | Correct answer background             |
| Warning    | feedback.warning      | `#B26A00`   | Almost correct, caution               |
| Warning    | feedback.warningSoft  | `#FFF1D6`   | Almost correct background             |
| Danger     | feedback.danger       | `#B42318`   | Incorrect, destructive, error         |
| Danger     | feedback.dangerSoft   | `#FDE8E6`   | Error background                      |
| Info       | feedback.info         | `#496A91`   | Neutral teacher notes                 |
| Info       | feedback.infoSoft     | `#E6EEF8`   | Neutral note background               |
| Focus      | focus                 | `#4778D6`   | Keyboard and accessibility focus      |
| Shadow     | shadow                | `#111827`   | Native shadow color                   |

### Dark Mode

| Role       | Token                 | Hex         | Usage                               |
| ---------- | --------------------- | ----------- | ----------------------------------- |
| Canvas     | canvas                | `#070B10`   | Dark app base and cut-ins           |
| Background | background.primary    | `#0D1117`   | Main screen background              |
| Background | background.secondary  | `#121822`   | Secondary bands and grouped areas   |
| Surface    | surface.primary       | `#171E28`   | Cards, sheets, inputs               |
| Surface    | surface.elevated      | `#1E2633`   | Raised cards and overlays           |
| Surface    | surface.tonal         | `#202A3A`   | Muted blue surfaces                 |
| Surface    | surface.inverse       | `#F6F7FA`   | Inverse foreground areas            |
| Surface    | surface.glassFallback | `#171E28E6` | Compact iOS glass fallback only     |
| Text       | text.primary          | `#F4F7FB`   | Primary text                        |
| Text       | text.secondary        | `#C6CFDB`   | Body and supporting text            |
| Text       | text.muted            | `#8E9AAC`   | Metadata and captions               |
| Text       | text.inverse          | `#111827`   | Text on inverse surfaces            |
| Border     | border.subtle         | `#2B3545`   | Subtle separators                   |
| Border     | border.strong         | `#46566D`   | Strong outlines and focus structure |
| Accent     | accent.primary        | `#7DA6F7`   | Primary action, active state        |
| Accent     | accent.primaryStrong  | `#A9C5FF`   | Strong primary emphasis             |
| Accent     | accent.primarySoft    | `#1D3357`   | Selected chips and soft emphasis    |
| Accent     | accent.secondary      | `#9EB4CC`   | Secondary accent and metadata       |
| Success    | feedback.success      | `#5FD28A`   | Correct answer and success only     |
| Success    | feedback.successSoft  | `#163522`   | Correct answer background           |
| Warning    | feedback.warning      | `#F0B35A`   | Almost correct, caution             |
| Warning    | feedback.warningSoft  | `#3A2A12`   | Almost correct background           |
| Danger     | feedback.danger       | `#FF7A70`   | Incorrect, destructive, error       |
| Danger     | feedback.dangerSoft   | `#3D1E1C`   | Error background                    |
| Info       | feedback.info         | `#98B8E8`   | Neutral teacher notes               |
| Info       | feedback.infoSoft     | `#182A43`   | Neutral note background             |
| Focus      | focus                 | `#9BBEFF`   | Keyboard and accessibility focus    |
| Shadow     | shadow                | `#000000`   | Native shadow color                 |

### Surface Contrast Accent

Use this for the app's special connected-card/card-union surfaces. These cards
should feel like deep ink study material with soft lavender emphasis.

| Mode  | Token                           | Hex       |
| ----- | ------------------------------- | --------- |
| Light | surfaceContrast.background      | `#062B2D` |
| Light | surfaceContrast.accent          | `#CDC6FF` |
| Light | surfaceContrast.foreground      | `#F3EEFF` |
| Light | surfaceContrast.mutedForeground | `#D9D4F6` |
| Light | surfaceContrast.focus           | `#C8BEFF` |
| Light | surfaceContrast.outline         | `#E8E3FF` |
| Light | surfaceContrast.pressed         | `#103A3D` |
| Dark  | surfaceContrast.background      | `#0A292D` |
| Dark  | surfaceContrast.accent          | `#C8C0FF` |
| Dark  | surfaceContrast.foreground      | `#F4EFFF` |
| Dark  | surfaceContrast.mutedForeground | `#C9C4E9` |
| Dark  | surfaceContrast.focus           | `#CDC5FF` |
| Dark  | surfaceContrast.outline         | `#273F47` |
| Dark  | surfaceContrast.pressed         | `#123D43` |

## Typography

Use the native system font: San Francisco on iOS and Roboto on Android.

| Role       | Size / Line / Weight | Usage                                 |
| ---------- | -------------------- | ------------------------------------- |
| display    | 34 / 40 / 700        | Rare screen-level hero metric         |
| titleLarge | 28 / 34 / 700        | Major screen title                    |
| title      | 22 / 28 / 700        | Standard screen title                 |
| subtitle   | 17 / 24 / 600        | Section lead                          |
| sentence   | 24 / 34 / 600        | Sentence prompts and corrected answer |
| answer     | 18 / 26 / 500        | User answers and translation content  |
| body       | 16 / 24 / 400        | Body copy                             |
| bodyStrong | 16 / 24 / 600        | Emphasized body copy                  |
| bodySmall  | 14 / 20 / 400        | Secondary body copy                   |
| label      | 13 / 18 / 600        | Labels, chips, metadata               |
| caption    | 12 / 16 / 500        | Captions and timestamps               |
| button     | 16 / 20 / 700        | Buttons                               |
| metric     | 30 / 36 / 700        | Progress and dashboard metrics        |

Sentence content should be highly readable and never squeezed. The sentence
prompt and the user's answer are more important than decorative labels.

## Layout Tokens

Use compact native spacing with enough breathing room for learning content.

| Token            | Value |
| ---------------- | ----- |
| none             | 0     |
| xxs              | 2     |
| xs               | 4     |
| sm               | 6     |
| md               | 8     |
| lg               | 12    |
| xl               | 16    |
| 2xl              | 20    |
| 3xl              | 24    |
| 4xl              | 32    |
| 5xl              | 40    |
| 6xl              | 48    |
| 7xl              | 64    |
| screenHorizontal | 20    |
| screenVertical   | 16    |
| cardPadding      | 16    |
| cardGap          | 12    |
| sectionGap       | 24    |
| controlGap       | 8     |

## Shape And Radius

Correcta uses soft rounded geometry, but not bubbly or childish shapes.

| Token  | Value | Usage                            |
| ------ | ----- | -------------------------------- |
| xs     | 6     | Small chips and internal details |
| sm     | 10    | Compact controls                 |
| md     | 14    | Inputs and small cards           |
| lg     | 18    | Buttons and grouped controls     |
| xl     | 22    | Standard cards                   |
| 2xl    | 28    | Large cards and sheets           |
| 3xl    | 34    | Large app surfaces               |
| card   | 22    | Standard card radius             |
| input  | 18    | Text inputs                      |
| button | 16    | Buttons                          |
| chip   | 999   | Pills and chips                  |
| sheet  | 28    | Bottom sheets                    |
| modal  | 30    | Modal containers                 |

## Iconography

Use lucide-style line icons with rounded caps and joins.

- Dense icon: 16
- Default icon: 20
- Tab icon: 22
- Hero icon: 24
- Empty-state icon: 32
- Stroke width: 2

Icon-only controls must have accessible names. Icons should clarify actions,
not decorate every row.

## Signature Pattern: Marked Feedback Note

The feedback state is the emotional center of the app. It should feel like a
careful teacher reviewed the answer.

Design requirements:

- Show the original prompt clearly.
- Show the user's answer.
- Show the accepted or corrected answer.
- Mark correct, almost correct, incorrect, and skipped states distinctly.
- Explain what changed and why.
- Support accepted alternatives.
- Support strictness: lenient, normal, strict.
- Include save word and save sentence actions.
- Include retry and continue actions.
- Make mistakes feel actionable, not embarrassing.

Feedback tone examples:

- Correct: "This translation works."
- Almost: "Close. The meaning is right, but the tense needs work."
- Incorrect: "Not quite. Focus on the object order in this sentence."
- Skipped: "No problem. Review the structure, then try another one."

## Signature Pattern: Linked Surface Group

Correcta's distinctive card language is the Linked Surface Group, also called a
Card Union. It joins related cards into one sculpted native system.

Use it when multiple pieces belong together:

- Prompt plus answer input.
- Feedback heading plus detailed correction.
- Daily goal plus progress detail.
- Review deck heading plus active card.
- Mistake pattern plus example sentence.

Visual rules:

- Related cards should look physically connected.
- Use shared surface color across connected sections.
- Use cut-ins or a bridge shape where the cards connect.
- Use the app canvas color to reveal intentional negative space.
- Avoid plain stacked cards when the information reads as one object.
- Do not use linked surfaces for unrelated content.
- Do not use gradients, blur, or translucent glass inside linked card unions.

The surface contrast card family uses deep ink or dark teal backgrounds with
soft near-white text and restrained lavender accent.

## Additional Card Direction

There may also be a future image or shape-forward card component for visual
learning content. Keep that separate from the existing Linked Surface Group
system. Do not merge image-card experimentation with the core Card Union visual
language unless the design clearly proves they belong together.

## Platform Behavior

Design for iOS and Android, not a single web-like compromise.

iOS:

- Use native-feeling shadows sparingly.
- Compact glass-like controls are acceptable only when content stays legible.
- Larger learning cards should remain opaque.
- Use gentle haptic moments for submit, correct, incorrect, save, and goal
  completion.

Android:

- Prefer tonal surfaces, elevation, and ripple behavior.
- Avoid fake glass.
- Keep native touch feedback clear.
- Respect Android typography and density expectations.

Both:

- Minimum touch target: 44 x 44.
- Support dynamic text.
- Support reduced motion.
- Support light and dark mode.
- Support clear keyboard behavior and input focus.

## Motion And Haptics

Motion should explain state changes, not entertain.

Use subtle transitions for:

- Moving from prompt to feedback.
- Revealing hints.
- Revealing review answers.
- Saving a word or sentence.
- Completing a practice session.
- Changing daily-goal progress.
- Switching review decks.

Avoid bounce-heavy, confetti-heavy, or arcade-like effects. Celebrate progress
with restrained completion states, not a noisy reward screen.

## Component Library To Design

Design these reusable components with default, pressed, focused, loading,
disabled, selected, success, warning, danger, empty, and dark-mode states where
relevant.

### Foundations

- AppText with all typography roles.
- Screen container with safe areas and scrolling variants.
- Surface with primary, elevated, muted, outline, tonal, and inverse variants.
- Card / Linked Surface Group with one-card, two-card, and multi-card layouts.
- GlassSurface for compact iOS-only/fallback use.
- Icon and IconButton.

### Actions

- Primary button.
- Secondary button.
- Tertiary button.
- Ghost button.
- Destructive button.
- Full-width button.
- Loading button.
- Icon button.
- Split action row.
- Bottom sticky action bar.

### Inputs

- Text input for translated answers.
- Multiline answer input.
- Search input.
- Strictness selector.
- Segmented control.
- Toggle / switch.
- Reminder time picker.
- Native select or menu.
- Validation, error, helper, and disabled states.

### Learning Components

- Sentence prompt card.
- Answer composer.
- Word bank chip.
- Selected word chip.
- Hint row.
- Strictness badge.
- Progress header for 1 of 5 sentences.
- Feedback panel.
- Correction diff row.
- Teacher note.
- Save word action.
- Save sentence action.
- Session summary card.

### Review Components

- Review deck selector.
- Flashcard front.
- Flashcard answer reveal.
- Known / unsure / difficult grading controls.
- Mistake review card.
- Saved sentence review card.
- Empty deck state.

### Library Components

- Library overview card.
- Filter bar.
- History attempt card.
- Saved word card.
- Saved sentence card.
- Mistake notebook card.
- Section header.
- Empty state.
- Pull-to-refresh state.

### Progress Components

- Metric card.
- Daily goal card.
- Weekly activity chart.
- Achievement card.
- Accuracy trend.
- Difficult words list.
- Reminder preferences card.
- Backend/AI status card.
- Monetization/reward card.

### System States

- Loading state.
- Empty state.
- Error state.
- Offline or unavailable state.
- Permission prompt state.
- Notification opt-in state.
- Save success toast.
- Delete confirmation.
- Bottom sheet.
- Modal dialog.

## Screen Designs Needed

### 1. Onboarding

Design a short onboarding flow even if it is not fully implemented yet.

Screens:

- Welcome to Correcta.
- Choose learning language.
- Choose native/source language.
- Choose level.
- Choose practice goal.
- Optional placement test intro.
- Notification preference.

Tone:

- Calm and direct.
- No marketing-style hero.
- The value should be visible through the practice workflow.

### 2. Home

Purpose: start the next useful learning action.

Content:

- App name and greeting.
- Daily practice card.
- Next session preview.
- Daily goal progress.
- Continue practice action.
- Review due action.
- Recent mistake insight.
- Saved material shortcut.

Primary action:

- Start practice.

Secondary actions:

- Review due cards.
- Open library.
- Adjust goal.

States:

- First run.
- Returning learner.
- Daily goal complete.
- No local data yet.
- Offline/local-only mode.

### 3. Practice

Purpose: one focused sentence at a time.

Content:

- Progress header: sentence 1 of 5.
- Source sentence prompt.
- Target language indicator.
- Hints.
- Input mode selector: type or build.
- Answer text input.
- Word bank.
- Submit, skip, show hint.

States:

- Loading session.
- Prompt ready.
- Typing answer.
- Sentence builder active.
- Hints hidden.
- Hints revealed.
- Submit disabled.
- Checking.
- Check failed.
- Skipped.

Design notes:

- The prompt and answer area should be the clearest objects on screen.
- Keyboard handling must leave the submit action reachable.
- The word bank should feel tactile, not like web tags.

### 4. Feedback

Purpose: explain the result and create review material.

Content:

- Result state: correct, almost, incorrect, skipped.
- Original sentence.
- User answer.
- Correct or accepted answer.
- Teacher note.
- Specific changed words or grammar note.
- Accepted alternatives when available.
- Save word.
- Save sentence.
- Retry.
- Continue.

States:

- Correct answer.
- Almost correct.
- Incorrect answer.
- Skipped answer.
- Save word loading.
- Save sentence loading.
- Word already saved.
- Sentence already saved.
- Last sentence in session.

Design notes:

- This should be the most polished screen in the app.
- Use the marked feedback note pattern.
- Avoid making incorrect answers feel like failure.

### 5. Session Summary

Purpose: close the learning loop and suggest next action.

Content:

- Sentences completed.
- Correct / almost / missed count.
- Words saved.
- Sentences saved.
- Mistakes created.
- Accuracy summary.
- Recommended next action.

Actions:

- Start another session.
- Review mistakes.
- Open library.

States:

- Perfect session.
- Mixed session.
- Many skipped answers.
- No saved material.

### 6. Review

Purpose: practice saved and due material.

Content:

- Recommended decks.
- Deck types: words, sentences, mistakes, difficult items.
- Active review card.
- Reveal answer action.
- Known, unsure, difficult grading.
- Due count.

States:

- Loading.
- Empty.
- Deck selected.
- No cards in selected deck.
- Answer hidden.
- Answer revealed.
- Grade pending.
- Deck complete.

Design notes:

- Flashcards should feel like focused study cards, not game tiles.
- The grading controls should be easy to tap repeatedly.

### 7. Library

Purpose: browse everything the learner has produced or saved.

Content:

- Overview counts.
- Filters.
- Practice history.
- Saved words.
- Saved sentences.
- Mistake notebook.
- Retry actions.
- Remove saved item actions.

States:

- Empty library.
- Populated library.
- Filtered empty state.
- Loading.
- Refreshing.
- Action failed.

Design notes:

- Use dense but readable rows/cards.
- Saved content should feel valuable and organized.
- Mistake groups should feel like lessons.

### 8. Progress

Purpose: show learning momentum without guilt.

Content:

- Core metrics.
- Daily goal.
- Weekly activity.
- Accuracy trend.
- Achievements.
- Reminder preferences.
- Backend/AI status.
- Monetization/reward availability, if enabled later.

States:

- Loading.
- Error.
- No progress yet.
- Daily goal incomplete.
- Daily goal complete.
- Reminders off.
- Reminders on.
- AI unavailable.
- Reward unavailable.

Design notes:

- Keep progress motivational but restrained.
- Avoid leaderboard, gems, coins, childish badges, or pressure tactics.

### 9. Notifications And Reminders

Purpose: let the learner choose gentle reminders.

Content:

- Practice reminder toggle.
- Review reminder toggle.
- Reminder time.
- Quiet hours.
- Due review reminder.
- Example notification preview.

Tone:

- User-controlled.
- No guilt.
- No streak threats.

### 10. Settings

Purpose: future account, learning, accessibility, and preferences.

Content:

- Languages.
- Level.
- Daily goal.
- Strictness.
- Notifications.
- Theme.
- Accessibility preferences.
- Privacy and data.
- Subscription or ads preferences, if needed later.

## Data And AI Concepts To Reflect

Correcta currently has local-first practice, history, review, and progress
flows. Future backend and AI integration should feel native to the design.

AI responsibilities:

- Generate sentence prompts.
- Validate translations.
- Explain corrections.
- Detect accepted alternatives.
- Provide teacher notes.
- Identify saved/mistake review material.

Design requirements:

- AI loading should be calm and specific.
- AI errors should explain what the user can do next.
- Unsafe or malformed AI responses should fall back to local/neutral states.
- The UI should never imply that one generated answer is the only possible
  correct answer when alternatives are accepted.

## Monetization Constraints

If rewarded ads or monetization appear later, they must never interrupt active
learning.

Safe ad/reward moments:

- After session summary.
- After daily goal completion.
- Optional bonus review pack.
- Optional progress reward.

Unsafe moments:

- During sentence answering.
- During feedback.
- During review card grading.
- Before showing a correction.
- As a punishment for mistakes.

## Accessibility Requirements

- Dynamic text must work.
- Reduced motion must work.
- VoiceOver and TalkBack labels must be meaningful.
- Icon-only controls need accessible names.
- Color cannot be the only result indicator.
- Touch targets must be at least 44 x 44.
- Feedback states need text labels: correct, almost, incorrect, skipped.
- Focus states must be visible.
- Dark mode must preserve contrast.

## Copy Direction

Correcta copy should sound like a precise teacher, not a game host.

Use:

- "Try another sentence"
- "Review this mistake"
- "This translation works"
- "Close. Check the tense"
- "Save this sentence"
- "Practice due cards"
- "You finished today's goal"

Avoid:

- "Crush it"
- "You failed"
- "Oopsie"
- "Unlock epic rewards"
- "Keep your streak alive or lose it"
- "Boss level"
- "Leaderboard"

## Visual Avoid List

Do not use:

- Neon or rainbow palettes.
- Gradients as backgrounds, borders, buttons, progress, or decorative fills.
- Green as brand, navigation, primary action, or active state.
- Mascots or childish illustrations.
- Confetti-heavy reward screens.
- Generic SaaS dashboard cards.
- Browser-like web UI.
- DOM-inspired layouts.
- Large marketing hero sections inside the app.
- Blurred atmospheric stock images.
- Overly beige monotone surfaces.
- Excessive shadows.
- Nested cards inside cards.
- Decorative glass behind core learning content.
- Leaderboards, coins, gems, or guilt-based streak pressure.

## Implementation Constraints

Design with the existing React Native app in mind.

- Use React Native primitives and native-friendly components.
- Do not assume DOM elements, CSS files, CSS modules, selectors, media queries,
  pseudo-classes, or browser-only APIs.
- Avoid web-only interaction patterns.
- Keep shared UI concepts reusable under the common component system.
- Keep screen-specific details scoped to their screens.
- Prefer native bottom tabs, native text inputs, native switches, and native
  platform affordances.
- Designs should be buildable without custom web CSS.

## Deliverables Requested From Google Stitch

Create a design package that includes:

- Light mode and dark mode.
- iOS and Android screen variants where platform behavior differs.
- A component library with all states.
- Production screens for Home, Practice, Feedback, Summary, Review, Library,
  Progress, Notifications, Settings, and Onboarding.
- Empty, loading, disabled, error, offline, success, and permission states.
- Token tables for color, type, spacing, radius, icon sizes, and elevation.
- Annotated interaction notes for practice, feedback, review, save, and
  reminders.
- Responsive mobile constraints for small and large phone screens.
- Accessibility notes for every screen and state.
- Export-ready specs that can be implemented in React Native.

## Success Criteria

The generated design is successful if:

- It clearly looks like Correcta, not a generic language app.
- The sentence practice and feedback loop is immediately understandable.
- Feedback screens feel careful, useful, and premium.
- The Linked Surface Group pattern becomes a recognizable app signature.
- The Scribe Blue palette is preserved.
- The design works in light mode and dark mode.
- The UI feels native on iOS and Android.
- The system is comprehensive enough to implement all planned app surfaces.
- The design avoids childish gamification and guilt-based motivation.
