# History and Saved Content PRD

**Product name:** Correcta
**Document version:** 1.0
**Date:** 2026-06-16
**Scope:** History, saved words, saved sentences, Mistake Notebook, retry
actions, and local learning records created by practice sessions

---

## Problem Statement

The first practice loop creates valuable learning events, but those events only
matter if the learner can revisit them. Without History and saved content,
mistakes disappear after Feedback and the app cannot build personalized review
or progress.

## Solution

Build the local learning record experience. This phase gives learners a way to
see previous attempts, save useful words and sentences, inspect mistake
patterns, and retry prior sentences. It prepares the data surface needed by
Review and Progress without adding charts, notifications, backend sync, or AI
reports.

## Phase Gates

- Entry gate: the local practice-feedback loop can save completed, skipped, and
  saved attempts through local repositories.
- Deliverables: History, Saved Words, Saved Sentences, Mistake Notebook, retry
  action, save and unsave actions, empty states, and seeded local data.
- Exit gate: a tester can complete a practice session, see the attempt in
  History, save content, view mistake records, and retry a previous sentence.

## User Stories

1. As a learner, I want to see previous practice attempts, so that I can review
   what I translated.
2. As a learner, I want each history item to show source sentence, my answer,
   best translation, result, date, topic, and level, so that I understand the
   attempt.
3. As a learner, I want to filter History by correct, incorrect, skipped,
   saved, topic, level, and date, so that I can find relevant attempts.
4. As a learner, I want to retry a previous sentence, so that mistakes become
   practice.
5. As a learner, I want to save a sentence from History, so that useful
   examples stay available.
6. As a learner, I want saved words listed with translation, example sentence,
   missed count, mastery status, and last practiced date, so that I know what
   needs work.
7. As a learner, I want saved sentences listed with explanation and previous
   answer when available, so that I can learn from real context.
8. As a learner, I want wrong words saved automatically, so that the app helps
   me review mistakes without extra work.
9. As a learner, I want a Mistake Notebook, so that repeated weak points are
   visible.
10. As a learner, I want mistake cards grouped by category, so that I can see
    whether I struggle with tense, word order, articles, or meaning.
11. As a learner, I want improving and still-difficult mistakes separated, so
    that I can see progress without charts.
12. As a learner, I want empty states that explain what will appear later, so
    that new sections do not feel broken.
13. As a developer, I want History and saved content powered by local
    repositories, so that Review and Progress can reuse the same records.
14. As a developer, I want date grouping handled outside row rendering, so that
    History remains performant.
15. As a tester, I want seeded local records, so that filters, saved content,
    and Mistake Notebook states can be tested deterministically.

## Implementation Decisions

- Build this phase after the practice-feedback loop records local attempts and
  saved content.
- Keep History and saved content filter state local unless a filter becomes a
  cross-screen preference.
- Use performant list primitives for long or dynamic local data.
- Precompute display labels, section keys, and date labels outside row render
  functions.
- Keep mistake categories aligned with Feedback and future AI validation.
- Support retry by creating a new practice attempt from a previous sentence,
  not by mutating the old history record.
- Do not add Review deck scheduling, Progress charts, backend sync,
  notifications, or ads in this phase.

## Testing Decisions

- Test History filters through visible row results.
- Test retry and save actions through repository-facing behavior.
- Test saved words, saved sentences, and Mistake Notebook states: empty,
  loading, populated, and error where applicable.
- Test stable list keys and accessibility labels.
- Test date grouping from seeded local data.
- Avoid broad snapshots of list-heavy screens.

## Out of Scope

- Review exercises.
- Progress charts.
- Weekly reports.
- Notifications.
- Backend sync.
- Ads and subscriptions.
- Pronunciation and listen-and-type review modes.

## Further Notes

- This phase should make practice history useful before adding review logic.
- Review and Progress should consume these records rather than invent new data
  shapes.
