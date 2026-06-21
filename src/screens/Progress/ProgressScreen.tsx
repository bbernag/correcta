import type {CompositeScreenProps} from "@react-navigation/native";
import type {NativeStackScreenProps} from "@react-navigation/native-stack";
import type {NativeBottomTabScreenProps} from "@bottom-tabs/react-navigation";
import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {
    AppText,
    Button,
    EmptyState,
    IconButton,
    LoadingState,
    Screen,
    ScreenHeader,
    SectionHeader,
    Surface,
} from "../../components/common";
import type {MainTabParamList, RootStackParamList} from "../../router/types";
import {AchievementsCard} from "./components/AchievementsCard";
import {BackendAiStatusCard} from "./components/BackendAiStatusCard";
import {MistakeBreakdownCard} from "./components/MistakeBreakdownCard";
import {MonetizationCard} from "./components/MonetizationCard";
import {ProgressErrorState} from "./components/ProgressErrorState";
import {ProgressHeroCard} from "./components/ProgressHeroCard";
import {ProgressMetricGrid} from "./components/ProgressMetricGrid";
import {ProgressRecommendationCard} from "./components/ProgressRecommendationCard";
import {ReminderPreferencesCard} from "./components/ReminderPreferencesCard";
import {WeeklyActivityCard} from "./components/WeeklyActivityCard";
import {useProgressDashboard} from "./hooks/useProgressDashboard";
import {hasProgressStarted} from "./utils/progressUtils";

type ProgressScreenProps = CompositeScreenProps<
    NativeBottomTabScreenProps<MainTabParamList, "Progress">,
    NativeStackScreenProps<RootStackParamList>
>;

export function ProgressScreen({navigation}: ProgressScreenProps) {
    const progress = useProgressDashboard();
    const headerAction = (
        <IconButton
            accessibilityLabel="Refresh progress"
            disabled={progress.isRefreshing}
            icon="clear"
            onPress={progress.handleRefresh}
            variant="surface"
        />
    );

    if (progress.phase === "loading") {
        return (
            <Screen contentContainerStyle={styles.centered}>
                <LoadingState
                    message="Preparing local learning summaries."
                    title="Loading Progress"
                />
            </Screen>
        );
    }

    if (progress.phase === "error" || !progress.dashboard) {
        return (
            <Screen>
                <ScreenHeader
                    action={headerAction}
                    eyebrow="Progress"
                    title="Progress"
                />
                <ProgressErrorState
                    message={progress.error ?? "Progress could not be loaded."}
                    onRetry={progress.handleRefresh}
                />
            </Screen>
        );
    }

    const {dashboard} = progress;
    const hasWeeklyActivity = dashboard.weeklyActivity.some((record) => {
        return record.completedCount > 0;
    });
    const hasMistakeBreakdown = dashboard.mistakeBreakdown.length > 0;

    function handleRecommendationPress() {
        switch (dashboard.recommendation.action) {
            case "review":
                navigation.navigate("ReviewSession");
                return;
            case "library":
                navigation.navigate("Library");
                return;
            case "practice":
            default:
                navigation.navigate("PracticeSession", {
                    restartKey: Date.now(),
                });
        }
    }

    function handleStartPractice() {
        navigation.navigate("PracticeSession", {restartKey: Date.now()});
    }

    if (!hasProgressStarted(dashboard.snapshot)) {
        return (
            <Screen contentContainerStyle={styles.content}>
                <ScreenHeader
                    action={headerAction}
                    eyebrow="Progress"
                    subtitle="Your first practice starts the trend."
                    title="Progress"
                />
                <EmptyState
                    action={
                        <Button
                            accessibilityLabel="Start practice to begin progress"
                            label="Start practice"
                            leadingIcon="practice"
                            onPress={handleStartPractice}
                        />
                    }
                    icon="progress"
                    message="Complete one translation to unlock streaks, accuracy, and weekly activity."
                    title="Progress starts after practice"
                />
            </Screen>
        );
    }

    return (
        <Screen contentContainerStyle={styles.content} scroll>
            <ScreenHeader
                action={headerAction}
                eyebrow="Progress"
                subtitle="Trends from practice and review."
                title="Progress"
            />
            <ProgressHeroCard hero={dashboard.hero} />
            {dashboard.metrics.length > 0 ? (
                <View style={styles.section}>
                    <SectionHeader
                        subtitle="Only signals with enough practice data are shown."
                        title="This week"
                    />
                    <ProgressMetricGrid metrics={dashboard.metrics} />
                </View>
            ) : null}
            {hasWeeklyActivity ? (
                <WeeklyActivityCard records={dashboard.weeklyActivity} />
            ) : null}
            {hasMistakeBreakdown ? (
                <MistakeBreakdownCard records={dashboard.mistakeBreakdown} />
            ) : null}
            <AchievementsCard achievements={dashboard.achievements} />
            <ProgressRecommendationCard
                onPress={handleRecommendationPress}
                recommendation={dashboard.recommendation}
            />
            <View style={styles.section}>
                <SectionHeader
                    subtitle="Settings and integration readiness stay visible, but separate from learning progress."
                    title="Status"
                />
                <ReminderPreferencesCard
                    isSaving={progress.isSavingPreferences}
                    onSelectReminderPreset={progress.handleSelectReminderPreset}
                    onToggleReminders={progress.handleToggleReminders}
                    onToggleReviewReminder={progress.handleToggleReviewReminder}
                    preferences={dashboard.notificationPreferences}
                    reminderState={dashboard.reminderState}
                />
                {progress.preferencesError ? (
                    <Surface variant="danger" style={styles.inlineError}>
                        <AppText variant="label" tone="danger">
                            Reminders not saved
                        </AppText>
                        <AppText tone="secondary">
                            {progress.preferencesError}
                        </AppText>
                    </Surface>
                ) : null}
                <BackendAiStatusCard status={dashboard.backendAi} />
                <MonetizationCard
                    monetization={dashboard.monetization}
                    onRequestReward={() => {
                        void progress.handleRequestReward("bonusReviewPack");
                    }}
                    rewardState={progress.rewardState}
                />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create((theme) => ({
    centered: {
        alignItems: "center",
        flexGrow: 1,
        justifyContent: "center",
    },
    content: {
        gap: theme.spacing.lg,
        paddingBottom: theme.spacing["3xl"],
    },
    inlineError: {
        gap: theme.spacing.xs,
    },
    section: {
        gap: theme.spacing.md,
    },
}));
