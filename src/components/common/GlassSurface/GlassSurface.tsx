import {Platform} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {SquircleSurface, type SquircleSurfaceRadius} from "../SquircleSurface";
import type {GlassSurfaceProps, GlassSurfaceVariant} from "./GlassSurfaceTypes";

export function GlassSurface({
    children,
    style,
    variant = "floatingControl",
    ...viewProps
}: GlassSurfaceProps) {
    return (
        <SquircleSurface
            radius={getGlassSurfaceRadius(variant)}
            style={[styles.root, getGlassSurfaceStyle(variant), style]}
            {...viewProps}
        >
            {children}
        </SquircleSurface>
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
        },
        floatingControl: {
            ...glassChrome,
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.sm,
        },
        headerControl: {
            ...glassChrome,
            paddingHorizontal: theme.spacing.lg,
            paddingVertical: theme.spacing.md,
        },
        tabBar: {
            ...glassChrome,
            paddingHorizontal: theme.spacing.xl,
            paddingVertical: theme.spacing.lg,
        },
        overlay: {
            ...glassChrome,
            padding: theme.spacing["2xl"],
        },
        menu: {
            ...glassChrome,
            padding: theme.spacing.md,
        },
        chip: {
            ...glassChrome,
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

function getGlassSurfaceRadius(
    variant: GlassSurfaceVariant
): SquircleSurfaceRadius {
    switch (variant) {
        case "floatingControl":
        case "chip":
            return "pill";
        case "tabBar":
        case "overlay":
            return "default";
        case "headerControl":
        case "menu":
        default:
            return "compact";
    }
}
