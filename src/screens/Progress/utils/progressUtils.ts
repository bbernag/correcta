import type {
    MistakeCategory,
    PracticeAttempt,
    ProgressSnapshot,
    ReviewItem,
} from "../../../types";
import type {
    AchievementRecord,
    DailyGoalRecord,
    MistakeBreakdownRecord,
    ProgressHeroRecord,
    ProgressMetric,
    ProgressRecommendationRecord,
    WeeklyActivityRecord,
} from "../types/progressTypes";

const DAILY_GOAL_TARGET = 5;
const EMPTY_MISTAKE_BREAKDOWN: MistakeBreakdownRecord[] = [
    {
        category: "wordChoice",
        helper: "No focused mistakes yet",
        id: "mistake-empty-wordChoice",
        label: "Word choice",
        max: 1,
        tone: "info",
        value: 0,
    },
];
const MISTAKE_CATEGORY_LABELS: Record<MistakeCategory, string> = {
    accent: "Accent",
    agreement: "Agreement",
    extraWord: "Extra word",
    meaning: "Meaning",
    missingWord: "Missing word",
    punctuation: "Punctuation",
    verbTense: "Verb tense",
    wordChoice: "Word choice",
    wordOrder: "Word order",
};

export function createProgressMetrics({
    dueReviewCount,
    reviewItems,
    snapshot,
}: {
    dueReviewCount: number;
    reviewItems: ReviewItem[];
    snapshot: ProgressSnapshot;
}): ProgressMetric[] {
    const difficultItems = reviewItems.filter((item) => {
        return item.mastery === "learning";
    });
    const savedCount = snapshot.savedWords + snapshot.savedSentences;

    return [
        {
            helper: "Completed locally",
            icon: "practice",
            id: "attempts",
            label: "Attempts",
            tone: snapshot.attemptsCompleted > 0 ? "accent" : "info",
            value: String(snapshot.attemptsCompleted),
        },
        {
            helper: "Correct answers",
            icon: "accuracy",
            id: "accuracy",
            label: "Accuracy",
            tone: snapshot.correctRate >= 0.8 ? "success" : "warning",
            value: formatPercent(snapshot.correctRate),
        },
        {
            helper: "Words and sentences",
            icon: "saved",
            id: "saved",
            label: "Saved",
            tone: savedCount > 0 ? "success" : "info",
            value: String(savedCount),
        },
        {
            helper: "Cards ready today",
            icon: "review",
            id: "due-review",
            label: "Due review",
            tone: dueReviewCount > 0 ? "warning" : "success",
            value: String(dueReviewCount),
        },
        {
            helper: "Marked learning",
            icon: "mistake",
            id: "difficult",
            label: "Difficult",
            tone: difficultItems.length > 0 ? "warning" : "success",
            value: String(difficultItems.length),
        },
        {
            helper: "Local progress score",
            icon: "progress",
            id: "xp",
            label: "XP",
            tone: "accent",
            value: String(getProgressXp(snapshot)),
        },
    ];
}

export function createDailyGoalRecord(
    snapshot: ProgressSnapshot
): DailyGoalRecord {
    const completed = Math.min(snapshot.attemptsCompleted, DAILY_GOAL_TARGET);

    return {
        accessibilityLabel: `Daily goal ${completed} of ${DAILY_GOAL_TARGET} attempts`,
        completed,
        label: `${completed}/${DAILY_GOAL_TARGET} attempts`,
        tone: completed >= DAILY_GOAL_TARGET ? "success" : "accent",
        target: DAILY_GOAL_TARGET,
    };
}

export function createProgressHeroRecord({
    dailyGoal,
    dueReviewCount,
    snapshot,
}: {
    dailyGoal: DailyGoalRecord;
    dueReviewCount: number;
    snapshot: ProgressSnapshot;
}): ProgressHeroRecord {
    return {
        badgeLabel:
            dueReviewCount > 0
                ? `${dueReviewCount} due for review`
                : "Review queue clear",
        body:
            snapshot.attemptsCompleted > 0
                ? `${formatPercent(snapshot.correctRate)} accuracy across ${snapshot.attemptsCompleted} practice attempts.`
                : "Complete one translation to start building a progress trail.",
        dailyGoal,
        icon: "progress",
        label: "Learning progress",
        title:
            snapshot.streakDays > 0
                ? `${snapshot.streakDays} day streak`
                : "Ready for the first practice day",
        value: String(getProgressXp(snapshot)),
    };
}

