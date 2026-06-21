# Pro Extended UX/UI Audit

Status: **planning**. This document records the screenshot-based UX/UI review
performed with ChatGPT Pro Extended on 2026-06-21. It is a recommendation set,
not an implementation record.

Screens reviewed:

- Home top and lower content
- Practice typing mode
- Practice word-builder mode
- Practice feedback state
- Review empty queue
- Progress top and mid-scroll
- Library words, sentences, and history segments

Core review thesis:

> Correcta's main issue is hierarchy, not polish. The product currently gives
> more visual weight to empty statistics, decorative cards, repeated labels,
> and secondary dashboard content than to translation practice.

Use this operating rule for the redesign:

> One screen, one primary job, one dominant action.

## Top Issues

### P0 - The Primary Task Is Diluted

Home should communicate "translate five sentences now", but the main CTA
competes with a hero, goal card, four statistics, a tip, and a learning-path
card. Practice has similar competition between the prompt, mode labels, a
floating gear, three actions, and the persistent tab bar.

Recommended direction:

- Make Home a focused launchpad.
- Make active Practice and Review focused session routes.
- Reduce above-the-fold Home content to the daily practice action, progress
  toward today's goal, and only one conditional next-best action.

### P0 - Empty Data Is Treated Like Meaningful Data

The app repeatedly shows `0%`, `0 saved`, `0 due`, `0 XP`, and similar values
across Home, Review, Progress, and Library. For a new user, this reads as
failure before they have done anything.

Recommended direction:

- Hide unavailable metrics until data exists.
- Use `-` or "Not enough data yet" when a value is genuinely unavailable.
- Never show `0%` accuracy when there have been zero attempts.

### P0 - Active Practice Does Not Feel Immersive

The bottom tab bar remains visible during active learning. That creates
distraction, accidental exits, and a less focused session.

Recommended direction:

- Move active learning routes above the tab navigator.
- Add stack routes such as `PracticeSession`, `PracticeFeedback`, and
  `ReviewSession`.
- Keep the bottom tabs for browsing and entry points, not for the active
  learning loop.

### P1 - The Card System Is Over-Engineered

Dark teal cards, concave cutouts, linked-card geometry, nested cards, chips,
and shadows compete with the learning content. The decorative shape language
is visually distinctive, but it currently adds more weight than clarity.

Recommended direction:

- Use normal white or subtle surfaces for most metric and list cards.
- Reserve dark inverse surfaces for at most one hero surface per screen.
- Remove concave linked-card shapes from ordinary dashboard metrics.
- Use borders for normal cards and reserve shadows for true overlays or the
  tab bar.

### P1 - Several Controls Communicate The Same State Twice

Practice shows both a Typing/Builder badge and the Type/Build segmented
control. The floating gear is ambiguous. The full-width blue refreshing bar
looks like a state or error instead of background refresh.

Recommended direction:

- Keep one Type / Word Bank control.
- Remove the separate Typing/Builder badge.
- Move the floating gear into the header as "Practice options".
- Replace full-width refresh bars with native pull-to-refresh or small inline
  status.

### P1 - Information Ownership Is Unclear

Home, Progress, Review, and Library all show overlapping counts. Users should
not need to learn where "saved", "due", "accuracy", "attempts", and "learning
score" belong.

Recommended direction:

- Home: what should I do next?
- Practice: start or configure practice.
- Review: what is due?
- Library: what have I saved or attempted?
- Progress: how am I changing over time?

### P1 - Feedback Is Verbose But Not Actionable Enough

The feedback state shows "Teacher feedback", `100%`, repeated accepted answers,
generic save actions, and "No specific mistakes". That makes a correct result
harder to scan.

Recommended direction:

- Lead with `Correct`, `Almost`, or `Needs work`.
- Then show one explanation, the user's answer, the suggested answer, and only
  meaningful differences.
- Remove `100%` unless it has a clear learner-facing meaning.
- Remove the "No specific mistakes" card after a correct result.
- Offer "Save word" only after a specific word is selected.

### P1 - Readability And Accessibility Are At Risk

Small metadata labels, pale text, tiny chips, fixed-height surfaces, and
color-heavy status communication may not scale well for Dynamic Type or screen
readers.

Recommended direction:

