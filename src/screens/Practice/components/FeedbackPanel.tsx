import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {
    AnimatedMount,
    AppText,
    Button,
    Surface,
} from "../../../components/common";
import type {PracticeResult} from "../types/practiceTypes";
import {AcceptedAlternatives} from "./AcceptedAlternatives";
import {MistakeHighlights} from "./MistakeHighlights";
import {ResultBanner} from "./ResultBanner";

type FeedbackPanelProps = {
    isContinuing: boolean;
    isLastSentence: boolean;
    isSavingSentence: boolean;
    isSavingWord: boolean;
    onContinue: () => void;
    onRetry: () => void;
    onSaveSentence: () => void;
    onSaveWord: () => void;
    result: PracticeResult;
    saveError?: string | null;
    sourceText: string;
};

export function FeedbackPanel({
    isContinuing,
    isLastSentence,
    isSavingSentence,
    isSavingWord,
    onContinue,
    onRetry,
    onSaveSentence,
    onSaveWord,
    result,
    saveError,
    sourceText,
}: FeedbackPanelProps) {
    const hasSavedWord =
        Boolean(result.savedWordId) || result.attempt.savedWordIds.length > 0;
    const hasSavedSentence =
        Boolean(result.savedSentenceId) ||
        result.attempt.savedSentenceIds.length > 0;

    return (
        <View style={styles.root}>
            <ResultBanner result={result} />
            <AnimatedMount delayMs={60}>
                <AcceptedAlternatives
                    acceptedTranslations={
                        result.validation.acceptedTranslations
                    }
                    preferredAnswer={result.validation.preferredAnswer}
                    sourceText={sourceText}
                    userAnswer={result.validation.userAnswer}
                />
            </AnimatedMount>
            <Surface variant="card" style={styles.actions}>
                <View style={styles.secondaryActions}>
                    <Button
                        disabled={hasSavedWord || isContinuing}
                        label={hasSavedWord ? "Word saved" : "Save word"}
                        leadingIcon={hasSavedWord ? "saved" : "save"}
                        loading={isSavingWord}
                        onPress={onSaveWord}
                        style={styles.secondaryAction}
                        variant="secondary"
                    />
                    <Button
                        disabled={hasSavedSentence || isContinuing}
                        label={
                            hasSavedSentence
                                ? "Sentence saved"
                                : "Save sentence"
                        }
                        leadingIcon={hasSavedSentence ? "saved" : "sentence"}
                        loading={isSavingSentence}
                        onPress={onSaveSentence}
                        style={styles.secondaryAction}
                        variant="secondary"
                    />
                </View>
                <View style={styles.primaryActions}>
                    {result.validation.canRetry ? (
                        <Button
                            disabled={isContinuing}
                            label="Retry"
                            leadingIcon="clear"
                            onPress={onRetry}
                            style={styles.retryAction}
                            variant="ghost"
                        />
                    ) : null}
                    <Button
                        label={isLastSentence ? "Show summary" : "Next prompt"}
                        loading={isContinuing}
                        onPress={onContinue}
                        style={styles.continueAction}
                        trailingIcon="check"
                    />
                </View>
            </Surface>
            {saveError ? (
                <Surface variant="danger" style={styles.saveError}>
                    <AppText variant="label" tone="danger">
                        Save failed
                    </AppText>
                    <AppText tone="secondary">{saveError}</AppText>
                </Surface>
            ) : null}
            <AnimatedMount delayMs={120}>
                <MistakeHighlights mistakes={result.validation.mistakes} />
            </AnimatedMount>
        </View>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        gap: theme.spacing.md,
    },
    actions: {
        gap: theme.spacing.md,
    },
    continueAction: {
        flex: 1,
    },
    primaryActions: {
        flexDirection: "row",
        gap: theme.spacing.sm,
    },
    retryAction: {
        minWidth: 92,
    },
    saveError: {
        gap: theme.spacing.xs,
    },
    secondaryAction: {
        flex: 1,
        minWidth: 132,
    },
    secondaryActions: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: theme.spacing.sm,
    },
}));
