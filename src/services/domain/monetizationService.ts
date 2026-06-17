import type {
    LearningReward,
    MonetizationService,
    MonetizationState,
    RewardedAdMoment,
} from "../../types";

const LEARNING_REWARDS: LearningReward[] = [
    {
        description: "Adds five optional review cards after a safe milestone.",
        id: "bonus-review-pack",
        label: "Bonus review pack",
    },
    {
        description: "Unlocks one extra hint outside active correction.",
        id: "bonus-hint",
        label: "Bonus hint",
    },
];

const ALLOWED_MOMENTS: RewardedAdMoment[] = [
    "postSession",
    "dailyGoalComplete",
    "bonusReviewPack",
    "rewardedHint",
];

export function createMonetizationService({
    providerConfigured = false,
}: {
    providerConfigured?: boolean;
} = {}): MonetizationService {
    return {
        async getState() {
            return createMonetizationState({providerConfigured});
        },
        async requestRewardedAd({moment}) {
            if (!ALLOWED_MOMENTS.includes(moment)) {
                return {
                    message: "Ads are not allowed during active learning.",
                    reward: null,
                    status: "failed",
                };
            }

            if (!providerConfigured) {
                return {
                    message:
                        "Rewarded ads are not connected. Core learning stays available.",
                    reward: null,
                    status: "unavailable",
                };
            }

            return {
                message: "Reward completed.",
                reward: getRewardForMoment(moment),
                status: "earned",
            };
        },
    };
}

function createMonetizationState({
    providerConfigured,
}: {
    providerConfigured: boolean;
}): MonetizationState {
    return {
        adapterName: providerConfigured
            ? "Rewarded ad provider"
            : "Unavailable rewarded adapter",
        allowedMoments: ALLOWED_MOMENTS,
        blockedMoments: [],
        providerConfigured,
        rewards: LEARNING_REWARDS,
    };
}

function getRewardForMoment(moment: RewardedAdMoment): LearningReward {
    if (moment === "rewardedHint") {
        return LEARNING_REWARDS[1];
    }

    return LEARNING_REWARDS[0];
}