- Target at least 4.5:1 contrast for ordinary text.
- Keep tappable controls at least 44 x 44 pt on iOS and 48 x 48 dp on Android.
- Keep body text around 16 with comfortable line height.
- Avoid fixed-height text containers that cannot grow.
- Do not communicate status by color alone.

## Palette Direction

Use a neutral-first system with one primary interactive hue.

Rules:

- Blue means tappable, selected, or focused.
- Teal is a restrained brand accent, not another button color.
- Green, amber, and red are reserved for semantic feedback.
- Dark inverse surfaces appear at most once per screen.
- Components consume semantic Unistyles tokens instead of raw colors.

| Semantic token | Suggested value | Use |
| --- | --- | --- |
| `background.canvas` | `#F6F7FA` | Main app background |
| `background.surface` | `#FFFFFF` | Cards, editors, list rows |
| `background.subtle` | `#EEF2F6` | Empty states, grouped sections |
| `background.inverse` | `#123B37` | Rare brand hero surface |
| `content.primary` | `#101828` | Titles and body text |
| `content.secondary` | `#5B6472` | Supporting copy and metadata |
| `border.default` | `#D8DEE8` | Cards, inputs, dividers |
| `action.primary` | `#245FC6` | Primary buttons and selected controls |
| `action.pressed` | `#1E4EA6` | Pressed state |
| `action.subtle` | `#EAF1FF` | Selected tab or low-emphasis action |
| `brand.accent` | `#0F6B62` | Logo, learning accent, small illustrations |
| `brand.subtle` | `#E8F5F2` | Brand-tinted supporting surface |
| `status.success` | `#1B7F52` | Correct and saved states |
| `status.successSubtle` | `#E9F7EF` | Success background |
| `status.warning` | `#8A5A00` | Almost-correct or caution |
| `status.warningSubtle` | `#FFF4D6` | Warning background |
| `status.danger` | `#B42318` | Error or destructive state |
| `status.dangerSubtle` | `#FDECEC` | Error background |

Visual rules:

- Replace linked dark metric cards with white surfaces, thin borders, and
  normal rectangular grouping.
- Use 12, 16, and 20 as the main radius steps.
- Remove concave notches from normal cards.
- Reserve shadows for floating overlays and the native tab bar.
- Do not fade entire disabled buttons with opacity. Give disabled surfaces and
  text explicit tokens.

## Screen Recommendations

### Home

Goal: make Home a launchpad rather than a dashboard.

Recommended changes:

- Use one heading, such as `Today` or `Daily practice`.
- Remove redundant eyebrow/title repetition like `Correcta` plus `Daily
  practice` plus another `Daily practice` in the hero.
- Combine the hero, daily goal, and CTA into one module:
  - Spanish to English - Beginner
  - 5 sentences, about 3 minutes
  - optional first-prompt preview
  - Start today's practice
  - goal progress
- If Home previews `Necesito un cafe.`, Practice should open on that same
  sentence. Otherwise, do not preview a specific sentence.
- Keep no more than two secondary metrics above the fold, such as streak and
  sentences this week.
- Hide accuracy until there is a meaningful sample.
- Show Review only when it creates an action, such as `3 cards due` with
  `Review now`, or a quiet explanation that Review appears after practice.
- Move the teacher tip below the main action and style it as a low-emphasis
  inline note.
- Remove duplicate onboarding guidance if Review already explains how to build
  a review set.
- Keep settings in the top app bar. Remove the adjacent information button
  unless it opens clearly relevant content.

Cleaner first viewport:

- Title
- Daily practice module
- Daily goal
- One conditional Review row

### Practice

Goal: make active practice focused, stable, and fast.

Recommended session structure:

- Close/back control
- `1 of 5` progress
- Spanish to English - Beginner metadata
- Prompt
- Input mode and answer editor
- Sticky actions above keyboard and safe area

Recommended changes:

- Move Practice session outside the tab shell.
- Remove the bottom tab bar until the session ends or the user explicitly
  closes it.
- Replace the dark teal prompt card with a white or subtly tinted surface.
- Use one instruction: `Translate into English`.
- Make the Spanish sentence more prominent than metadata.
- Remove repeated variations of "Translate" across title, prompt label, and
  helper copy.
