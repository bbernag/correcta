import type {
    BackendAiStatus,
    MonetizationState,
    NotificationPreferences,
    NotificationReminderState,
    ProgressSnapshot,
    RewardedAdResult,
} from "../../../types";

export type ProgressPhase = "loading" | "ready" | "error";

export type ProgressMetric = {
    id: string;
    label: string;
    value: string;
    caption: string;
};

export type WeeklyActivityRecord = {
    completedCount: number;
    dayLabel: string;
    id: string;
};

export type AchievementRecord = {
    description: string;
    id: string;
    label: string;
    state: "earned" | "locked";
};

export type DailyGoalRecord = {
    completed: number;
    label: string;
    target: number;
};

export type ProgressDashboard = {
    achievements: AchievementRecord[];
    backendAi: BackendAiStatus;
    dailyGoal: DailyGoalRecord;
    metrics: ProgressMetric[];
    monetization: MonetizationState;
    notificationPreferences: NotificationPreferences;
    reminderState: NotificationReminderState;
    snapshot: ProgressSnapshot;
    weeklyActivity: WeeklyActivityRecord[];
};

export type ProgressRewardState = {
    isLoading: boolean;
    result: RewardedAdResult | null;
};
