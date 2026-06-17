import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, Surface} from "../../../components/common";
import type {LibraryRecords} from "../types/LibraryTypes";

type LibraryOverviewCardProps = {
    records: LibraryRecords;
};

export function LibraryOverviewCard({records}: LibraryOverviewCardProps) {
    return (
        <Surface style={styles.root}>
            <View style={styles.stat}>
                <AppText variant="heading">{records.attempts.length}</AppText>
                <AppText tone="secondary">Attempts</AppText>
            </View>
            <View style={styles.stat}>
                <AppText variant="heading">{records.savedWords.length}</AppText>
                <AppText tone="secondary">Words</AppText>
            </View>
            <View style={styles.stat}>
                <AppText variant="heading">
                    {records.savedSentences.length}
                </AppText>
                <AppText tone="secondary">Sentences</AppText>
            </View>
            <View style={styles.stat}>
                <AppText variant="heading">{records.dueReviewCount}</AppText>
                <AppText tone="secondary">Due</AppText>
            </View>
        </Surface>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: theme.spacing.md,
    },
    stat: {
        flexBasis: "45%",
        flexGrow: 1,
        gap: theme.spacing.xs,
    },
}));