- Rename `Build` to `Word bank`.
- Keep only one Type / Word Bank segmented control.
- Remove the separate Typing/Builder badge.
- Give the answer area a stable minimum height in both modes.
- Preserve one draft per mode at the question level.
- Switching modes should restore the prior draft and should not reset prompt,
  hint, or session progress.
- Do not automatically convert typed text into word-bank tokens unless the
  conversion is lossless.
- Submit the currently active mode's draft.

Word Bank behavior:

- Use larger chips with generous hit regions.
- Tap a chip to move it into the answer region.
- Tap selected chips again to return them.
- Keep the bank in a stable order instead of reflowing unpredictably.
- Place `Clear` beside the answer label, and only show it when an answer
  exists.

Action hierarchy:

- `Check answer` is the single primary action.
- `Show hint` is secondary.
- `Skip` is tertiary and visually quieter than Hint.
- Keep the primary button sticky and visible when the keyboard opens.
- Give disabled controls explicit disabled state and accessible disabled state.
- Move the floating gear into the header overflow as `Practice options`.

Feedback:

- Lead with `Correct`, `Almost`, or `Needs work`.
- Then show:
  - one-sentence explanation
  - your answer
  - suggested answer
  - only meaningful differences
  - collapsed other natural answers when relevant
- Rename `Teacher feedback` to `Feedback` or `Why this works` unless a human
  teacher authored the content.
- Remove `100%` unless its meaning is clear.
- Do not repeat the same accepted answer multiple times.
- Do not show a large `No specific mistakes` card after a correct response.
- Attach `Save sentence` to the sentence as a bookmark action.
- Offer `Save word` only after the user taps or selects a specific word.
- Keep `Next sentence` sticky.
- Swipe can supplement Next/Retry, but visible buttons remain primary and
  accessible.

### Review

Goal: make Review state-driven and obvious.

Recommended states:

1. New user
   - Title: `Build your review set`
   - Explain in one sentence that saved words, saved sentences, and mistakes
     become review cards.
   - Primary action: `Start practice`

2. Caught up
   - Title: `You're caught up`
   - Show the next due time when available.
   - Secondary actions: `Practice new sentences` or `Browse saved items`

3. Cards due
   - Title: `12 cards due`
   - One primary `Start review` button
   - One compact summary of the selected review set

Recommended changes:

- Remove the combination of `Due cards`, `Review queue`, three zero metrics,
  `No review due`, and deck cards from the same empty screen.
- Replace the full-width blue refreshing header with native pull-to-refresh or
  a small inline status.
- Avoid `queue` and `deck` until those concepts provide real user control.
- Show deck selector only when multiple meaningful sets exist.
- Prefer plain terms like `Due today`, `New`, and `Needs work`.

### Progress

Goal: avoid zero-state overload and only show meaningful trends.

Recommended new-user state:

- Title: `Your progress starts after your first practice`
- Brief explanation
- Primary action: `Start practice`

When data exists, show:

- Current streak
- Sentences completed this week
- First-try accuracy with a denominator
- One weekly activity chart
- Goal progress or next milestone

Recommended changes:

- Do not render walls of zero cards, empty charts, `0 XP`, or `0% accuracy`.
- Move saved-content counts to Library.
- Move due-review counts to Review.
- Remove implementation-facing language like `local progress` and `completed
  locally` unless local-only storage is an intentional product promise.
- Rename `Scoreboard` to something concrete like `This week`.
- Remove `Learning score` and XP unless the scoring logic is clear to users.
- Rename `Difficult` to `Needs work`.
- Use `-` for unavailable data rather than zero.
- Build the weekly chart with React Native views; do not add a chart
  dependency unless requirements grow.

### Library

Goal: make Library the saved/attempted content owner.

Recommended changes:

- Choose one name: use either `Library` or `Learning notebook`, not both.
- Put `Words`, `Sentences`, and `History` directly below the title.
- Remove the four-stat summary card in empty states.
- Attempts belong to History or Progress.
- Due items belong to Review.
- Include counts in segment labels only when nonzero, such as `Words 12`.
- Hide search and sorting until there is content.
- Hide History filters when there are no history records.
- Give every empty state one relevant CTA:
  - Words: `Start practice`
  - Sentences: `Start practice`
  - History: `Complete a practice`
- Explain precisely how content arrives: "Tap a word in feedback, then choose
  Save."
