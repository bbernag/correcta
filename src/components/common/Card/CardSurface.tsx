import {EaseView, type Transition} from "react-native-ease";
import Svg, {Path} from "react-native-svg";
import {StyleSheet, useUnistyles} from "react-native-unistyles";

import {useReducedMotion} from "../../../hooks/useReducedMotion";
import {motion} from "../../../theme";
import type {CardSurfaceProps} from "./cardTypes";
import {getCardCutoutPath, getCardSurfacePath} from "./cardUtils";

const SURFACE_TRANSITION = {
    duration: motion.duration.fast,
    easing: "easeOut",
    type: "timing",
} satisfies Transition;

const REDUCED_MOTION_TRANSITION = {
    type: "none",
} satisfies Transition;

export function CardSurface({
    itemLayouts,
    orientation,
    rootLayout,
    size,
}: CardSurfaceProps) {
    const {theme} = useUnistyles();
    const isReducedMotionEnabled = useReducedMotion();
    const surfaceTransition = isReducedMotionEnabled
        ? REDUCED_MOTION_TRANSITION
        : SURFACE_TRANSITION;
    const surfacePath = getCardSurfacePath({
        itemLayouts,
        orientation,
        rootLayout,
        size,
        theme,
    });
    const cutoutPath = getCardCutoutPath({
        itemLayouts,
        orientation,
        rootLayout,
        size,
        theme,
    });

    return (
        <>
            <EaseView
                accessibilityElementsHidden
                accessible={false}
                animate={{opacity: 1}}
                importantForAccessibility="no-hide-descendants"
                initialAnimate={{opacity: isReducedMotionEnabled ? 1 : 0}}
                pointerEvents="none"
                style={[styles.layer, styles.surfaceLayer]}
                transition={surfaceTransition}
            >
                <Svg
                    height={rootLayout.height}
                    pointerEvents="none"
                    viewBox={`0 0 ${rootLayout.width} ${rootLayout.height}`}
                    width={rootLayout.width}
                >
                    <Path d={surfacePath} fill={theme.colors.surfaceContrast} />
                </Svg>
            </EaseView>
            {cutoutPath ? (
                <EaseView
                    accessibilityElementsHidden
                    accessible={false}
                    animate={{opacity: 1}}
                    importantForAccessibility="no-hide-descendants"
                    initialAnimate={{opacity: isReducedMotionEnabled ? 1 : 0}}
                    pointerEvents="none"
                    style={[styles.layer, styles.cutoutLayer]}
                    transition={surfaceTransition}
                >
                    <Svg
                        height={rootLayout.height}
                        pointerEvents="none"
                        viewBox={`0 0 ${rootLayout.width} ${rootLayout.height}`}
                        width={rootLayout.width}
                    >
                        <Path d={cutoutPath} fill={theme.colors.canvas} />
                    </Svg>
                </EaseView>
            ) : null}
        </>
    );
}

const styles = StyleSheet.create(() => ({
    layer: {
        bottom: 0,
        left: 0,
        position: "absolute",
        right: 0,
        top: 0,
    },
    surfaceLayer: {
        zIndex: 0,
    },
    cutoutLayer: {
        zIndex: 2,
    },
}));
