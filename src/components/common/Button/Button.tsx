import type {PressableProps, StyleProp, ViewStyle} from "react-native";
import {Pressable} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText} from "../AppText";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = Omit<PressableProps, "children" | "style"> & {
    label: string;
    variant?: ButtonVariant;
    loading?: boolean;
    fullWidth?: boolean;
    style?: StyleProp<ViewStyle>;
};

export function Button({
    label,
    variant = "primary",
    disabled = false,
    loading = false,
    fullWidth = false,
    style,
    ...pressableProps
}: ButtonProps) {
    const isDisabled = disabled || loading;
    const labelTone = variant === "primary" ? "inverted" : "accent";

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityState={{busy: loading, disabled: isDisabled}}
            disabled={isDisabled}
            style={({pressed}) => [
                styles.root,
                getButtonVariantStyle(variant),
                fullWidth && styles.fullWidth,
                pressed && !isDisabled && styles.pressed,
                isDisabled && styles.disabled,
                style,
            ]}
            {...pressableProps}
        >
            <AppText variant="button" tone={labelTone}>
                {loading ? "Loading" : label}
            </AppText>
        </Pressable>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        alignItems: "center",
        borderRadius: theme.radii.button,
        justifyContent: "center",
        minHeight: 48,
        minWidth: 48,
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
    },
    fullWidth: {
        alignSelf: "stretch",
    },
    primary: {
        backgroundColor: theme.colors.accentPrimary,
    },
    secondary: {
        backgroundColor: theme.colors.accentPrimarySoft,
    },
    ghost: {
        backgroundColor: "transparent",
    },
    pressed: {
        opacity: theme.motion.pressOpacity,
    },
    disabled: {
        opacity: theme.motion.disabledOpacity,
    },
}));

function getButtonVariantStyle(variant: ButtonVariant) {
    switch (variant) {
        case "secondary":
            return styles.secondary;
        case "ghost":
            return styles.ghost;
        case "primary":
        default:
            return styles.primary;
    }
}
