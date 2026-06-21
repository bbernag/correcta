import type {NativeBottomTabScreenProps} from "@bottom-tabs/react-navigation";
import {StyleSheet} from "react-native-unistyles";

import {
    AppText,
    Button,
    EmptyState,
    ErrorState,
    LoadingState,
    Screen,
    Surface,
} from "../../components/common";
import type {MainTabParamList} from "../../router/types";
import {FeedbackPanel} from "./components/FeedbackPanel";
import {PracticeActionBar} from "./components/PracticeActionBar";
import {PracticeHeader} from "./components/PracticeHeader";
import {SentencePromptCard} from "./components/SentencePromptCard";
import {SessionSummaryCard} from "./components/SessionSummaryCard";
import {TranslationInputPanel} from "./components/TranslationInputPanel";
import {usePracticeViewModel} from "./hooks/usePracticeViewModel";

type PracticeScreenProps = NativeBottomTabScreenProps<
    MainTabParamList,
    "Practice"
>;

export function PracticeScreen({route}: PracticeScreenProps) {
    const practice = usePracticeViewModel({
        restartKey: route.params?.restartKey,
        retrySentenceId: route.params?.retrySentenceId,
    });
    const {currentSentence, error, phase, result, sessionState, summaryState} =
        practice;

    if (practice.isLoadingInitial) {
        return (
            <Screen contentContainerStyle={styles.centered}>
                <LoadingState
                    message="Loading your local sentence queue."
                    title="Preparing practice"
                />
            </Screen>
        );
    }

    if (phase === "error") {
        return (
            <Screen>
                <AppText variant="title">Practice</AppText>
                <ErrorState
                    message={error ?? "Practice could not be loaded."}
                    onRetry={practice.handleRestart}
                    retryLabel="Try again"
                    title="Session unavailable"
                />
            </Screen>
        );
    }

    if (practice.showSummary && summaryState) {
        return (
            <Screen>
                <SessionSummaryCard
                    onRestart={practice.handleRestart}
                    summaryState={summaryState}
                />
            </Screen>
        );
    }

    if (practice.isSessionUnavailable || !sessionState || !currentSentence) {
        return (
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
        );
    }

    return (
        <Screen contentContainerStyle={styles.content}>
            <PracticeHeader
                currentIndex={sessionState.currentIndex}
                inputMode={sessionState.inputMode}
                preferences={sessionState.preferences}
                totalCount={sessionState.sentences.length}
            />
            {practice.isAnswering ? (
                <>
                    <SentencePromptCard
                        revealedHintCount={practice.revealedHintCount}
                        sentence={currentSentence}
                    />
                    <TranslationInputPanel
                        answerText={practice.answerText}
                        disabled={practice.isChecking}
                        inputMode={sessionState.inputMode}
                        onChangeAnswer={practice.handleChangeAnswer}
                        onClearBuilder={practice.handleClearBuilder}
                        onRemoveWord={practice.handleRemoveWord}
                        onSelectInputMode={practice.handleSelectInputMode}
                        onSelectWord={practice.handleSelectWord}
                        selectedItemIds={practice.selectedItemIds}
                        selectedWordBankItems={practice.selectedWordBankItems}
                        wordBankItems={practice.wordBankItems}
                    />
                    {error ? (
                        <Surface variant="danger" style={styles.section}>
                            <AppText variant="label" tone="danger">
                                Check failed
                            </AppText>
                            <AppText tone="secondary">{error}</AppText>
                        </Surface>
                    ) : null}
                    <PracticeActionBar
                        canSubmit={practice.canSubmit}
                        hasHiddenHints={practice.hasHiddenHints}
                        isChecking={practice.isChecking}
                        onShowHint={practice.handleShowHint}
                        onSkip={practice.handleSkip}
                        onSubmitAnswer={practice.handleSubmitAnswer}
                    />
                </>
            ) : null}
            {result ? (
                <>
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
                        sourceText={currentSentence.sourceText}
                    />
                </>
            ) : null}
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
        paddingBottom: 72,
    },
    section: {
        gap: theme.spacing.md,
    },
}));
