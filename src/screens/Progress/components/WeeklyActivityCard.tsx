import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, ConnectedCard, ProgressBar} from "../../../components/common";
import type {WeeklyActivityRecord} from "../types/progressTypes";

type WeeklyActivityCardProps = {
    records: WeeklyActivityRecord[];
};

export function WeeklyActivityCard({records}: WeeklyActivityCardProps) {
    const maxCompleted = Math.max(
        ...records.map((record) => record.completedCount),
        1
    );

    return (
        <ConnectedCard gap="compact">
            <ConnectedCard.Item>
                <ConnectedCard.Eyebrow>Trend</ConnectedCard.Eyebrow>
                <AppText variant="heading">Weekly activity</AppText>
            </ConnectedCard.Item>
            <ConnectedCard.Item>
                <View style={styles.days}>
                    {records.map((record) => {
                        return (
                            <View key={record.id} style={styles.day}>
                                <View style={styles.dayHeader}>
                                    <AppText variant="caption" tone="muted">
                                        {record.dayLabel}
                                    </AppText>
                                    <AppText variant="label">
                                        {record.completedCount}
                                    </AppText>
                                </View>
                                <ProgressBar
                                    accessibilityLabel={`${record.dayLabel} ${record.completedCount} completed attempts`}
                                    max={maxCompleted}
                                    tone={
                                        record.completedCount > 0
                                            ? "accent"
                                            : "info"
                                    }
                                    value={record.completedCount}
                                />
                            </View>
                        );
                    })}
                </View>
            </ConnectedCard.Item>
        </ConnectedCard>
    );
}

const styles = StyleSheet.create((theme) => ({
    days: {
        gap: theme.spacing.sm,
    },
    day: {
        gap: theme.spacing.xs,
    },
    dayHeader: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
    },
}));
