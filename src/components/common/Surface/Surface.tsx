import type {PropsWithChildren} from "react";
import type {StyleProp, ViewStyle} from "react-native";
import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

type SurfaceVariant = "default" | "muted" | "outline";

type SurfaceProps = PropsWithChildren<{
    variant?: SurfaceVariant;
    style?: StyleProp<ViewStyle>;
}>;

export function Surface({children, variant = "default", style}: SurfaceProps) {
    return (
        <View style={[styles.root, getSurfaceVariantStyle(variant), style]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        borderRadius: theme.radii.card,
        padding: theme.spacing.cardPadding,
    },
    default: {
        backgroundColor: theme.colors.surfacePrimary,
        borderColor: theme.colors.borderSubtle,
        borderWidth: 1,
    },
    muted: {
        backgroundColor: theme.colors.surfaceTonal,
    },
    outline: {
        backgroundColor: theme.colors.surfaceElevated,
        borderColor: theme.colors.borderSubtle,
        borderWidth: 1,
    },
}));

function getSurfaceVariantStyle(variant: SurfaceVariant) {
    switch (variant) {
        case "muted":
            return styles.muted;
        case "outline":
            return styles.outline;
        case "default":
        default:
            return styles.default;
    }
}
