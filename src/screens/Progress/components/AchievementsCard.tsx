import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, Icon, ResultBadge, Surface} from "../../../components/common";
import type {AchievementRecord} from "../types/progressTypes";

type AchievementsCardProps = {
    achievements: AchievementRecord[];
};

export function AchievementsCard({achievements}: AchievementsCardProps) {
    return (
        <Surface variant="outline" style={styles.root}>
            <View style={styles.header}>
                <AppText variant="heading">Achievements</AppText>
                <AppText tone="secondary">
                    Milestones unlock as practice history grows.
                </AppText>
            </View>
            {achievements.map((achievement) => {
                return (
                    <View key={achievement.id} style={styles.achievement}>
                        <View style={styles.achievementHeader}>
                            <View style={styles.labelRow}>
                                <Icon
                                    name={
                                        achievement.state === "earned"
                                            ? "success"
                                            : "lock"
                                    }
                                    size="dense"
                                    tone={
                                        achievement.state === "earned"
                                            ? "success"
                                            : "muted"
                                    }
                                />
                                <AppText variant="bodyStrong">
                                    {achievement.label}
                                </AppText>
                            </View>
                            <ResultBadge
                                label={
                                    achievement.state === "earned"
                                        ? "Earned"
                                        : "Locked"
                                }
                                tone={
                                    achievement.state === "earned"
                                        ? "correct"
                                        : "info"
                                }
                            />
                        </View>
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
        gap: theme.spacing.lg,
    },
    header: {
        gap: theme.spacing.xs,
    },
    achievement: {
        gap: theme.spacing.sm,
    },
    achievementHeader: {
        alignItems: "center",
        flexDirection: "row",
        gap: theme.spacing.md,
        justifyContent: "space-between",
    },
    labelRow: {
        alignItems: "center",
        flex: 1,
        flexDirection: "row",
        gap: theme.spacing.sm,
    },
}));
