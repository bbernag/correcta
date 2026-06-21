import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {Button, Surface} from "../../../components/common";
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
            <AcceptedAlternatives
                acceptedTranslations={result.validation.acceptedTranslations}
                preferredAnswer={result.validation.preferredAnswer}
                sourceText={sourceText}
                userAnswer={result.validation.userAnswer}
            />
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
            <MistakeHighlights mistakes={result.validation.mistakes} />
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
