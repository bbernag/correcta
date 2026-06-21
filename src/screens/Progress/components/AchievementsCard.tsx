import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, Card, Icon, ResultBadge} from "../../../components/common";
import type {AchievementRecord} from "../types/progressTypes";

type AchievementsCardProps = {
    achievements: AchievementRecord[];
};

export function AchievementsCard({achievements}: AchievementsCardProps) {
    return (
        <Card gap="compact">
            <Card.Item>
                <Card.Eyebrow>Milestones</Card.Eyebrow>
                <AppText variant="heading">Achievements</AppText>
            </Card.Item>
            {achievements.map((achievement) => {
                return (
                    <Card.Item key={achievement.id}>
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
                                <Card.Title>{achievement.label}</Card.Title>
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
                        <Card.Caption>{achievement.description}</Card.Caption>
                    </Card.Item>
                );
            })}
        </Card>
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
