export type LanguageCode = "en" | "es";

export type LanguagePair = {
    sourceLanguage: LanguageCode;
    targetLanguage: LanguageCode;
};

export type ProficiencyLevel = "beginner" | "intermediate" | "advanced";

export type PracticeInputMode = "typing" | "sentenceBuilder";

export type ValidationMode = "flexible" | "strict";

export type UserPreferences = {
    languagePair: LanguagePair;
    level: ProficiencyLevel;
    inputMode: PracticeInputMode;
    validationMode: ValidationMode;
};

export type NotificationDay =
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";

export type NotificationPreferences = {
    enabled: boolean;
    reminderPreset: "morning" | "afternoon" | "evening" | "custom" | "none";
    reminderTime: string;
    days: NotificationDay[];
    timezone: string;
    quietHoursStart: string;
    quietHoursEnd: string;
    dailyPracticeEnabled: boolean;
    reviewReminderEnabled: boolean;
    wordOfDayEnabled: boolean;
    sentenceChallengeEnabled: boolean;
    updatedAt: string;
};
