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
    reviewItems,
    snapshot,
    weeklyActivity,
}: {
    reviewItems: ReviewItem[];
    snapshot: ProgressSnapshot;
    weeklyActivity: WeeklyActivityRecord[];
}): ProgressMetric[] {
    const difficultItems = reviewItems.filter((item) => {
        return item.mastery === "learning";
    });
    const weeklyCompletedCount = weeklyActivity.reduce((total, record) => {
        return total + record.completedCount;
    }, 0);
    const metrics: ProgressMetric[] = [];

    if (snapshot.streakDays > 0) {
        metrics.push({
            helper: "Current streak",
            icon: "progress",
            id: "streak",
            label: "Streak",
            tone: "success",
            value: `${snapshot.streakDays}d`,
        });
    }

    if (weeklyCompletedCount > 0) {
        metrics.push({
            helper: "Completed this week",
            icon: "practice",
            id: "weekly-completed",
            label: "Sentences",
            tone: "accent",
            value: String(weeklyCompletedCount),
        });
    }

    if (snapshot.attemptsCompleted > 0) {
        metrics.push({
            helper:
                snapshot.attemptsCompleted === 1
                    ? "Across 1 attempt"
                    : `Across ${snapshot.attemptsCompleted} attempts`,
            icon: "accuracy",
            id: "accuracy",
            label: "First try",
            tone: snapshot.correctRate >= 0.8 ? "success" : "warning",
            value: formatPercent(snapshot.correctRate),
        });
    }

    if (difficultItems.length > 0) {
        metrics.push({
            helper: "Marked learning",
            icon: "mistake",
            id: "difficult",
            label: "Needs work",
            tone: "warning",
            value: String(difficultItems.length),
        });
    }

    return metrics;
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
    snapshot,
}: {
    dailyGoal: DailyGoalRecord;
    snapshot: ProgressSnapshot;
}): ProgressHeroRecord {
    return {
        badgeLabel:
            dailyGoal.completed >= dailyGoal.target
                ? "Goal complete"
                : "Daily goal in progress",
        body:
            snapshot.attemptsCompleted > 0
                ? `${formatPercent(snapshot.correctRate)} first-try accuracy across ${snapshot.attemptsCompleted} practice attempts.`
                : "Complete one translation to start building a progress trail.",
        dailyGoal,
        icon: "progress",
        label: "Progress trend",
        title:
            snapshot.streakDays > 0
                ? `${snapshot.streakDays} day streak`
                : "First practice complete",
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

    return records;
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
            description: "Create a review set from practice.",
            id: "review-ready",
            label: "Review ready",
            state: dueReviewCount > 0 ? "earned" : "locked",
        },
        {
            description: "Reach 80% first-try accuracy.",
            id: "accuracy-80",
            label: "Accurate practice",
            state:
                snapshot.attemptsCompleted > 0 && snapshot.correctRate >= 0.8
                    ? "earned"
                    : "locked",
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

export function hasProgressStarted(snapshot: ProgressSnapshot) {
    return snapshot.attemptsCompleted > 0;
}

function getMistakeTone(value: number): MistakeBreakdownRecord["tone"] {
    if (value >= 3) {
        return "warning";
    }

    return "info";
}
