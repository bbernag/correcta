import {useState} from "react";
import {Pressable, View} from "react-native";
import {EaseView, type Transition} from "react-native-ease";
import {StyleSheet, useUnistyles} from "react-native-unistyles";

import {useReducedMotion} from "../../../hooks/useReducedMotion";
import {motion} from "../../../theme";
import {AppText} from "../AppText";
import {GlassSurface} from "../GlassSurface";
import {Icon} from "../Icon";
import {PressableMotionView} from "../PressableMotionView";
import {SquircleSurface} from "../SquircleSurface";
import type {
    SegmentedControlOption,
    SegmentedControlProps,
} from "./segmentedControlTypes";

const INDICATOR_TRANSITION = {
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
    optionRole = "button",
    options,
    style,
    value,
}: SegmentedControlProps) {
    const {theme} = useUnistyles();
    const isReducedMotionEnabled = useReducedMotion();
    const [trackWidth, setTrackWidth] = useState(0);

    const optionCount = options.length;
    const trackInset = theme.spacing.xs;
    const optionGap = theme.spacing.xs;
    const selectedIndex = Math.max(
        0,
        options.findIndex((option) => option.value === value)
    );
    const optionWidth =
        trackWidth > 0
            ? (trackWidth - trackInset * 2 - optionGap * (optionCount - 1)) /
              optionCount
            : 0;
    const indicatorOffset = selectedIndex * (optionWidth + optionGap);

    return (
        <SquircleSurface
            accessibilityLabel={accessibilityLabel}
            accessibilityRole={optionRole === "tab" ? "tablist" : undefined}
            onLayout={(event) => setTrackWidth(event.nativeEvent.layout.width)}
            radius="pill"
            style={[styles.root, style]}
        >
            {optionWidth > 0 ? (
                <EaseView
                    animate={{translateX: indicatorOffset}}
                    initialAnimate={{translateX: indicatorOffset}}
                    pointerEvents="none"
                    style={[
                        styles.indicator,
                        {left: trackInset, width: optionWidth},
                    ]}
                    transition={
                        isReducedMotionEnabled
                            ? REDUCED_MOTION_TRANSITION
                            : INDICATOR_TRANSITION
                    }
                >
                    <GlassSurface
                        radius="pill"
                        style={styles.indicatorSurface}
                        tintColor={theme.colors.accentPrimarySoft}
                    />
                </EaseView>
            ) : null}
            {options.map((option) => {
                const selected = option.value === value;
                const optionDisabled = disabled || option.disabled;

                return (
                    <Pressable
                        android_ripple={{
                            color: theme.colors.accentPrimarySoft,
                        }}
                        accessibilityLabel={
                            option.accessibilityLabel ?? option.label
                        }
                        accessibilityHint={option.accessibilityHint}
                        accessibilityRole={optionRole}
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
    return (
        <PressableMotionView
            disabled={disabled}
            pressed={pressed}
            style={styles.optionMotion}
        >
            <View style={[styles.option, disabled && styles.disabled]}>
                {option.icon ? (
                    <Icon
                        name={option.icon}
                        size="dense"
                        tone={selected ? "primary" : "secondary"}
                    />
                ) : null}
                <AppText
                    numberOfLines={1}
                    tone={selected ? "primary" : "secondary"}
                    variant="label"
                >
                    {option.label}
                </AppText>
            </View>
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
    indicator: {
        bottom: theme.spacing.xs,
        position: "absolute",
        top: theme.spacing.xs,
    },
    indicatorSurface: {
        bottom: 0,
        left: 0,
        position: "absolute",
        right: 0,
        top: 0,
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
        flexDirection: "row",
        gap: theme.spacing.xs,
        justifyContent: "center",
        minHeight: 44,
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.sm,
    },
    disabled: {
        opacity: theme.motion.disabledOpacity,
    },
}));
