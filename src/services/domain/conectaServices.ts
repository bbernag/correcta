import type {ConectaServices} from "../../types";
import {createMockSentenceService} from "./mock/mockSentenceService";
import {createMockTeacherFeedbackService} from "./mock/mockTeacherFeedbackService";
import {createMockTranslationValidationService} from "./mock/mockTranslationValidationService";
import {createProgressSummaryService} from "./progressSummaryService";
import {createNotificationPreferencesRepository} from "./repositories/notificationPreferencesRepository";
import {createPracticeHistoryRepository} from "./repositories/practiceHistoryRepository";
import {createReviewQueueRepository} from "./repositories/reviewQueueRepository";
import {createSavedContentRepository} from "./repositories/savedContentRepository";
import {createUserPreferencesRepository} from "./repositories/userPreferencesRepository";

export function createConectaServices(): ConectaServices {
    const history = createPracticeHistoryRepository();
    const savedContent = createSavedContentRepository();

    return {
        feedback: createMockTeacherFeedbackService(),
        history,
        notifications: createNotificationPreferencesRepository(),
        preferences: createUserPreferencesRepository(),
        progress: createProgressSummaryService({
            history,
            savedContent,
        }),
        reviewQueue: createReviewQueueRepository(),
        savedContent,
        sentences: createMockSentenceService(),
        validation: createMockTranslationValidationService(),
    };
}
