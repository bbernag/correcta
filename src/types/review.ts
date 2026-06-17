export type ReviewSourceType = "word" | "sentence" | "mistake";

export type ReviewMastery = "new" | "learning" | "reviewing" | "mastered";

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
