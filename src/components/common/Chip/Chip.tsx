import {Pressable, View} from "react-native";
import {EaseView, type Transition} from "react-native-ease";
import {StyleSheet, useUnistyles} from "react-native-unistyles";

import {useReducedMotion} from "../../../hooks/useReducedMotion";
import {motion, type AppTheme} from "../../../theme";
import {AppText, type AppTextTone} from "../AppText";
import {Icon, type IconTone} from "../Icon";
import {PressableMotionView} from "../PressableMotionView";
import {SquircleSurface} from "../SquircleSurface";
import type {ChipProps, ChipSize, ChipVariant} from "./chipTypes";

const CHIP_STATE_TRANSITION = {
    backgroundColor: {
        duration: motion.duration.fast,
        easing: "easeOut",
        type: "timing",
    },
} satisfies Transition;

const REDUCED_MOTION_TRANSITION = {
    type: "none",
} satisfies Transition;

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
    const {theme} = useUnistyles();
    const isReducedMotionEnabled = useReducedMotion();
    const isInteractive = Boolean(onPress);
    const chipPalette = getChipVariantPalette({
        selected,
        theme,
        variant,
    });

    function renderSurface() {
        return (
            <SquircleSurface
                radius="pill"
                style={[
                    styles.root,
                    getChipSizeStyle(size),
                    disabled && styles.disabled,
                    style,
                ]}
            >
                <EaseView
                    animate={{
                        backgroundColor: chipPalette.backgroundColor,
                    }}
                    pointerEvents="none"
                    style={styles.stateLayer}
                    transition={
                        isReducedMotionEnabled
                            ? REDUCED_MOTION_TRANSITION
                            : CHIP_STATE_TRANSITION
                    }
                />
                <View style={styles.content}>
                    {icon ? (
                        <Icon
                            name={icon}
                            size="dense"
                            tone={getChipIconTone({
                                disabled,
                                selected,
                                variant,
                            })}
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
    }

    if (!isInteractive) {
        return renderSurface();
    }

    return (
        <Pressable
            android_ripple={{
                color: theme.colors.accentPrimarySoft,
            }}
            accessibilityRole="button"
            accessibilityState={{disabled, selected}}
            disabled={disabled}
            onPress={onPress}
            {...pressableProps}
        >
            {({pressed}) => (
                <PressableMotionView disabled={disabled} pressed={pressed}>
                    {renderSurface()}
                </PressableMotionView>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        justifyContent: "center",
        minWidth: 44,
        position: "relative",
    },
    stateLayer: {
        borderRadius: theme.radii.pill,
        bottom: 0,
        left: 0,
        position: "absolute",
        right: 0,
        top: 0,
    },
    content: {
        alignItems: "center",
        flexDirection: "row",
        gap: theme.spacing.xs,
        justifyContent: "center",
        position: "relative",
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

function getChipVariantPalette({
    selected,
    theme,
    variant,
}: {
    selected: boolean;
    theme: AppTheme;
    variant: ChipVariant;
}) {
    if (selected) {
        return {
            backgroundColor: theme.colors.accentPrimary,
        };
    }

    switch (variant) {
        case "accent":
            return {
                backgroundColor: theme.colors.accentPrimarySoft,
            };
        case "success":
            return {
                backgroundColor: theme.colors.feedbackSuccessSoft,
            };
        case "warning":
            return {
                backgroundColor: theme.colors.feedbackWarningSoft,
            };
        case "danger":
            return {
                backgroundColor: theme.colors.feedbackDangerSoft,
            };
        case "info":
            return {
                backgroundColor: theme.colors.feedbackInfoSoft,
            };
        case "neutral":
        default:
            return {
                backgroundColor: theme.colors.surfaceTonal,
            };
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
