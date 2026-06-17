import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, Button, Surface} from "../../../components/common";
import {
    formatScore,
    getStatusLabel,
    getStatusTone,
} from "../utils/PracticeUtils";
import type {PracticeResult} from "../types/PracticeTypes";

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
}: FeedbackPanelProps) {
    const hasSavedWord =
        Boolean(result.savedWordId) || result.attempt.savedWordIds.length > 0;
    const hasSavedSentence =
        Boolean(result.savedSentenceId) ||
        result.attempt.savedSentenceIds.length > 0;

    return (
        <Surface style={styles.root} variant="outline">
            <View style={styles.header}>
                <AppText
                    variant="heading"
                    tone={getStatusTone(result.validation.status)}
                >
                    {getStatusLabel(result.validation.status)}
                </AppText>
                <AppText variant="label" tone="secondary">
                    {formatScore(result.validation.score)}
                </AppText>
            </View>
            <AppText>{result.feedback.simpleExplanation}</AppText>
            <AppText tone="secondary">{result.feedback.explanation}</AppText>
            <View style={styles.answerBlock}>
                <AppText variant="label">Your answer</AppText>
                <AppText tone="secondary">
                    {result.validation.userAnswer || "Skipped"}
                </AppText>
                <AppText variant="label">Accepted answer</AppText>
                <AppText tone="secondary">
                    {result.validation.preferredAnswer}
                </AppText>
            </View>
            {result.validation.mistakes.length > 0 ? (
                <View style={styles.answerBlock}>
                    <AppText variant="label">Review focus</AppText>
                    {result.validation.mistakes.map((mistake) => {
                        return (
                            <AppText key={mistake.id} tone="secondary">
                                {mistake.explanation}
                            </AppText>
                        );
                    })}
                </View>
            ) : null}
            <View style={styles.actions}>
                <Button
                    disabled={hasSavedWord || isContinuing}
                    label={hasSavedWord ? "Word saved" : "Save word"}
                    loading={isSavingWord}
                    onPress={onSaveWord}
                    variant="secondary"
                />
                <Button
                    disabled={hasSavedSentence || isContinuing}
                    label={
                        hasSavedSentence ? "Sentence saved" : "Save sentence"
                    }
                    loading={isSavingSentence}
                    onPress={onSaveSentence}
                    variant="secondary"
                />
                {result.validation.canRetry ? (
                    <Button
                        disabled={isContinuing}
                        label="Retry"
                        onPress={onRetry}
                        variant="ghost"
                    />
                ) : null}
                <Button
                    fullWidth
                    label={isLastSentence ? "Show summary" : "Next prompt"}
                    loading={isContinuing}
                    onPress={onContinue}
                />
            </View>
        </Surface>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        gap: theme.spacing.md,
    },
    header: {
        alignItems: "flex-start",
        gap: theme.spacing.xs,
    },
    answerBlock: {
        borderTopColor: theme.colors.border,
        borderTopWidth: 1,
        gap: theme.spacing.xs,
        paddingTop: theme.spacing.md,
    },
    actions: {
        gap: theme.spacing.sm,
    },
}));
