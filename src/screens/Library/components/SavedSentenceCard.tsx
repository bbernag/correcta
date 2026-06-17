import {StyleSheet} from "react-native-unistyles";

import {AppText, Button, Surface} from "../../../components/common";
import type {LibrarySavedSentenceRecord} from "../types/LibraryTypes";

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
            <AppText variant="heading">{record.sourceText}</AppText>
            <AppText tone="secondary">{record.translation}</AppText>
            <AppText variant="caption" tone="muted">
                {record.reasonLabel} · {record.dateLabel}
            </AppText>
            <Button
                accessibilityLabel={`Remove saved sentence ${record.sourceText}`}
                label="Remove sentence"
                loading={isPending}
                onPress={handleRemove}
                variant="ghost"
            />
        </Surface>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        gap: theme.spacing.sm,
    },
}));
