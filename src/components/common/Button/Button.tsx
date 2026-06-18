import {ActivityIndicator, Pressable, View} from "react-native";
import {StyleSheet, useUnistyles} from "react-native-unistyles";

import {AppText} from "../AppText";
import {Icon} from "../Icon";
import type {IconTone} from "../Icon";
import type {ButtonProps, ButtonSize, ButtonVariant} from "./ButtonTypes";

export function Button({
    label,
    variant = "primary",
    size = "medium",
    disabled = false,
    loading = false,
    loadingLabel = "Loading",
    fullWidth = false,
    leadingIcon,
    rightIcon,
    trailingIcon,
    style,
    ...pressableProps
}: ButtonProps) {
    const {theme} = useUnistyles();
    const isDisabled = disabled || loading;
    const labelTone = getButtonLabelTone(variant);
    const iconTone = getButtonIconTone(variant);
    const activityColor = getButtonActivityColor({
        labelTone,
        theme,
    });
    const resolvedTrailingIcon = trailingIcon ?? rightIcon;

    return (
        <Pressable
            android_ripple={{
                color: getButtonRippleColor({theme, variant}),
            }}
            accessibilityRole="button"
            accessibilityState={{busy: loading, disabled: isDisabled}}
            disabled={isDisabled}
            style={({pressed}) => [
                styles.root,
                getButtonVariantStyle(variant),
                getButtonSizeStyle(size),
                fullWidth && styles.fullWidth,
                pressed && !isDisabled && styles.pressed,
                isDisabled && styles.disabled,
                style,
            ]}
            {...pressableProps}
        >
            <View style={styles.content}>
                {loading ? (
                    <ActivityIndicator color={activityColor} size="small" />
                ) : null}
                {!loading && leadingIcon ? (
                    <Icon name={leadingIcon} size="dense" tone={iconTone} />
                ) : null}
                <AppText variant="button" tone={labelTone}>
                    {loading ? loadingLabel : label}
                </AppText>
                {!loading && resolvedTrailingIcon ? (
                    <Icon
                        name={resolvedTrailingIcon}
                        size="dense"
                        tone={iconTone}
                    />
                ) : null}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        alignItems: "center",
        borderRadius: theme.radii.button,
        justifyContent: "center",
        minWidth: 44,
    },
    content: {
        alignItems: "center",
        flexDirection: "row",
        gap: theme.spacing.sm,
        justifyContent: "center",
    },
    small: {
        minHeight: 44,
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.sm,
    },
    medium: {
        minHeight: 48,
        paddingHorizontal: theme.spacing.xl,
        paddingVertical: theme.spacing.md,
    },
    large: {
        minHeight: 54,
        paddingHorizontal: theme.spacing["2xl"],
        paddingVertical: theme.spacing.lg,
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
    tertiary: {
        backgroundColor: theme.colors.surfaceTonal,
        borderColor: theme.colors.borderSubtle,
        borderWidth: 1,
    },
    ghost: {
        backgroundColor: "transparent",
    },
    danger: {
        backgroundColor: theme.colors.feedbackDanger,
    },
    success: {
        backgroundColor: theme.colors.feedbackSuccess,
    },
    pressed: {
        opacity: theme.motion.pressOpacity,
        transform: [{scale: 0.98}],
    },
    disabled: {
        opacity: theme.motion.disabledOpacity,
    },
}));

function getButtonVariantStyle(variant: ButtonVariant) {
    switch (variant) {
        case "secondary":
            return styles.secondary;
        case "tertiary":
            return styles.tertiary;
        case "ghost":
            return styles.ghost;
        case "danger":
            return styles.danger;
        case "success":
            return styles.success;
        case "primary":
        default:
            return styles.primary;
    }
}

function getButtonSizeStyle(size: ButtonSize) {
    switch (size) {
        case "small":
            return styles.small;
        case "large":
            return styles.large;
        case "medium":
        default:
            return styles.medium;
    }
}

function getButtonLabelTone(variant: ButtonVariant) {
    switch (variant) {
        case "primary":
        case "danger":
        case "success":
            return "inverted";
        case "secondary":
        case "tertiary":
        case "ghost":
        default:
            return "accent";
    }
}

function getButtonIconTone(variant: ButtonVariant): IconTone {
    switch (variant) {
        case "primary":
        case "danger":
        case "success":
            return "inverted";
        case "secondary":
        case "tertiary":
        case "ghost":
        default:
            return "accent";
    }
}

function getButtonRippleColor({
    theme,
    variant,
}: {
    theme: ReturnType<typeof useUnistyles>["theme"];
    variant: ButtonVariant;
}) {
    switch (variant) {
        case "danger":
            return theme.colors.feedbackDangerSoft;
        case "success":
            return theme.colors.feedbackSuccessSoft;
        case "primary":
            return theme.colors.accentPrimaryStrong;
        case "secondary":
        case "tertiary":
        case "ghost":
        default:
            return theme.colors.accentPrimarySoft;
    }
}

function getButtonActivityColor({
    labelTone,
    theme,
}: {
    labelTone: "accent" | "inverted";
    theme: ReturnType<typeof useUnistyles>["theme"];
}) {
    return labelTone === "inverted"
        ? theme.colors.textInverse
        : theme.colors.accentPrimary;
}