- Use simple list rows with dividers rather than putting every saved item in a
  large card.
- A saved word row should eventually show word, translation, source sentence,
  and review status.
- Group history by day and show result, source sentence, answer, and retry
  state.

## Information Architecture

Recommended tab structure:

- Today
- Practice
- Review
- Library

Detailed Progress becomes a pushed screen from a compact summary on Today.
Settings remain in Today's top app bar.

If Progress remains a fifth tab, remove nearly all metrics from Home and
Library. Showing the same metrics in three places is the worst option.

Recommended active routes above tabs:

- `PracticeSession`
- `PracticeFeedback`
- `ReviewSession`

Terminology changes:

| Current | Recommended |
| --- | --- |
| `ES to EN` | `Spanish to English` |
| `Build` | `Word bank` |
| `Next prompt` | `Next sentence` |
| `No review due` | `You're caught up` |
| `Difficult` | `Needs work` |
| `Teacher feedback` | `Feedback` |
| `Review queue` / `deck` / `cards` mixed together | Use one concept per screen |

## Motion And Micro-Interactions

Use motion to explain state changes, not to decorate the interface.

Recommended uses with `react-native-ease`:

- Segmented-control indicator: 160-180 ms ease-out.
- Type / Word Bank content: short opacity and 4-6 unit vertical transition
  while the outer answer container remains stable.
- Word-bank selection: brief scale or opacity confirmation at the destination,
  not a complex shared-element flight.
- Disabled-to-enabled primary button: subtle 120-160 ms color or border
  transition.
- Feedback reveal: 200-240 ms opacity and small upward translation.
- Save action: bookmark fill plus label change from `Save` to `Saved`.
- Daily goal: animate progress only after completing a sentence, not every
  time Home mounts.
- Refresh completion: quiet fade of inline status with no page-wide blue
  transition.
- Review answer reveal: crossfade or expand; avoid a 3D card flip.

Avoid:

- Staggered entrance animation on every dashboard card
- Looping pulses
- Bouncy buttons
- Animated decorative cutouts
- Motion that delays the next action
- Relying on swipe as the only way forward

Respect reduced-motion settings. In reduced-motion mode, remove spatial
movement and use immediate state changes or short opacity transitions.

## Accessibility And Readability

Recommendations:

- Target at least 4.5:1 contrast for ordinary text and 3:1 for large text.
- Give controls at least 44 x 44 pt on iOS and 48 x 48 dp on Android.
- Keep body text around 16 with comfortable line height.
- Use 14 for secondary copy.
- Reserve 12 for genuinely nonessential metadata.
- Keep `allowFontScaling` enabled for text and text inputs.
- Avoid fixed-height text containers and decorative shapes that cannot grow.
- Use icon plus text for Correct, Almost, Needs work, Saved, selected tabs, and
  disabled controls.
- Give segmented controls accessibility roles, selected state, and meaningful
  labels.
- Announce feedback results to screen readers.
- Move accessibility focus to the result heading after feedback appears.
- Apply language metadata to Spanish prompts and English answers where
  supported.
- Ensure swiping has equivalent visible buttons and screen-reader actions.
- Keep tab labels permanently visible and use recognizable icons.
- Test large text, VoiceOver, TalkBack, small Android layout, and software
  keyboard behavior.

## Quick Wins

- Remove concave cutouts and linked-card shapes from ordinary metric groups.
- Hide repeated zero metrics or render `-`.
- Remove the duplicate Typing/Builder badge.
- Rename `Build` to `Word bank`.
- Move the floating gear to the header.
- Remove the full-width refresh header.
- Standardize titles and terminology.
- Increase metadata and chip sizes.
- Use one card radius and one border style.
- Hide filters and metrics in empty states.

## High-Impact Larger Changes

- Move active Practice and Review into full-screen stack routes.
- Rebuild Home as a single-action Today screen.
- Reduce native tabs from five to four if Progress becomes a detail screen.
- Add per-question, per-mode draft persistence.
- Redesign feedback around answer comparison and actionable differences.
- Implement state-driven Review onboarding, caught-up, and due screens.
- Redefine Progress metrics and data ownership.
- Rework saved-word selection and Library content models.
- Add session restoration and safe exit behavior.
- Conduct full Dynamic Type, VoiceOver, TalkBack, and keyboard QA.

