import {useState} from "react";
import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, Button, IconButton, Surface} from "../../../components/common";
import {
    runFoundationChecks,
    type FoundationCheckResult,
} from "../../../native/foundationChecks";
import {COMPONENT_PLAYGROUND_HAPTIC_ACTIONS} from "../constants/componentPlaygroundConstants";
import {PlaygroundSectionBody} from "./PlaygroundSectionBody";
import {PlaygroundSectionHeader} from "./PlaygroundSectionHeader";
import {PlaygroundSectionRoot} from "./PlaygroundSectionRoot";

export function PlaygroundFoundationSection() {
    const [result, setResult] = useState<FoundationCheckResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isChecking, setIsChecking] = useState(false);

    async function handleRunChecks() {
        try {
            setIsChecking(true);
            setResult(await runFoundationChecks());
            setError(null);
        } catch (nativeError) {
            setResult(null);
            setError(
                nativeError instanceof Error
                    ? nativeError.message
                    : "Foundation check failed"
            );
        } finally {
            setIsChecking(false);
        }
    }

    return (
        <PlaygroundSectionRoot>
            <PlaygroundSectionHeader
                action={
                    <Button
                        accessibilityLabel="Run native foundation checks"
                        label="Run checks"
                        loading={isChecking}
                        onPress={handleRunChecks}
                        size="small"
                        variant="secondary"
                    />
                }
                description="Pulsar feedback and native adapters are checked from one place."
                eyebrow="Native"
                title="Haptics and foundation"
            />
            <PlaygroundSectionBody style={styles.iconButtonGrid}>
                {COMPONENT_PLAYGROUND_HAPTIC_ACTIONS.map((item) => (
                    <View key={item.feedback} style={styles.iconButtonSample}>
                        <IconButton
                            accessibilityLabel={item.accessibilityLabel}
                            hapticFeedback={item.feedback}
                            icon={item.icon}
                            variant={item.variant}
                        />
                        <AppText
                            numberOfLines={1}
                            variant="caption"
                            tone="secondary"
                        >
                            {item.label}
                        </AppText>
                    </View>
                ))}
            </PlaygroundSectionBody>
            {result ? (
                <Surface variant="tonal" style={styles.resultPanel}>
                    <AppText variant="label">Storage</AppText>
                    <AppText tone="secondary">{result.storage}</AppText>
                    <AppText variant="label">Date</AppText>
                    <AppText tone="secondary">{result.date}</AppText>
                    <AppText variant="label">HTTP</AppText>
                    <AppText tone="secondary">{result.http}</AppText>
                    <AppText variant="label">Domain</AppText>
                    <AppText tone="secondary">
                        {result.domain.sentences}
                    </AppText>
                    <AppText tone="secondary">{result.domain.history}</AppText>
                    <AppText tone="secondary">
                        {result.domain.savedContent}
                    </AppText>
                    <AppText tone="secondary">{result.domain.review}</AppText>
                    <AppText tone="secondary">{result.domain.progress}</AppText>
                    <AppText tone="secondary">
                        Malformed validation {result.domain.malformedValidation}
                    </AppText>
                </Surface>
            ) : null}
            {error ? (
                <Surface variant="danger" style={styles.resultPanel}>
                    <AppText variant="label" tone="danger">
                        Foundation check failed
                    </AppText>
                    <AppText tone="secondary">{error}</AppText>
                </Surface>
            ) : null}
        </PlaygroundSectionRoot>
    );
}

const styles = StyleSheet.create((theme) => ({
    iconButtonGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: theme.spacing.lg,
    },
    iconButtonSample: {
        alignItems: "center",
        gap: theme.spacing.sm,
        minWidth: 72,
    },
    resultPanel: {
        gap: theme.spacing.sm,
    },
}));
