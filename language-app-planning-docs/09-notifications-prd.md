# Notifications and Learning Reminders PRD

**Product name:** Correcta
**Document version:** 1.0
**Date:** 2026-06-16
**Scope:** Local notification preferences, reminder scheduling, quiet hours,
review reminders, word or sentence challenges, and notification-entry flows

---

## Problem Statement

Correcta should motivate daily practice, but reminders are only useful once the
app understands the user's goals, weak words, review due items, language pair,
current level, and preferred reminder time. Adding notifications too early would
create generic interruptions instead of helpful learning prompts.

The user needs gentle reminders that support consistency without guilt or
excessive notification volume.

## Solution

Add notification preferences and local reminder scheduling after local learning
data exists. Notifications should be user-controlled, quiet-hour aware, and
based on actual practice and review data where possible. A notification should
bring the user into a quick practice, review, or relevant app section.

## Phase Gates

- Entry gate: Review and Progress can identify due review items, weak words,
  user goals, language pair, current level, and reminder preferences.
- Deliverables: reminder preference UI, quiet hours, local scheduling, scheduled
  metadata, reminder copy, and notification-open routing.
- Exit gate: a tester can enable, change, disable, and trigger local reminders
  without duplicate or guilt-based notifications.

## User Stories

1. As a learner, I want to choose whether reminders are enabled, so that I stay
   in control.
2. As a learner, I want to choose morning, afternoon, evening, custom, or no
   reminders, so that practice fits my routine.
3. As a learner, I want quiet hours, so that the app does not disturb me.
4. As a learner, I want a daily practice reminder, so that I remember my goal.
5. As a learner, I want a review reminder when weak items are due, so that I
   revisit mistakes at the right time.
6. As a learner, I want a word-of-the-day reminder only if I opt in, so that
   reminders feel useful.
7. As a learner, I want sentence challenge reminders only when appropriate, so
   that notifications remain relevant.
8. As a learner, I want notification copy to be encouraging without guilt, so
   that missing a day does not feel punishing.
9. As a learner, I want notification content to avoid sensitive information, so
   that private learning data is protected.
10. As a learner, I want tapping a reminder to open the relevant practice or
    review flow, so that the action is immediate.
11. As a learner, I want to change notification preferences later, so that I can
    adjust frequency.
12. As a developer, I want notification preferences stored locally, so that
    scheduling can work before backend sync.
13. As a developer, I want scheduled notification metadata tracked, so that
    reminders can be updated or cancelled safely.
14. As a developer, I want date and timezone logic centralized, so that daily
    goals and quiet hours behave correctly.
15. As a tester, I want notification scheduling test cases for enabled,
    disabled, quiet-hour, and due-review scenarios, so that reminders are
    predictable.

## Implementation Decisions

- Build this phase after Review and Progress produce meaningful local learning
  data.
- Use the maintained notification library selected in the technical plan.
- Store notification preferences in local key-value storage.
- Store scheduled notification metadata in structured local storage when needed.
- Use the selected date library for timezone, daily goal, quiet-hour, and
  schedule calculations.
- Never schedule excessive reminders.
- Never include sensitive user content in notifications.
- Route notification opens to an appropriate app destination without passing
  large mutable objects through navigation.
- Keep copy non-guilt-based and professional.

## Testing Decisions

- Test preference toggles and schedule calculation behavior.
- Test quiet-hour handling.
- Test disabled reminders cancel or avoid scheduling.
- Test review reminders only schedule when due review data exists.
- Test notification-open routing at the app boundary.
- Manual device verification is required for actual delivery behavior.

## Out of Scope

- Backend push notification campaigns.
- Marketing notifications.
- Remote notification personalization.
- Ads.
- Weekly AI report generation.
- Social reminders.

## Further Notes

- Notifications should not be added until the app has useful local practice and
  review state.
- A reminder should always map to a clear learning action.
