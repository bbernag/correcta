import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, Button, Chip, Surface} from "../../../components/common";
import type {LibrarySavedSentenceRecord} from "../types/libraryTypes";

type SavedSentenceCardProps = {
    isPending: boolean;
    onRemove: (savedSentenceId: string) => void;
    record: LibrarySavedSentenceRecord;
};

export function SavedSentenceCard({
    isPending,
    onRemove,
    record,
}: SavedSentenceCardProps) {
    function handleRemove() {
        onRemove(record.id);
    }

    return (
        <Surface variant="outline" style={styles.root}>
            <View style={styles.metaRow}>
                <Chip
                    icon="saved"
                    label={record.reasonLabel}
                    size="small"
                    variant={record.reasonVariant}
                />
                <Chip
                    icon="save"
                    label={record.dateLabel}
                    size="small"
                    variant="neutral"
                />
            </View>
            <View style={styles.copy}>
                <View style={styles.translationBlock}>
                    <AppText variant="label" tone="muted">
                        Source
                    </AppText>
                    <AppText variant="heading">{record.sourceText}</AppText>
                </View>
                <View style={styles.translationBlock}>
                    <AppText variant="label" tone="muted">
                        Translation
                    </AppText>
                    <AppText tone="secondary">{record.translation}</AppText>
                </View>
            </View>
            <Chip
                icon="review"
                label={record.reviewLabel}
                size="small"
                variant="neutral"
            />
            <Button
                accessibilityLabel={`Remove saved sentence ${record.sourceText}`}
                leadingIcon="close"
                label="Remove sentence"
                loading={isPending}
                onPress={handleRemove}
                size="small"
                variant="danger"
            />
        </Surface>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        gap: theme.spacing.sm,
    },
    copy: {
        gap: theme.spacing.md,
    },
    metaRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: theme.spacing.sm,
    },
    translationBlock: {
        gap: theme.spacing.xs,
    },
}));
