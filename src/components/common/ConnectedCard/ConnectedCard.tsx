import {Children, Fragment, isValidElement} from "react";
import type {ReactNode} from "react";
import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText} from "../AppText";
import type {AppTextProps} from "../AppText";
import {SurfaceContrastContext} from "../surfaceContrastContext";
import {ConnectedCardConnector} from "./ConnectedCardConnector";
import {ConnectedCardContext} from "./connectedCardContext";
import {ConnectedCardItem} from "./ConnectedCardItem";
import type {ConnectedCardProps} from "./connectedCardTypes";

function ConnectedCardRoot({
    animated = false,
    animationDelayMs = 0,
    bridgeColor,
    children,
    cutoutColor,
    gap = "default",
    orientation = "vertical",
    size = "default",
    style,
    tone = "contrast",
    ...viewProps
}: ConnectedCardProps) {
    const items = Children.toArray(children);

    return (
        <ConnectedCardContext.Provider value={{orientation, size, tone}}>
            <SurfaceContrastContext.Provider value={tone === "contrast"}>
                <View
                    style={[
                        styles.root,
                        orientation === "horizontal" && styles.horizontalRoot,
                        style,
                    ]}
                    {...viewProps}
                >
                    {items.map((child, index) => (
                        <Fragment
                            key={getConnectedCardChildKey({
                                child,
                                index,
                            })}
                        >
                            {child}
                            {index < items.length - 1 ? (
                                <ConnectedCardConnector
                                    animated={animated}
                                    bridgeColor={bridgeColor}
                                    cutoutColor={cutoutColor}
                                    delayMs={animationDelayMs}
                                    gap={gap}
                                    morphIndex={index}
                                    orientation={orientation}
                                    size={size}
                                    tone={tone}
                                />
                            ) : null}
                        </Fragment>
                    ))}
                </View>
            </SurfaceContrastContext.Provider>
        </ConnectedCardContext.Provider>
    );
}

function getConnectedCardChildKey({
    child,
    index,
}: {
    child: ReactNode;
    index: number;
}) {
    if (isValidElement(child) && child.key != null) {
        return child.key;
    }

    return `connected-card-item-${index}`;
}

function ConnectedCardEyebrow(props: AppTextProps) {
    return <AppText tone="muted" variant="caption" {...props} />;
}

function ConnectedCardCaption(props: AppTextProps) {
    return <AppText tone="muted" variant="bodySmall" {...props} />;
}

function ConnectedCardTitle(props: AppTextProps) {
    return <AppText variant="bodyStrong" {...props} />;
}

function ConnectedCardMetric(props: AppTextProps) {
    return <AppText tone="accent" variant="metric" {...props} />;
}

export const ConnectedCard = Object.assign(ConnectedCardRoot, {
    Caption: ConnectedCardCaption,
    Eyebrow: ConnectedCardEyebrow,
    Item: ConnectedCardItem,
    Metric: ConnectedCardMetric,
    Title: ConnectedCardTitle,
});

const styles = StyleSheet.create(() => ({
    root: {
        overflow: "visible",
        position: "relative",
    },
    horizontalRoot: {
        alignItems: "stretch",
        flexDirection: "row",
    },
}));
