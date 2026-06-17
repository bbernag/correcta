import type {NativeBottomTabScreenProps} from "@bottom-tabs/react-navigation";
import {ActivityIndicator, View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, Button, Screen, Surface} from "../../components/common";
import type {MainTabParamList} from "../../router/types";
import {AnswerComposer} from "./components/AnswerComposer";
import {FeedbackPanel} from "./components/FeedbackPanel";
import {InputModeControl} from "./components/InputModeControl";
import {PracticeProgressHeader} from "./components/PracticeProgressHeader";
import {SentencePromptCard} from "./components/SentencePromptCard";
import {SessionSummaryCard} from "./components/SessionSummaryCard";
import {usePracticeSession} from "./hooks/usePracticeSession";

type PracticeScreenProps = NativeBottomTabScreenProps<
    MainTabParamList,
    "Practice"
>;

export function PracticeScreen({route}: PracticeScreenProps) {
    const practice = usePracticeSession({
        restartKey: route.params?.restartKey,
    });
    const {currentSentence, error, phase, result, sessionState, summaryState} =
        practice;
    const isChecking = phase === "checking";
    const canSubmit =
        practice.currentAnswer.trim().length > 0 &&
        phase !== "checking" &&
        phase !== "feedback";

    if (phase === "loading" && !sessionState) {
        return (
            <Screen contentContainerStyle={styles.centered}>
                <ActivityIndicator
                    accessibilityLabel="Loading practice session"
                    size="large"
                />
                <AppText variant="heading">Preparing practice</AppText>
                <AppText tone="secondary">
                    Loading your local sentence queue.
                </AppText>
            </Screen>
        );
    }

    if (phase === "error") {
        return (
            <Screen>
                <AppText variant="title">Practice</AppText>
                <Surface variant="outline" style={styles.section}>
                    <AppText variant="heading" tone="danger">
                        Session unavailable
                    </AppText>
                    <AppText tone="secondary">
                        {error ?? "Practice could not be loaded."}
                    </AppText>
                    <Button
                        label="Try again"
                        onPress={practice.handleRestart}
                    />
                </Surface>
            </Screen>
        );
    }

    if (phase === "summary" && summaryState) {
        return (
            <Screen>
                <SessionSummaryCard
                    onRestart={practice.handleRestart}
                    summaryState={summaryState}
                />
            </Screen>
        );
    }

    if (!sessionState || !currentSentence) {
        return (
            <Screen>
                <AppText variant="title">Practice</AppText>
                <Surface variant="muted">
                    <AppText tone="secondary">
                        No practice prompt is ready.
                    </AppText>
                </Surface>
            </Screen>
        );
    }

    const hasHiddenHints =
        practice.revealedHintCount < currentSentence.hints.length;
    const isLastSentence =
        sessionState.currentIndex === sessionState.sentences.length - 1;

    return (
        <Screen>
            <PracticeProgressHeader
                currentIndex={sessionState.currentIndex}
                inputMode={sessionState.inputMode}
                preferences={sessionState.preferences}
                totalCount={sessionState.sentences.length}
            />
            <SentencePromptCard
                revealedHintCount={practice.revealedHintCount}
                sentence={currentSentence}
            />
            {phase === "answering" || (isChecking && !result) ? (
                <>
                    <InputModeControl
                        onChange={practice.handleSelectInputMode}
                        value={sessionState.inputMode}
                    />
                    <AnswerComposer
                        answerText={practice.answerText}
                        inputMode={sessionState.inputMode}
                        onChangeAnswer={practice.handleChangeAnswer}
                        onClearBuilder={practice.handleClearBuilder}
                        onRemoveWord={practice.handleRemoveWord}
                        onSelectWord={practice.handleSelectWord}
                        remainingWordBankItems={practice.remainingWordBankItems}
                        selectedWordBankItems={practice.selectedWordBankItems}
                    />
                    {error ? (
                        <Surface variant="outline">
                            <AppText variant="label" tone="danger">
                                Check failed
                            </AppText>
                            <AppText tone="secondary">{error}</AppText>
                        </Surface>
                    ) : null}
                    <View style={styles.actions}>
                        <Button
                            disabled={!canSubmit}
                            fullWidth
                            label="Submit answer"
                            loading={isChecking}
                            onPress={practice.handleSubmitAnswer}
                        />
                        <Button
                            disabled={isChecking}
                            label="Skip"
                            onPress={practice.handleSkip}
                            variant="secondary"
                        />
                        {hasHiddenHints ? (
                            <Button
                                disabled={isChecking}
                                label="Show hint"
                                onPress={practice.handleShowHint}
                                variant="ghost"
                            />
                        ) : null}
                    </View>
                </>
            ) : null}
            {result ? (
                <FeedbackPanel
                    isContinuing={isChecking}
                    isLastSentence={isLastSentence}
                    isSavingSentence={practice.isSavingSentence}
                    isSavingWord={practice.isSavingWord}
                    onContinue={practice.handleContinue}
                    onRetry={practice.handleRetry}
                    onSaveSentence={practice.handleSaveSentence}
                    onSaveWord={practice.handleSaveWord}
                    result={result}
                />
            ) : null}
        </Screen>
    );
}

const styles = StyleSheet.create((theme) => ({
    actions: {
        gap: theme.spacing.sm,
    },
    centered: {
        alignItems: "center",
        flexGrow: 1,
        justifyContent: "center",
    },
    section: {
        gap: theme.spacing.md,
    },
}));
