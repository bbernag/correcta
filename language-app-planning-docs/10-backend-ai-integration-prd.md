# Backend and AI Integration PRD

**Product name:** Conecta  
**Document version:** 1.0  
**Date:** 2026-06-16  
**Scope:** Remote sentence generation, translation validation, teacher
feedback, AI safety, API contracts, runtime validation, and backend-ready app
service adapters

---

## Problem Statement

Conecta's local prototype can prove the learning loop, but the product's long-
term value depends on personalized sentence generation, flexible translation
validation, mistake classification, and teacher-like explanations. These AI
capabilities must not be wired directly into screens or mobile provider SDKs.

The user needs backend and AI integration that preserves safety, contract
stability, and provider replaceability.

## Solution

Connect the app's existing product-level service adapters to remote backend
endpoints after the local prototype works. The backend owns AI generation,
validation, moderation, safety policy, prompt updates, and provider selection.
The app sends structured requests, validates responses, renders safe feedback,
and fails gracefully when remote output is malformed or unavailable.

## Phase Gates

- Entry gate: local practice, feedback, history, review, progress, and service
  adapters work with mock data.
- Deliverables: remote service implementations, typed API contracts, runtime
  response validation, safe error states, malformed-response handling, and
  backend safety boundaries.
- Exit gate: screens behave the same against mock and remote adapters, and
  unsafe or malformed AI responses fail gracefully before rendering.

## User Stories

1. As a learner, I want generated sentences matched to my level, goal, topic,
   and weak areas, so that practice feels personal.
2. As a learner, I want translation validation to accept natural alternatives,
   so that correct phrasing is not rejected.
3. As a learner, I want mistakes classified consistently, so that feedback and
   review connect.
4. As a learner, I want explanations in my known language, so that corrections
   are understandable.
5. As a learner, I want unsafe or inappropriate generated content avoided, so
   that the app remains a responsible teacher.
6. As a learner, I want malformed AI responses to fail gracefully, so that the
   app does not show confusing output.
7. As a learner, I want retry behavior when remote validation fails, so that a
   temporary network issue does not end the session.
8. As a developer, I want backend contracts versioned, so that mobile releases
   can stay compatible.
9. As a developer, I want generated API helpers once an API spec exists, so
   that requests and responses stay typed.
10. As a developer, I want runtime validation at AI response boundaries, so that
    unsafe shapes do not reach UI.
11. As a developer, I want remote service implementations to match mock service
    interfaces, so that screens do not change.
12. As a developer, I want backend errors normalized, so that screens can render
    consistent retry and fallback states.
13. As a developer, I want sensitive headers and tokens excluded from logs, so
    that diagnostics stay safe.
14. As a product owner, I want provider choice hidden behind the backend, so
    that model and prompt changes do not require app rewrites.
15. As a tester, I want fixture-backed remote responses, so that validation,
    safety, and error handling can be verified.

## Implementation Decisions

- Build this phase only after mock services, local practice, feedback, review,
  and progress flows work.
- Keep AI generation, validation, moderation, prompt safety, and provider
  routing server-side.
- Use the app's product-level service adapters as the only UI-facing boundary.
- Use typed API contracts and runtime validation for remote responses.
- Treat malformed or unsafe responses as recoverable failures with clear
  fallback behavior.
- Keep backend contracts versioned.
- Do not log tokens, headers, one-time codes, or sensitive URLs.
- Normalize remote data before writing to local storage.
- Keep local-first behavior where practical so temporary backend failures do not
  erase local learning records.

## Testing Decisions

- Test remote service adapters with success, malformed, unsafe, timeout, and
  server-error fixtures.
- Test that screens render the same behavior against mock and remote adapters.
- Test validation response parsing before UI rendering.
- Test error normalization and retry behavior.
- Test that sensitive request details are not logged.
- Test that unsafe content is blocked or replaced with a safe failure state.

## Out of Scope

- Choosing a specific AI provider in mobile code.
- On-device AI for MVP generation or validation.
- Auth product UX.
- Ads and subscriptions.
- Rich streamed Markdown feedback unless it becomes a product requirement.
- Offline AI generation.

## Further Notes

- The backend should behave like a responsible teacher, not an open-ended
  chatbot.
- Remote integration should improve personalization without changing the user's
  core learning loop.
