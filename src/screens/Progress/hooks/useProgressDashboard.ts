import {useFocusEffect} from "@react-navigation/native";
import {useCallback, useMemo, useRef, useState} from "react";

import {createCorrectaServices} from "../../../services/domain";
import type {NotificationPreferences, RewardedAdMoment} from "../../../types";
import type {
    ProgressDashboard,
    ProgressPhase,
    ProgressRewardState,
} from "../types/ProgressTypes";
import {
    createAchievementRecords,
    createDailyGoalRecord,
    createProgressMetrics,
    createWeeklyActivity,
} from "../utils/ProgressUtils";

export function useProgressDashboard() {
    const services = useMemo(() => {
        return createCorrectaServices();
    }, []);
    const mountedRef = useRef(true);
    const [dashboard, setDashboard] = useState<ProgressDashboard | null>(null);
    const [phase, setPhase] = useState<ProgressPhase>("loading");
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);
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

                setDashboard({
                    achievements: createAchievementRecords({
                        dueReviewCount: dueReviewItems.length,
                        snapshot,
                    }),
                    backendAi,
                    dailyGoal: createDailyGoalRecord(snapshot),
                    metrics: createProgressMetrics({
                        dueReviewCount: dueReviewItems.length,
                        reviewItems,
                        snapshot,
                    }),
                    monetization,
                    notificationPreferences,
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
                setError(null);
            } catch (preferencesError) {
                if (!mountedRef.current) {
                    return;
                }

                setError(
                    preferencesError instanceof Error
                        ? preferencesError.message
                        : "Reminder preferences could not be saved"
                );
            }
        },
        [dashboard, services]
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
        phase,
        rewardState,
    };
}
