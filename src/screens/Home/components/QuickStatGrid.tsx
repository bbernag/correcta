import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {StatCard} from "../../../components/common";
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
                    <View
                        key={pair.map((stat) => stat.id).join("-")}
                        style={styles.row}
                    >
                        {pair.map((stat) => {
                            return (
                                <StatCard
                                    helper={stat.helper}
                                    icon={stat.icon}
                                    key={stat.id}
                                    label={stat.label}
                                    style={styles.statCard}
                                    tone={stat.tone}
                                    value={stat.value}
                                />
                            );
                        })}
                    </View>
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
    row: {
        flexDirection: "row",
        gap: theme.spacing.sm,
    },
    statCard: {
        flex: 1,
        minWidth: 0,
    },
}));
