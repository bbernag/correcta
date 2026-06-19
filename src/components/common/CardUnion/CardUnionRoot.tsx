import {Children, Fragment, isValidElement, useState} from "react";
import type {ReactNode} from "react";
import type {LayoutChangeEvent} from "react-native";
import {Pressable, View} from "react-native";
import {StyleSheet, useUnistyles} from "react-native-unistyles";

import {CardUnionContext} from "./CardUnionContext";
import {CardUnionSurface} from "./CardUnionSurface";
import type {
    CardUnionContextValue,
    CardUnionLayout,
    CardUnionProps,
} from "./CardUnionTypes";
import {getCardUnionGapStyle} from "./CardUnionUtils";

export function CardUnionRoot({
    accessibilityRole,
    accessibilityState,
    axis = "vertical",
    children,
    disabled = false,
    onLayout,
    onPress,
    style,
    ...viewProps
}: CardUnionProps) {
    const {theme} = useUnistyles();
    const items = Children.toArray(children);
    const [rootLayout, setRootLayout] = useState<CardUnionLayout | null>(null);
    const [itemLayouts, setItemLayouts] = useState<
        Record<number, CardUnionLayout>
    >({});
    const contextValue = {
        axis,
    } satisfies CardUnionContextValue;
    const resolvedItemLayouts = items
        .map((_, index) => itemLayouts[index])
        .filter((layout): layout is CardUnionLayout => Boolean(layout));
    const canRenderSurface =
        rootLayout !== null && resolvedItemLayouts.length === items.length;

    if (axis === "horizontal" && items.length > 2) {
        throw new Error(
            "Horizontal CardUnion groups support at most two items."
        );
    }

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

    const rootStyle = [
        style,
        styles.root,
        axis === "horizontal" && styles.horizontal,
    ];
    const resolvedAccessibilityState = disabled
        ? {
              ...accessibilityState,
              disabled,
          }
        : accessibilityState;
    const content = (
        <>
            {canRenderSurface ? (
                <CardUnionSurface
                    axis={axis}
                    itemLayouts={resolvedItemLayouts}
                    rootLayout={rootLayout}
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
                            axis === "horizontal" && styles.horizontalItemFrame,
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
                                    theme,
                                }),
                            ]}
                        />
                    ) : null}
                </Fragment>
            ))}
        </>
    );

    return (
        <CardUnionContext.Provider value={contextValue}>
            {onPress ? (
                <Pressable
                    accessibilityRole={accessibilityRole ?? "button"}
                    accessibilityState={resolvedAccessibilityState}
                    disabled={disabled}
                    onLayout={handleRootLayout}
                    onPress={onPress}
                    style={({pressed}) => [
                        ...rootStyle,
                        pressed && !disabled && styles.rootPressed,
                    ]}
                    {...viewProps}
                >
                    {content}
                </Pressable>
            ) : (
                <View
                    accessibilityRole={accessibilityRole}
                    accessibilityState={resolvedAccessibilityState}
                    onLayout={handleRootLayout}
                    style={rootStyle}
                    {...viewProps}
                >
                    {content}
                </View>
            )}
        </CardUnionContext.Provider>
    );
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

const styles = StyleSheet.create((theme) => ({
    root: {
        overflow: "visible",
        position: "relative",
    },
    rootPressed: {
        opacity: theme.motion.pressOpacity,
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
}));
