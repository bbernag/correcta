import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, Card, ProgressBar} from "../../../components/common";
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
        <Card gap="compact">
            <Card.Item>
                <Card.Eyebrow>Trend</Card.Eyebrow>
                <AppText variant="heading">Weekly activity</AppText>
            </Card.Item>
            <Card.Item>
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
            </Card.Item>
        </Card>
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
