export type RewardedAdMoment =
    | "postSession"
    | "dailyGoalComplete"
    | "bonusReviewPack"
    | "rewardedHint";

export type RewardedAdStatus =
    | "earned"
    | "cancelled"
    | "unavailable"
    | "failed";

export type LearningReward = {
    id: string;
    label: string;
    description: string;
};

export type RewardedAdResult = {
    message: string;
    reward: LearningReward | null;
    status: RewardedAdStatus;
};

export type MonetizationState = {
    adapterName: string;
    allowedMoments: RewardedAdMoment[];
    blockedMoments: RewardedAdMoment[];
    providerConfigured: boolean;
    rewards: LearningReward[];
};
