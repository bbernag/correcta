import type {DimensionValue} from "react-native";
import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, Surface} from "../../../components/common";
import type {DailyGoalRecord} from "../types/progressTypes";

type DailyGoalCardProps = {
    dailyGoal: DailyGoalRecord;
};

export function DailyGoalCard({dailyGoal}: DailyGoalCardProps) {
    const progressPercent = Math.round(
        (dailyGoal.completed / dailyGoal.target) * 100
    );
    const progressWidth = `${progressPercent}%` as DimensionValue;

    return (
        <Surface variant="outline" style={styles.root}>
            <View style={styles.header}>
                <AppText variant="heading">Daily goal</AppText>
                <AppText variant="label" tone="accent">
                    {dailyGoal.label}
                </AppText>
            </View>
            <View
                accessibilityLabel={`Daily goal ${progressPercent}% complete`}
                accessibilityRole="progressbar"
                style={styles.track}
            >
                <View style={[styles.fill, {width: progressWidth}]} />
            </View>
            <AppText tone="secondary">
                Gentle progress without punishment or streak pressure.
            </AppText>
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
    track: {
        backgroundColor: theme.colors.surfaceTonal,
        borderRadius: theme.radii.pill,
        height: 10,
        overflow: "hidden",
    },
    fill: {
        backgroundColor: theme.colors.accentPrimary,
        borderRadius: theme.radii.pill,
        height: 10,
    },
}));
