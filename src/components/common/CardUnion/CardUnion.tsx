import {
    Children,
    Fragment,
    createContext,
    isValidElement,
    use,
    useState,
} from "react";
import type {ReactNode} from "react";
import type {LayoutChangeEvent} from "react-native";
import {Pressable, View} from "react-native";
import {StyleSheet, useUnistyles} from "react-native-unistyles";

import {CardUnionSurface} from "./CardUnionSurface";
import type {
    CardUnionContextValue,
    CardUnionItemProps,
    CardUnionLayout,
    CardUnionProps,
} from "./CardUnionTypes";
import {
    clampCardUnionBridgeSpan,
    getCardUnionGapStyle,
    getCardUnionItemStyle,
} from "./CardUnionUtils";

const CardUnionContext = createContext<CardUnionContextValue | null>(null);

function CardUnionRoot({
    axis = "vertical",
    bridgeSpan,
    children,
    gap = "default",
    onLayout,
    size = "default",
    style,
    tone = "contrast",
    ...viewProps
}: CardUnionProps) {
    const {theme} = useUnistyles();
    const items = Children.toArray(children);
    const [rootLayout, setRootLayout] = useState<CardUnionLayout | null>(null);
    const [itemLayouts, setItemLayouts] = useState<
        Record<number, CardUnionLayout>
    >({});
    const resolvedBridgeSpan = clampCardUnionBridgeSpan({
        fallback: theme.cardUnion.bridge.spanDefault,
        max: theme.cardUnion.bridge.spanMax,
        min: theme.cardUnion.bridge.spanMin,
        value: bridgeSpan,
    });
    const contextValue = {
        axis,
        size,
        tone,
    } satisfies CardUnionContextValue;
    const resolvedItemLayouts = items
        .map((_, index) => itemLayouts[index])
        .filter((layout): layout is CardUnionLayout => Boolean(layout));
    const canRenderSurface =
        rootLayout !== null && resolvedItemLayouts.length === items.length;

    function handleRootLayout(event: LayoutChangeEvent) {
        const nextLayout = event.nativeEvent.layout;

        onLayout?.(event);

        setRootLayout((currentLayout) =>
            areCardUnionLayoutsEqual({
                currentLayout,
                nextLayout,
            })
                ? currentLayout
                : nextLayout
        );
    }

    function handleItemLayout({
        event,
        index,
    }: {
        event: LayoutChangeEvent;
        index: number;
    }) {
        const nextLayout = event.nativeEvent.layout;

        setItemLayouts((currentLayouts) => {
            if (
                areCardUnionLayoutsEqual({
                    currentLayout: currentLayouts[index],
                    nextLayout,
                })
            ) {
                return currentLayouts;
            }

            return {
                ...currentLayouts,
                [index]: nextLayout,
            };
        });
    }

    return (
        <CardUnionContext.Provider value={contextValue}>
            <View
                onLayout={handleRootLayout}
                style={[
                    styles.root,
                    axis === "horizontal" && styles.horizontal,
                    style,
                ]}
                {...viewProps}
            >
                {canRenderSurface ? (
                    <CardUnionSurface
                        axis={axis}
                        bridgeSpan={resolvedBridgeSpan}
                        itemLayouts={resolvedItemLayouts}
                        rootLayout={rootLayout}
                        size={size}
                    />
                ) : null}
                {items.map((child, index) => (
                    <Fragment
                        key={getCardUnionChildKey({
                            child,
                            index,
                        })}
                    >
                        <View
                            onLayout={(event) =>
                                handleItemLayout({
                                    event,
                                    index,
                                })
                            }
                            style={[
                                styles.itemFrame,
                                axis === "horizontal" &&
                                    styles.horizontalItemFrame,
                            ]}
                        >
                            {child}
                        </View>
                        {index < items.length - 1 ? (
                            <View
                                accessibilityElementsHidden
                                accessible={false}
                                importantForAccessibility="no-hide-descendants"
                                pointerEvents="none"
                                style={[
                                    styles.bridgeSlot,
                                    getCardUnionGapStyle({
                                        axis,
                                        gap,
                                        theme,
                                    }),
                                ]}
                            />
                        ) : null}
                    </Fragment>
                ))}
            </View>
        </CardUnionContext.Provider>
    );
}

function CardUnionItem({
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
        styles.item,
        getCardUnionItemStyle({
            axis: context.axis,
            size: context.size,
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
                    style,
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
            style={[...baseItemStyle, style]}
            {...viewProps}
        >
            <View style={[styles.itemContent, contentStyle]}>{children}</View>
        </View>
    );
}

function useCardUnionContext() {
    const context = use(CardUnionContext);

    if (!context) {
        throw new Error("CardUnion.Item must be rendered inside CardUnion.");
    }

    return context;
}

function getCardUnionChildKey({
    child,
    index,
}: {
    child: ReactNode;
    index: number;
}) {
    if (isValidElement(child) && child.key != null) {
        return child.key;
    }

    return `card-union-item-${index}`;
}

function areCardUnionLayoutsEqual({
    currentLayout,
    nextLayout,
}: {
    currentLayout: CardUnionLayout | null | undefined;
    nextLayout: CardUnionLayout;
}) {
    return (
        currentLayout?.height === nextLayout.height &&
        currentLayout.width === nextLayout.width &&
        currentLayout.x === nextLayout.x &&
        currentLayout.y === nextLayout.y
    );
}

export const CardUnion = Object.assign(CardUnionRoot, {
    Item: CardUnionItem,
});

const styles = StyleSheet.create((theme) => ({
    root: {
        overflow: "visible",
        position: "relative",
    },
    horizontal: {
        alignItems: "stretch",
        flexDirection: "row",
    },
    bridgeSlot: {
        overflow: "visible",
        position: "relative",
        zIndex: 1,
    },
    itemFrame: {
        position: "relative",
        zIndex: 1,
    },
    horizontalItemFrame: {
        flex: 1,
    },
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
