# UX Clarity & Motion Polish — Improvement Plan

Status: **planning** (findings only; no code changed yet). Intended for
implementation in a later session.

This plan is a round-2 UX refinement on top of the completed
[visual-design-interaction-polish](visual-design-interaction-polish.md) phase
(Slices 1–15). The design _system_ — Scribe Blue tokens, squircle cards, motion
tokens, shared components — is mature. The goal here is to make the app
**easier to understand at a glance**, **faster to start using**, and
**smoother**, without redesigning the system.

## Goals (from the product owner)

1. **One obvious way to do the main thing.** A new user should start Practice
   immediately and find the other features without investigation.
2. **One path per feature.** Multiple routes to the same destination confuse
   users — collapse them.
3. **Less explaining.** If a control is self-evident, don't caption it. Cards
   should be glanceable, not instructional.
4. **No aggressive layout shift.** Switching the Practice **Type / Build**
   modes must not jump; if both can't share a height, animate the change
   (use `react-native-ease`).
5. **Animate wherever it earns its place.** Tasteful motion on mounts, value
   changes, content swaps, and feedback — using `react-native-ease`, the
   library already wired into 12 components.

## Design guardrails (do not violate while improving)

These come from `docs/design.md` and the PRD (`language-app-planning-docs/01`)
and constrain _how_ we add polish:

- **Motion explains state changes; it never entertains.** No confetti, no
  arcade bounce, no shake. (`design.md` §"Elevation And Motion"; PRD §20.6.)
- **Learning content stays more prominent than decoration.** Don't animate
  reading content in ways that slow the practice loop.
- **Respect reduced motion** via `useReducedMotion` — every animated component
  already has a `type: "none"` branch; new ones must too.
- **Calm, teacher-like copy.** Trimming text must not make tone cold; prefer
  removing redundant rows over rewording good ones.
- **Reuse motion tokens** in `src/theme/motion.ts` (durations, springs) and the
  established `EaseView` / `PressableMotionView` patterns. Do not add Moti,
  Lottie, Skia, or a charting library (explicitly out of scope for this app).

## How the codebase is laid out (orientation)

- **Navigation:** native bottom tabs (`src/router/MainTabs.tsx`) = Home,
  Practice, Review, Progress, Library. A root stack
  (`src/router/RootNavigator.tsx`) also holds two **dev** screens. Notification
  routing: `src/router/hooks/useNotificationResponseRouting.ts`.
- **Main feature:** Practice (`src/screens/Practice`). Type/Build modes live in
  `TranslationInputPanel.tsx` → shared `SegmentedControl` + `ScrambledWordsInput`.
- **Shared UI:** `src/components/common/*`. Motion already uses
  `react-native-ease` in `PressableMotionView`, `SegmentedControl`, `Chip`,
  `ProgressBar`, `NoticeCard`, `EmptyState`, `ErrorState`, `LoadingState`,
  `TextInput`, and Practice's `SelectedWordsRow` / `ResultBanner` /
  `usePracticeAnimations`.

---

## Section A — Navigation: one clear path per feature

**Problem (verified entry-point map).** Several features are reachable many
ways, which is exactly the confusion the product owner called out:

| Destination                   | Entry points                                                                                     | Verdict                                |
| ----------------------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------- |
| **Practice**                  | Practice tab; Home hero CTA; Library "retry attempt"; Progress recommendation card; Notification | **5 paths**                            |
| **Review**                    | Review tab; Home "Continue review" CTA; Progress recommendation; Notification                    | **4 paths**                            |
| **Library**                   | Library tab; Home "Open library" CTA; Progress recommendation                                    | **3 paths**                            |
| **Progress**                  | Progress tab; Notification                                                                       | 2 paths, but **under-surfaced in-app** |
| **Home**                      | Tab only                                                                                         | OK                                     |
| **ComponentPlayground** (dev) | Home header gear icon                                                                            | **should be 0**                        |
| **ExpoUiShowcase** (dev)      | Home header info icon                                                                            | **should be 0**                        |
| **CardPerformance**           | none                                                                                             | **dead scaffold**                      |

