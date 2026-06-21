import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {Card, Icon} from "../../../components/common";
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
                    <Card
                        key={pair.map((metric) => metric.id).join("-")}
                        gap="compact"
                        orientation="horizontal"
                        size="compact"
                    >
                        {pair.map((metric) => {
                            return (
                                <Card.Item key={metric.id}>
                                    <View style={styles.metricHeader}>
                                        <Card.Title>{metric.label}</Card.Title>
                                        <Icon
                                            name={metric.icon}
                                            size="dense"
                                            tone={metric.tone}
                                        />
                                    </View>
                                    <Card.Metric>{metric.value}</Card.Metric>
                                    <Card.Caption>{metric.helper}</Card.Caption>
                                </Card.Item>
                            );
                        })}
                    </Card>
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
    metricHeader: {
        alignItems: "center",
        flexDirection: "row",
        gap: theme.spacing.sm,
        justifyContent: "space-between",
    },
}));
