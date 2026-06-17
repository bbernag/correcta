import type {GestureResponderEvent} from "react-native";
import {Pressable} from "react-native";
import {StyleSheet} from "react-native-unistyles";

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
    const isDisabled = Boolean(disabled);

    function handlePress(event: GestureResponderEvent) {
        if (hapticFeedback) {
            playHapticFeedback(hapticFeedback);
        }

        onPress?.(event);
    }

    return (
        <Pressable
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
                tone={getIconTone({selected, variant})}
            />
        </Pressable>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        alignItems: "center",
        borderRadius: theme.radii.pill,
        justifyContent: "center",
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
        backgroundColor: theme.colors.surfaceElevated,
        borderColor: theme.colors.borderSubtle,
        borderWidth: 1,
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
    },
    disabled: {
        opacity: theme.motion.disabledOpacity,
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
    selected,
    variant,
}: {
    selected: boolean;
    variant: IconButtonVariant;
}): IconTone {
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
