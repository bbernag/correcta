import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, Chip, Surface} from "../../../components/common";
import type {LibraryMistakeGroupRecord} from "../types/libraryTypes";

type MistakeNotebookCardProps = {
    record: LibraryMistakeGroupRecord;
};

export function MistakeNotebookCard({record}: MistakeNotebookCardProps) {
    return (
        <Surface variant="muted" style={styles.root}>
            <AppText variant="heading">{record.label}</AppText>
            <View style={styles.metaRow}>
                <Chip
                    icon="mistake"
                    label={record.countLabel}
                    size="small"
                    variant="warning"
                />
                <Chip
                    icon="warning"
                    label={record.statusLabel}
                    size="small"
                    variant={record.statusVariant}
                />
                <Chip
                    icon="time"
                    label={`Last seen ${record.latestDateLabel}`}
                    size="small"
                    variant="neutral"
                />
            </View>
        </Surface>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        gap: theme.spacing.sm,
    },
    metaRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: theme.spacing.sm,
    },
}));
