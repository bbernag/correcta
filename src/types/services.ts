import type {NotificationPreferences, UserPreferences} from "./language";
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
import type {ProgressSnapshot, ReviewItem} from "./review";
import type {SavedSentence, SavedWord} from "./savedContent";

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
    clearSavedContent: () => Promise<void>;
};

export type ReviewQueueRepository = {
    upsertItem: (item: ReviewItem) => Promise<ReviewItem>;
    listDueItems: (now: string) => Promise<ReviewItem[]>;
    clearItems: () => Promise<void>;
};

export type NotificationPreferencesRepository = {
    getPreferences: () => Promise<NotificationPreferences>;
    savePreferences: (
        preferences: NotificationPreferences
    ) => Promise<NotificationPreferences>;
};

export type SentenceService = {
    getPracticeSentences: (
        request: PracticeSetRequest
    ) => Promise<PracticeSentence[]>;
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

export type ConectaServices = {
    preferences: UserPreferencesRepository;
    history: PracticeHistoryRepository;
    savedContent: SavedContentRepository;
    reviewQueue: ReviewQueueRepository;
    notifications: NotificationPreferencesRepository;
    sentences: SentenceService;
    validation: TranslationValidationService;
    feedback: TeacherFeedbackService;
    progress: ProgressSummaryService;
};