## Phased Roadmap

| Phase | Scope | Dependencies | Primary risk | Complexity |
| --- | --- | --- | --- | --- |
| 0. Product definitions | Decide screen ownership, terminology, metric definitions, empty states, and Type / Word Bank draft behavior. | None | Building polished UI around unresolved concepts. | S |
| 1. Visual foundation | Add semantic Unistyles tokens; standardize typography, spacing, radii, borders, buttons, cards, segmented controls, metrics, and empty states. | Phase 0 | Broad visual regressions across screens. | M |
| 2. Navigation shell | Introduce root stack above native tabs; simplify tabs; add focused Practice and Review session routes. | Final IA | Back behavior, deep links, preserving sessions. | M |
| 3. Practice redesign | Rebuild prompt, stable answer editor, Type / Word Bank switching, sticky actions, keyboard behavior, draft persistence, feedback comparison, save actions, and session exit. | Phases 1-2 | Keyboard differences, state loss, lossy mode conversion, swipe behavior. | L |
| 4. Today, Review, Library | Implement conditional Home content, Review state models, simplified Library tabs, empty states, and populated list rows. | Shared components and state selectors | Inconsistent backend states or unclear onboarding triggers. | L |
| 5. Progress | Replace zero dashboard; define meaningful metrics; add weekly activity, goal, and milestone states. | Reliable analytics and metric definitions | Misleading scores, small sample sizes, undefined XP logic. | M |
| 6. Motion and accessibility QA | Add restrained `EaseView` transitions, reduced-motion behavior, screen-reader focus and announcements, large-text, keyboard, Android, and iOS testing. | Stable layouts from prior phases | Platform-specific layout and focus differences. | M |

Accessibility fundamentals should start in Phase 1 rather than being deferred to
Phase 6. Phase 6 is the final audit and correction pass.

The strongest delivery boundary is the end of Phase 3: by then the visual
system, navigation shell, and primary learning loop are materially clearer.

## Explanation: Remove The Concave Linked-Card Shapes

This recommendation refers to the dark teal card groups with cut-in notches or
bridge-like joints between cards. In the screenshots, they appear on Home and
Progress metric groups: cards look visually connected, with white concave bites
cut out of the edges where surfaces meet.

In the current codebase, this maps to the linked-surface card direction:

- `docs/rules/general/linked-surface-groups.md`
- `docs/design.md`
- `src/components/common/Card/Card.tsx`
- `src/theme/card.ts`

The recommendation is not saying "remove all rounded cards" or "remove the
native squircle system". It is specifically about removing the decorative
cutout/linked geometry from ordinary metric groups and dashboard cards.

Why ChatGPT recommended removing it:

1. It competes with the content.
   The cutouts and bridges become the most memorable thing on the screen, even
   when the screen's job is simply to help the user start practice or read a
   metric.

2. It implies relationships that are not real.
   When cards visually connect, users may assume the metrics are part of one
   combined control, sequence, or interactive group. Most of these cards are
   just separate stats.

3. It is fragile for accessibility.
   Concave joins depend on fixed geometry. Larger text, localization, content
   wrapping, and small devices can make the notches look accidental or cause
   awkward spacing.

4. It makes empty states feel heavier.
   Showing many dark connected cards with `0` values gives the empty state more
   visual authority than it deserves.

5. It increases implementation cost.
   Linked geometry needs special grouping, spacing, cutout color matching, and
   careful responsive handling. Normal cards with borders are easier to scale
   across Home, Progress, Review, and Library.

Recommended interpretation:

- Keep squircle/continuous rounded corners for cards, buttons, chips, inputs,
  and surfaces.
- Remove concave cutouts from ordinary dashboard metrics.
- Use simple white cards with borders for stats and lists.
- Reserve one dark inverse card for the main hero or primary learning surface
  when it genuinely helps hierarchy.
- If the product owner still likes the linked-card look, restrict it to one
  signature module per screen and verify Dynamic Type before shipping.

Important follow-up:

This recommendation conflicts with parts of the current design docs, which
currently treat linked-surface cards as an accepted visual foundation. If this
direction is approved, update `docs/design.md` and
`docs/rules/general/linked-surface-groups.md` before implementing broad visual
changes.
