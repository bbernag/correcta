import type {
    BackendAiStatus,
    MistakeCategory,
    MonetizationState,
    NotificationPreferences,
    NotificationReminderState,
    ProgressSnapshot,
    RewardedAdResult,
} from "../../../types";
import type {
    IconName,
    ProgressBarTone,
    StatCardTone,
} from "../../../components/common";

export type ProgressPhase = "loading" | "ready" | "error";

export type ProgressMetric = {
    helper: string;
    icon: IconName;
    id: string;
    label: string;
    tone: StatCardTone;
    value: string;
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
    accessibilityLabel: string;
    completed: number;
    label: string;
    tone: ProgressBarTone;
    target: number;
};

export type ProgressHeroRecord = {
    badgeLabel: string;
    body: string;
    dailyGoal: DailyGoalRecord;
    icon: IconName;
    label: string;
    title: string;
};

export type MistakeBreakdownRecord = {
    category: MistakeCategory;
    helper: string;
    id: string;
    label: string;
    max: number;
    tone: ProgressBarTone;
    value: number;
};

export type ProgressRecommendationAction = "practice" | "review" | "library";

export type ProgressRecommendationRecord = {
    action: ProgressRecommendationAction;
    actionLabel: string;
    body: string;
    icon: IconName;
    title: string;
};

export type ProgressDashboard = {
    achievements: AchievementRecord[];
    backendAi: BackendAiStatus;
    hero: ProgressHeroRecord;
    metrics: ProgressMetric[];
    mistakeBreakdown: MistakeBreakdownRecord[];
    monetization: MonetizationState;
    notificationPreferences: NotificationPreferences;
    recommendation: ProgressRecommendationRecord;
    reminderState: NotificationReminderState;
    snapshot: ProgressSnapshot;
    weeklyActivity: WeeklyActivityRecord[];
};

export type ProgressRewardState = {
    isLoading: boolean;
    result: RewardedAdResult | null;
};
