import type {GestureResponderEvent} from "react-native";
import {Platform, Pressable} from "react-native";
import {StyleSheet, useUnistyles} from "react-native-unistyles";

import {playHapticFeedback} from "../../../native";
import {Icon, type IconSize, type IconTone} from "../Icon";
import type {
    IconButtonProps,
    IconButtonSize,
    IconButtonVariant,
} from "./IconButtonTypes";

export function IconButton({
    accessibilityLabel,
    disabled = false,
    hapticFeedback,
    icon,
    onPress,
    selected = false,
    size = "medium",
    style,
    variant = "ghost",
    ...pressableProps
}: IconButtonProps) {
    const {theme} = useUnistyles();
    const isDisabled = Boolean(disabled);

    function handlePress(event: GestureResponderEvent) {
        if (hapticFeedback) {
            playHapticFeedback(hapticFeedback);
        }

        onPress?.(event);
    }

    return (
        <Pressable
            android_ripple={{
                borderless: false,
                color: theme.colors.accentPrimarySoft,
            }}
            accessibilityLabel={accessibilityLabel}
            accessibilityRole="button"
            accessibilityState={{disabled: isDisabled, selected}}
            disabled={isDisabled}
            onPress={handlePress}
            style={({pressed}) => [
                styles.root,
                getSizeStyle(size),
                getVariantStyle({selected, variant}),
                pressed && !isDisabled && styles.pressed,
                isDisabled && styles.disabled,
                style,
            ]}
            {...pressableProps}
        >
            <Icon
                name={icon}
                size={getIconSize(size)}
                tone={getIconTone({disabled: isDisabled, selected, variant})}
            />
        </Pressable>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        alignItems: "center",
        borderColor: "transparent",
        borderWidth: 1,
        borderRadius: theme.radii.pill,
        justifyContent: "center",
        overflow: "hidden",
    },
    small: {
        height: 44,
        width: 44,
    },
    medium: {
        height: 44,
        width: 44,
    },
    large: {
        height: 48,
        width: 48,
    },
    ghost: {
        backgroundColor: "transparent",
    },
    surface: {
        backgroundColor:
            Platform.OS === "ios"
                ? theme.colors.surfaceGlassFallback
                : theme.colors.surfaceTonal,
        borderColor:
            Platform.OS === "ios"
                ? theme.colors.borderSubtle
                : theme.colors.borderStrong,
        ...theme.shadows.surface,
    },
    tonal: {
        backgroundColor: theme.colors.accentPrimarySoft,
    },
    danger: {
        backgroundColor: theme.colors.feedbackDangerSoft,
    },
    selected: {
        backgroundColor: theme.colors.accentPrimary,
        borderColor: theme.colors.accentPrimary,
    },
    pressed: {
        opacity: theme.motion.pressOpacity,
        transform: [{scale: 0.96}],
    },
    disabled: {
        backgroundColor: theme.colors.backgroundSecondary,
        borderColor: theme.colors.borderSubtle,
    },
}));

function getSizeStyle(size: IconButtonSize) {
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

function getVariantStyle({
    selected,
    variant,
}: {
    selected: boolean;
    variant: IconButtonVariant;
}) {
    if (selected) {
        return styles.selected;
    }

    switch (variant) {
        case "surface":
            return styles.surface;
        case "tonal":
            return styles.tonal;
        case "danger":
            return styles.danger;
        case "ghost":
        default:
            return styles.ghost;
    }
}

function getIconSize(size: IconButtonSize): IconSize {
    switch (size) {
        case "small":
            return "dense";
        case "large":
            return "hero";
        case "medium":
        default:
            return "default";
    }
}

function getIconTone({
    disabled,
    selected,
    variant,
}: {
    disabled: boolean;
    selected: boolean;
    variant: IconButtonVariant;
}): IconTone {
    if (disabled) {
        return "muted";
    }

    if (selected) {
        return "inverted";
    }

    if (variant === "danger") {
        return "danger";
    }

    if (variant === "surface") {
        return "primary";
    }

    return "accent";
}