Refs: `src/router/MainTabs.tsx:33-63`, `src/screens/Home/HomeScreen.tsx:33-66`,
`src/screens/Progress/ProgressScreen.tsx:74-81`,
`src/screens/Library/LibraryScreen.tsx:58`,
`src/router/RootNavigator.tsx:82-96`.

**Guiding rule for the fix.** A tab is the _canonical_ path to each feature.
A Home shortcut is allowed **only when it carries context the tab can't** — a
specific due item with a count and a reason (e.g. "Review 6 due words"), acting
as a deep-link, not a generic duplicate of the tab. Generic "Open Review" /
"Open Library" buttons that just re-open a tab sitting in the bottom bar are the
confusing kind and should go.

### A1 — Remove dev screens from the shipping app (highest impact)

- Delete the two header `IconButton`s and their handlers in
  `HomeScreen.tsx:36-66` (the app's only two prime action slots currently open
  a "component check" and an "Expo UI showcase").
- Remove `ComponentPlayground` and `ExpoUiShowcase` from the production stack
  (`RootNavigator.tsx:11-12, 82-96`), or gate both behind `__DEV__` so they
  exist for development but never ship.
- **Why:** removes two non-feature destinations from the most prominent slots
  and eliminates the "what is this gear?" investigation cost.

### A2 — Collapse Practice's duplicate paths (5 → 2 + 1 contextual)

- **Keep:** Practice tab (`MainTabs.tsx:38`) and Home hero CTA
  (`HomeScreen.tsx:33`, adaptive "Start practice" / "Keep practicing").
- **Keep (contextual, not a duplicate):** Library "retry this sentence"
  (`LibraryScreen.tsx:58`) — it carries `retrySentenceId`, a genuinely
  different intent.
- **Reconsider:** the Progress recommendation routing to plain Practice
  (`ProgressScreen.tsx:81`) — when the action is just "practice," it duplicates
  the hero/tab with no added context.

### A3 — Give Progress one honest discovery path

- The Home `QuickStatGrid` tiles (Streak / Review / Saved / Accuracy) _look_
  tappable but do nothing (`QuickStatGrid.tsx:24-39`) — a discoverability trap.
- **Pick one** (do not do both): either make the tiles non-interactive in
  appearance and rely on the Progress tab, **or** make each tile deep-link to
  its feature. Recommended: keep them inert visually (the tab is the canonical
  path) to avoid creating _yet more_ duplicate routes to Review/Library.

### A4 — One "what next" recommender, not two

- Home's `ContinueLearningCard` and Progress's `ProgressRecommendationCard` are
  two separate recommendation surfaces pointing at the same destinations.
  Consolidate to **one** (prefer Home, the entry screen). This is what brings
  Review from 4→2 and Library from 3→2.

### A5 — Delete dead navigation code

- Remove the empty `src/screens/CardPerformance/` scaffold (3 empty subdirs, no
  files, no references).

### A6 — Keep the main feature reachable during load/empty (lower priority)

- The hero "Start practice" CTA disappears in Home's `loading` and `empty`
  states (`HomeScreen.tsx:69-123`) because it's gated on a 7-call `Promise.all`
  (`useHomeViewModel.ts:29-49`). Render a static CTA in those states so the main
  feature is one tap away even before data resolves. (The Practice tab still
  works, so this is a refinement.)

---

## Section B — Cards: stop explaining the obvious

**Problem.** The most common offense is **a subtitle/caption row that restates
the heading or narrates an obvious mechanic**, plus **developer vocabulary
leaking into learner-facing cards** ("local", "schedule metadata", "providers
stay server-side", ad-SDK plumbing). The shared primitives (`Card`, `StatCard`,
`SectionHeader`…) are fine — they just expose optional subtitle/helper slots;
the redundant strings live in the screen components and in
`src/screens/Home/utils/homeUtils.ts`.

