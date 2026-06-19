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

import {AppText} from "../AppText";
import type {AppTextProps} from "../AppText";
import {SurfaceContrastContext} from "../surfaceContrastContext";
import {CardSurface} from "./CardSurface";
import type {
    CardContextValue,
    CardItemProps,
    CardLayout,
    CardProps,
} from "./CardTypes";
import {getCardGapStyle, getCardItemStyle} from "./CardUtils";

const CardContext = createContext<CardContextValue | null>(null);

function CardRoot({
    children,
    gap = "default",
    onLayout,
    orientation = "vertical",
    size = "default",
    style,
    tone = "contrast",
    ...viewProps
}: CardProps) {
    const {theme} = useUnistyles();
    const items = Children.toArray(children);
    const [rootLayout, setRootLayout] = useState<CardLayout | null>(null);
    const [itemLayouts, setItemLayouts] = useState<Record<number, CardLayout>>(
        {}
    );
    const contextValue = {
        orientation,
        size,
        tone,
    } satisfies CardContextValue;
    const resolvedItemLayouts = items
        .map((_, index) => itemLayouts[index])
        .filter((layout): layout is CardLayout => Boolean(layout));
    const canRenderSurface =
        rootLayout !== null && resolvedItemLayouts.length === items.length;

    function handleRootLayout(event: LayoutChangeEvent) {
        const nextLayout = event.nativeEvent.layout;

        onLayout?.(event);

        setRootLayout((currentLayout) =>
            areCardLayoutsEqual({
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
                areCardLayoutsEqual({
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
        <CardContext.Provider value={contextValue}>
            <SurfaceContrastContext.Provider value={tone === "contrast"}>
                <View
                    onLayout={handleRootLayout}
                    style={[
                        styles.root,
                        orientation === "horizontal" && styles.horizontal,
                        style,
                    ]}
                    {...viewProps}
                >
                    {canRenderSurface ? (
                        <CardSurface
                            itemLayouts={resolvedItemLayouts}
                            orientation={orientation}
                            rootLayout={rootLayout}
                            size={size}
                        />
                    ) : null}
                    {items.map((child, index) => (
                        <Fragment
                            key={getCardChildKey({
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
                                    orientation === "horizontal" &&
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
                                        getCardGapStyle({
                                            gap,
                                            orientation,
                                            theme,
                                        }),
                                    ]}
                                />
                            ) : null}
                        </Fragment>
                    ))}
                </View>
            </SurfaceContrastContext.Provider>
        </CardContext.Provider>
    );
}

function CardItem({
    accessibilityRole,
    accessibilityState,
    children,
    contentStyle,
    disabled = false,
    onPress,
    style,
    ...viewProps
}: CardItemProps) {
    const {theme} = useUnistyles();
    const context = useCardContext();
    const resolvedAccessibilityState = disabled
        ? {
              ...accessibilityState,
              disabled,
          }
        : accessibilityState;
    const baseItemStyle = [
        styles.item,
        getCardItemStyle({
            orientation: context.orientation,
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

function CardEyebrow(props: AppTextProps) {
    return <AppText tone="muted" variant="caption" {...props} />;
}

function CardCaption(props: AppTextProps) {
    return <AppText tone="muted" variant="bodySmall" {...props} />;
}

function CardTitle(props: AppTextProps) {
    return <AppText variant="bodyStrong" {...props} />;
}

function CardMetric(props: AppTextProps) {
    return <AppText tone="accent" variant="heading" {...props} />;
}

function useCardContext() {
    const context = use(CardContext);

    if (!context) {
        throw new Error("Card.Item must be rendered inside Card.");
    }

    return context;
}

function getCardChildKey({child, index}: {child: ReactNode; index: number}) {
    if (isValidElement(child) && child.key != null) {
        return child.key;
    }

    return `card-item-${index}`;
}

function areCardLayoutsEqual({
    currentLayout,
    nextLayout,
}: {
    currentLayout: CardLayout | null | undefined;
    nextLayout: CardLayout;
}) {
    return (
        currentLayout?.height === nextLayout.height &&
        currentLayout.width === nextLayout.width &&
        currentLayout.x === nextLayout.x &&
        currentLayout.y === nextLayout.y
    );
}

export const Card = Object.assign(CardRoot, {
    Caption: CardCaption,
    Eyebrow: CardEyebrow,
    Item: CardItem,
    Metric: CardMetric,
    Title: CardTitle,
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
