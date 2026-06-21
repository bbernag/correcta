import type {NotificationPreferences, UserPreferences} from "./language";
import type {
    NotificationPermissionStatus,
    NotificationReminderState,
    ScheduledReminder,
} from "./notifications";
import type {
    ExplainFeedbackRequest,
    PracticeAttempt,
    PracticeSentence,
    PracticeSessionSummary,
    PracticeSetRequest,
    TeacherFeedback,
    ValidateTranslationRequest,
    ValidationResult,
} from "./practice";
import type {
    ProgressSnapshot,
    ReviewGrade,
    ReviewItem,
    ReviewSourceType,
} from "./review";
import type {SavedSentence, SavedWord} from "./savedContent";
import type {BackendAiStatus} from "./backendAi";
import type {
    MonetizationState,
    RewardedAdMoment,
    RewardedAdResult,
} from "./monetization";

export type UserPreferencesRepository = {
    getPreferences: () => Promise<UserPreferences>;
    savePreferences: (preferences: UserPreferences) => Promise<UserPreferences>;
};

export type PracticeHistoryRepository = {
    saveAttempt: (attempt: PracticeAttempt) => Promise<PracticeAttempt>;
    listAttempts: () => Promise<PracticeAttempt[]>;
    clearAttempts: () => Promise<void>;
};

export type SavedContentRepository = {
    saveWord: (word: SavedWord) => Promise<SavedWord>;
    saveSentence: (sentence: SavedSentence) => Promise<SavedSentence>;
    listWords: () => Promise<SavedWord[]>;
    listSentences: () => Promise<SavedSentence[]>;
    removeWord: (wordId: string) => Promise<void>;
    removeSentence: (sentenceId: string) => Promise<void>;
    clearSavedContent: () => Promise<void>;
};

export type ReviewQueueRepository = {
    upsertItem: (item: ReviewItem) => Promise<ReviewItem>;
    listItems: () => Promise<ReviewItem[]>;
    listDueItems: (now: string) => Promise<ReviewItem[]>;
    removeItemsBySource: (source: {
        sourceId: string;
        sourceType: ReviewSourceType;
    }) => Promise<void>;
    clearItems: () => Promise<void>;
};

export type NotificationPreferencesRepository = {
    getPreferences: () => Promise<NotificationPreferences>;
    savePreferences: (
        preferences: NotificationPreferences
    ) => Promise<NotificationPreferences>;
};

export type NotificationScheduleRepository = {
    listScheduledReminders: () => Promise<ScheduledReminder[]>;
    saveScheduledReminders: (
        reminders: ScheduledReminder[]
    ) => Promise<ScheduledReminder[]>;
    clearScheduledReminders: () => Promise<void>;
};

export type SentenceService = {
    getPracticeSentences: (
        request: PracticeSetRequest
    ) => Promise<PracticeSentence[]>;
    getPracticeSentenceById: (
        sentenceId: string
    ) => Promise<PracticeSentence | null>;
};

export type TranslationValidationService = {
    validateTranslation: (
        request: ValidateTranslationRequest
    ) => Promise<ValidationResult>;
};

export type TeacherFeedbackService = {
    explainValidation: (
        request: ExplainFeedbackRequest
    ) => Promise<TeacherFeedback>;
};

export type ProgressSummaryService = {
    getProgressSnapshot: () => Promise<ProgressSnapshot>;
    getSessionSummary: (
        sessionId: string
    ) => Promise<PracticeSessionSummary | null>;
};

export type ReviewWorkflowService = {
    completeReviewItem: (params: {
        grade: ReviewGrade;
        item: ReviewItem;
    }) => Promise<ReviewItem>;
};

export type NotificationReminderService = {
    getReminderState: () => Promise<NotificationReminderState>;
    syncReminders: () => Promise<NotificationReminderState>;
    savePreferences: (
        preferences: NotificationPreferences
    ) => Promise<NotificationReminderState>;
};

export type NativeNotificationSyncResult = {
    permissionStatus: NotificationPermissionStatus;
    scheduledCount: number;
};

export type NativeNotificationScheduler = {
    getPermissionStatus: () => Promise<NotificationPermissionStatus>;
    getScheduledCount: () => Promise<number>;
    syncScheduledReminders: (params: {
        reminders: ScheduledReminder[];
        requestPermission: boolean;
    }) => Promise<NativeNotificationSyncResult>;
};

export type BackendAiIntegrationService = {
    getStatus: () => Promise<BackendAiStatus>;
};

export type MonetizationService = {
    getState: () => Promise<MonetizationState>;
    requestRewardedAd: (params: {
        moment: RewardedAdMoment;
    }) => Promise<RewardedAdResult>;
};

export type CorrectaServices = {
    backendAi: BackendAiIntegrationService;
    preferences: UserPreferencesRepository;
    history: PracticeHistoryRepository;
    monetization: MonetizationService;
    savedContent: SavedContentRepository;
    reviewQueue: ReviewQueueRepository;
    reviewWorkflow: ReviewWorkflowService;
    notifications: NotificationPreferencesRepository;
    notificationSchedule: NotificationScheduleRepository;
    reminders: NotificationReminderService;
    sentences: SentenceService;
    validation: TranslationValidationService;
    feedback: TeacherFeedbackService;
    progress: ProgressSummaryService;
};
