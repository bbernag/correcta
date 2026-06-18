import {ActivityIndicator, Pressable, View} from "react-native";
import {StyleSheet, useUnistyles} from "react-native-unistyles";

import {AppText} from "../AppText";
import type {AppTextTone} from "../AppText";
import {Icon} from "../Icon";
import type {IconTone} from "../Icon";
import type {ButtonProps, ButtonSize, ButtonVariant} from "./ButtonTypes";

export function Button({
    label,
    variant = "primary",
    size = "medium",
    disabled = false,
    loading = false,
    loadingLabel,
    fullWidth = false,
    leadingIcon,
    rightIcon,
    trailingIcon,
    style,
    ...pressableProps
}: ButtonProps) {
    const {theme} = useUnistyles();
    const isInteractionDisabled = disabled || loading;
    const labelTone = disabled ? "muted" : getButtonLabelTone(variant);
    const iconTone = disabled ? "muted" : getButtonIconTone(variant);
    const activityColor = getButtonActivityColor({
        labelTone,
        theme,
    });
    const resolvedTrailingIcon = trailingIcon ?? rightIcon;
    const resolvedLabel = loading ? (loadingLabel ?? label) : label;

    return (
        <Pressable
            android_ripple={{
                color: getButtonRippleColor({theme, variant}),
            }}
            accessibilityRole="button"
            accessibilityState={{
                busy: loading,
                disabled: isInteractionDisabled,
            }}
            disabled={isInteractionDisabled}
            style={({pressed}) => [
                styles.root,
                getButtonVariantStyle(variant),
                getButtonSizeStyle(size),
                fullWidth && styles.fullWidth,
                pressed && !isInteractionDisabled && styles.pressed,
                disabled && styles.disabled,
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
                    {resolvedLabel}
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
        borderColor: "transparent",
        borderWidth: 1,
        borderRadius: theme.radii.button,
        justifyContent: "center",
        minWidth: 44,
        overflow: "hidden",
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
        minHeight: 52,
        paddingHorizontal: theme.spacing.xl,
        paddingVertical: theme.spacing.md,
    },
    large: {
        minHeight: 56,
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
    },
    ghost: {
        backgroundColor: "transparent",
    },
    danger: {
        backgroundColor: theme.colors.feedbackDangerSoft,
    },
    success: {
        backgroundColor: theme.colors.feedbackSuccessSoft,
    },
    pressed: {
        opacity: theme.motion.pressOpacity,
        transform: [{scale: 0.98}],
    },
    disabled: {
        backgroundColor: theme.colors.backgroundSecondary,
        borderColor: theme.colors.borderSubtle,
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
            return "inverted";
        case "danger":
            return "danger";
        case "success":
            return "success";
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
            return "inverted";
        case "danger":
            return "danger";
        case "success":
            return "success";
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
    labelTone: AppTextTone;
    theme: ReturnType<typeof useUnistyles>["theme"];
}) {
    switch (labelTone) {
        case "inverted":
            return theme.colors.textInverse;
        case "danger":
            return theme.colors.feedbackDanger;
        case "success":
            return theme.colors.feedbackSuccess;
        case "muted":
            return theme.colors.textMuted;
        case "accent":
        default:
            return theme.colors.accentPrimary;
    }
}
