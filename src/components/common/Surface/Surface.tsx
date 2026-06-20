import {StyleSheet} from "react-native-unistyles";

import {SquircleSurface} from "../SquircleSurface";
import type {SurfaceProps, SurfaceVariant} from "./SurfaceTypes";

export function Surface({
    children,
    variant = "default",
    style,
    ...viewProps
}: SurfaceProps) {
    return (
        <SquircleSurface
            style={[styles.root, getSurfaceVariantStyle(variant), style]}
            {...viewProps}
        >
            {children}
        </SquircleSurface>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
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
