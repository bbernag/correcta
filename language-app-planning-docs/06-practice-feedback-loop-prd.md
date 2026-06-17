# Practice and Feedback Loop PRD

**Product name:** Correcta
**Document version:** 1.0
**Date:** 2026-06-16
**Scope:** First complete local learning loop: Home to Practice, translation
input, Sentence Builder, mock validation, animated feedback, save actions,
session summary, and local history event

---

## Problem Statement

Correcta's core product value is not the app shell; it is the learning loop where
a user translates one sentence, receives useful correction, saves what matters,
and continues improving. After the foundation and local service contracts exist,
the next problem is proving that the app can deliver this loop without backend
or AI dependencies.

The user needs a polished local prototype that demonstrates the app's
differentiator: feedback that accepts flexible translations, explains mistakes,
and turns errors into future study material.

## Solution

Build a complete mocked practice session using local services and reusable
components. The flow starts from Home, enters Practice, lets the user answer by
typing or Sentence Builder, validates with mock data, renders Feedback, allows
save actions, continues through a short session, shows a Session Summary, and
records the attempt in local History.

## Phase Gates

- Entry gate: domain contracts, local repositories, and deterministic mock
  sentence, validation, and feedback services exist.
- Deliverables: Home start action, Practice screen, typing mode, Sentence
  Builder mode, Feedback screen, save actions, Session Summary, and local
  attempt write.
- Exit gate: a tester can complete a five-sentence local session with correct,
  almost-correct, incorrect, skipped, saved, and retry-ready states represented.

## User Stories

1. As a learner, I want to start practice from Home, so that I always know the
   next learning action.
2. As a learner, I want to see one source sentence at a time, so that the task
   feels focused.
3. As a learner, I want to know the target language and level, so that I
   understand the challenge.
4. As a learner, I want to type a translation, so that I can practice recall.
5. As a beginner learner, I want a scrambled word mode, so that I can practice
   word order without typing everything from memory.
6. As an intermediate learner, I want typing mode by default, so that the app
   does not over-scaffold me.
7. As a learner, I want to switch input mode when available, so that I can adapt
   the task to my confidence.
8. As a learner, I want the submit action disabled until I have an answer, so
   that accidental empty submissions are avoided.
9. As a learner, I want keyboard movement to feel smooth, so that typing does
   not make the screen jump.
10. As a learner, I want to request hints progressively, so that I get help
    without immediately revealing the answer.
11. As a learner, I want to skip a sentence, so that I am not blocked by one
    prompt.
12. As a learner, I want skipped sentences recorded separately, so that they do
    not count as correct or incorrect.
13. As a learner, I want to choose or see the validation mode, so that I
    understand how strict the feedback will be.
14. As a learner, I want a checking state after submit, so that the app feels
    responsive.
15. As a learner, I want feedback to accept natural alternative translations,
    so that I am not punished for a correct phrasing.
16. As a learner, I want mistakes highlighted clearly, so that I can see what
    changed.
17. As a learner, I want a short explanation in my known language, so that I
    understand the correction.
18. As a learner, I want an "Explain this simply" option, so that complex
    grammar can be simplified.
19. As a learner, I want accepted alternatives shown when relevant, so that I
    learn natural phrasing.
20. As a learner, I want to save useful words, so that I can review them later.
21. As a learner, I want to save useful sentences, so that I can practice them
    again.
22. As a learner, I want wrong words saved automatically when appropriate, so
    that mistakes become review material.
23. As a learner, I want calm animations and haptics, so that feedback feels
    polished without being distracting.
24. As a learner, I want to continue to the next sentence, so that practice
    flows quickly.
25. As a learner, I want a session summary, so that I can see what I completed.
26. As a learner, I want my attempt saved to History, so that I can revisit it
    later.
27. As a product owner, I want the full loop to work with mock services, so that
    backend work does not block product validation.
28. As a developer, I want input state to stay local to Practice, so that global
    state does not update on every keystroke.
29. As a developer, I want mock validation responses to match final contracts,
    so that remote validation can be swapped in later.
30. As a tester, I want deterministic practice cases, so that correct,
    almost-correct, incorrect, skipped, and saved paths can be tested.

## Implementation Decisions

- Build this phase only after the app shell, reusable UI, local domain models,
  repositories, and mock services exist.
- Keep the first vertical slice narrow: one language pair, one level, a small
  sentence set, and deterministic mock validation.
- Use product-level service methods for sentence generation, translation
  validation, teacher feedback, save actions, and history writes.
- Keep typing input state local to the Practice screen.
- Keep Sentence Builder chip state local to the Practice screen.
- Use animation and gesture libraries for chip movement and feedback reveals
  only where they improve the learning task.
- Use haptics lightly for chip selection, submission, save confirmation, and
  answer result feedback.
- Render Feedback from the validation result contract rather than screen-local
  ad hoc structures.
- Save words, sentences, skipped attempts, and completed attempts through local
  repositories.
- Do not build a backend, auth flow, ads, notifications, or full review system
  in this phase.

## Testing Decisions

- Test the practice loop through visible behavior: start, answer, submit,
  feedback, save, continue, summary, and history event.
- Test typing mode and Sentence Builder mode separately.
- Test submit disabled and checking states.
- Test correct, almost-correct, incorrect, skipped, and retry feedback paths.
- Test save word and save sentence actions through repository-facing behavior.
- Test that input state does not leak into global app state.
- Test accessibility names and roles for submit, hint, skip, save, and continue
  actions.
- Prefer behavior assertions over broad screen snapshots.

## Out of Scope

- Full onboarding.
- Real sentence generation.
- Real AI validation.
- Audio and pronunciation.
- Full History UI.
- Full Review UI.
- Progress charts.
- Notifications.
- Ads and subscriptions.
- Multi-language content library beyond deterministic mock cases.

## Further Notes

- This phase is the first point where Correcta should feel like a language
  learning app.
- The goal is a five-sentence local session that can be completed end to end.
- The next phase should expand the saved data into History, Review, and
  Progress experiences.
