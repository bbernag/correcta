import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, Button, Surface} from "../../../components/common";
import type {LibraryAttemptRecord} from "../types/libraryTypes";

type HistoryAttemptCardProps = {
    isPending: boolean;
    onRemoveSavedSentence: (savedSentenceId: string) => void;
    onRetry: (record: LibraryAttemptRecord) => void;
    onSaveSentence: (record: LibraryAttemptRecord) => void;
    record: LibraryAttemptRecord;
};

export function HistoryAttemptCard({
    isPending,
    onRemoveSavedSentence,
    onRetry,
    onSaveSentence,
    record,
}: HistoryAttemptCardProps) {
    function handleRetry() {
        onRetry(record);
    }

    function handleSavePress() {
        if (record.savedSentenceId) {
            onRemoveSavedSentence(record.savedSentenceId);
            return;
        }

        onSaveSentence(record);
    }

    return (
        <Surface style={styles.root}>
            <View style={styles.metaRow}>
                <AppText variant="label" tone={record.statusTone}>
                    {record.statusLabel}
                </AppText>
                <AppText variant="caption" tone="muted">
                    {record.dateLabel} · {record.scoreLabel}
                </AppText>
            </View>
            <AppText variant="heading">{record.sourceText}</AppText>
            <View style={styles.detailGroup}>
                <AppText variant="label">Your answer</AppText>
                <AppText tone="secondary">{record.answerText}</AppText>
            </View>
            <View style={styles.detailGroup}>
                <AppText variant="label">Best translation</AppText>
                <AppText tone="secondary">
                    {record.preferredTranslation}
                </AppText>
            </View>
            <AppText variant="caption" tone="muted">
                {record.topicLabel} · {record.levelLabel} ·{" "}
                {record.inputModeLabel}
            </AppText>
            <AppText variant="caption" tone="muted">
                {record.mistakeLabel}
            </AppText>
            <View style={styles.actions}>
                <Button
                    accessibilityLabel={`Retry ${record.sourceText}`}
                    label="Retry"
                    onPress={handleRetry}
                    variant="secondary"
                />
                <Button
                    accessibilityLabel={
                        record.isSaved
                            ? `Remove saved sentence ${record.sourceText}`
                            : `Save sentence ${record.sourceText}`
                    }
                    disabled={!record.canSaveSentence}
                    label={record.isSaved ? "Remove saved" : "Save sentence"}
                    loading={isPending}
                    onPress={handleSavePress}
                    variant={record.isSaved ? "ghost" : "primary"}
                />
            </View>
        </Surface>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        gap: theme.spacing.md,
    },
    metaRow: {
        alignItems: "center",
        flexDirection: "row",
        gap: theme.spacing.sm,
        justifyContent: "space-between",
    },
    detailGroup: {
        gap: theme.spacing.xs,
    },
    actions: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: theme.spacing.sm,
    },
}));
