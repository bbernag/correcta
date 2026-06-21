import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, Button, Icon, Surface} from "../../../components/common";
import type {ProgressRecommendationRecord} from "../types/progressTypes";

type ProgressRecommendationCardProps = {
    onPress: () => void;
    recommendation: ProgressRecommendationRecord;
};

export function ProgressRecommendationCard({
    onPress,
    recommendation,
}: ProgressRecommendationCardProps) {
    return (
        <Surface variant="tonal" style={styles.root}>
            <View style={styles.headingRow}>
                <Icon name={recommendation.icon} size="default" tone="accent" />
                <View style={styles.copy}>
                    <AppText variant="heading">{recommendation.title}</AppText>
                    <AppText tone="secondary">{recommendation.body}</AppText>
                </View>
            </View>
            <Button
                fullWidth
                label={recommendation.actionLabel}
                leadingIcon={recommendation.icon}
                onPress={onPress}
                variant="secondary"
            />
        </Surface>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        gap: theme.spacing.lg,
    },
    headingRow: {
        alignItems: "center",
        flexDirection: "row",
        gap: theme.spacing.md,
    },
    copy: {
        flex: 1,
        gap: theme.spacing.xs,
    },
}));
