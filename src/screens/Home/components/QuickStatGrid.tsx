import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {Card, Icon} from "../../../components/common";
import type {HomeQuickStat} from "../types/homeTypes";

type QuickStatGridProps = {
    stats: HomeQuickStat[];
};

export function QuickStatGrid({stats}: QuickStatGridProps) {
    const pairs = createStatPairs(stats);

    return (
        <View style={styles.root}>
            {pairs.map((pair) => {
                return (
                    <Card
                        key={pair.map((stat) => stat.id).join("-")}
                        gap="compact"
                        orientation="horizontal"
                        size="compact"
                    >
                        {pair.map((stat) => {
                            return (
                                <Card.Item key={stat.id}>
                                    <View style={styles.statHeader}>
                                        <Card.Title>{stat.label}</Card.Title>
                                        <Icon
                                            name={stat.icon}
                                            size="dense"
                                            tone={stat.tone}
                                        />
                                    </View>
                                    <Card.Metric>{stat.value}</Card.Metric>
                                    <Card.Caption>{stat.helper}</Card.Caption>
                                </Card.Item>
                            );
                        })}
                    </Card>
                );
            })}
        </View>
    );
}

function createStatPairs(stats: HomeQuickStat[]) {
    const pairs: HomeQuickStat[][] = [];

    for (let index = 0; index < stats.length; index += 2) {
        pairs.push(stats.slice(index, index + 2));
    }

    return pairs;
}

const styles = StyleSheet.create((theme) => ({
    root: {
        gap: theme.spacing.sm,
    },
    statHeader: {
        alignItems: "center",
        flexDirection: "row",
        gap: theme.spacing.sm,
        justifyContent: "space-between",
    },
}));
