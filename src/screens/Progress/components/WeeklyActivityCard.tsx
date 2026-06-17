import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, Surface} from "../../../components/common";
import type {WeeklyActivityRecord} from "../types/ProgressTypes";

type WeeklyActivityCardProps = {
    records: WeeklyActivityRecord[];
};

export function WeeklyActivityCard({records}: WeeklyActivityCardProps) {
    return (
        <Surface variant="muted" style={styles.root}>
            <AppText variant="heading">Weekly activity</AppText>
            <View style={styles.days}>
                {records.map((record) => {
                    return (
                        <View key={record.id} style={styles.day}>
                            <AppText variant="caption" tone="secondary">
                                {record.dayLabel}
                            </AppText>
                            <AppText variant="heading">
                                {record.completedCount}
                            </AppText>
                        </View>
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
    days: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: theme.spacing.sm,
    },
    day: {
        alignItems: "center",
        backgroundColor: theme.colors.backgroundElevated,
        borderRadius: theme.radii.sm,
        flexBasis: "12%",
        flexGrow: 1,
        gap: theme.spacing.xs,
        minWidth: 44,
        padding: theme.spacing.sm,
    },
}));
