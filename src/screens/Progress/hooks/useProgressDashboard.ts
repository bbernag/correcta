import {useFocusEffect} from "@react-navigation/native";
import {useCallback, useMemo, useRef, useState} from "react";

import {useCorrectaToast} from "../../../components/common";
import {createCorrectaServices} from "../../../services/domain";
import type {NotificationPreferences, RewardedAdMoment} from "../../../types";
import type {
    ProgressDashboard,
    ProgressPhase,
    ProgressRewardState,
} from "../types/progressTypes";
import {
    createAchievementRecords,
    createDailyGoalRecord,
    createMistakeBreakdown,
    createProgressHeroRecord,
    createProgressMetrics,
    createProgressRecommendation,
    createWeeklyActivity,
} from "../utils/progressUtils";

export function useProgressDashboard() {
    const services = useMemo(() => {
        return createCorrectaServices();
    }, []);
    const {showToast} = useCorrectaToast();
    const mountedRef = useRef(true);
    const [dashboard, setDashboard] = useState<ProgressDashboard | null>(null);
    const [phase, setPhase] = useState<ProgressPhase>("loading");
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [preferencesError, setPreferencesError] = useState<string | null>(
        null
    );
    const [isSavingPreferences, setIsSavingPreferences] = useState(false);
    const [rewardState, setRewardState] = useState<ProgressRewardState>({
        isLoading: false,
        result: null,
    });

    const loadDashboard = useCallback(
        async ({refreshing = false}: {refreshing?: boolean} = {}) => {
            if (refreshing) {
                setIsRefreshing(true);
            } else {
                setPhase("loading");
            }

            try {
                const now = new Date().toISOString();
                const [
                    attempts,
                    backendAi,
                    monetization,
                    notificationPreferences,
                    reminderState,
                    reviewItems,
                    dueReviewItems,
                    snapshot,
                ] = await Promise.all([
                    services.history.listAttempts(),
                    services.backendAi.getStatus(),
                    services.monetization.getState(),
                    services.notifications.getPreferences(),
                    services.reminders.getReminderState(),
                    services.reviewQueue.listItems(),
                    services.reviewQueue.listDueItems(now),
                    services.progress.getProgressSnapshot(),
                ]);

                if (!mountedRef.current) {
                    return;
                }

                const dailyGoal = createDailyGoalRecord(snapshot);
                const difficultReviewCount = reviewItems.filter((item) => {
                    return item.mastery === "learning";
                }).length;

                setDashboard({
                    achievements: createAchievementRecords({
                        dueReviewCount: dueReviewItems.length,
                        snapshot,
                    }),
                    backendAi,
                    hero: createProgressHeroRecord({
                        dailyGoal,
                        dueReviewCount: dueReviewItems.length,
                        snapshot,
                    }),
                    metrics: createProgressMetrics({
                        dueReviewCount: dueReviewItems.length,
                        reviewItems,
                        snapshot,
                    }),
                    mistakeBreakdown: createMistakeBreakdown(attempts),
                    monetization,
                    notificationPreferences,
                    recommendation: createProgressRecommendation({
                        difficultReviewCount,
                        dueReviewCount: dueReviewItems.length,
                        snapshot,
                    }),
                    reminderState,
                    snapshot,
                    weeklyActivity: createWeeklyActivity(attempts),
                });
                setError(null);
                setPhase("ready");
            } catch (dashboardError) {
                if (!mountedRef.current) {
                    return;
                }

                setError(
                    dashboardError instanceof Error
                        ? dashboardError.message
                        : "Progress could not be loaded"
                );
                setPhase("error");
            } finally {
                if (!mountedRef.current) {
                    return;
                }

                setIsRefreshing(false);
            }
        },
        [services]
    );

    useFocusEffect(
        useCallback(() => {
            mountedRef.current = true;
            void loadDashboard();

            return () => {
                mountedRef.current = false;
            };
        }, [loadDashboard])
    );

    const saveNotificationPreferences = useCallback(
        async (preferences: NotificationPreferences) => {
            setPreferencesError(null);
            setIsSavingPreferences(true);

            try {
                const reminderState =
                    await services.reminders.savePreferences(preferences);

                if (!mountedRef.current || !dashboard) {
                    return;
                }

                setDashboard({
                    ...dashboard,
                    notificationPreferences: {
                        ...preferences,
                        updatedAt: new Date().toISOString(),
                    },
                    reminderState,
                });
                showToast({title: "Reminders updated", variant: "success"});
            } catch (saveError) {
                if (!mountedRef.current) {
                    return;
                }

                setPreferencesError(
                    saveError instanceof Error
                        ? saveError.message
                        : "Reminder preferences could not be saved"
                );
            } finally {
                if (mountedRef.current) {
                    setIsSavingPreferences(false);
                }
            }
        },
        [dashboard, services, showToast]
    );

    const handleToggleReminders = useCallback(() => {
        if (!dashboard) {
            return;
        }

        void saveNotificationPreferences({
            ...dashboard.notificationPreferences,
            enabled: !dashboard.notificationPreferences.enabled,
        });
    }, [dashboard, saveNotificationPreferences]);

    const handleSelectReminderPreset = useCallback(
        ({
            preset,
            time,
        }: {
            preset: NotificationPreferences["reminderPreset"];
            time: string;
        }) => {
            if (!dashboard) {
                return;
            }

            void saveNotificationPreferences({
                ...dashboard.notificationPreferences,
                enabled: preset !== "none",
                reminderPreset: preset,
                reminderTime:
                    preset === "none"
                        ? dashboard.notificationPreferences.reminderTime
                        : time,
            });
        },
        [dashboard, saveNotificationPreferences]
    );

    const handleToggleReviewReminder = useCallback(() => {
        if (!dashboard) {
            return;
        }

        void saveNotificationPreferences({
            ...dashboard.notificationPreferences,
            reviewReminderEnabled:
                !dashboard.notificationPreferences.reviewReminderEnabled,
        });
    }, [dashboard, saveNotificationPreferences]);

    const handleRequestReward = useCallback(
        async (moment: RewardedAdMoment) => {
            setRewardState({isLoading: true, result: null});

            try {
                const result = await services.monetization.requestRewardedAd({
                    moment,
                });

                if (mountedRef.current) {
                    setRewardState({isLoading: false, result});
                }
            } catch (rewardError) {
                if (mountedRef.current) {
                    setRewardState({
                        isLoading: false,
                        result: {
                            message:
                                rewardError instanceof Error
                                    ? rewardError.message
                                    : "Reward could not be checked",
                            reward: null,
                            status: "failed",
                        },
                    });
                }
            }
        },
        [services]
    );

    function handleRefresh() {
        void loadDashboard({refreshing: true});
    }

    return {
        dashboard,
        error,
        handleRefresh,
        handleRequestReward,
        handleSelectReminderPreset,
        handleToggleReminders,
        handleToggleReviewReminder,
        isRefreshing,
        isSavingPreferences,
        phase,
        preferencesError,
        rewardState,
    };
}
