import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {
    AppText,
    ConnectedCard,
    Icon,
    ResultBadge,
} from "../../../components/common";
import type {AchievementRecord} from "../types/progressTypes";

type AchievementsCardProps = {
    achievements: AchievementRecord[];
};

export function AchievementsCard({achievements}: AchievementsCardProps) {
    return (
        <ConnectedCard gap="compact">
            <ConnectedCard.Item>
                <ConnectedCard.Eyebrow>Milestones</ConnectedCard.Eyebrow>
                <AppText variant="heading">Achievements</AppText>
            </ConnectedCard.Item>
            {achievements.map((achievement) => {
                return (
                    <ConnectedCard.Item key={achievement.id}>
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
                                <ConnectedCard.Title>
                                    {achievement.label}
                                </ConnectedCard.Title>
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
                        <ConnectedCard.Caption>
                            {achievement.description}
                        </ConnectedCard.Caption>
                    </ConnectedCard.Item>
                );
            })}
        </ConnectedCard>
    );
}

const styles = StyleSheet.create((theme) => ({
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
