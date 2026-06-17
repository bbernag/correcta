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
            <AppText tone="secondary">
                Contract {status.contractVersion}. AI providers stay server-side
                and responses are parsed before rendering.
            </AppText>
            {status.endpoints.map((endpoint) => {
                return (
                    <View key={endpoint.id} style={styles.endpoint}>
                        <AppText variant="label">
                            {endpoint.method} {endpoint.path}
                        </AppText>
                        <AppText variant="caption" tone="secondary">
                            {endpoint.description}
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
    header: {
        gap: theme.spacing.xs,
    },
    endpoint: {
        borderColor: theme.colors.borderSubtle,
        borderRadius: theme.radii.sm,
        borderWidth: 1,
        gap: theme.spacing.xs,
        padding: theme.spacing.md,
    },
}));
