import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {
    AnimatedCounter,
    AppText,
    Button,
    Surface,
} from "../../../components/common";
import {getAccuracyLabel} from "../utils/practiceUtils";
import type {PracticeSessionSummaryState} from "../types/practiceTypes";

type SessionSummaryCardProps = {
    onRestart: () => void;
    summaryState: PracticeSessionSummaryState;
};

export function SessionSummaryCard({
    onRestart,
    summaryState,
}: SessionSummaryCardProps) {
    const {summary} = summaryState;

    return (
        <Surface style={styles.root}>
            <AppText variant="label" tone="accent">
                Session complete
            </AppText>
            <AppText accessibilityRole="header" variant="title">
                Practice summary
            </AppText>
            <AppText tone="secondary">
                {summaryState.sentences.length} prompts completed
            </AppText>
            <View style={styles.metrics}>
                <View style={styles.metric}>
                    <AppText variant="heading">
                        {getAccuracyLabel(summary)}
                    </AppText>
                    <AppText variant="caption" tone="secondary">
                        Accuracy
                    </AppText>
                </View>
                <View style={styles.metric}>
                    <AnimatedCounter
                        value={summary.correctCount}
                        variant="heading"
                    />
                    <AppText variant="caption" tone="secondary">
                        Correct
                    </AppText>
                </View>
                <View style={styles.metric}>
                    <AnimatedCounter
                        value={summary.almostCorrectCount}
                        variant="heading"
                    />
                    <AppText variant="caption" tone="secondary">
                        Almost
                    </AppText>
                </View>
                <View style={styles.metric}>
                    <AnimatedCounter
                        value={summary.incorrectCount}
                        variant="heading"
                    />
                    <AppText variant="caption" tone="secondary">
                        Review
                    </AppText>
                </View>
                <View style={styles.metric}>
                    <AnimatedCounter
                        value={summary.skippedCount}
                        variant="heading"
                    />
                    <AppText variant="caption" tone="secondary">
                        Skipped
                    </AppText>
                </View>
                <View style={styles.metric}>
                    <AnimatedCounter
                        value={
                            summary.savedWordCount + summary.savedSentenceCount
                        }
                        variant="heading"
                    />
                    <AppText variant="caption" tone="secondary">
                        Saved
                    </AppText>
                </View>
            </View>
            <Button label="Start another session" onPress={onRestart} />
        </Surface>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        gap: theme.spacing.lg,
    },
    metrics: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: theme.spacing.sm,
    },
    metric: {
        backgroundColor: theme.colors.surfaceTonal,
        borderRadius: theme.radii.sm,
        flexBasis: "48%",
        gap: theme.spacing.xs,
        padding: theme.spacing.md,
    },
}));
