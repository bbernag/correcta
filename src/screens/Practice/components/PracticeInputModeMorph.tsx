import type {ReactNode} from "react";
import Animated, {
    FadeIn,
    FadeOut,
    LinearTransition,
} from "react-native-reanimated";
import {StyleSheet} from "react-native-unistyles";

import {useReducedMotion} from "../../../hooks/useReducedMotion";
import {motion} from "../../../theme";

const FADE_DURATION_MS = motion.duration.normal;

const MORPH_LAYOUT = LinearTransition.springify()
    .damping(motion.spring.soft.damping)
    .stiffness(motion.spring.soft.stiffness)
    .mass(motion.spring.soft.mass);

const FADE_IN = FadeIn.duration(FADE_DURATION_MS);
const FADE_OUT = FadeOut.duration(FADE_DURATION_MS);

type PracticeInputModeMorphProps = {
    children: ReactNode;
    contentKey: string;
    minHeight: number;
};

export function PracticeInputModeMorph({
    children,
    contentKey,
    minHeight,
}: PracticeInputModeMorphProps) {
    const isReducedMotionEnabled = useReducedMotion();

    return (
        <Animated.View
            layout={isReducedMotionEnabled ? undefined : MORPH_LAYOUT}
            style={[styles.root, {minHeight}]}
        >
            <Animated.View
                entering={isReducedMotionEnabled ? undefined : FADE_IN}
                exiting={isReducedMotionEnabled ? undefined : FADE_OUT}
                key={contentKey}
                style={styles.layer}
            >
                {children}
            </Animated.View>
        </Animated.View>
    );
}

const styles = StyleSheet.create(() => ({
    layer: {
        width: "100%",
    },
    root: {
        overflow: "hidden",
    },
}));
