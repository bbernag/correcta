import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, Card, Icon, ProgressBar} from "../../../components/common";
import type {ProgressHeroRecord} from "../types/progressTypes";

type ProgressHeroCardProps = {
    hero: ProgressHeroRecord;
};

export function ProgressHeroCard({hero}: ProgressHeroCardProps) {
    return (
        <Card gap="compact" size="hero">
            <Card.Item>
                <View style={styles.headingRow}>
                    <Icon name={hero.icon} size="hero" tone="accent" />
                    <View style={styles.headingCopy}>
                        <Card.Eyebrow>{hero.label}</Card.Eyebrow>
                        <AppText variant="title">{hero.title}</AppText>
                    </View>
                </View>
                <View style={styles.scoreRow}>
                    <View>
                        <Card.Metric>{hero.value}</Card.Metric>
                        <Card.Caption>XP</Card.Caption>
                    </View>
                    <View style={styles.badge}>
                        <AppText variant="caption" tone="accent">
                            {hero.badgeLabel}
                        </AppText>
                    </View>
                </View>
                <AppText tone="secondary">{hero.body}</AppText>
            </Card.Item>
            <Card.Item>
                <View style={styles.goalHeader}>
                    <Card.Title>Today&apos;s goal</Card.Title>
                    <AppText tone="accent" variant="label">
                        {hero.dailyGoal.label}
                    </AppText>
                </View>
                <ProgressBar
                    accessibilityLabel={hero.dailyGoal.accessibilityLabel}
                    max={hero.dailyGoal.target}
                    tone={hero.dailyGoal.tone}
                    value={hero.dailyGoal.completed}
                />
            </Card.Item>
        </Card>
    );
}

const styles = StyleSheet.create((theme) => ({
    headingRow: {
        alignItems: "center",
        flexDirection: "row",
        gap: theme.spacing.lg,
    },
    headingCopy: {
        flex: 1,
        gap: theme.spacing.xs,
    },
    scoreRow: {
        alignItems: "center",
        flexDirection: "row",
        gap: theme.spacing.lg,
        justifyContent: "space-between",
    },
    badge: {
        backgroundColor: theme.colors.accentPrimarySoft,
        borderRadius: theme.radii.pill,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
    },
    goalHeader: {
        alignItems: "center",
        flexDirection: "row",
        gap: theme.spacing.md,
        justifyContent: "space-between",
    },
}));
