# Review and Progress PRD

**Product name:** Correcta
**Document version:** 1.0
**Date:** 2026-06-16
**Scope:** Recommended review decks, review item mastery, basic progress,
session summaries, daily goals, and professional motivation

---

## Problem Statement

History and saved content show what happened, but learners still need the app
to recommend what to study next and make improvement visible. Without Review
and Progress, Correcta becomes a logbook instead of a personal teacher.

## Solution

Build local Review and Progress experiences on top of saved words, saved
sentences, mistakes, and practice history. Start with a small set of review
modes and simple progress summaries before adding notifications, backend
personalization, or AI-generated reports.

## Phase Gates

- Entry gate: History, saved content, mistakes, and retry records are available
  from local repositories.
- Deliverables: recommended review entry point, word flashcards, sentence
  flashcards, mistake cards, Sentence Builder review, session summary, daily
  goal progress, and basic Progress screen.
- Exit gate: a tester can complete review items, update mastery state, and see
  progress metrics update from local data.

## User Stories

1. As a learner, I want recommended review decks, so that I do not have to
   decide what to study next.
2. As a learner, I want word flashcards, so that vocabulary review is quick.
3. As a learner, I want sentence flashcards, so that I can review full
   translation context.
4. As a learner, I want mistake review, so that prior errors become lessons.
5. As a beginner learner, I want Sentence Builder review, so that word-order
   practice continues after the original session.
6. As a learner, I want to mark review items known, unsure, or difficult, so
   that mastery can update.
7. As a learner, I want Progress to show sentences completed, accuracy, words
   learned, difficult words, and mistake categories, so that improvement is
   visible.
8. As a learner, I want weekly activity shown simply, so that consistency is
   motivating without guilt.
9. As a learner, I want daily goal progress, so that I know whether I am on
   track.
10. As a learner, I want achievements and XP to feel restrained, so that the
    app stays professional.
11. As a learner, I want session summaries to roll into Progress, so that each
    session feels meaningful.
12. As a product owner, I want review and progress powered by local data first,
    so that the product can be validated before backend sync.
13. As a developer, I want progress calculations extracted behind testable
    helpers, so that charts and summaries do not duplicate math.
14. As a tester, I want seeded local practice records, so that Review and
    Progress states can be tested deterministically.

## Implementation Decisions

- Build this phase after History and Saved Content are stable.
- Use local repositories as the source of truth for review queues, mastery
  state, session summaries, and progress snapshots.
- Start Review with word flashcards, sentence flashcards, mistake cards, and
  Sentence Builder review only.
- Keep progress charts simple and readable.
- Precompute progress metrics outside chart or row rendering.
- Use gentle motivation: daily goal, weekly consistency, XP, achievements, and
  session summary without punitive streak messaging.
- Do not add backend sync, notifications, ads, or weekly AI reports in this
  phase.

## Testing Decisions

- Test review item transitions for known, unsure, and difficult.
- Test mastery state updates through external behavior.
- Test recommended deck selection from seeded local data.
- Test Progress calculations from seeded local data.
- Test empty, loading, populated, and error states where applicable.
- Avoid broad snapshots of charts or list-heavy screens.

## Out of Scope

- Notification scheduling.
- Backend review recommendations.
- Weekly AI-generated reports.
- Ads and subscriptions.
- Social or sharing features.
- Full analytics dashboard.
- Pronunciation and listen-and-type review modes.

## Further Notes

- This phase should make the local prototype feel useful after practice ends.
- The next phase can add notifications once the app has meaningful weak words,
  due review items, and user preference data.
