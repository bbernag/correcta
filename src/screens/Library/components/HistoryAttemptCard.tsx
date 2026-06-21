import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {
    AppText,
    Button,
    Chip,
    ResultBadge,
    Surface,
} from "../../../components/common";
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
                <ResultBadge
                    label={record.statusLabel}
                    tone={record.resultTone}
                />
                <Chip
                    icon="time"
                    label={record.dateLabel}
                    size="small"
                    variant="neutral"
                />
                <Chip
                    icon="accuracy"
                    label={record.scoreLabel}
                    size="small"
                    variant="info"
                />
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
            <View style={styles.chipRow}>
                <Chip
                    icon="library"
                    label={record.topicLabel}
                    size="small"
                    variant="neutral"
                />
                <Chip
                    icon="goal"
                    label={record.levelLabel}
                    size="small"
                    variant="neutral"
                />
                <Chip
                    icon="practice"
                    label={record.inputModeLabel}
                    size="small"
                    variant="neutral"
                />
            </View>
            <View style={styles.chipRow}>
                {record.mistakeLabels.length > 0 ? (
                    record.mistakeLabels.map((mistakeLabel) => {
                        return (
                            <Chip
                                icon="mistake"
                                key={`${record.id}-${mistakeLabel}`}
                                label={mistakeLabel}
                                size="small"
                                variant="warning"
                            />
                        );
                    })
                ) : (
                    <Chip
                        icon="success"
                        label={record.mistakeLabel}
                        size="small"
                        variant="success"
                    />
                )}
            </View>
            <View style={styles.actions}>
                <Button
                    accessibilityLabel={`Retry ${record.sourceText}`}
                    label="Retry"
                    leadingIcon="clear"
                    onPress={handleRetry}
                    size="small"
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
                    leadingIcon={record.isSaved ? "close" : "save"}
                    loading={isPending}
                    onPress={handleSavePress}
                    size="small"
                    variant={record.isSaved ? "danger" : "primary"}
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
        flexWrap: "wrap",
    },
    detailGroup: {
        gap: theme.spacing.xs,
    },
    chipRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: theme.spacing.sm,
    },
    actions: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: theme.spacing.sm,
    },
}));
