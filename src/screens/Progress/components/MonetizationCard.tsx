import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, Button, Surface} from "../../../components/common";
import type {MonetizationState} from "../../../types";
import type {ProgressRewardState} from "../types/ProgressTypes";

type MonetizationCardProps = {
    monetization: MonetizationState;
    onRequestReward: () => void;
    rewardState: ProgressRewardState;
};

export function MonetizationCard({
    monetization,
    onRequestReward,
    rewardState,
}: MonetizationCardProps) {
    return (
        <Surface variant="outline" style={styles.root}>
            <View style={styles.header}>
                <AppText variant="heading">Support and bonuses</AppText>
                <AppText tone="secondary">
                    {monetization.providerConfigured
                        ? monetization.adapterName
                        : "Rewarded ad provider not connected"}
                </AppText>
            </View>
            {monetization.rewards.map((reward) => {
                return (
                    <View key={reward.id} style={styles.reward}>
                        <AppText variant="label">{reward.label}</AppText>
                        <AppText variant="caption" tone="secondary">
                            {reward.description}
                        </AppText>
                    </View>
                );
            })}
            <Button
                label="Check bonus review pack"
                loading={rewardState.isLoading}
                onPress={onRequestReward}
                variant="secondary"
            />
            {rewardState.result ? (
                <AppText
                    tone={
                        rewardState.result.status === "earned"
                            ? "accent"
                            : "secondary"
                    }
                >
                    {rewardState.result.message}
                </AppText>
            ) : null}
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
    reward: {
        backgroundColor: theme.colors.surfaceMuted,
        borderRadius: theme.radii.sm,
        gap: theme.spacing.xs,
        padding: theme.spacing.md,
    },
}));
