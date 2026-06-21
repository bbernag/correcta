import type {
    HomeContinueLearningCard,
    HomeDailyGoal,
    HomeDashboard,
    HomeQuickStat,
    HomeReviewPreviewItem,
    HomeSourceData,
    HomeTeacherTip,
} from "../types/homeTypes";

const DAILY_GOAL_TARGET = 5;
const LANGUAGE_LABELS = {
    en: "English",
    es: "Spanish",
} as const;
const LEVEL_LABELS = {
    advanced: "Advanced",
    beginner: "Beginner",
    intermediate: "Intermediate",
} as const;

export function createHomeDashboard({
    attempts,
    dueReviewItems,
    preferences,
    reviewItems,
    savedSentences,
    savedWords,
    sentences,
    snapshot,
}: HomeSourceData): HomeDashboard | null {
    const nextSentence = sentences[0];

    if (!nextSentence) {
        return null;
    }

    const completedToday = countCompletedToday(attempts);
    const dailyGoal = createDailyGoal(completedToday);
    const difficultWords = createDifficultWords({reviewItems, savedWords});
    const reviewPreviewItems = createReviewPreviewItems(dueReviewItems);
    const savedCount = savedWords.length + savedSentences.length;

    return {
        continueLearning: createContinueLearningCard({
            difficultWords,
            dueReviewCount: dueReviewItems.length,
            reviewPreviewItems,
            savedCount,
        }),
        hero: {
            ctaAccessibilityLabel: "Start daily practice session",
            ctaLabel: completedToday > 0 ? "Keep practicing" : "Start practice",
            dailyGoal,
            eyebrow: getLanguagePairLabel(preferences),
            prompt: nextSentence.prompt,
            sourceText: nextSentence.sourceText,
            title: "Daily practice",
        },
        quickStats: createQuickStats({
            dueReviewCount: dueReviewItems.length,
            savedCount,
            snapshot,
        }),
        teacherTip: createTeacherTip({
            dueReviewItems,
            nextSentence,
            snapshot,
        }),
    };
}

function createDailyGoal(completedToday: number): HomeDailyGoal {
    const completed = Math.min(completedToday, DAILY_GOAL_TARGET);

    return {
        accessibilityLabel: `Daily practice goal ${completed} of ${DAILY_GOAL_TARGET} attempts complete`,
        completed,
        label: `${completed}/${DAILY_GOAL_TARGET} today`,
        target: DAILY_GOAL_TARGET,
        tone: completed >= DAILY_GOAL_TARGET ? "success" : "accent",
    };
}

function createQuickStats({
    dueReviewCount,
    savedCount,
    snapshot,
}: {
    dueReviewCount: number;
    savedCount: number;
    snapshot: HomeSourceData["snapshot"];
}): HomeQuickStat[] {
    return [
        {
            helper: snapshot.streakDays === 1 ? "Day streak" : "Day streaks",
            icon: "streak",
            id: "streak",
            label: "Streak",
            tone: snapshot.streakDays > 0 ? "success" : "info",
            value: String(snapshot.streakDays),
        },
        {
            helper: "Cards ready",
            icon: "review",
            id: "review",
            label: "Review",
            tone: dueReviewCount > 0 ? "warning" : "info",
            value: String(dueReviewCount),
        },
        {
            helper: "Words and sentences",
            icon: "saved",
            id: "saved",
            label: "Saved",
            tone: savedCount > 0 ? "accent" : "info",
            value: String(savedCount),
        },
        {
            helper: "Correct answers",
            icon: "accuracy",
            id: "accuracy",
            label: "Accuracy",
            tone: snapshot.correctRate >= 0.8 ? "success" : "accent",
            value: formatPercent(snapshot.correctRate),
        },
    ];
}

