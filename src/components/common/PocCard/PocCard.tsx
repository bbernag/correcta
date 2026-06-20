import {Children, Fragment, isValidElement} from "react";
import type {ReactNode} from "react";
import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {SurfaceContrastContext} from "../surfaceContrastContext";
import {PocCardContext} from "./pocCardContext";
import {PocCardConnector} from "./PocCardConnector";
import {PocCardSection} from "./PocCardSection";
import type {PocCardProps} from "./pocCardTypes";
import {
    POC_CARD_BRIDGE_SPAN_DEFAULT,
    getPocCardBridgeSpan,
} from "./pocCardUtils";

function PocCardRoot({
    bridgeSpan = POC_CARD_BRIDGE_SPAN_DEFAULT,
    children,
    cutoutColor,
    orientation = "vertical",
    style,
    tone = "contrast",
    ...viewProps
}: PocCardProps) {
    const items = Children.toArray(children);
    const resolvedBridgeSpan = getPocCardBridgeSpan(bridgeSpan);

    return (
        <PocCardContext.Provider value={{orientation, tone}}>
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
                            key={getPocCardChildKey({
                                child,
                                index,
                            })}
                        >
                            {child}
                            {index < items.length - 1 ? (
                                <PocCardConnector
                                    bridgeSpan={resolvedBridgeSpan}
                                    cutoutColor={cutoutColor}
                                    orientation={orientation}
                                    tone={tone}
                                />
                            ) : null}
                        </Fragment>
                    ))}
                </View>
            </SurfaceContrastContext.Provider>
        </PocCardContext.Provider>
    );
}

function getPocCardChildKey({child, index}: {child: ReactNode; index: number}) {
    if (isValidElement(child) && child.key != null) {
        return child.key;
    }

    return `poc-card-section-${index}`;
}

export const PocCard = Object.assign(PocCardRoot, {
    Section: PocCardSection,
});

const styles = StyleSheet.create(() => ({
    root: {
        overflow: "visible",
    },
    horizontalRoot: {
        alignItems: "stretch",
        flexDirection: "row",
    },
}));
