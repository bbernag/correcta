# Correcta Phase Tracker

Last reviewed: 2026-06-20

Use this file as the canonical checklist for what has been planned, what has
been implemented, and what still needs work. The PRD files define scope. The
verification files record evidence from completed or partially completed work.

## Status Legend

- `[x] Done`: implemented and verified for the scoped phase.
- `[~] Partial`: useful work exists, but the phase has explicit remaining
  runtime, provider, or device checks.
- `[ ] Planned`: documented, not implemented yet.

## Phase Checklist

| Status | Phase                                | PRD / Plan                                                    | Verification / Evidence                          | Notes                                                                                                                                                                       |
| ------ | ------------------------------------ | ------------------------------------------------------------- | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `[x]`  | Native foundation                    | `language-app-planning-docs/03-implementation-plan.md`        | `docs/verification/native-foundation.md`         | Expo Dev Client, iOS simulator, Android emulator, Android debug build, native foundation checks. iOS and Android physical-device checks remain optional follow-up evidence. |
| `[x]`  | Foundation and app shell             | `language-app-planning-docs/04-foundation-app-shell-prd.md`   | `docs/verification/app-shell.md`                 | App shell, navigation, common primitives, theme foundation, placeholder route owners, and native service boundaries are in place.                                           |
| `[x]`  | Local domain and services            | `language-app-planning-docs/05-local-domain-services-prd.md`  | `docs/verification/local-domain-services.md`     | Product contracts, local repositories, deterministic mock services, and parsing boundaries are implemented.                                                                 |
| `[x]`  | Practice and feedback loop           | `language-app-planning-docs/06-practice-feedback-loop-prd.md` | `docs/verification/practice-feedback-loop.md`    | First local learning loop is implemented and verified on iOS simulator and Android emulator.                                                                                |
| `[x]`  | History and saved content            | `language-app-planning-docs/07-history-saved-content-prd.md`  | `docs/verification/history-saved-content.md`     | Library records, saved content, attempt filters, retry, and removal actions are implemented.                                                                                |
| `[x]`  | Review and Progress                  | `language-app-planning-docs/08-review-progress-prd.md`        | `docs/verification/review-progress.md`           | Review decks, local grading, Progress metrics, achievements, and status cards are implemented.                                                                              |
| `[~]`  | Notifications and learning reminders | `language-app-planning-docs/09-notifications-prd.md`          | `docs/verification/notifications-reminders.md`   | Local preferences and schedule metadata exist. Native permission prompts, OS scheduling, delivery, and notification-open routing still need a separate runtime phase.       |
| `[~]`  | Backend and AI integration           | `language-app-planning-docs/10-backend-ai-integration-prd.md` | `docs/verification/backend-ai-integration.md`    | Backend-ready adapters and contracts exist. No live backend URL, auth, AI provider, production API, or generated client is enabled by default.                              |
| `[~]`  | Monetization                         | `language-app-planning-docs/11-monetization-prd.md`           | `docs/verification/monetization.md`              | Product-level monetization boundary exists. No ad SDK, rewarded placement, subscription, purchase flow, or analytics integration is implemented.                            |
| `[~]`  | Visual Design and Interaction Polish | `docs/phases/visual-design-interaction-polish.md`             | `docs/qa/visual-design-interaction-polish-qa.md` | Slices 1-8 are implemented and verified. Remaining work starts with Slice 9, Practice Core Loop Polish.                                                                     |

## Visual Design Slice Checklist

These slices live inside `docs/phases/visual-design-interaction-polish.md`.

| Status | Slice                                                   | Notes                                                                                                                                 |
| ------ | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `[x]`  | 1. Theme Token Design System                            | Scribe Blue tokens are implemented in `src/theme`, wired through React Native Unistyles, and Android-verified in light and dark mode. |
| `[x]`  | 2. Icons And Haptics Foundation                         | Lucide icons, SVG support, Pulsar haptics, shared Icon/IconButton wrappers, playground examples, and iOS/Android QA are complete.     |
| `[~]`  | 3. Upgrade Existing Common Components                   | Technical primitive APIs are implemented, but visual direction is not approved as final native design.                                |
| `[x]`  | 4. Native Elegance Pass For Common Primitives And Glass | GlassSurface fallback, softer primitive visuals, native playground sections, and iOS/Android QA are complete.                         |
| `[x]`  | 5. Card And Linked Surface Foundation                   | Shared `Card` linked-surface source and playground examples exist. iOS and Android route evidence is recorded.                        |
| `[x]`  | 6. Supporting Shared Visual Components                  | Chips, stat cards, progress, segmented controls, feedback, and state components exist with automated and device evidence.             |
| `[x]`  | 7. ComponentPlayground Acceptance Gate                  | ComponentPlayground is verified as the shared primitive gate with iOS and Android screenshot/runtime evidence.                        |
| `[x]`  | 8. Home Design Pilot                                    | Home now uses the accepted shared system through screen-owned components and a Home view model. iOS evidence is recorded.             |
| `[ ]`  | 9. Practice Core Loop Polish                            | Active next slice: apply richer correction, input, feedback, animation, and haptic treatment to Practice.                             |
| `[ ]`  | 10. Review And Feedback Polish                          | Upgrade Review, grading, explanations, accepted alternatives, retry, and continuation flows.                                          |
| `[ ]`  | 11. Progress Polish                                     | Upgrade progress metrics, achievements, trends, and summaries using linked surfaces only where semantically meaningful.               |
| `[ ]`  | 12. Library Polish                                      | Upgrade saved content, history, filters, retry actions, removal flows, and empty states.                                              |
| `[ ]`  | 13. Platform-Native Surface And Motion Polish           | Validate platform treatment, motion, haptics, keyboard transitions, safe areas, and any narrowly justified material effects.          |
| `[ ]`  | 14. Accessibility And Reduced Motion Audit              | Verify React Native accessibility labels, contrast, text scaling, focus, touch targets, and reduced motion behavior.                  |
| `[ ]`  | 15. Final QA And Evidence                               | Run automated checks plus iOS and Android visual/runtime QA, then update evidence docs.                                               |

## Phase Orchestration Checkpoint

Before starting a new implementation phase or visual design slice, share the
current tracker status, completed evidence, open partial phases, and proposed
next slice with ChatGPT Pro Extended in the existing planning thread. Update
this tracker and the relevant phase document when Pro Extended recommends a
clearer sequence or scope boundary.

## How To Update This Tracker

1. Move a phase from `[ ]` to `[~]` when scoped implementation starts or when
   only adapters/contracts exist.
2. Move a phase from `[~]` to `[x]` only after its verification doc records the
   relevant automated and runtime checks.
3. Add a new row when a verification doc exposes work that deserves its own
   follow-up phase, such as native notification delivery or live provider
   integration.
4. Keep phase rows scoped. If work crosses phase boundaries, split it into
   multiple rows instead of stretching one phase.
