import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import type {SurfaceProps, SurfaceRail, SurfaceVariant} from "./SurfaceTypes";

export function Surface({
    children,
    rail,
    variant = "default",
    style,
    ...viewProps
}: SurfaceProps) {
    return (
        <View
            style={[
                styles.root,
                getSurfaceVariantStyle(variant),
                getSurfaceRailStyle(rail ?? getDefaultRailForVariant(variant)),
                style,
            ]}
            {...viewProps}
        >
            {children}
        </View>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        borderRadius: theme.radii.card,
        padding: theme.spacing.cardPadding,
    },
    flat: {
        backgroundColor: "transparent",
    },
    card: {
        backgroundColor: theme.colors.surfacePrimary,
        ...theme.shadows.surface,
    },
    default: {
        backgroundColor: theme.colors.surfacePrimary,
    },
    muted: {
        backgroundColor: theme.colors.surfaceTonal,
    },
    outline: {
        backgroundColor: theme.colors.surfacePrimary,
        borderColor: theme.colors.borderSubtle,
        borderWidth: 1,
    },
    elevated: {
        backgroundColor: theme.colors.surfaceElevated,
        ...theme.shadows.elevated,
    },
    inverse: {
        backgroundColor: theme.colors.surfaceInverse,
    },
    success: {
        backgroundColor: theme.colors.feedbackSuccessSoft,
    },
    warning: {
        backgroundColor: theme.colors.feedbackWarningSoft,
    },
    danger: {
        backgroundColor: theme.colors.feedbackDangerSoft,
    },
    info: {
        backgroundColor: theme.colors.feedbackInfoSoft,
    },
    railAccent: {
        borderLeftColor: theme.colors.accentPrimary,
        borderLeftWidth: 3,
    },
    railSuccess: {
        borderLeftColor: theme.colors.feedbackSuccess,
        borderLeftWidth: 3,
    },
    railWarning: {
        borderLeftColor: theme.colors.feedbackWarning,
        borderLeftWidth: 3,
    },
    railDanger: {
        borderLeftColor: theme.colors.feedbackDanger,
        borderLeftWidth: 3,
    },
    railInfo: {
        borderLeftColor: theme.colors.feedbackInfo,
        borderLeftWidth: 3,
    },
}));

function getSurfaceVariantStyle(variant: SurfaceVariant) {
    switch (variant) {
        case "flat":
            return styles.flat;
        case "card":
            return styles.card;
        case "muted":
        case "tonal":
            return styles.muted;
        case "outline":
            return styles.outline;
        case "elevated":
            return styles.elevated;
        case "inverse":
            return styles.inverse;
        case "success":
            return styles.success;
        case "warning":
            return styles.warning;
        case "danger":
            return styles.danger;
        case "info":
            return styles.info;
        case "default":
        default:
            return styles.default;
    }
}

function getDefaultRailForVariant(variant: SurfaceVariant): SurfaceRail | null {
    switch (variant) {
        case "success":
            return "success";
        case "warning":
            return "warning";
        case "danger":
            return "danger";
        case "info":
            return "info";
        default:
            return null;
    }
}

function getSurfaceRailStyle(rail: SurfaceRail | null) {
    switch (rail) {
        case "accent":
            return styles.railAccent;
        case "success":
            return styles.railSuccess;
        case "warning":
            return styles.railWarning;
        case "danger":
            return styles.railDanger;
        case "info":
            return styles.railInfo;
        default:
            return undefined;
    }
}
