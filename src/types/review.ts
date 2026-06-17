export type ReviewSourceType = "word" | "sentence" | "mistake";

export type ReviewMastery = "new" | "learning" | "reviewing" | "mastered";

export type ReviewGrade = "known" | "unsure" | "difficult";

export type ReviewDeckId =
    | "recommended"
    | "wordFlashcards"
    | "sentenceFlashcards"
    | "mistakeCards"
    | "sentenceBuilder";

export type ReviewItem = {
    id: string;
    sourceType: ReviewSourceType;
    sourceId: string;
    prompt: string;
    answer: string;
    dueAt: string;
    intervalDays: number;
    mastery: ReviewMastery;
    createdAt: string;
    lastReviewedAt?: string;
};

export type ReviewDeckSummary = {
    id: ReviewDeckId;
    title: string;
    description: string;
    itemCount: number;
    sourceTypes: ReviewSourceType[];
};

export type ProgressSnapshot = {
    id: string;
    date: string;
    sessionsCompleted: number;
    attemptsCompleted: number;
    correctRate: number;
    savedWords: number;
    savedSentences: number;
    streakDays: number;
    updatedAt: string;
};
