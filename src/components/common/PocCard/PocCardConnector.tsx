import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import type {PocCardConnectorProps} from "./PocCardTypes";
import {getPocCardCutoutSpan} from "./PocCardUtils";

export function PocCardConnector({
    bridgeSpan,
    orientation,
}: PocCardConnectorProps) {
    const cutoutSpan = getPocCardCutoutSpan(bridgeSpan);
    const horizontal = orientation === "horizontal";

    return (
        <View
            accessibilityElementsHidden
            accessible={false}
            importantForAccessibility="no-hide-descendants"
            pointerEvents="none"
            style={[
                styles.root,
                horizontal ? styles.horizontalRoot : styles.verticalRoot,
            ]}
        >
            <View
                style={[styles.bridge, horizontal && styles.horizontalBridge]}
            />
            {horizontal ? (
                <>
                    <View
                        style={[
                            styles.horizontalCutout,
                            styles.topCutout,
                            {
                                height: cutoutSpan,
                            },
                        ]}
                    />
                    <View
                        style={[
                            styles.horizontalCutout,
                            styles.bottomCutout,
                            {
                                height: cutoutSpan,
                            },
                        ]}
                    />
                </>
            ) : (
                <>
                    <View
                        style={[
                            styles.verticalCutout,
                            styles.leftCutout,
                            {
                                width: cutoutSpan,
                            },
                        ]}
                    />
                    <View
                        style={[
                            styles.verticalCutout,
                            styles.rightCutout,
                            {
                                width: cutoutSpan,
                            },
                        ]}
                    />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        overflow: "visible",
        position: "relative",
        zIndex: 1,
    },
    verticalRoot: {
        height: theme.card.gap.default,
        width: "100%",
    },
    horizontalRoot: {
        alignSelf: "stretch",
        width: theme.card.gap.default,
    },
    bridge: {
        backgroundColor: theme.colors.surfaceContrast,
        bottom: 0,
        left: 0,
        position: "absolute",
        right: 0,
        top: 0,
        zIndex: 0,
    },
    horizontalBridge: {
        left: -theme.card.bridge.edgeOverlap,
        right: -theme.card.bridge.edgeOverlap,
    },
    verticalCutout: {
        backgroundColor: theme.colors.canvas,
        bottom: 0,
        position: "absolute",
        top: 0,
        zIndex: 1,
    },
    leftCutout: {
        borderBottomRightRadius: theme.card.bridge.capRadius,
        borderTopRightRadius: theme.card.bridge.capRadius,
        left: 0,
    },
    rightCutout: {
        borderBottomLeftRadius: theme.card.bridge.capRadius,
        borderTopLeftRadius: theme.card.bridge.capRadius,
        right: 0,
    },
    horizontalCutout: {
        backgroundColor: theme.colors.canvas,
        left: -theme.card.bridge.edgeOverlap,
        position: "absolute",
        right: -theme.card.bridge.edgeOverlap,
        zIndex: 1,
    },
    topCutout: {
        borderBottomLeftRadius: theme.card.bridge.capRadius,
        borderBottomRightRadius: theme.card.bridge.capRadius,
        top: 0,
    },
    bottomCutout: {
        borderTopLeftRadius: theme.card.bridge.capRadius,
        borderTopRightRadius: theme.card.bridge.capRadius,
        bottom: 0,
    },
}));
