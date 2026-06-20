import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, Surface} from "../../../components/common";
import type {ProgressMetric} from "../types/progressTypes";

type ProgressMetricGridProps = {
    metrics: ProgressMetric[];
};

export function ProgressMetricGrid({metrics}: ProgressMetricGridProps) {
    return (
        <Surface style={styles.root}>
            {metrics.map((metric) => {
                return (
                    <View key={metric.id} style={styles.metric}>
                        <AppText variant="heading">{metric.value}</AppText>
                        <AppText variant="label">{metric.label}</AppText>
                        <AppText variant="caption" tone="secondary">
                            {metric.caption}
                        </AppText>
                    </View>
                );
            })}
        </Surface>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: theme.spacing.sm,
    },
    metric: {
        backgroundColor: theme.colors.surfaceTonal,
        borderRadius: theme.radii.sm,
        flexBasis: "47%",
        flexGrow: 1,
        gap: theme.spacing.xs,
        padding: theme.spacing.md,
    },
}));