export function createWeeklyActivity(
    attempts: PracticeAttempt[]
): WeeklyActivityRecord[] {
    const today = new Date();

    return Array.from({length: 7}).map((_, offset) => {
        const date = new Date(today);

        date.setDate(today.getDate() - (6 - offset));

        const dateKey = date.toISOString().slice(0, 10);
        const completedCount = attempts.filter((attempt) => {
            return (
                attempt.status !== "skipped" &&
                attempt.attemptedAt.slice(0, 10) === dateKey
            );
        }).length;

        return {
            completedCount,
            dayLabel: date.toLocaleDateString(undefined, {weekday: "short"}),
            id: dateKey,
        };
    });
}

export function createMistakeBreakdown(
    attempts: PracticeAttempt[]
): MistakeBreakdownRecord[] {
    const categoryCounts = attempts.reduce(
        (counts, attempt) => {
            attempt.mistakeCategories.forEach((category) => {
                counts[category] = (counts[category] ?? 0) + 1;
            });

            return counts;
        },
        {} as Partial<Record<MistakeCategory, number>>
    );
    const max = Math.max(...Object.values(categoryCounts), 1);
    const records = Object.entries(categoryCounts)
        .map(([category, value]) => {
            return {
                category: category as MistakeCategory,
                helper:
                    value === 1 ? "1 saved pattern" : `${value} saved patterns`,
                id: `mistake-${category}`,
                label: MISTAKE_CATEGORY_LABELS[category as MistakeCategory],
                max,
                tone: getMistakeTone(value),
                value,
            } satisfies MistakeBreakdownRecord;
        })
        .sort((first, second) => {
            return second.value - first.value;
        })
        .slice(0, 4);

    return records.length > 0 ? records : EMPTY_MISTAKE_BREAKDOWN;
}

export function createAchievementRecords({
    dueReviewCount,
    snapshot,
}: {
    dueReviewCount: number;
    snapshot: ProgressSnapshot;
}): AchievementRecord[] {
    return [
        {
            description: "Complete one practice attempt.",
            id: "first-attempt",
            label: "First attempt",
            state: snapshot.attemptsCompleted > 0 ? "earned" : "locked",
        },
        {
            description: "Save one word or sentence.",
            id: "saved-content",
            label: "Saved content",
            state:
                snapshot.savedWords + snapshot.savedSentences > 0
                    ? "earned"
                    : "locked",
        },
        {
            description: "Build a review queue from practice.",
            id: "review-ready",
            label: "Review ready",
            state: dueReviewCount > 0 ? "earned" : "locked",
        },
        {
            description: "Reach 80% accuracy locally.",
            id: "accuracy-80",
            label: "Accurate practice",
            state: snapshot.correctRate >= 0.8 ? "earned" : "locked",
        },
    ];
}

export function createProgressRecommendation({
    difficultReviewCount,
    dueReviewCount,
    snapshot,
}: {
    difficultReviewCount: number;
    dueReviewCount: number;
    snapshot: ProgressSnapshot;
}): ProgressRecommendationRecord {
    if (dueReviewCount > 0) {
        return {
            action: "review",
            actionLabel: "Open Review",
            body:
                difficultReviewCount > 0
                    ? "Clear the due queue while the difficult cards are still fresh."
                    : "Review today's cards to keep the spacing loop moving.",
            icon: "review",
            title: "Review is the next best move",
        };
    }

    if (snapshot.attemptsCompleted < DAILY_GOAL_TARGET) {
        return {
            action: "practice",
            actionLabel: "Start Practice",
            body: "One focused translation will move today's goal and create better review material.",
            icon: "practice",
            title: "Add one practice attempt",
        };
    }

    return {
        action: "library",
        actionLabel: "Open Library",
        body: "Saved words and sentences are ready to scan before the next practice session.",
        icon: "library",
        title: "Review your notebook",
    };
}

export function formatPercent(value: number) {
    return `${Math.round(value * 100)}%`;
}

function getProgressXp(snapshot: ProgressSnapshot) {
    return (
        snapshot.sessionsCompleted * 20 +
        snapshot.attemptsCompleted * 10 +
        snapshot.savedWords * 6 +
        snapshot.savedSentences * 8
    );
}

function getMistakeTone(value: number): MistakeBreakdownRecord["tone"] {
    if (value >= 3) {
        return "warning";
    }

    return "info";
}
