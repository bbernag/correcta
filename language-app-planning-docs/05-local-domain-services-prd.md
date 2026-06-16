# Local Domain and Service Foundation PRD

**Product name:** Conecta  
**Document version:** 1.0  
**Date:** 2026-06-16  
**Scope:** Domain model, local storage boundaries, repository contracts, service
adapters, and mock service responses for the first local-first product loop

---

## Problem Statement

Conecta cannot build a reliable practice loop until the app has stable product
language for sentences, translations, validation, mistakes, saved content,
review items, and progress events. Without this domain foundation, screens will
invent their own data shapes and the future backend/AI integration will force
large rewrites.

The user needs the app to begin local-first, with mock services that return
final-shaped data. This phase must make the future practice, feedback, review,
and progress screens possible without introducing backend, auth, or AI provider
coupling too early.

## Solution

Create a local domain and service foundation that defines Conecta's core
entities, storage split, repository interfaces, and mock service contracts. The
deliverable is not a visible learning flow. It is a testable set of app
contracts that let future screens request sentences, validate translations,
save learning records, and read local history through stable product-level
interfaces.

## Phase Gates

- Entry gate: the app scaffold, theme foundation, reusable UI primitives, and
  placeholder route shell are runnable.
- Deliverables: domain contracts, storage boundaries, repository interfaces,
  deterministic mock services, and seeded local data for practice and feedback.
- Exit gate: mock services return final-shaped data and local repositories can
  save/read a practice-history record in tests or validation checks.

## User Stories

1. As a developer, I want shared domain names for user profile, language pair,
   level, validation mode, and input mode, so that screens use the same product
   vocabulary.
2. As a developer, I want a practice sentence model, so that mock and future
   remote sentence generation return the same shape.
3. As a developer, I want a user translation model, so that typed and
   Sentence Builder answers can be validated through one contract.
4. As a developer, I want a validation result model, so that feedback screens
   can render correct, almost-correct, partial, incorrect, and retry states.
5. As a developer, I want accepted translations modeled explicitly, so that the
   app can support multiple correct answers.
6. As a developer, I want mistake categories modeled explicitly, so that
   feedback, review, progress, and weekly reports can share one taxonomy.
7. As a developer, I want word and sentence records modeled separately, so that
   saved words and saved sentences can evolve independently.
8. As a developer, I want review items modeled around the learning task, so
   that flashcards and future exercises can reuse the same queue.
9. As a developer, I want practice sessions and summaries modeled, so that the
   app can later track completed sessions and daily goals.
10. As a developer, I want notification preferences modeled but not activated,
    so that later reminders have a safe data boundary.
11. As a developer, I want preferences stored separately from structured
    learning history, so that fast settings do not pollute the learning
    database.
12. As a developer, I want sensitive session material excluded from plain local
    storage, so that future auth does not inherit unsafe storage decisions.
13. As a developer, I want a repository contract for local history, so that
    screens can save and read attempts without knowing storage details.
14. As a developer, I want a repository contract for saved words and sentences,
    so that save actions are independent from the database implementation.
15. As a developer, I want a repository contract for review queues, so that the
    review phase can build on the same learning records.
16. As a developer, I want mock sentence generation, so that the Practice screen
    can be built before backend AI exists.
17. As a developer, I want mock translation validation, so that Feedback can be
    built around final-shaped responses.
18. As a developer, I want mock teacher feedback, so that explanations can be
    rendered without an AI provider.
19. As a developer, I want service adapters to hide whether data is mock, local,
    or remote, so that screens do not change when the backend arrives.
20. As a developer, I want malformed mock responses covered by validation tests,
    so that future AI output can be handled safely.
21. As a developer, I want local writes to be explicit and small, so that future
    offline behavior can be added without hidden global side effects.
22. As a future backend implementer, I want app service methods named around
    product actions, so that provider-specific APIs do not leak into UI code.
23. As a tester, I want deterministic mock data, so that practice and feedback
    states can be reproduced reliably.
24. As a product owner, I want the domain layer to support future progress and
    review, so that early implementation does not block core product goals.

## Implementation Decisions

- Build this phase after the foundation and app shell are runnable.
- Treat domain models as product contracts, not as screen-specific view models.
- Keep active practice input state local to screens in later phases; do not
  model every keystroke globally.
- Use fast key-value storage for small preferences and structured local storage
  for practice history, saved content, mistakes, review queues, mastery states,
  sessions, and progress snapshots.
- Keep secure auth/session storage out of this phase except for documenting the
  boundary.
- Create repository contracts for preferences, practice history, saved content,
  mistakes, and review queues.
- Create service adapters for sentence generation, translation validation,
  teacher feedback, review recommendations, progress summaries, and
  notification preferences.
- Start with mock implementations that return the same shapes expected from
  future remote services.
- Keep HTTP and AI provider logic out of this phase.
- Keep repository and service interfaces small, product-named, and testable.
- Use explicit mistake categories that match the product requirements.
- Store timestamps in a form that supports local grouping, timezone-aware daily
  goals, and future synchronization.
- Do not add a full ORM by default. Prefer a small repository layer with clear
  mappings until a real complexity threshold is reached.

## Testing Decisions

- Test domain helpers and repository contracts through behavior, not storage
  internals.
- Test mock services for deterministic sentence, validation, and feedback
  responses.
- Test that saved word and saved sentence operations are idempotent where the
  product requires it.
- Test that malformed validation or feedback payloads fail safely before
  rendering.
- Test date and timestamp mapping at the boundary where records are created.
- Test preference read/write behavior without coupling tests to native storage
  internals.
- Prioritize fast unit tests for pure mappers, classifiers, and repository
  contracts.

## Out of Scope

- Practice screen UI.
- Feedback screen UI.
- Sentence Builder interactions.
- Real backend calls.
- AI provider selection.
- Auth and secure token flows.
- Notifications scheduling.
- Ads or subscriptions.
- Full review, progress, or reporting UI.

## Further Notes

- This phase should produce stable contracts for the practice-feedback PRD.
- Mock responses should be realistic enough to drive correct, almost-correct,
  incorrect, skipped, saved, and retry states.
- If a storage dependency is not yet validated, keep the repository interface
  and document the missing native implementation.
