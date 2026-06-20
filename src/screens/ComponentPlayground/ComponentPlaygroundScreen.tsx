import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {
    AppText,
    Button,
    GlassSurface,
    Icon,
    IconButton,
    NoticeCard,
    Screen,
    Surface,
    TextInput,
} from "../../components/common";
import {
    PlaygroundCardSection,
    PlaygroundFoundationSection,
    PlaygroundHero,
    PlaygroundNativeControlsSection,
    PlaygroundScaffoldSection,
    PlaygroundSection,
} from "./components";
import {
    COMPONENT_PLAYGROUND_BUTTON_EXAMPLES,
    COMPONENT_PLAYGROUND_GLASS_EXAMPLES,
    COMPONENT_PLAYGROUND_ICON_BUTTON_EXAMPLES,
    COMPONENT_PLAYGROUND_ICON_SAMPLES,
    COMPONENT_PLAYGROUND_INPUT_EXAMPLES,
    COMPONENT_PLAYGROUND_NOTICE_EXAMPLES,
    COMPONENT_PLAYGROUND_SURFACE_EXAMPLES,
    COMPONENT_PLAYGROUND_TEXT_EXAMPLES,
} from "./constants/componentPlaygroundConstants";

export function ComponentPlaygroundScreen() {
    function handlePlaygroundPress() {
        return undefined;
    }

    return (
        <Screen contentContainerStyle={styles.screenContent}>
            <PlaygroundHero />
            <PlaygroundSection.Root>
                <PlaygroundSection.Header
                    description="System typography roles used by learning screens."
                    eyebrow="Type"
                    title="Typography"
                />
                <PlaygroundSection.Body style={styles.textStack}>
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
                </PlaygroundSection.Body>
            </PlaygroundSection.Root>
            <PlaygroundSection.Root>
                <PlaygroundSection.Header
                    description="Explicit variants with native press states and stable loading width."
                    eyebrow="Actions"
                    title="Buttons"
                />
                <PlaygroundSection.Body style={styles.buttonGrid}>
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
                </PlaygroundSection.Body>
            </PlaygroundSection.Root>
            <PlaygroundSection.Root>
                <PlaygroundSection.Header
                    description="Composition fields with focus rings and status text close to the input."
                    eyebrow="Forms"
                    title="Inputs"
                />
                <PlaygroundSection.Body style={styles.inputStack}>
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
                </PlaygroundSection.Body>
            </PlaygroundSection.Root>
            <PlaygroundSection.Root>
                <PlaygroundSection.Header
                    description="Content surfaces show hierarchy through fill and elevation, not borders."
                    eyebrow="Containers"
                    title="Surfaces"
                />
                <PlaygroundSection.Body style={styles.surfaceGrid}>
                    {COMPONENT_PLAYGROUND_SURFACE_EXAMPLES.map((item) => (
                        <Surface
                            key={item.title}
                            style={styles.surfaceSample}
                            variant={item.variant}
                        >
                            <AppText variant="label">{item.title}</AppText>
                            <AppText variant="bodySmall" tone="secondary">
                                {item.body}
                            </AppText>
                        </Surface>
                    ))}
                </PlaygroundSection.Body>
            </PlaygroundSection.Root>
            <PlaygroundSection.Root>
                <PlaygroundSection.Header
                    description="Linked notes pair a status heading with its detail, carrying tone through a soft fill instead of a punitive rail."
                    eyebrow="Feedback"
                    title="Feedback notes"
                />
                <PlaygroundSection.Body style={styles.noticeStack}>
                    {COMPONENT_PLAYGROUND_NOTICE_EXAMPLES.map((item) => (
                        <NoticeCard
                            key={item.title}
                            title={item.title}
                            tone={item.tone}
                        >
                            <AppText variant="bodySmall" tone="secondary">
                                {item.body}
                            </AppText>
                        </NoticeCard>
                    ))}
                </PlaygroundSection.Body>
            </PlaygroundSection.Root>
            <PlaygroundCardSection />
            <PlaygroundScaffoldSection />
            <PlaygroundNativeControlsSection />
            <PlaygroundSection.Root>
                <PlaygroundSection.Header
                    description="Compact glass fallback only. Android uses tonal surfaces instead of iOS-style translucency."
                    eyebrow="Glass"
                    title="Glass fallback"
                />
                <PlaygroundSection.Body style={styles.glassGrid}>
                    {COMPONENT_PLAYGROUND_GLASS_EXAMPLES.map((item) => (
                        <GlassSurface
                            key={item.variant}
                            variant={item.variant}
                            style={styles.glassSample}
                        >
                            <Icon name={item.icon} size="dense" tone="accent" />
                            <AppText variant="caption" tone="accent">
                                {item.label}
                            </AppText>
                        </GlassSurface>
                    ))}
                </PlaygroundSection.Body>
            </PlaygroundSection.Root>
            <PlaygroundSection.Root>
                <PlaygroundSection.Header
                    description="Registry-driven icons keep screens from importing icon packages directly."
                    eyebrow="Symbols"
                    title="Iconography"
                />
                <PlaygroundSection.Body style={styles.iconGrid}>
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
                </PlaygroundSection.Body>
            </PlaygroundSection.Root>
            <PlaygroundSection.Root>
                <PlaygroundSection.Header
                    description="Toolbar controls remain at least 44 dp with accessible names."
                    eyebrow="Controls"
                    title="Icon buttons"
                />
                <PlaygroundSection.Body style={styles.iconButtonGrid}>
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
                </PlaygroundSection.Body>
            </PlaygroundSection.Root>
            <PlaygroundFoundationSection />
        </Screen>
    );
}

const styles = StyleSheet.create((theme) => ({
    screenContent: {
        gap: theme.spacing["3xl"],
        paddingBottom: theme.spacing["4xl"],
    },
    textStack: {
        gap: theme.spacing.xl,
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
    noticeStack: {
        backgroundColor: theme.colors.canvas,
        borderRadius: theme.radii.sheet,
        gap: theme.spacing.lg,
        padding: theme.spacing.lg,
    },
    glassGrid: {
        alignItems: "flex-start",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: theme.spacing.lg,
    },
    glassSample: {
        alignItems: "center",
        flexDirection: "row",
        gap: theme.spacing.xs,
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
