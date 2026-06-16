# Monetization and Ads PRD

**Product name:** Conecta  
**Document version:** 1.0  
**Date:** 2026-06-16  
**Scope:** Rewarded ads, non-disruptive monetization surfaces, future premium
boundary, and monetization adapter contracts

---

## Problem Statement

Conecta is intended to launch free, but monetization must not damage the core
learning experience. Ads shown during typing, correction, or review would make
the app feel less serious and less trustworthy.

The user needs a monetization phase that protects the practice loop while
creating future revenue options.

## Solution

Add monetization late, after the local learning product is useful. Start with
adapter-based rewarded ads in safe moments such as after a session summary,
optional bonus practice, bonus hints, or review packs. Keep future subscription
support as a boundary, not an MVP requirement.

## Phase Gates

- Entry gate: practice, feedback, review, progress, and stable learning
  retention surfaces exist without monetization.
- Deliverables: monetization adapter, rewarded ad moments, unavailable/cancelled
  states, reward-granting rules, and no-ad critical learning paths.
- Exit gate: ads never appear during active learning, rewards are granted only
  after successful completion, and failed ads do not block the core app.

## User Stories

1. As a learner, I want ads to never interrupt typing, so that practice stays
   focused.
2. As a learner, I want ads to never appear before or during correction
   feedback, so that learning remains the priority.
3. As a learner, I want rewarded ads to be optional, so that I choose when an ad
   is worth it.
4. As a learner, I want rewarded hints, so that I can earn extra help without
   disrupting the session.
5. As a learner, I want rewarded bonus review packs, so that ads provide a clear
   learning benefit.
6. As a learner, I want rewarded streak freezes only if streaks exist, so that
   monetization does not invent pressure.
7. As a learner, I want ads shown only after safe milestones, so that incorrect
   answers never feel punished.
8. As a product owner, I want ads loaded outside the critical practice path, so
   that performance stays strong.
9. As a product owner, I want ad-related drop-off tracked later, so that
   monetization can be tuned responsibly.
10. As a developer, I want an ad service adapter, so that the app can change
    monetization providers without touching feature screens.
11. As a developer, I want future premium features behind product gates, so that
    subscriptions can be introduced without rewiring core screens.
12. As a tester, I want ad unavailable and ad failed states tested, so that
    rewards are not granted incorrectly.

## Implementation Decisions

- Add monetization only after the learning product has practice, feedback,
  review, progress, and stable local data.
- Use rewarded ads as the first monetization pattern.
- Never show ads while typing, before feedback, during feedback, during
  flashcards, or immediately after a wrong answer.
- Allowed ad moments include after session summary, before optional bonus
  sessions, after daily goal completion, rewarded hints, and rewarded review
  packs.
- Keep all ad calls behind a product-level monetization adapter.
- Do not add subscriptions until paid plans are real.
- Do not let monetization state leak into learning validation logic.
- Track monetization events in a privacy-conscious way when analytics exists.

## Testing Decisions

- Test allowed and disallowed ad moments.
- Test rewarded success, cancelled, unavailable, and failed states.
- Test that rewards are only granted after a successful rewarded completion.
- Test that ads do not render on critical practice, feedback, or flashcard
  paths.
- Manual device verification is required for provider SDK behavior.

## Out of Scope

- Payment subscriptions.
- Premium feature catalog.
- App Store purchase flows.
- Paywalls during MVP learning flows.
- Non-rewarded interstitials inside active learning.
- Marketing attribution.

## Further Notes

- Monetization should support learning rather than interrupt it.
- If ads reduce retention or perceived quality, defer or remove the ad surface
  rather than weakening the core loop.
