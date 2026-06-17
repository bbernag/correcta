import type {
    PracticeAttempt,
    ProgressSnapshot,
    ReviewItem,
} from "../../../types";
import type {
    AchievementRecord,
    DailyGoalRecord,
    ProgressMetric,
    WeeklyActivityRecord,
} from "../types/ProgressTypes";

const DAILY_GOAL_TARGET = 5;

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

    return [
        {
            caption: "Completed local practice attempts",
            id: "attempts",
            label: "Attempts",
            value: String(snapshot.attemptsCompleted),
        },
        {
            caption: "Correct answers across all attempts",
            id: "accuracy",
            label: "Accuracy",
            value: formatPercent(snapshot.correctRate),
        },
        {
            caption: "Words and sentences saved",
            id: "saved",
            label: "Saved",
            value: String(snapshot.savedWords + snapshot.savedSentences),
        },
        {
            caption: "Cards ready today",
            id: "due-review",
            label: "Due review",
            value: String(dueReviewCount),
        },
        {
            caption: "Cards marked learning",
            id: "difficult",
            label: "Difficult",
            value: String(difficultItems.length),
        },
        {
            caption: "Local progress score",
            id: "xp",
            label: "XP",
            value: String(getProgressXp(snapshot)),
        },
    ];
}

export function createDailyGoalRecord(
    snapshot: ProgressSnapshot
): DailyGoalRecord {
    return {
        completed: Math.min(snapshot.attemptsCompleted, DAILY_GOAL_TARGET),
        label: `${snapshot.attemptsCompleted}/${DAILY_GOAL_TARGET} attempts`,
        target: DAILY_GOAL_TARGET,
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