### B1 — High-impact trims (delete these on-screen strings)

| #   | file:line                                                 | Trim                                                                            | Why                                                                                                                         |
| --- | --------------------------------------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| 1   | `Practice/components/TranslationInputPanel.tsx:74-76`     | "Choose how you want to compose this translation."                              | Sits under "Answer" directly above the Type/Build toggle, whose labels already say this. The exact case the PO described.   |
| 2   | `Practice/components/TranslationInputPanel.tsx:91`        | `helperText="Write the most natural translation you can."`                      | Field already has `label` + `placeholder`; third string is coaching, not instruction.                                       |
| 3   | `Progress/components/ReminderPreferencesCard.tsx:115-119` | "Quiet hours are respected in local schedule metadata."                         | Pure implementation narration under controls that already show state.                                                       |
| 4   | `Progress/components/BackendAiStatusCard.tsx:22-36`       | Contract version + `METHOD /path` + per-endpoint descriptions                   | An API-spec dump on a learner's Progress screen. Keep only the Remote/Local badge; hide the rest behind a debug affordance. |
| 5   | `Review/components/ReviewCard.tsx:104-111`                | "Known spaces it out, unsure keeps it nearby, difficult brings it back sooner." | Caption under three already-labeled grade buttons; self-evident after one use. Gate behind a one-time hint at most.         |
| 6   | `Review/components/ReviewDeckSelector.tsx:75-79`          | "Tap to focus"                                                                  | Explains how to tap a button that already has press motion + selected state.                                                |
| 7   | `Library/components/HistoryAttemptCard.tsx:43-113`        | "Your answer" label + redundant no-mistakes success chip; 3 chip rows           | ~8 visual rows in a list item; success chip duplicates the pass badge already at top. De-densify to 1 heading + 1 meta row. |
| 8   | `Home/utils/homeUtils.ts:189`                             | "Use saved words and sentences to decide what to practice next."                | Eyebrow + title + "Open library" button already say it.                                                                     |

### B2 — Systemic sweeps (do once, across the app)