function createTeacherTip({
    dueReviewItems,
    nextSentence,
    snapshot,
}: {
    dueReviewItems: HomeSourceData["dueReviewItems"];
    nextSentence: HomeSourceData["sentences"][number];
    snapshot: HomeSourceData["snapshot"];
}): HomeTeacherTip {
    if (dueReviewItems.length > 0) {
        return {
            body: `Warm up with "${dueReviewItems[0].prompt}" before starting a new sentence.`,
            contextLabel: `${dueReviewItems.length} review cards ready`,
            title: "Use review as a warm-up",
        };
    }

    if (snapshot.attemptsCompleted > 0 && snapshot.correctRate < 0.8) {
        return {
            body: "Fix one word order issue at a time before rewriting the whole answer.",
            contextLabel: `${formatPercent(snapshot.correctRate)} accuracy so far`,
            title: "Make smaller edits",
        };
    }

    return {
        body: `Say "${nextSentence.sourceText}" once before translating so meaning stays ahead of word choice.`,
        contextLabel: nextSentence.prompt,
        title: "Translate the idea first",
    };
}

function createContinueLearningCard({
    difficultWords,
    dueReviewCount,
    reviewPreviewItems,
    savedCount,
}: {
    difficultWords: string[];
    dueReviewCount: number;
    reviewPreviewItems: HomeReviewPreviewItem[];
    savedCount: number;
}): HomeContinueLearningCard {
    if (dueReviewCount > 0) {
        return {
            actionLabel: "Open review",
            actionTarget: "review",
            body: "Clear the due queue while the mistakes are still fresh.",
            difficultWords,
            previewItems: reviewPreviewItems,
            summaryLabel: `${dueReviewCount} due today`,
            title: "Continue review",
        };
    }

    if (savedCount > 0) {
        return {
            actionLabel: "Open library",
            actionTarget: "library",
            body: "Use saved words and sentences to decide what to practice next.",
            difficultWords,
            previewItems: reviewPreviewItems,
            summaryLabel: `${savedCount} saved items`,
            title: "Continue from saved content",
        };
    }

    return {
        body: "After practice, saved words and mistakes will appear here for review.",
        difficultWords,
        previewItems: reviewPreviewItems,
        summaryLabel: "New learner path",
        title: "Build your first review queue",
    };
}

function createReviewPreviewItems(
    dueReviewItems: HomeSourceData["dueReviewItems"]
): HomeReviewPreviewItem[] {
    return dueReviewItems.slice(0, 2).map((item) => {
        return {
            answer: item.answer,
            id: item.id,
            metaLabel: `${capitalize(item.sourceType)} - ${capitalize(item.mastery)}`,
            prompt: item.prompt,
        };
    });
}

function createDifficultWords({
    reviewItems,
    savedWords,
}: {
    reviewItems: HomeSourceData["reviewItems"];
    savedWords: HomeSourceData["savedWords"];
}) {
    const learningWords = reviewItems
        .filter((item) => {
            return item.sourceType === "word" && item.mastery === "learning";
        })
        .map((item) => item.prompt);
    const mistakeWords = savedWords
        .filter((word) => {
            return Boolean(word.mistakeCategory);
        })
        .map((word) => word.text);

    return Array.from(new Set([...learningWords, ...mistakeWords])).slice(0, 3);
}

function countCompletedToday(attempts: HomeSourceData["attempts"]) {
    const today = new Date();

    return attempts.filter((attempt) => {
        return (
            attempt.status !== "skipped" &&
            new Date(attempt.attemptedAt).toDateString() ===
                today.toDateString()
        );
    }).length;
}

function getLanguagePairLabel({
    languagePair,
    level,
}: HomeSourceData["preferences"]) {
    const sourceLanguage = LANGUAGE_LABELS[languagePair.sourceLanguage];
    const targetLanguage = LANGUAGE_LABELS[languagePair.targetLanguage];

    return `${sourceLanguage} to ${targetLanguage} - ${LEVEL_LABELS[level]}`;
}

function formatPercent(value: number) {
    return `${Math.round(value * 100)}%`;
}

function capitalize(value: string) {
    if (value.length === 0) {
        return value;
    }

    return `${value[0].toUpperCase()}${value.slice(1)}`;
}
