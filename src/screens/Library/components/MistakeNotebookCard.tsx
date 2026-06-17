import {StyleSheet} from "react-native-unistyles";

import {AppText, Surface} from "../../../components/common";
import type {LibraryMistakeGroupRecord} from "../types/LibraryTypes";

type MistakeNotebookCardProps = {
    record: LibraryMistakeGroupRecord;
};

export function MistakeNotebookCard({record}: MistakeNotebookCardProps) {
    return (
        <Surface variant="muted" style={styles.root}>
            <AppText variant="heading">{record.label}</AppText>
            <AppText tone="secondary">
                {record.countLabel} · {record.statusLabel}
            </AppText>
            <AppText variant="caption" tone="muted">
                Last seen {record.latestDateLabel}
            </AppText>
        </Surface>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        gap: theme.spacing.sm,
    },
}));
