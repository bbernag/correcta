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
        <View style={[styles.root, styles[variant], style]}>{children}</View>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        borderRadius: theme.radii.md,
        padding: theme.spacing.lg,
    },
    default: {
        backgroundColor: theme.colors.surface,
        ...theme.shadows.surface,
    },
    muted: {
        backgroundColor: theme.colors.surfaceMuted,
    },
    outline: {
        backgroundColor: theme.colors.backgroundElevated,
        borderColor: theme.colors.border,
        borderWidth: 1,
    },
}));
