import type {StyleProp, ViewStyle} from "react-native";
import {View} from "react-native";
import {EaseView, type Transition} from "react-native-ease";
import {StyleSheet, useUnistyles} from "react-native-unistyles";

import {useReducedMotion} from "../../../hooks/useReducedMotion";
import {motion} from "../../../theme";
import type {ConnectedCardConnectorProps} from "./connectedCardTypes";
import {getConnectedCardToneStyle} from "./connectedCardTone";
import {getConnectedCardCutoutSpan} from "./connectedCardUtils";

// The big-card frame holds briefly before each seam carves in, so the merged
// surface registers before it splits into the linked `)===(` group. Seams then
// stagger so multi-section cards unzip rather than snapping apart at once.
const CONNECTED_CARD_MORPH_HOLD = motion.duration.fast;
const CONNECTED_CARD_MORPH_STAGGER = 80;

const MORPH_TRANSITION = {
    duration: motion.duration.emphasis,
    easing: "easeOut",
    type: "timing",
} satisfies Transition;

const REDUCED_MOTION_TRANSITION = {
    type: "none",
} satisfies Transition;

type CutoutSpec = {
    axis: "x" | "y";
    key: string;
    origin: {x: number; y: number};
    style: StyleProp<ViewStyle>;
};

export function ConnectedCardConnector({
    animated,
    bridgeColor,
    bridgeSpan,
    cutoutColor,
    delayMs,
    gap,
    morphIndex,
    orientation,
    tone,
}: ConnectedCardConnectorProps) {
    const {theme} = useUnistyles();
    const isReducedMotionEnabled = useReducedMotion();
    const cutoutSpan = getConnectedCardCutoutSpan(bridgeSpan);
    const cutoutColorStyle = cutoutColor
        ? {backgroundColor: cutoutColor}
        : null;
    const bridgeColorStyle = bridgeColor
        ? {backgroundColor: bridgeColor}
        : getConnectedCardToneStyle(tone);
    const horizontal = orientation === "horizontal";
    const gapValue = theme.card.gap[gap];
    const gapSizeStyle = horizontal ? {width: gapValue} : {height: gapValue};
    const cutouts = getCutoutSpecs({cutoutSpan, horizontal});
    const morphDelayMs =
        delayMs +
        CONNECTED_CARD_MORPH_HOLD +
        morphIndex * CONNECTED_CARD_MORPH_STAGGER;

    return (
        <View
            accessibilityElementsHidden
            accessible={false}
            importantForAccessibility="no-hide-descendants"
            pointerEvents="none"
            style={[
                styles.root,
                horizontal ? styles.horizontalRoot : styles.verticalRoot,
                gapSizeStyle,
            ]}
        >
            <View
                style={[
                    styles.bridge,
                    bridgeColorStyle,
                    horizontal
                        ? styles.horizontalBridge
                        : styles.verticalBridge,
                ]}
            />
            {cutouts.map((cutout) => {
                const cutoutStyle = [cutout.style, cutoutColorStyle];

                // animated=false is the opt-out path: render the final notch
                // statically, byte-equivalent to a plain connector.
                if (!animated) {
                    return <View key={cutout.key} style={cutoutStyle} />;
                }

                const finalScale =
                    cutout.axis === "x" ? {scaleX: 1} : {scaleY: 1};
                const mergedScale =
                    cutout.axis === "x" ? {scaleX: 0} : {scaleY: 0};

                // Keying on the resolved reduced-motion value remounts the
                // EaseView once useReducedMotion settles from its safe `true`
                // default, so the enter morph (initialAnimate -> animate) fires
                // from the merged state. The morph relies on the enter pass:
                // `animate` never changes after mount, so without the remount a
                // late settle to motion-enabled would leave the notch static.
                return (
                    <EaseView
                        animate={finalScale}
                        initialAnimate={
                            isReducedMotionEnabled ? finalScale : mergedScale
                        }
                        key={`${cutout.key}-${
                            isReducedMotionEnabled ? "static" : "morph"
                        }`}
                        style={cutoutStyle}
                        transformOrigin={cutout.origin}
                        transition={
                            isReducedMotionEnabled
                                ? REDUCED_MOTION_TRANSITION
                                : {...MORPH_TRANSITION, delay: morphDelayMs}
                        }
                    />
                );
            })}
        </View>
    );
}

function getCutoutSpecs({
    cutoutSpan,
    horizontal,
}: {
    cutoutSpan: `${number}%`;
    horizontal: boolean;
}): CutoutSpec[] {
    if (horizontal) {
        return [
            {
                axis: "y",
                key: "top",
                origin: {x: 0.5, y: 0},
                style: [
                    styles.horizontalCutout,
                    styles.topCutout,
                    {height: cutoutSpan},
                ],
            },
            {
                axis: "y",
                key: "bottom",
                origin: {x: 0.5, y: 1},
                style: [
                    styles.horizontalCutout,
                    styles.bottomCutout,
                    {height: cutoutSpan},
                ],
            },
        ];
    }

    return [
        {
            axis: "x",
            key: "left",
            origin: {x: 0, y: 0.5},
            style: [
                styles.verticalCutout,
                styles.leftCutout,
                {width: cutoutSpan},
            ],
        },
        {
            axis: "x",
            key: "right",
            origin: {x: 1, y: 0.5},
            style: [
                styles.verticalCutout,
                styles.rightCutout,
                {width: cutoutSpan},
            ],
        },
    ];
}

const styles = StyleSheet.create((theme) => ({
    root: {
        overflow: "visible",
        position: "relative",
        zIndex: 1,
    },
    verticalRoot: {
        width: "100%",
    },
    horizontalRoot: {
        alignSelf: "stretch",
    },
    bridge: {
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
    verticalBridge: {
        bottom: -theme.card.bridge.edgeOverlap,
        top: -theme.card.bridge.edgeOverlap,
    },
    verticalCutout: {
        backgroundColor: theme.colors.canvas,
        bottom: -theme.card.bridge.edgeOverlap,
        position: "absolute",
        top: -theme.card.bridge.edgeOverlap,
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
