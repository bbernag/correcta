import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {
    AppText,
    ConnectedCard,
    Icon,
    ProgressBar,
} from "../../../components/common";
import type {ProgressHeroRecord} from "../types/progressTypes";

type ProgressHeroCardProps = {
    hero: ProgressHeroRecord;
};

export function ProgressHeroCard({hero}: ProgressHeroCardProps) {
    return (
        <ConnectedCard gap="compact" size="hero">
            <ConnectedCard.Item>
                <View style={styles.headingRow}>
                    <Icon name={hero.icon} size="hero" tone="accent" />
                    <View style={styles.headingCopy}>
                        <ConnectedCard.Eyebrow>
                            {hero.label}
                        </ConnectedCard.Eyebrow>
                        <AppText variant="title">{hero.title}</AppText>
                    </View>
                </View>
                <View style={styles.scoreRow}>
                    <View>
                        <ConnectedCard.Metric>
                            {hero.value}
                        </ConnectedCard.Metric>
                        <ConnectedCard.Caption>XP</ConnectedCard.Caption>
                    </View>
                    <View style={styles.badge}>
                        <AppText variant="caption" tone="accent">
                            {hero.badgeLabel}
                        </AppText>
                    </View>
                </View>
                <AppText tone="secondary">{hero.body}</AppText>
            </ConnectedCard.Item>
            <ConnectedCard.Item>
                <View style={styles.goalHeader}>
                    <ConnectedCard.Title>Today&apos;s goal</ConnectedCard.Title>
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
            </ConnectedCard.Item>
        </ConnectedCard>
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
