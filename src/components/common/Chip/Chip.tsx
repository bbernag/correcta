import {Pressable, View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, type AppTextTone} from "../AppText";
import {Icon, type IconTone} from "../Icon";
import {SquircleSurface} from "../SquircleSurface";
import type {ChipProps, ChipSize, ChipVariant} from "./chipTypes";

export function Chip({
    disabled = false,
    icon,
    label,
    onPress,
    selected = false,
    size = "medium",
    style,
    variant = "neutral",
    ...pressableProps
}: ChipProps) {
    const isInteractive = Boolean(onPress);
    const visual = ({pressed = false}: {pressed?: boolean} = {}) => (
        <SquircleSurface
            radius="pill"
            style={[
                styles.root,
                getChipSizeStyle(size),
                getChipVariantStyle({selected, variant}),
                pressed && !disabled && styles.pressed,
                disabled && styles.disabled,
                style,
            ]}
        >
            <View style={styles.content}>
                {icon ? (
                    <Icon
                        name={icon}
                        size="dense"
                        tone={getChipIconTone({disabled, selected, variant})}
                    />
                ) : null}
                <AppText
                    numberOfLines={1}
                    tone={getChipTextTone({disabled, selected, variant})}
                    variant="label"
                >
                    {label}
                </AppText>
            </View>
        </SquircleSurface>
    );

    if (!isInteractive) {
        return visual();
    }

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityState={{disabled, selected}}
            disabled={disabled}
            onPress={onPress}
            {...pressableProps}
        >
            {({pressed}) => visual({pressed})}
        </Pressable>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        borderColor: "transparent",
        borderWidth: 1,
        justifyContent: "center",
        minWidth: 44,
    },
    content: {
        alignItems: "center",
        flexDirection: "row",
        gap: theme.spacing.xs,
        justifyContent: "center",
    },
    small: {
        minHeight: 44,
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.xs,
    },
    medium: {
        minHeight: 44,
        paddingHorizontal: theme.spacing.xl,
        paddingVertical: theme.spacing.sm,
    },
    neutral: {
        backgroundColor: theme.colors.surfaceTonal,
        borderColor: theme.colors.borderSubtle,
    },
    accent: {
        backgroundColor: theme.colors.accentPrimarySoft,
        borderColor: theme.colors.accentPrimarySoft,
    },
    success: {
        backgroundColor: theme.colors.feedbackSuccessSoft,
        borderColor: theme.colors.feedbackSuccessSoft,
    },
    warning: {
        backgroundColor: theme.colors.feedbackWarningSoft,
        borderColor: theme.colors.feedbackWarningSoft,
    },
    danger: {
        backgroundColor: theme.colors.feedbackDangerSoft,
        borderColor: theme.colors.feedbackDangerSoft,
    },
    info: {
        backgroundColor: theme.colors.feedbackInfoSoft,
        borderColor: theme.colors.feedbackInfoSoft,
    },
    selected: {
        backgroundColor: theme.colors.accentPrimary,
        borderColor: theme.colors.accentPrimary,
    },
    pressed: {
        opacity: theme.motion.pressOpacity,
        transform: [{scale: 0.98}],
    },
    disabled: {
        opacity: theme.motion.disabledOpacity,
    },
}));

function getChipSizeStyle(size: ChipSize) {
    switch (size) {
        case "small":
            return styles.small;
        case "medium":
        default:
            return styles.medium;
    }
}

function getChipVariantStyle({
    selected,
    variant,
}: {
    selected: boolean;
    variant: ChipVariant;
}) {
    if (selected) {
        return styles.selected;
    }

    switch (variant) {
        case "accent":
            return styles.accent;
        case "success":
            return styles.success;
        case "warning":
            return styles.warning;
        case "danger":
            return styles.danger;
        case "info":
            return styles.info;
        case "neutral":
        default:
            return styles.neutral;
    }
}

function getChipTextTone({
    disabled,
    selected,
    variant,
}: {
    disabled: boolean;
    selected: boolean;
    variant: ChipVariant;
}): AppTextTone {
    if (disabled) {
        return "muted";
    }

    if (selected) {
        return "inverted";
    }

    switch (variant) {
        case "accent":
            return "accent";
        case "success":
            return "success";
        case "warning":
            return "warning";
        case "danger":
            return "danger";
        case "info":
            return "info";
        case "neutral":
        default:
            return "secondary";
    }
}

function getChipIconTone(params: {
    disabled: boolean;
    selected: boolean;
    variant: ChipVariant;
}): IconTone {
    return getChipTextTone(params) as IconTone;
}
