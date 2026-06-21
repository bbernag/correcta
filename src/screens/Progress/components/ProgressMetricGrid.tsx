import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {StatCard} from "../../../components/common";
import type {ProgressMetric} from "../types/progressTypes";

type ProgressMetricGridProps = {
    metrics: ProgressMetric[];
};

export function ProgressMetricGrid({metrics}: ProgressMetricGridProps) {
    const pairs = createMetricPairs(metrics);

    return (
        <View style={styles.root}>
            {pairs.map((pair) => {
                return (
                    <View
                        key={pair.map((metric) => metric.id).join("-")}
                        style={styles.row}
                    >
                        {pair.map((metric) => {
                            return (
                                <StatCard
                                    helper={metric.helper}
                                    icon={metric.icon}
                                    key={metric.id}
                                    label={metric.label}
                                    style={styles.metricCard}
                                    tone={metric.tone}
                                    value={metric.value}
                                />
                            );
                        })}
                    </View>
                );
            })}
        </View>
    );
}

function createMetricPairs(metrics: ProgressMetric[]) {
    const pairs: ProgressMetric[][] = [];

    for (let index = 0; index < metrics.length; index += 2) {
        pairs.push(metrics.slice(index, index + 2));
    }

    return pairs;
}

const styles = StyleSheet.create((theme) => ({
    root: {
        gap: theme.spacing.sm,
    },
    row: {
        flexDirection: "row",
        gap: theme.spacing.sm,
    },
    metricCard: {
        flex: 1,
        minWidth: 0,
    },
}));
