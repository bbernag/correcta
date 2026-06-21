import type {CompositeScreenProps} from "@react-navigation/native";
import type {NativeStackScreenProps} from "@react-navigation/native-stack";
import type {NativeBottomTabScreenProps} from "@bottom-tabs/react-navigation";
import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {
    AnimatedMount,
    Button,
    EmptyState,
    ErrorState,
    IconButton,
    LoadingState,
    Screen,
    ScreenHeader,
} from "../../components/common";
import {APP_NAME} from "../../constants/app";
import type {MainTabParamList, RootStackParamList} from "../../router/types";
import {ContinueLearningCard} from "./components/ContinueLearningCard";
import {DailyPracticeHeroCard} from "./components/DailyPracticeHeroCard";
import {QuickStatGrid} from "./components/QuickStatGrid";
import {TeacherTipCard} from "./components/TeacherTipCard";
import {useHomeViewModel} from "./hooks/useHomeViewModel";

type HomeScreenProps = CompositeScreenProps<
    NativeBottomTabScreenProps<MainTabParamList, "Home">,
    NativeStackScreenProps<RootStackParamList>
>;

export function HomeScreen({navigation}: HomeScreenProps) {
    const home = useHomeViewModel();

    function handleStartPractice() {
        navigation.navigate("Practice", {restartKey: Date.now()});
    }

    function handleOpenPlayground() {
        navigation.navigate("ComponentPlayground");
    }

    function handleOpenExpoUiShowcase() {
        navigation.navigate("ExpoUiShowcase");
    }

    function handleOpenReview() {
        navigation.navigate("Review");
    }

    function handleOpenLibrary() {
        navigation.navigate("Library");
    }

    const headerAction = __DEV__ ? (
        <View style={styles.headerActions}>
            <IconButton
                accessibilityLabel="Open component check"
                icon="settings"
                onPress={handleOpenPlayground}
                variant="surface"
            />
            <IconButton
                accessibilityLabel="Open Expo UI showcase"
                icon="info"
                onPress={handleOpenExpoUiShowcase}
                variant="surface"
            />
        </View>
    ) : undefined;

    if (home.phase === "loading") {
        return (
            <Screen>
                <ScreenHeader
                    action={headerAction}
                    eyebrow={APP_NAME}
                    title="Daily practice"
                />
                <LoadingState
                    message="Preparing your practice, review, and progress summary."
                    title="Loading Home"
                />
            </Screen>
        );
    }

    if (home.phase === "error") {
        return (
            <Screen>
                <ScreenHeader
                    action={headerAction}
                    eyebrow={APP_NAME}
                    title="Daily practice"
                />
                <ErrorState
                    message={home.error ?? "Home could not be loaded."}
                    onRetry={home.handleRefresh}
                    retryLabel="Reload Home"
                />
            </Screen>
        );
    }

    if (home.phase === "empty" || !home.dashboard) {
        return (
            <Screen>
                <ScreenHeader
                    action={headerAction}
                    eyebrow={APP_NAME}
                    title="Daily practice"
                />
                <EmptyState
                    action={
                        <Button
                            accessibilityLabel="Reload practice sentences"
                            label="Reload"
                            loading={home.isRefreshing}
                            onPress={home.handleRefresh}
                        />
                    }
                    icon="practice"
                    message="Practice sentences will appear here once the local sentence service has content for your level."
                    title="No practice ready"
                />
            </Screen>
        );
    }

    const {dashboard} = home;

    return (
        <Screen contentContainerStyle={styles.content}>
            <ScreenHeader
                action={headerAction}
                eyebrow={APP_NAME}
                subtitle="Start with one focused translation, then continue from review."
                title="Daily practice"
            />
            <AnimatedMount>
                <DailyPracticeHeroCard
                    hero={dashboard.hero}
                    onStartPractice={handleStartPractice}
                />
            </AnimatedMount>
            <AnimatedMount delayMs={80}>
                <QuickStatGrid stats={dashboard.quickStats} />
            </AnimatedMount>
            <AnimatedMount delayMs={160}>
                <TeacherTipCard tip={dashboard.teacherTip} />
            </AnimatedMount>
            <AnimatedMount delayMs={240}>
                <ContinueLearningCard
                    card={dashboard.continueLearning}
                    onOpenLibrary={handleOpenLibrary}
                    onOpenReview={handleOpenReview}
                />
            </AnimatedMount>
        </Screen>
    );
}

const styles = StyleSheet.create((theme) => ({
    content: {
        gap: theme.spacing.lg,
        paddingBottom: 72,
    },
    headerActions: {
        flexDirection: "row",
        gap: theme.spacing.sm,
    },
}));
