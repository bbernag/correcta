import {ActivityIndicator} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, Button, Screen} from "../../components/common";
import {AchievementsCard} from "./components/AchievementsCard";
import {BackendAiStatusCard} from "./components/BackendAiStatusCard";
import {DailyGoalCard} from "./components/DailyGoalCard";
import {MonetizationCard} from "./components/MonetizationCard";
import {ProgressErrorState} from "./components/ProgressErrorState";
import {ProgressMetricGrid} from "./components/ProgressMetricGrid";
import {ReminderPreferencesCard} from "./components/ReminderPreferencesCard";
import {WeeklyActivityCard} from "./components/WeeklyActivityCard";
import {useProgressDashboard} from "./hooks/useProgressDashboard";

export function ProgressScreen() {
    const progress = useProgressDashboard();

    if (progress.phase === "loading") {
        return (
            <Screen contentContainerStyle={styles.centered}>
                <ActivityIndicator
                    accessibilityLabel="Loading progress"
                    size="large"
                />
                <AppText variant="heading">Loading Progress</AppText>
                <AppText tone="secondary">
                    Preparing local learning summaries.
                </AppText>
            </Screen>
        );
    }

    if (progress.phase === "error" || !progress.dashboard) {
        return (
            <Screen>
                <AppText variant="title">Progress</AppText>
                <ProgressErrorState
                    message={progress.error ?? "Progress could not be loaded."}
                    onRetry={progress.handleRefresh}
                />
            </Screen>
        );
    }

    const {dashboard} = progress;

    return (
        <Screen contentContainerStyle={styles.content} scroll>
            <AppText variant="title">Progress</AppText>
            <ProgressMetricGrid metrics={dashboard.metrics} />
            <DailyGoalCard dailyGoal={dashboard.dailyGoal} />
            <WeeklyActivityCard records={dashboard.weeklyActivity} />
            <AchievementsCard achievements={dashboard.achievements} />
            <ReminderPreferencesCard
                onSelectReminderPreset={progress.handleSelectReminderPreset}
                onToggleReminders={progress.handleToggleReminders}
                onToggleReviewReminder={progress.handleToggleReviewReminder}
                preferences={dashboard.notificationPreferences}
                reminderState={dashboard.reminderState}
            />
            <BackendAiStatusCard status={dashboard.backendAi} />
            <MonetizationCard
                monetization={dashboard.monetization}
                onRequestReward={() => {
                    void progress.handleRequestReward("bonusReviewPack");
                }}
                rewardState={progress.rewardState}
            />
            <Button
                label={progress.isRefreshing ? "Refreshing" : "Refresh"}
                loading={progress.isRefreshing}
                onPress={progress.handleRefresh}
                variant="ghost"
            />
        </Screen>
    );
}

const styles = StyleSheet.create(() => ({
    centered: {
        alignItems: "center",
        flexGrow: 1,
        justifyContent: "center",
    },
    content: {
        paddingBottom: 40,
    },
}));
