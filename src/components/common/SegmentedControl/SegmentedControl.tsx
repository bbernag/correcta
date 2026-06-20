import {Pressable, View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText} from "../AppText";
import {Icon} from "../Icon";
import {PressableMotionView} from "../PressableMotionView";
import {SquircleSurface} from "../SquircleSurface";
import type {
    SegmentedControlOption,
    SegmentedControlProps,
} from "./segmentedControlTypes";

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
