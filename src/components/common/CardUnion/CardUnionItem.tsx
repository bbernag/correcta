import {Pressable, View} from "react-native";
import {StyleSheet, useUnistyles} from "react-native-unistyles";

import {useCardUnionContext} from "./CardUnionContext";
import type {CardUnionItemProps} from "./CardUnionTypes";
import {getCardUnionItemStyle} from "./CardUnionUtils";

export function CardUnionItem({
    accessibilityRole,
    accessibilityState,
    children,
    contentStyle,
    disabled = false,
    onPress,
    style,
    ...viewProps
}: CardUnionItemProps) {
    const {theme} = useUnistyles();
    const context = useCardUnionContext();
    const resolvedAccessibilityState = disabled
        ? {
              ...accessibilityState,
              disabled,
          }
        : accessibilityState;
    const baseItemStyle = [
        style,
        styles.item,
        getCardUnionItemStyle({
            axis: context.axis,
            theme,
        }),
        disabled && styles.disabled,
    ];

    if (onPress) {
        return (
            <Pressable
                accessibilityRole={accessibilityRole ?? "button"}
                accessibilityState={resolvedAccessibilityState}
                disabled={disabled}
                onPress={onPress}
                style={({pressed}) => [
                    ...baseItemStyle,
                    pressed && !disabled && styles.pressed,
                ]}
                {...viewProps}
            >
                <View style={[styles.itemContent, contentStyle]}>
                    {children}
                </View>
            </Pressable>
        );
    }

    return (
        <View
            accessibilityRole={accessibilityRole}
            accessibilityState={resolvedAccessibilityState}
            style={baseItemStyle}
            {...viewProps}
        >
            <View style={[styles.itemContent, contentStyle]}>{children}</View>
        </View>
    );
}

const styles = StyleSheet.create((theme) => ({
    item: {
        overflow: "hidden",
        position: "relative",
        zIndex: 1,
    },
    itemContent: {
        gap: theme.spacing.md,
    },
    pressed: {
        opacity: theme.motion.pressOpacity,
    },
    disabled: {
        opacity: theme.motion.disabledOpacity,
    },
}));
