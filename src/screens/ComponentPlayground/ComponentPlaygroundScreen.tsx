import {useState} from "react";
import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {
    AppText,
    Button,
    Icon,
    IconButton,
    Screen,
    Surface,
    TextInput,
} from "../../components/common";
import {
    runFoundationChecks,
    type FoundationCheckResult,
} from "../../native/foundationChecks";
import {
    COMPONENT_PLAYGROUND_HAPTIC_ACTIONS,
    COMPONENT_PLAYGROUND_ICON_BUTTON_EXAMPLES,
    COMPONENT_PLAYGROUND_ICON_SAMPLES,
} from "./constants/ComponentPlaygroundConstants";

export function ComponentPlaygroundScreen() {
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
        <Screen>
            <AppText variant="title">Component check</AppText>
            <Surface>
                <AppText variant="heading">Common controls</AppText>
                <TextInput
                    label="Sample answer"
                    placeholder="Write a short translation"
                    returnKeyType="done"
                />
                <Button
                    accessibilityLabel="Run native foundation checks"
                    label="Run foundation checks"
                    loading={isChecking}
                    onPress={handleRunChecks}
                />
            </Surface>
            <Surface>
                <AppText variant="heading">Iconography</AppText>
                <View style={styles.iconGrid}>
                    {COMPONENT_PLAYGROUND_ICON_SAMPLES.map((item) => (
                        <View key={item.name} style={styles.iconSample}>
                            <Icon
                                name={item.name}
                                size="hero"
                                tone={item.tone}
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
                </View>
            </Surface>
            <Surface>
                <AppText variant="heading">Icon buttons</AppText>
                <View style={styles.iconButtonGrid}>
                    {COMPONENT_PLAYGROUND_ICON_BUTTON_EXAMPLES.map((item) => (
                        <View
                            key={item.accessibilityLabel}
                            style={styles.iconButtonSample}
                        >
                            <IconButton
                                accessibilityLabel={item.accessibilityLabel}
                                icon={item.icon}
                                selected={item.selected}
                                size={item.size}
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
                </View>
            </Surface>
            <Surface>
                <AppText variant="heading">Haptics</AppText>
                <View style={styles.iconButtonGrid}>
                    {COMPONENT_PLAYGROUND_HAPTIC_ACTIONS.map((item) => (
                        <View
                            key={item.feedback}
                            style={styles.iconButtonSample}
                        >
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
                </View>
            </Surface>
            {result ? (
                <Surface variant="muted">
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
                <Surface variant="outline">
                    <AppText variant="label" tone="danger">
                        Foundation check failed
                    </AppText>
                    <AppText tone="secondary">{error}</AppText>
                </Surface>
            ) : null}
        </Screen>
    );
}

const styles = StyleSheet.create((theme) => ({
    iconGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: theme.spacing.lg,
    },
    iconSample: {
        alignItems: "center",
        gap: theme.spacing.sm,
        minWidth: 84,
    },
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
}));
