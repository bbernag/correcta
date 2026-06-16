# Phase PRD Index

Use these PRDs in order. Each phase should be treated as a separate
implementation milestone with its own verification before moving to the next
phase.

## Phase Order

1. **Foundation and app shell**  
   Use `04-foundation-app-shell-prd.md`.  
   Goal: create the runnable Expo Dev Client app, validate native foundations,
   configure themes, build reusable UI primitives, and add placeholder routes.

2. **Local domain and services**  
   Use `05-local-domain-services-prd.md`.  
   Goal: define product domain contracts, local storage boundaries,
   repositories, service adapters, and deterministic mock responses.

3. **Practice and feedback loop**  
   Use `06-practice-feedback-loop-prd.md`.  
   Goal: build the first local learning loop from Home to Practice, Feedback,
   save actions, Session Summary, and local History event.

4. **History and saved content**  
   Use `07-history-saved-content-prd.md`.  
   Goal: turn local attempts, mistakes, saved words, and saved sentences into
   retrievable learning records.

5. **Review and Progress**  
   Use `08-review-progress-prd.md`.  
   Goal: turn saved content and mistakes into review decks, mastery updates,
   session summaries, and visible local progress.

6. **Notifications and learning reminders**  
   Use `09-notifications-prd.md`.  
   Goal: add local reminder preferences and gentle notification flows only
   after useful local learning data exists.

7. **Backend and AI integration**  
   Use `10-backend-ai-integration-prd.md`.  
   Goal: connect service adapters to safe backend AI generation, validation,
   feedback, and remote contracts after the local prototype works.

8. **Monetization**  
   Use `11-monetization-prd.md`.  
   Goal: add non-disruptive rewarded monetization only after the learning
   product is useful and stable.

## Rules

- Do not skip foundation and native validation before product screens.
- Do not build backend, AI, ads, subscriptions, or notifications before the
  local learning loop proves the product flow.
- Keep each PRD scoped. If a task crosses phase boundaries, split it into
  separate implementation work.
- Follow the repo's React Native structure rules for every phase.
