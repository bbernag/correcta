import {StyleSheet} from "react-native-unistyles";

import {AppText, Button, Surface} from "../../../components/common";
import type {LibrarySavedWordRecord} from "../types/libraryTypes";

type SavedWordCardProps = {
    isPending: boolean;
    onRemove: (savedWordId: string) => void;
    record: LibrarySavedWordRecord;
};

export function SavedWordCard({
    isPending,
    onRemove,
    record,
}: SavedWordCardProps) {
    function handleRemove() {
        onRemove(record.id);
    }

    return (
        <Surface variant="outline" style={styles.root}>
            <AppText variant="heading">{record.text}</AppText>
            <AppText tone="secondary">{record.translation}</AppText>
            <AppText variant="caption" tone="muted">
                {record.noteLabel} · {record.masteryLabel} · {record.dateLabel}
            </AppText>
            <Button
                accessibilityLabel={`Remove saved word ${record.text}`}
                label="Remove word"
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
