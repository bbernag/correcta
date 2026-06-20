import {Pressable, View} from "react-native";
import {EaseView, type Transition} from "react-native-ease";
import {StyleSheet} from "react-native-unistyles";

import {useReducedMotion} from "../../../hooks/useReducedMotion";
import {motion} from "../../../theme";
import {AppText} from "../AppText";
import {Icon} from "../Icon";
import {PressableMotionView} from "../PressableMotionView";
import {SquircleSurface} from "../SquircleSurface";
import type {
    SegmentedControlOption,
    SegmentedControlProps,
} from "./segmentedControlTypes";

const SELECTED_OPTION_TRANSITION = {
    opacity: {
        duration: motion.duration.fast,
        easing: "easeOut",
        type: "timing",
    },
    transform: {
        damping: motion.spring.snappy.damping,
        mass: motion.spring.snappy.mass,
        stiffness: motion.spring.snappy.stiffness,
        type: "spring",
    },
} satisfies Transition;

const REDUCED_MOTION_TRANSITION = {
    type: "none",
} satisfies Transition;

export function SegmentedControl({
    accessibilityLabel,
    disabled = false,
    onChange,
    options,
    style,
    value,
}: SegmentedControlProps) {
    return (
        <SquircleSurface
            accessibilityLabel={accessibilityLabel}
            radius="pill"
            style={[styles.root, style]}
        >
            {options.map((option) => {
                const selected = option.value === value;
                const optionDisabled = disabled || option.disabled;

                return (
                    <Pressable
                        accessibilityLabel={
                            option.accessibilityLabel ?? option.label
                        }
                        accessibilityRole="button"
                        accessibilityState={{
                            disabled: optionDisabled,
                            selected,
                        }}
                        disabled={optionDisabled}
                        key={option.value}
                        onPress={() => onChange(option.value)}
                        style={styles.optionPressable}
                    >
                        {({pressed}) => (
                            <SegmentedControlOptionContent
                                disabled={optionDisabled}
                                option={option}
                                pressed={pressed}
                                selected={selected}
                            />
                        )}
                    </Pressable>
                );
            })}
        </SquircleSurface>
    );
}

function SegmentedControlOptionContent({
    disabled,
    option,
    pressed,
    selected,
}: {
    disabled: boolean | undefined;
    option: SegmentedControlOption;
    pressed: boolean;
    selected: boolean;
}) {
    const isReducedMotionEnabled = useReducedMotion();
    const content = (
        <View style={styles.optionContent}>
            {option.icon ? (
                <Icon
                    name={option.icon}
                    size="dense"
                    tone={selected ? "inverted" : "accent"}
                />
            ) : null}
            <AppText
                numberOfLines={1}
                tone={selected ? "inverted" : "accent"}
                variant="label"
            >
                {option.label}
            </AppText>
        </View>
    );

    if (!selected) {
        return (
            <PressableMotionView
                disabled={disabled}
                pressed={pressed}
                style={styles.optionMotion}
            >
                <View style={[styles.option, disabled && styles.disabled]}>
                    {content}
                </View>
            </PressableMotionView>
        );
    }

    return (
        <PressableMotionView
            disabled={disabled}
            pressed={pressed}
            style={styles.optionMotion}
        >
            <EaseView
                animate={{
                    opacity: 1,
                    scale: 1,
                }}
                initialAnimate={{
                    opacity: isReducedMotionEnabled ? 1 : 0,
                    scale: isReducedMotionEnabled ? 1 : 0.96,
                }}
                style={styles.optionMotion}
                transition={
                    isReducedMotionEnabled
                        ? REDUCED_MOTION_TRANSITION
                        : SELECTED_OPTION_TRANSITION
                }
            >
                <SquircleSurface
                    radius="pill"
                    style={[
                        styles.option,
                        styles.selectedOption,
                        disabled && styles.disabled,
                    ]}
                >
                    {content}
                </SquircleSurface>
            </EaseView>
        </PressableMotionView>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        backgroundColor: theme.colors.surfaceTonal,
        borderColor: theme.colors.borderSubtle,
        borderWidth: 1,
        flexDirection: "row",
        gap: theme.spacing.xs,
        padding: theme.spacing.xs,
    },
    optionPressable: {
        flex: 1,
        minWidth: 44,
    },
    optionMotion: {
        flex: 1,
    },
    option: {
        alignItems: "center",
        justifyContent: "center",
        minHeight: 44,
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.sm,
    },
    selectedOption: {
        backgroundColor: theme.colors.accentPrimary,
        ...theme.shadows.surface,
    },
    optionContent: {
        alignItems: "center",
        flexDirection: "row",
        gap: theme.spacing.xs,
        justifyContent: "center",
    },
    disabled: {
        opacity: theme.motion.disabledOpacity,
    },
}));
