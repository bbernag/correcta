import type {
    IconName,
    ProgressBarTone,
    StatCardTone,
} from "../../../components/common";
import type {
    PracticeAttempt,
    PracticeSentence,
    ProgressSnapshot,
    ReviewItem,
    SavedSentence,
    SavedWord,
    UserPreferences,
} from "../../../types";

export type HomePhase = "loading" | "ready" | "empty" | "error";

export type HomeDailyGoal = {
    accessibilityLabel: string;
    completed: number;
    label: string;
    target: number;
    tone: ProgressBarTone;
};

export type HomeHeroContent = {
    ctaAccessibilityLabel: string;
    ctaLabel: string;
    dailyGoal: HomeDailyGoal;
    eyebrow: string;
    prompt: string;
    sourceText: string;
    title: string;
};

export type HomeQuickStat = {
    helper: string;
    icon: IconName;
    id: string;
    label: string;
    tone: StatCardTone;
    value: string;
};

export type HomeTeacherTip = {
    body: string;
    contextLabel: string;
    title: string;
};

export type HomeReviewPreviewItem = {
    answer: string;
    id: string;
    metaLabel: string;
    prompt: string;
};

export type HomeContinueLearningAction = "library" | "review";

export type HomeContinueLearningCard = {
    actionLabel?: string;
    actionTarget?: HomeContinueLearningAction;
    body: string;
    difficultWords: string[];
    previewItems: HomeReviewPreviewItem[];
    summaryLabel: string;
    title: string;
};

export type HomeDashboard = {
    continueLearning: HomeContinueLearningCard;
    hero: HomeHeroContent;
    quickStats: HomeQuickStat[];
    teacherTip: HomeTeacherTip;
};

export type HomeSourceData = {
    attempts: PracticeAttempt[];
    dueReviewItems: ReviewItem[];
    preferences: UserPreferences;
    reviewItems: ReviewItem[];
    savedSentences: SavedSentence[];
    savedWords: SavedWord[];
    sentences: PracticeSentence[];
    snapshot: ProgressSnapshot;
};
