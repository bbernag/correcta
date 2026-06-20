import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, Surface} from "../../../components/common";
import type {AchievementRecord} from "../types/progressTypes";

type AchievementsCardProps = {
    achievements: AchievementRecord[];
};

export function AchievementsCard({achievements}: AchievementsCardProps) {
    return (
        <Surface style={styles.root}>
            <AppText variant="heading">Achievements</AppText>
            {achievements.map((achievement) => {
                return (
                    <View key={achievement.id} style={styles.achievement}>
                        <AppText
                            variant="label"
                            tone={
                                achievement.state === "earned"
                                    ? "accent"
                                    : "muted"
                            }
                        >
                            {achievement.label}
                        </AppText>
                        <AppText variant="caption" tone="secondary">
                            {achievement.description}
                        </AppText>
                    </View>
                );
            })}
        </Surface>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        gap: theme.spacing.md,
    },
    achievement: {
        borderColor: theme.colors.borderSubtle,
        borderRadius: theme.radii.sm,
        borderWidth: 1,
        gap: theme.spacing.xs,
        padding: theme.spacing.md,
    },
}));
