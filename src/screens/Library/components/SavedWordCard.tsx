import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, Button, Chip, Surface} from "../../../components/common";
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
            <View style={styles.metaRow}>
                <Chip
                    icon="goal"
                    label={record.masteryLabel}
                    size="small"
                    variant={record.masteryVariant}
                />
                {record.mistakeLabel ? (
                    <Chip
                        icon="mistake"
                        label={record.mistakeLabel}
                        size="small"
                        variant="warning"
                    />
                ) : null}
            </View>
            <View style={styles.copy}>
                <AppText variant="heading">{record.text}</AppText>
                <AppText tone="secondary">{record.translation}</AppText>
            </View>
            <View style={styles.metaRow}>
                <Chip
                    icon="save"
                    label={record.dateLabel}
                    size="small"
                    variant="neutral"
                />
                <Chip
                    icon="review"
                    label={record.reviewLabel}
                    size="small"
                    variant="neutral"
                />
            </View>
            <Button
                accessibilityLabel={`Remove saved word ${record.text}`}
                leadingIcon="close"
                label="Remove word"
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
        gap: theme.spacing.xs,
    },
    metaRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: theme.spacing.sm,
    },
}));
