import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, Surface} from "../../../components/common";
import type {BackendAiStatus} from "../../../types";

type BackendAiStatusCardProps = {
    status: BackendAiStatus;
};

export function BackendAiStatusCard({status}: BackendAiStatusCardProps) {
    return (
        <Surface variant="muted" style={styles.root}>
            <View style={styles.header}>
                <AppText variant="heading">Backend and AI</AppText>
                <AppText variant="label" tone="accent">
                    {status.mode === "remoteReady"
                        ? "Remote ready"
                        : "Local mock active"}
                </AppText>
            </View>
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
}));
