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
    COMPONENT_PLAYGROUND_BUTTON_EXAMPLES,
    COMPONENT_PLAYGROUND_HAPTIC_ACTIONS,
    COMPONENT_PLAYGROUND_ICON_BUTTON_EXAMPLES,
    COMPONENT_PLAYGROUND_ICON_SAMPLES,
    COMPONENT_PLAYGROUND_INPUT_EXAMPLES,
    COMPONENT_PLAYGROUND_SURFACE_EXAMPLES,
    COMPONENT_PLAYGROUND_TEXT_EXAMPLES,
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

    function handlePlaygroundPress() {
        return undefined;
    }

    return (
        <Screen>
            <AppText variant="title">Component check</AppText>
            <Surface>
                <AppText variant="heading">Typography</AppText>
                <View style={styles.textStack}>
                    {COMPONENT_PLAYGROUND_TEXT_EXAMPLES.map((item) => (
                        <View key={item.label} style={styles.textSample}>
                            <AppText variant="caption" tone="muted">
                                {item.label}
                            </AppText>
                            <AppText variant={item.variant} tone={item.tone}>
                                {item.text}
                            </AppText>
                        </View>
                    ))}
                </View>
            </Surface>
            <Surface>
                <AppText variant="heading">Buttons</AppText>
                <View style={styles.buttonGrid}>
                    {COMPONENT_PLAYGROUND_BUTTON_EXAMPLES.map((item) => (
                        <Button
                            accessibilityLabel={item.accessibilityLabel}
                            key={item.accessibilityLabel}
                            label={item.label}
                            leadingIcon={item.leadingIcon}
                            loading={item.loading}
                            onPress={handlePlaygroundPress}
                            size={item.size}
                            trailingIcon={item.trailingIcon}
                            variant={item.variant}
                        />
                    ))}
                </View>
            </Surface>
            <Surface>
                <AppText variant="heading">Inputs</AppText>
                <View style={styles.inputStack}>
                    {COMPONENT_PLAYGROUND_INPUT_EXAMPLES.map((item) => (
                        <TextInput
                            disabled={item.disabled}
                            error={item.error}
                            defaultValue={item.value}
                            helperText={item.helperText}
                            key={item.label}
                            label={item.label}
                            leadingIcon={item.leadingIcon}
                            placeholder={item.placeholder}
                            returnKeyType="done"
                            status={item.status}
                            successText={item.successText}
                            trailingIcon={item.trailingIcon}
                        />
                    ))}
                </View>
            </Surface>
            <Surface>
                <AppText variant="heading">Surfaces</AppText>
                <View style={styles.surfaceGrid}>
                    {COMPONENT_PLAYGROUND_SURFACE_EXAMPLES.map((item) => (
                        <Surface
                            key={item.title}
                            rail={item.rail}
                            style={styles.surfaceSample}
                            variant={item.variant}
                        >
                            <AppText variant="label">{item.title}</AppText>
                            <AppText variant="bodySmall" tone="secondary">
                                {item.body}
                            </AppText>
                        </Surface>
                    ))}
                </View>
            </Surface>
            <Surface>
                <AppText variant="heading">Foundation checks</AppText>
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
    textStack: {
        gap: theme.spacing.lg,
    },
    textSample: {
        gap: theme.spacing.xs,
    },
    buttonGrid: {
        alignItems: "flex-start",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: theme.spacing.lg,
    },
    inputStack: {
        gap: theme.spacing.lg,
    },
    surfaceGrid: {
        gap: theme.spacing.lg,
    },
    surfaceSample: {
        gap: theme.spacing.sm,
    },
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
