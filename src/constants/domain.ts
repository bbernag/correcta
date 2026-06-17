import type {NotificationPreferences, UserPreferences} from "../types";

export const DEFAULT_USER_PREFERENCES: UserPreferences = {
    inputMode: "typing",
    languagePair: {
        sourceLanguage: "es",
        targetLanguage: "en",
    },
    level: "beginner",
    validationMode: "flexible",
};

export const DEFAULT_NOTIFICATION_PREFERENCES: NotificationPreferences = {
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    enabled: false,
    reminderTime: "19:00",
    timezone: "local",
    updatedAt: "2026-06-16T00:00:00.000Z",
};
