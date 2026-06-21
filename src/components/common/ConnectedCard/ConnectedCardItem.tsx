import {use} from "react";
import {Pressable, View} from "react-native";
import FastSquircleView from "react-native-fast-squircle";
import {StyleSheet, useUnistyles} from "react-native-unistyles";

import {PressableMotionView} from "../PressableMotionView";
import {ConnectedCardContext} from "./connectedCardContext";
import type {ConnectedCardItemProps} from "./connectedCardTypes";
import {getConnectedCardToneStyle} from "./connectedCardTone";

export function ConnectedCardItem({
    accessibilityRole,
    accessibilityState,
    children,
    contentStyle,
    disabled = false,
    onPress,
    style,
    ...viewProps
}: ConnectedCardItemProps) {
    const {theme} = useUnistyles();
    const {orientation, size, tone} = useConnectedCardContext();
    const resolvedAccessibilityState = disabled
        ? {
              ...accessibilityState,
              disabled,
          }
        : accessibilityState;
    const baseItemStyle = [
        styles.root,
        getConnectedCardToneStyle(tone),
        {
            borderRadius: theme.card.radius[size],
            padding: theme.card.padding[size],
        },
        orientation === "horizontal" && styles.horizontalRoot,
        disabled && styles.disabled,
    ];

    if (onPress) {
        return (
            <Pressable
                accessibilityRole={accessibilityRole ?? "button"}
                accessibilityState={resolvedAccessibilityState}
                disabled={disabled}
                onPress={onPress}
                style={
                    orientation === "horizontal" && styles.horizontalPressable
                }
                {...viewProps}
            >
                {({pressed}) => (
                    <PressableMotionView
                        disabled={disabled}
                        pressScale={1}
                        pressed={pressed}
                    >
                        <FastSquircleView
                            cornerSmoothing={theme.card.cornerSmoothing}
                            style={[...baseItemStyle, style]}
                        >
                            <View style={[styles.content, contentStyle]}>
                                {children}
                            </View>
                        </FastSquircleView>
                    </PressableMotionView>
                )}
            </Pressable>
        );
    }

    return (
        <FastSquircleView
            accessibilityRole={accessibilityRole}
            accessibilityState={resolvedAccessibilityState}
            cornerSmoothing={theme.card.cornerSmoothing}
            style={[...baseItemStyle, style]}
            {...viewProps}
        >
            <View style={[styles.content, contentStyle]}>{children}</View>
        </FastSquircleView>
    );
}

function useConnectedCardContext() {
    const context = use(ConnectedCardContext);

    if (!context) {
        throw new Error(
            "ConnectedCard.Item must be rendered inside ConnectedCard."
        );
    }

    return context;
}

const styles = StyleSheet.create((theme) => ({
    // Items sit in normal flow with no zIndex, intentionally below the
    // connector (zIndex 1) so its seam bleed paints over both item edges.
    // position: relative gives an explicit stacking context without lifting
    // the item over that bleed (a plain zIndex 1 here would let the next item
    // cover a horizontal connector's far-side overlap and reopen a hairline).
    root: {
        overflow: "hidden",
        position: "relative",
    },
    horizontalRoot: {
        flex: 1,
    },
    horizontalPressable: {
        flex: 1,
    },
    content: {
        gap: theme.spacing.md,
    },
    disabled: {
        opacity: theme.motion.disabledOpacity,
    },
}));
