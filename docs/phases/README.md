# Correcta Phase Tracker

Last reviewed: 2026-06-18

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
| `[~]`  | Visual Design and Interaction Polish | `docs/phases/visual-design-interaction-polish.md`             | `docs/qa/visual-design-interaction-polish-qa.md` | Slices 1-4 are implemented and verified. Remaining slices add new shared primitives, screen polish, accessibility, reduced motion, and final QA.                            |

## Visual Design Slice Checklist

These slices live inside `docs/phases/visual-design-interaction-polish.md`.

| Status | Slice                                                   | Notes                                                                                                                                 |
| ------ | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `[x]`  | 1. Theme Token Design System                            | Scribe Blue tokens are implemented in `src/theme`, wired through React Native Unistyles, and Android-verified in light and dark mode. |
| `[x]`  | 2. Icons And Haptics Foundation                         | Lucide icons, SVG support, Pulsar haptics, shared Icon/IconButton wrappers, playground examples, and iOS/Android QA are complete.     |
| `[~]`  | 3. Upgrade Existing Common Components                   | Technical primitive APIs are implemented, but visual direction is not approved as final native design.                                |
| `[x]`  | 4. Native Elegance Pass For Common Primitives And Glass | GlassSurface fallback, softer primitive visuals, native playground sections, and iOS/Android QA are complete.                         |
| `[ ]`  | 5. Add New Shared Visual Components                     | Add missing shared primitives such as badges, stat cards, segmented controls, and feedback highlights.                                |
| `[ ]`  | 6. ComponentPlayground Redesign                         | Make the component-check route the visual QA surface for all shared primitives.                                                       |
| `[ ]`  | 7. Home Polish                                          | Apply the new design direction to Home.                                                                                               |
| `[ ]`  | 8. Practice Polish                                      | Apply richer correction, input, feedback, animation, and haptic treatment to Practice.                                                |
| `[ ]`  | 9. Review Polish                                        | Upgrade Review decks and card states with the new visual system.                                                                      |
| `[ ]`  | 10. Library Polish                                      | Upgrade saved content and history views for scanning and review.                                                                      |
| `[ ]`  | 11. Progress Polish                                     | Upgrade progress metrics, achievements, reminders, backend status, and monetization status.                                           |
| `[ ]`  | 12. Native Polish And GlassSurface Spike                | Validate whether Liquid Glass belongs behind a capability wrapper.                                                                    |
| `[ ]`  | 13. Accessibility And Reduced Motion Pass               | Verify React Native accessibility labels, contrast, text scaling, and reduced motion behavior.                                        |
| `[ ]`  | 14. Final QA And Evidence                               | Run automated checks plus iOS and Android visual/runtime QA, then update evidence docs.                                               |

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
