import {Platform, View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import type {GlassSurfaceProps, GlassSurfaceVariant} from "./GlassSurfaceTypes";

export function GlassSurface({
    children,
    style,
    variant = "floatingControl",
    ...viewProps
}: GlassSurfaceProps) {
    return (
        <View
            style={[styles.root, getGlassSurfaceStyle(variant), style]}
            {...viewProps}
        >
            {children}
        </View>
    );
}

const styles = StyleSheet.create((theme) => {
    const glassChrome = {
        backgroundColor:
            Platform.OS === "ios"
                ? theme.colors.surfaceGlassFallback
                : theme.colors.surfaceTonal,
        borderColor:
            Platform.OS === "ios"
                ? theme.colors.borderSubtle
                : theme.colors.borderStrong,
        ...theme.shadows.floating,
    };

    return {
        root: {
            borderWidth: 1,
            overflow: "hidden",
        },
        floatingControl: {
            ...glassChrome,
            borderRadius: theme.radii.pill,
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.sm,
        },
        headerControl: {
            ...glassChrome,
            borderRadius: theme.radii.lg,
            paddingHorizontal: theme.spacing.lg,
            paddingVertical: theme.spacing.md,
        },
        tabBar: {
            ...glassChrome,
            borderRadius: theme.radii.sheet,
            paddingHorizontal: theme.spacing.xl,
            paddingVertical: theme.spacing.lg,
        },
        overlay: {
            ...glassChrome,
            borderRadius: theme.radii.modal,
            padding: theme.spacing["2xl"],
        },
        menu: {
            ...glassChrome,
            borderRadius: theme.radii.xl,
            padding: theme.spacing.md,
        },
        chip: {
            ...glassChrome,
            borderRadius: theme.radii.pill,
            paddingHorizontal: theme.spacing.lg,
            paddingVertical: theme.spacing.sm,
        },
    };
});

function getGlassSurfaceStyle(variant: GlassSurfaceVariant) {
    switch (variant) {
        case "headerControl":
            return styles.headerControl;
        case "tabBar":
            return styles.tabBar;
        case "overlay":
            return styles.overlay;
        case "menu":
            return styles.menu;
        case "chip":
            return styles.chip;
        case "floatingControl":
        default:
            return styles.floatingControl;
    }
}
