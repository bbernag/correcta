import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {
    AppText,
    Button,
    ConnectedCard,
    Icon,
    ProgressBar,
} from "../../../components/common";
import type {HomeHeroContent} from "../types/homeTypes";

type DailyPracticeHeroCardProps = {
    hero: HomeHeroContent;
    onStartPractice: () => void;
};

export function DailyPracticeHeroCard({
    hero,
    onStartPractice,
}: DailyPracticeHeroCardProps) {
    return (
        <ConnectedCard gap="compact">
            <ConnectedCard.Item>
                <View style={styles.headingRow}>
                    <Icon name="practice" size="hero" tone="accent" />
                    <View style={styles.headingCopy}>
                        <ConnectedCard.Eyebrow>
                            {hero.eyebrow}
                        </ConnectedCard.Eyebrow>
                        <AppText variant="title">{hero.title}</AppText>
                    </View>
                </View>
                <View style={styles.promptBlock}>
                    <AppText variant="sentence">{hero.sourceText}</AppText>
                    <AppText tone="secondary">{hero.prompt}</AppText>
                </View>
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
                <Button
                    accessibilityLabel={hero.ctaAccessibilityLabel}
                    fullWidth
                    label={hero.ctaLabel}
                    leadingIcon="practice"
                    onPress={onStartPractice}
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
    promptBlock: {
        gap: theme.spacing.xs,
    },
    goalHeader: {
        alignItems: "center",
        flexDirection: "row",
        gap: theme.spacing.md,
        justifyContent: "space-between",
    },
}));
