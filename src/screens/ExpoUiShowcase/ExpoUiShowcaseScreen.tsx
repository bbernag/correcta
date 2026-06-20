import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {
    AppText,
    GlassSurface,
    Icon,
    Screen,
    Surface,
} from "../../components/common";
import {EXPO_UI_CATALOG_SECTIONS} from "./constants/expoUiShowcaseConstants";
import {
    ExpoUiCatalogSection,
    ExpoUiLivePreview,
    ExpoUiShowcaseSection,
} from "./components";
import {useExpoUiShowcase} from "./hooks/useExpoUiShowcase";

const componentCount = EXPO_UI_CATALOG_SECTIONS.reduce(
    (total, section) => total + section.items.length,
    0
);
const liveUniversalCount = EXPO_UI_CATALOG_SECTIONS[0]?.items.length ?? 0;

export function ExpoUiShowcaseScreen() {
    const showcase = useExpoUiShowcase();

    return (
        <Screen contentContainerStyle={styles.screenContent}>
            <View style={styles.hero}>
                <GlassSurface variant="headerControl" style={styles.badge}>
                    <Icon name="settings" size="dense" tone="accent" />
                    <AppText variant="caption" tone="accent">
                        Expo UI SDK 56
                    </AppText>
                </GlassSurface>
                <AppText variant="titleLarge">Expo UI showcase</AppText>
                <AppText variant="bodySmall" tone="secondary">
                    Native universal controls, drop-in replacements, SwiftUI,
                    and Jetpack Compose components from @expo/ui.
                </AppText>
            </View>
            <View style={styles.summaryGrid}>
                <Surface variant="elevated" style={styles.summaryCard}>
                    <AppText variant="metric" tone="accent">
                        {componentCount}
                    </AppText>
                    <AppText variant="bodySmall" tone="secondary">
                        covered components
                    </AppText>
                </Surface>
                <Surface variant="muted" style={styles.summaryCard}>
                    <AppText variant="metric" tone="success">
                        {liveUniversalCount}
                    </AppText>
                    <AppText variant="bodySmall" tone="secondary">
                        live universal examples
                    </AppText>
                </Surface>
            </View>
            <ExpoUiShowcaseSection
                description="A real @expo/ui tree using the package root universal exports."
                eyebrow="Live"
                title="Universal component preview"
            >
                <ExpoUiLivePreview {...showcase} />
            </ExpoUiShowcaseSection>
            {EXPO_UI_CATALOG_SECTIONS.map((section) => (
                <ExpoUiCatalogSection key={section.eyebrow} section={section} />
            ))}
        </Screen>
    );
}

const styles = StyleSheet.create((theme) => ({
    screenContent: {
        gap: theme.spacing["3xl"],
        paddingBottom: theme.spacing["4xl"],
    },
    hero: {
        gap: theme.spacing.md,
        paddingBottom: theme.spacing.md,
    },
    badge: {
        alignItems: "center",
        alignSelf: "flex-start",
        flexDirection: "row",
        gap: theme.spacing.xs,
    },
    summaryGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: theme.spacing.md,
    },
    summaryCard: {
        flex: 1,
        gap: theme.spacing.xs,
        minWidth: 148,
    },
}));
