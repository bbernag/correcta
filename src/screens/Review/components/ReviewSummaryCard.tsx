import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {
    AppText,
    ProgressBar,
    StatCard,
    Surface,
} from "../../../components/common";
import type {ReviewSummaryState} from "../types/reviewTypes";

type ReviewSummaryCardProps = {
    summary: ReviewSummaryState;
};

export function ReviewSummaryCard({summary}: ReviewSummaryCardProps) {
    return (
        <Surface variant="card" style={styles.root}>
            <View style={styles.header}>
                <View style={styles.copy}>
                    <AppText variant="label" tone="accent">
                        {summary.activeDeckTitle}
                    </AppText>
                    <AppText variant="heading">Review queue</AppText>
                </View>
                <AppText tone="secondary" variant="bodySmall">
                    {summary.progressLabel}
                </AppText>
            </View>
            <ProgressBar
                accessibilityLabel={`Review queue ${summary.progressValue} of ${summary.progressMax}`}
                max={summary.progressMax}
                tone={summary.progressTone}
                value={summary.progressValue}
            />
            <View style={styles.metrics}>
                {summary.metrics.map((metric) => {
                    return (
                        <StatCard
                            helper={metric.helper}
                            icon={metric.icon}
                            key={metric.id}
                            label={metric.label}
                            style={styles.metric}
                            tone={metric.tone}
                            value={metric.value}
                        />
                    );
                })}
            </View>
        </Surface>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        gap: theme.spacing.md,
    },
    header: {
        gap: theme.spacing.xs,
    },
    copy: {
        gap: theme.spacing.xs,
    },
    metrics: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: theme.spacing.sm,
    },
    metric: {
        flexBasis: "30%",
        flexGrow: 1,
    },
}));
