import type {NativeStackScreenProps} from "@react-navigation/native-stack";
import {type AccessibilityActionEvent, View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {
    AnimatedMount,
    AppText,
    Button,
    EmptyState,
    ErrorState,
    LoadingState,
    Screen,
    Surface,
} from "../../components/common";
import {useKeyboardVisible} from "../../hooks/useKeyboardVisible";
import type {RootStackParamList} from "../../router/types";
import {FeedbackPanel} from "./components/FeedbackPanel";
import {PracticeActionBar} from "./components/PracticeActionBar";
import {PracticeCorrectToastOverlay} from "./components/PracticeCorrectToastOverlay";
import {PracticeHeader} from "./components/PracticeHeader";
import {PracticeStatusToastOverlay} from "./components/PracticeStatusToastOverlay";
import {PracticeSwipeSurface} from "./components/PracticeSwipeSurface";
import {SentencePromptCard} from "./components/SentencePromptCard";
import {SessionSummaryCard} from "./components/SessionSummaryCard";
import {TranslationInputPanel} from "./components/TranslationInputPanel";
import {usePracticeSkipHint} from "./hooks/usePracticeSkipHint";
import {usePracticeSwipeNavigation} from "./hooks/usePracticeSwipeNavigation";
import {usePracticeViewModel} from "./hooks/usePracticeViewModel";

type PracticeScreenProps = NativeStackScreenProps<
    RootStackParamList,
    "PracticeSession"
>;

export function PracticeScreen({navigation, route}: PracticeScreenProps) {
    const practice = usePracticeViewModel({
        restartKey: route.params?.restartKey,
        retrySentenceId: route.params?.retrySentenceId,
    });
    const {currentSentence, error, phase, result, sessionState, summaryState} =
        practice;
    const isKeyboardVisible = useKeyboardVisible();
    const swipeNavigation = usePracticeSwipeNavigation({
        isChecking: practice.isChecking,
        onContinue: practice.handleContinue,
        onRetry: practice.handleRetry,
        onSkip: practice.handleSkip,
        phase,
        result,
    });
    const skipHint = usePracticeSkipHint({
        answerText: practice.answerText,
        canSkip: swipeNavigation.canSwipeLeft,
        keyboardVisible: isKeyboardVisible,
        phase,
        selectedItemCount: practice.selectedItemIds.length,
    });

    function handleCloseSession() {
        if (navigation.canGoBack()) {
            navigation.goBack();
            return;
        }

        navigation.navigate("MainTabs", {screen: "Practice"});
    }

    function handleAnsweringAccessibilityAction(
        event: AccessibilityActionEvent
    ) {
        if (event.nativeEvent.actionName === "skip") {
            void practice.handleSkip();
        }
    }

    function renderSessionToasts() {
        return (
            <>
                <PracticeCorrectToastOverlay
                    durationMs={practice.correctToastDurationMs}
                    onDismiss={practice.dismissCorrectAnswerToast}
                    onSaveSentence={practice.handleSaveCorrectAnswerToast}
                    toastId={practice.correctAnswerToast?.id ?? null}
                />
                <PracticeStatusToastOverlay
                    onDismiss={practice.dismissStatusToast}
                    toast={practice.statusToast}
                />
            </>
        );
    }

    if (practice.isLoadingInitial) {
        return (
            <View style={styles.screenRoot}>
                <Screen contentContainerStyle={styles.centered}>
                    <LoadingState
                        message="Loading your local sentence queue."
                        title="Preparing practice"
                    />
                </Screen>
                {renderSessionToasts()}
            </View>
        );
    }

    if (phase === "error") {
        return (
            <View style={styles.screenRoot}>
                <Screen>
                    <AppText variant="title">Practice</AppText>
                    <ErrorState
                        message={error ?? "Practice could not be loaded."}
                        onRetry={practice.handleRestart}
                        retryLabel="Try again"
                        title="Session unavailable"
                    />
                </Screen>
                {renderSessionToasts()}
            </View>
        );
    }

    if (practice.showSummary && summaryState) {
        return (
            <View style={styles.screenRoot}>
                <Screen>
                    <AnimatedMount>
                        <SessionSummaryCard
                            onClose={handleCloseSession}
                            onRestart={practice.handleRestart}
                            summaryState={summaryState}
                        />
                    </AnimatedMount>
                </Screen>
                {renderSessionToasts()}
            </View>
        );
    }

    if (practice.isSessionUnavailable || !sessionState || !currentSentence) {
        return (
            <View style={styles.screenRoot}>
                <Screen>
                    <AppText variant="title">Practice</AppText>
                    <EmptyState
                        action={
                            <Button
                                label="Restart practice"
                                onPress={practice.handleRestart}
                            />
                        }
                        icon="practice"
                        message="Restart the local practice queue to load the next sentence."
                        title="No practice prompt is ready"
                    />
                </Screen>
                {renderSessionToasts()}
            </View>
        );
    }

    const activeSentence = currentSentence;
    const activeSessionState = sessionState;

    function renderAnsweringContent() {
        if (!practice.isAnswering) {
            return null;
        }

        return (
            <View style={styles.answeringSurface}>
                <SentencePromptCard
                    revealedHintCount={practice.revealedHintCount}
                    sentence={activeSentence}
                />
                <TranslationInputPanel
                    answerText={practice.answerText}
                    canSubmit={practice.canSubmit}
                    disabled={practice.isChecking}
                    inputMode={activeSessionState.inputMode}
                    isChecking={practice.isChecking}
                    onChangeAnswer={practice.handleChangeAnswer}
                    onClearBuilder={practice.handleClearBuilder}
                    onRemoveWord={practice.handleRemoveWord}
                    onSelectInputMode={practice.handleSelectInputMode}
                    onSelectWord={practice.handleSelectWord}
                    onSubmitAnswer={practice.handleSubmitAnswer}
                    selectedItemIds={practice.selectedItemIds}
                    selectedWordBankItems={practice.selectedWordBankItems}
                    wordBankItems={practice.wordBankItems}
                />
                {error ? (
                    <AnimatedMount>
                        <Surface variant="danger" style={styles.section}>
                            <AppText variant="label" tone="danger">
                                Check failed
                            </AppText>
                            <AppText tone="secondary">{error}</AppText>
                        </Surface>
                    </AnimatedMount>
                ) : null}
                <PracticeActionBar
                    hasHiddenHints={practice.hasHiddenHints}
                    isChecking={practice.isChecking}
                    onShowHint={practice.handleShowHint}
                />
            </View>
        );
    }

    function renderSessionScreen() {
        return (
            <Screen contentContainerStyle={styles.content}>
                <PracticeHeader
                    currentIndex={activeSessionState.currentIndex}
                    onClose={handleCloseSession}
                    preferences={activeSessionState.preferences}
                    totalCount={activeSessionState.sentences.length}
                />
                {practice.isAnswering ? (
                    <PracticeSwipeSurface
                        accessibilityActions={[
                            {label: "Skip sentence", name: "skip"},
                        ]}
                        accessibilityHint="Swipe left to skip this sentence."
                        accessibilityLabel="Practice answer area"
                        animateLeftExit
                        canSwipeLeft={
                            swipeNavigation.canSwipeLeft && !isKeyboardVisible
                        }
                        canSwipeRight={swipeNavigation.canSwipeRight}
                        nudgeToken={skipHint.nudgeToken}
                        onAccessibilityAction={
                            handleAnsweringAccessibilityAction
                        }
                        onInteract={skipHint.dismissSkipHint}
                        onSwipeLeft={swipeNavigation.handleSwipeLeft}
                        onSwipeRight={swipeNavigation.handleSwipeRight}
                        revealSkipOnDragLeft={
                            swipeNavigation.canSwipeLeft && !isKeyboardVisible
                        }
                        showNextCardPeek={!practice.isLastSentence}
                        skipHintVisible={skipHint.skipHintVisible}
                        style={styles.answeringSwipeSurface}
                    >
                        {renderAnsweringContent()}
                    </PracticeSwipeSurface>
                ) : (
                    renderAnsweringContent()
                )}
                {result ? (
                    <PracticeSwipeSurface
                        canSwipeLeft={swipeNavigation.canSwipeLeft}
                        canSwipeRight={swipeNavigation.canSwipeRight}
                        onSwipeLeft={swipeNavigation.handleSwipeLeft}
                        onSwipeRight={swipeNavigation.handleSwipeRight}
                    >
                        {error ? (
                            <Surface variant="danger" style={styles.section}>
                                <AppText variant="label" tone="danger">
                                    Summary unavailable
                                </AppText>
                                <AppText tone="secondary">{error}</AppText>
                            </Surface>
                        ) : null}
                        <FeedbackPanel
                            isContinuing={practice.isChecking}
                            isLastSentence={practice.isLastSentence}
                            isSavingSentence={practice.isSavingSentence}
                            isSavingWord={practice.isSavingWord}
                            onContinue={practice.handleContinue}
                            onRetry={practice.handleRetry}
                            onSaveSentence={practice.handleSaveSentence}
                            onSaveWord={practice.handleSaveWord}
                            result={result}
                            saveError={practice.saveError}
                            sourceText={activeSentence.sourceText}
                        />
                    </PracticeSwipeSurface>
                ) : null}
            </Screen>
        );
    }

    return (
        <View style={styles.screenRoot}>
            {renderSessionScreen()}
            {renderSessionToasts()}
        </View>
    );
}

const styles = StyleSheet.create((theme) => ({
    screenRoot: {
        flex: 1,
    },
    centered: {
        alignItems: "center",
        flexGrow: 1,
        justifyContent: "center",
    },
    content: {
        gap: theme.spacing.lg,
        paddingBottom: 72,
    },
    answeringSurface: {
        gap: theme.spacing.lg,
    },
    answeringSwipeSurface: {
        width: "100%",
    },
    section: {
        gap: theme.spacing.md,
    },
}));