1. **Delete source-describing subtitles & strip developer framing.** Four
   Progress cards open with a subtitle that re-describes the heading and leaks
   "local"/"locally"/"schedule metadata": `AchievementsCard.tsx:17-19`,
   `WeeklyActivityCard.tsx:22-24`, `MistakeBreakdownCard.tsx:19-21`,
   `ProgressHeroCard.tsx:25` ("Local XP"). Also `MonetizationCard.tsx:22-27`
   ("Rewarded ad provider not connected" → user-facing "No bonuses available
   right now" or hide).
2. **Drop filler eyebrow/caption rows in the eyebrow→title→body→caption stack.**
   Every Home card (`homeUtils.ts`) and `SessionSummaryCard.tsx:21-29` follow
   this 4-row stack; the eyebrow/caption are where redundancy concentrates
   (restating the title, or defining an obviously-named metric like "Accuracy"
   → "Correct answers", `homeUtils.ts:120`). Make those slots optional and omit
   when title + value already carry meaning.
3. **Align heavy list cards to the lean model.** `HistoryAttemptCard` and
   `SavedSentenceCard` carry 3 chip rows + labeled blocks; `SavedWordCard` /
   `MistakeNotebookCard` already show the target of 1 heading + 1 meta row.
4. **Remove "how to tap this" captions** on self-evident pressables
   (`ReviewDeckSelector` "Tap to focus", `ReviewCard` grade explainer).
5. **Shorten visible destructive labels** to "Remove" (`SavedSentenceCard.tsx:61`,
   `SavedWordCard.tsx:61`); the `accessibilityLabel` keeps the full context.

### B3 — Do NOT trim (keep-list, to avoid over-correcting)

- Positional/state data: `ReviewCard` "Card n of total", `PracticeHeader` rows,
  `SessionSummaryCard` metric grid.
- Pedagogical distinctions: `HistoryAttemptCard` "Best translation" label
  (user-answer vs canonical is the teaching point), `ScrambledWordsInput`
  "Your answer" / "Word bank" (disambiguate two chip areas).
- Dynamic feedback labels: `FeedbackPanel` "Save word"→"Word saved",
  `PracticeActionBar` "Check answer"/"Checking answer".
- All `accessibilityLabel` composers (off-screen; they're what _lets_ the
  visible labels shrink).
- Single-noun helpers that make a bare number meaningful ("Day streak",
  "Words and sentences").

### B4 — Delete dead code (independently confirmed)

- `src/screens/Practice/components/AnswerComposer.tsx` and
  `src/screens/Practice/components/InputModeControl.tsx` are **not imported
  anywhere** — `PracticeScreen` wires only `TranslationInputPanel` →
  `ScrambledWordsInput`. The hand-rolled `InputModeControl` tabs and the
  `AnswerComposer` "Build your answer" placeholder are legacy. Delete both
  (their live replacement is the shared `SegmentedControl`).

---

## Section C — Animations (react-native-ease)

### C0 — One constraint that shapes everything

`EaseView` animates only `opacity`, `translate*`, `scale*`, `rotate*`,
`borderRadius`, `backgroundColor`, `border*`, and shadow/elevation. **It cannot
animate `height` or `width`.** So "animate the layout change" is achieved with a
**reserved min-height container + a keyed crossfade**, not a height tween. A true
height animation would require RN `LayoutAnimation`/`Animated`, which is outside
the react-native-ease mandate — we deliberately don't go there. Every animation
below reuses the existing reduced-motion gate (`{type:"none"}` + zeroed initial
offsets) and the motion tokens in `src/theme/motion.ts`.

### C1 — Flagship: kill the Type/Build layout shift

**Where:** `Practice/components/TranslationInputPanel.tsx:85-111` — a ternary
hard-swaps a multiline `TextInput` (≈150–160px) for `ScrambledWordsInput`
(≈230–260px empty, 320–420px once chips wrap). **Net jump ≈80px empty, up to
~260px populated**, with no transition — the card snaps taller/shorter on every
toggle.

**Fix (react-native-ease-consistent):**

1. Wrap the ternary body in a `View` with `minHeight` set to the taller
   baseline (~240) so toggling never collapses the card.
2. Render the active mode inside an `EaseView` **keyed by `inputMode`** so a
   fresh mount re-fires the entry each swap:
    ```tsx
    <View style={{minHeight: 240}}>
      <EaseView
        key={inputMode}
        animate={animations.visible}
        initialAnimate={animations.initialFadeSlide}  // opacity 0 / translateY 8
        transition={animations.entryTransition}        // timing normal / easeOut
      >
        {inputMode === "typing" ? <TextInput … /> : <ScrambledWordsInput … />}
      </EaseView>
    </View>
    ```
    `usePracticeAnimations` already exports `visible`, `initialFadeSlide`, and
    `entryTransition` (`usePracticeAnimations.ts:32-49`) — reuse verbatim, no new
    tokens.
3. Residual growth from adding chips: the per-chip entry is already spring-
   animated (`SelectedWordsRow.tsx:27-43`); with the min-height floor the
   remaining growth reads as intentional rather than a snap. (Document that a
   literal height tween is intentionally not used.)

This also satisfies the PRD's "animate chip movement smoothly" requirement
(§11.8) and removes the single most-cited UX complaint.

### C2 — High-value animations (prioritized)

| #   | Location (file:line)                                                                                                       | Today                                                                           | Proposed motion                                                                        | Reuse                    |
| --- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------ |
| 1   | `TranslationInputPanel.tsx:85-111`                                                                                         | Type↔Build hard-cut, card jumps                                                 | min-height + keyed crossfade (C1)                                                      | `usePracticeAnimations`  |
| 2   | `Review/components/ReviewCard.tsx:67-113`                                                                                  | "Reveal answer" swaps for answer + 3 grade buttons, big jump                    | Reserved min-height + crossfade reveal (opacity+translateY), `duration.normal`         | NoticeCard entry         |
| 3   | `Review/components/ReviewCard.tsx:36-115`                                                                                  | Advancing to next card hard-cuts                                                | `EaseView` keyed by `currentIndex`, slide translateX 16→0                              | `ENTRY_TRANSITION`       |
| 4   | `common/Button/Button.tsx:69-91`                                                                                           | `loading` swaps spinner↔label instantly; width can shift                        | Crossfade spinner/label opacity, `duration.fast`; fires on every submit/grade/save     | —                        |
| 5   | `Practice/components/FeedbackPanel.tsx:42-96`                                                                              | Whole panel appears at once (only `ResultBanner` animates)                      | **Layered stagger**: each block its own `EaseView` with `delay` 0/60/120/180           | `usePracticeAnimations`  |
| 6   | `common/ResultBadge` (via `ResultBanner.tsx:40`)                                                                           | Score badge pops in                                                             | scale 0.9→1 + opacity, `spring.emphasis`                                               | `motion.spring.emphasis` |
| 7   | `QuickStatGrid.tsx:35`, `ProgressMetricGrid.tsx:35`, `WeeklyActivityCard.tsx:36`, `SessionSummaryCard.tsx:32-74`, XP/level | **Numbers jump** instantly                                                      | **`AnimatedCounter`** tween over `duration.emphasis`                                   | new helper               |
| 8   | `Home/HomeScreen.tsx` card stack                                                                                           | All cards mount flat at once                                                    | Staggered entry `delay` 0/80/160/240                                                   | `usePracticeAnimations`  |
| 9   | `common/Card/Card.tsx:54-55,110-117`                                                                                       | `canRenderSurface` gate flips visible with no fade → cards "snap in" everywhere | Add opt-in fade-in when `canRenderSurface` becomes true — **one edit, broad payoff**   | Chip bg-transition       |
| 10  | `Review/components/ReviewDeckSelector.tsx`                                                                                 | Selected deck outline↔tonal swaps instantly                                     | Animate `backgroundColor`, `duration.fast` (the `Chip` state-layer pattern)            | `Chip`                   |
| 11  | `Practice/components/SentencePromptCard.tsx` (skip)                                                                        | Card hard-cuts on skip                                                          | Quick exit slide/fade before next loads — PRD §20.6 "skip moves the card away quickly" | `ENTRY_TRANSITION`       |

### C3 — Medium / low (nice-to-haves)

- Section-level entry stagger for Progress/Review/Library cards. **Caveat:**
  `LibraryScreen` uses a `SectionList` — animate the **section container**, not
  each row, or `initialAnimate` re-fires on scroll recycle (flicker).
- Conditional chip blocks that pop in: `HistoryAttemptCard` mistakes row,
  `SavedWordCard.tsx:31-38`, `PracticeActionBar.tsx:42-50` ("Show hint"
  appears/disappears), `SentencePromptCard.tsx:31-44` hint reveal — crossfade
  with opacity, `duration.fast`.
- Practice answering-phase error `Surface` (`PracticeScreen.tsx:117-124`) pops —
  wrap in `EaseView` fade.

### C4 — Leave alone (already animated or native)

`EmptyState`, `ErrorState`, `LoadingState`, `NoticeCard`, `ProgressBar`, `Chip`,
`SegmentedControl`, `SelectedWordsRow` chips, `ResultBanner`, `TextInput` support
text — all already animate and respect reduced motion. `NativeCollapsible`,
`NativeSwitch`, `NativeCheckbox` self-animate natively — **do not** wrap native
host views in `EaseView`.

### C5 — Reusable helpers to add (in `src/components/common`, all reduced-motion gated)

1. **`AnimatedMount`** — `EaseView` wrapper, `initialFadeSlide`→`visible` with an
   optional `delay`. Backs #5, #8, and list staggers. (Promotes
   `usePracticeAnimations` to a shared component.)
