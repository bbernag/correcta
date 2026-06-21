import type {CorrectaServices} from "../../types";
import {createBackendAiIntegrationService} from "./backendAiIntegrationService";
import {createMonetizationService} from "./monetizationService";
import {createMockSentenceService} from "./mock/mockSentenceService";
import {createMockTeacherFeedbackService} from "./mock/mockTeacherFeedbackService";
import {createMockTranslationValidationService} from "./mock/mockTranslationValidationService";
import {createExpoNotificationScheduler} from "../../native/notifications";
import {createNotificationReminderService} from "./notificationReminderService";
import {createProgressSummaryService} from "./progressSummaryService";
import {createNotificationPreferencesRepository} from "./repositories/notificationPreferencesRepository";
import {createNotificationScheduleRepository} from "./repositories/notificationScheduleRepository";
import {createPracticeHistoryRepository} from "./repositories/practiceHistoryRepository";
import {createReviewQueueRepository} from "./repositories/reviewQueueRepository";
import {createSavedContentRepository} from "./repositories/savedContentRepository";
import {createUserPreferencesRepository} from "./repositories/userPreferencesRepository";
import {createReviewWorkflowService} from "./reviewWorkflowService";

export function createCorrectaServices(): CorrectaServices {
    const history = createPracticeHistoryRepository();
    const notifications = createNotificationPreferencesRepository();
    const notificationSchedule = createNotificationScheduleRepository();
    const reviewQueue = createReviewQueueRepository();
    const savedContent = createSavedContentRepository();

    return {
        backendAi: createBackendAiIntegrationService(),
        feedback: createMockTeacherFeedbackService(),
        history,
        monetization: createMonetizationService(),
        notificationSchedule,
        notifications,
        preferences: createUserPreferencesRepository(),
        progress: createProgressSummaryService({
            history,
            savedContent,
        }),
        reminders: createNotificationReminderService({
            nativeNotifications: createExpoNotificationScheduler(),
            notificationSchedule,
            notifications,
            reviewQueue,
        }),
        reviewQueue,
        reviewWorkflow: createReviewWorkflowService({
            reviewQueue,
            savedContent,
        }),
        savedContent,
        sentences: createMockSentenceService(),
        validation: createMockTranslationValidationService(),
    };
}