2. **`Crossfade`** — keyed wrapper (`contentKey`, `minHeight`) that fades+slides
   the active child over a reserved height. Powers the flagship #1 and #2.
3. **`AnimatedCounter`** — reduced-motion-aware; tweens a number to its target
   over `duration.emphasis` via a JS interpolation (since text can't be
   `EaseView`-animated), snapping to final value under reduced motion. Powers #7.
4. **Bake the fade-in into `Card`** (#9) instead of a new component — single edit,
   nearly every card benefits.

### C6 — Coverage vs PRD §20.6 "required animation moments"

| PRD-required moment                    | Status after this plan                                  |
| -------------------------------------- | ------------------------------------------------------- |
| Sentence card enters smoothly          | C2 #9 (Card fade-in)                                    |
| Submit button reacts to touch          | already done (`PressableMotionView`)                    |
| Feedback appears in layers             | C2 #5 (stagger)                                         |
| Mistakes highlight progressively       | C2 #5 + `MistakeHighlights` stagger                     |
| Correct words lock into place          | partly done (`SelectedWordsRow`); reinforce             |
| XP bar fills after a session           | `ProgressBar` done + C2 #7 counter                      |
| Flashcards reveal smoothly             | C2 #2 (crossfade reveal; optional `rotateY` flip later) |
| Saved-word confirmation appears        | **needs Toast → Section D** + C2 #4                     |
| Wrong-answer calm motion               | `ResultBanner` done + C2 #6                             |
| Skip moves card away quickly           | C2 #11                                                  |
| Weekly report cards animate in         | C3 (Progress section stagger)                           |
| Level-up celebration (polished, brief) | **gap → Section D**, keep calm (no confetti)            |

---

## Section D — User feedback (haptics, success states, confirmations)

### D0 — The structural gap: no transient feedback primitive

There is **no toast / snackbar / confirmation primitive anywhere** (no
`Alert.alert` in app code either). The only feedback channels are haptics, a11y
announcements, and inline state-swaps that need a render slot. So any action
whose UI has already moved on — **save success, "reminder set", "item deleted"**
— is silent. A `Toast` is already specced and marked **High Priority / not
implemented** in `TODO/pending-components.md` and in `docs/design.md`
§"Notices, Toasts, And Notifications". **Build it — it unblocks most of this
section.**

- Add `src/components/common/Toast` with the documented compound anatomy
  (`Toast.Title/Description/Action/Close`), `CorrectaToastProvider`,
  `useCorrectaToast`, variants (default/accent/success/warning/danger),
  safe-area + keyboard-aware placement, swipe/close dismissal, reduced-motion.
- Add a confirm primitive for destructive actions (native `Alert.alert` is the
  minimum) — see D2 Library delete.

### D1 — Fix three silent-failure bugs (correctness, not polish — do first)

| Bug                             | file:line                                                          | Problem                                                                                                                        | Fix                                                                                  |
| ------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| Practice save word/sentence     | `usePracticeSaveActions.ts:33-61, 71-100`                          | `try`/`finally` with **no `catch`** — on failure nothing is surfaced, no error haptic, button silently re-enables              | Add `catch` → error state near the button (or toast) + `playHapticFeedback("error")` |
| Practice summary error          | `usePracticeFlowActions.ts:118-141` → `PracticeScreen.tsx:117-124` | On `getPracticeSummary` failure the `error` is rendered **only in the answering branch**, so "Show summary" dead-ends silently | Render `error` in the feedback/summary branch too; fire error haptic                 |
| Progress save-preferences error | `useProgressDashboard.ts:137-169` → `ProgressScreen.tsx:53-65`     | Error is caught into `error` but **never rendered** (screen only shows it when `phase==="error"`, which saves don't set)       | Render `error` on/under the reminder card                                            |

### D2 — Per-flow feedback gaps

| Flow (file:line)                                                      | Missing                                                                            | Severity | Fix                                                                                    |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | -------- | -------------------------------------------------------------------------------------- |
| Progress reminder toggle/preset `ReminderPreferencesCard.tsx:101-114` | No `loading`/`disabled` during async save → rapid taps race; success silent        | High     | Track `isSavingPreferences`, disable while pending; toast/haptic on success            |
| Progress permission denied `ReminderPreferencesCard.tsx:138-140`      | "Blocked in settings" with **no recovery**; no feedback after OS dialog            | Medium   | Add "Open Settings" (`Linking.openSettings()`); confirm on grant                       |
| Library delete word/sentence `useLibraryRecords.ts:166-200`           | **No confirm before destructive delete**; no success feedback (item just vanishes) | Medium   | `Alert.alert` confirm; `success` haptic + toast; consider optimistic remove + rollback |
| Review grade save `useReviewDeck.ts:128-158`                          | Success has no visible toast (haptic + a11y + advance only)                        | Low      | Optional brief "Saved" toast                                                           |

> Note: top-level loading/empty/error coverage is already broad and good
> (Home/Practice/Review/Progress/Library all use the shared state components),
> and Review grading + Practice answer-check are exemplary (per-button loading,
> disabled-to-prevent-double-tap, error haptic, recoverable error). The fixes
> above bring the rest of the app up to those existing patterns.

### D3 — Haptics: fill the high-value gaps & make it consistent

Service exists (`hapticsService.ts`, 5 presets via `react-native-pulsar`).
Practice and Review are well-instrumented; **Home, Progress, and Library fire
zero haptics** (grep-confirmed). Add:

- **Emotional milestones (highest value, currently silent):** streak increment
  (`homeUtils.ts:96-101`, `progressUtils.ts:143`), achievement earned
  (`AchievementsCard.tsx:28-48`), session-summary completion — a brief `success`
  haptic (+ the C2 #7 counter / a calm, brief celebration; **no confetti** per
  guardrails).
- **Consistency:** `selection` haptic on Progress reminder presets
  (`ReminderPreferencesCard.tsx:62-97`) and Library filter/segment changes, to
  match Practice/Review. Add to Practice hint reveal
  (`usePracticeSession.ts:235-243`) and skip (`usePracticeFlowActions.ts:73`).

### D4 — Level-up / completion celebration (PRD §20.6, keep calm)

No celebratory moment exists. When the daily goal completes or a level advances,
show a **brief, polished** confirmation (Toast or a small overlay), an
`AnimatedCounter` on the XP/level, and a single `success` haptic. Explicitly
avoid confetti/arcade motion (design guardrail).

---

## Section E — Prioritized roadmap

Sequenced so dependencies land first (Toast before feedback confirmations;
shared animation helpers before their applications). Sized as small,
conventional-commit PRs per repo standards (one logical change each).

### P0 — Correctness & confusion removal (fast, low-risk, high-impact)

1. `fix:` three silent-failure bugs (D1).
2. `refactor:` remove dev screens from shipping app — Home header icons +
   stack entries gated behind `__DEV__` (A1).
3. `chore:` delete dead code — `AnswerComposer.tsx`, `InputModeControl.tsx`
   (B4), empty `CardPerformance/` scaffold (A5).
4. `feat:` Type/Build layout-shift fix — min-height + keyed crossfade (C1).
5. `refactor:` top instructional-text trims (B1 #1, #2, #5, #6).

### P1 — Core feel: feedback primitive + shared motion

6. `feat:` `Toast` + provider/hook (D0).
7. `feat:` wire save/delete/reminder confirmations + destructive-action confirm
   onto Toast (D1 success paths, D2).
8. `feat:` haptic gaps — milestones + consistency sweep (D3).
9. `feat:` shared animation helpers `AnimatedMount` / `Crossfade` /
   `AnimatedCounter` (C5).
10. `feat:` apply motion — Card fade-in (C2 #9), FeedbackPanel layered stagger
    (#5), Review reveal + advance (#2/#3), Home stagger (#8), Button loading
    crossfade (#4), stat counters (#7).

### P2 — Polish & consistency

11. `refactor:` card-density systemic sweep — drop source-describing subtitles,
    strip developer vocabulary, de-densify heavy list cards (B2, B3 keep-list).
12. `refactor:` navigation dedup — consolidate to one "what next" recommender;
    decide Progress discoverability (A3/A4); reconsider Progress→Practice
    generic route (A2).
13. `feat:` remaining motion — deck color crossfade (#10), skip exit (#11),
    section/conditional staggers (C3), ResultBadge scale-in (#6).
14. `feat:` calm level-up/goal-complete celebration (D4).
15. `feat:` show hero CTA during Home load/empty states (A6).

### Open judgment calls (resolved from code; flagged for owner override)

- **Home-as-launcher tension.** The PRD envisions Home quick-cards to
  Review/Saved/Progress _and_ a bottom nav, but the owner wants one path per
  feature. Resolution taken: a tab is the canonical path; a Home shortcut is
  kept **only** when it adds context the tab can't (a specific due item + count
    - reason as a deep-link). Generic "Open Review/Library" duplicates are
      removed. Override if you prefer Home purely as a dashboard.
- **Flashcard "flip."** PRD says "flip"; recommended a calm crossfade reveal
  (library-consistent, less motion). A literal `rotateY` 3D flip is possible
  with `EaseView` later if desired.

## Implementation status

Implemented on branch `feat/ux-clarity-and-motion-polish`. Every commit passes
typecheck, lint, Prettier, and the jest suite independently.

**P0 — done.** Silent-failure fixes (save/summary/reminder errors); dev screens
gated behind `__DEV__`; dead code deleted; Type/Build crossfade; top
instructional-text trims.

**P1 — done.** `Toast` primitive + provider/hook; save/reminder/library-delete
confirmations; haptics on hint/skip/summary/preset/filter; shared motion helpers
(`AnimatedMount`, `Crossfade`, `AnimatedCounter`); applied motion (Home &
feedback stagger, Crossfade-driven Type/Build, Review reveal/advance, Button
spinner fade, summary count-up, linked-card surface fade-in).

**P2 — done / decided.**

- #11 card-density sweep — done.
- #13 motion — `ResultBadge` scale-in done. Deck-color crossfade and skip-card
  exit **deferred**: the app now has comprehensive purposeful motion, and these
  micro-animations risk over-animating against the calm guardrail; skip-exit also
  needs exit-orchestration the current flow doesn't support.
- #14 celebration — calm session-completion celebration done (entry animation +
  count-up + success haptic). Goal-complete/level-up-specific celebration
  **deferred**: needs a domain "goal reached"/"level up" signal (same gap as the
  streak/achievement-earned haptics in #8).
- #12 navigation dedup — **no destructive change.** The genuinely confusing
  duplicate (the dev-screen header buttons) was removed in P0. The remaining
  Home/Progress shortcuts each carry a count or reason the tab can't, so they
  satisfy the plan's own "contextual deep-link" rule and directly serve "the user
  always knows what to do next." A stricter tabs-only collapse is an owner
  preference call, available on request.
- #15 hero CTA in load/empty — **descoped.** It would add another path to
  Practice (counter to the one-path goal) for a transient moment the Practice tab
  already covers; in the empty state, practice isn't available anyway.

**Deferred follow-ups (need product/domain input, not just code):** Toast
swipe-dismiss + declarative `Toast.Title/...` anatomy; streak/achievement/goal/
level-up "unlocked" domain signals to drive milestone haptics and celebrations;
optional stricter navigation collapse; visual QA pass on a simulator.
