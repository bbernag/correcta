import {useMemo} from "react";
import type {Transition} from "react-native-ease";

import {useReducedMotion} from "../../../hooks/useReducedMotion";
import {motion} from "../../../theme";

const ENTRY_TRANSITION = {
    duration: motion.duration.normal,
    easing: "easeOut",
    type: "timing",
} satisfies Transition;

const CHIP_TRANSITION = {
    damping: motion.spring.snappy.damping,
    mass: motion.spring.snappy.mass,
    stiffness: motion.spring.snappy.stiffness,
    type: "spring",
} satisfies Transition;

const REDUCED_MOTION_TRANSITION = {
    type: "none",
} satisfies Transition;

export function usePracticeAnimations() {
    const isReducedMotionEnabled = useReducedMotion();

    return useMemo(() => {
        return {
            chipEntryTransition: isReducedMotionEnabled
                ? REDUCED_MOTION_TRANSITION
                : CHIP_TRANSITION,
            entryTransition: isReducedMotionEnabled
                ? REDUCED_MOTION_TRANSITION
                : ENTRY_TRANSITION,
            initialFadeSlide: {
                opacity: isReducedMotionEnabled ? 1 : 0,
                translateY: isReducedMotionEnabled ? 0 : 8,
            },
            initialWordChip: {
                opacity: isReducedMotionEnabled ? 1 : 0,
                scale: isReducedMotionEnabled ? 1 : 0.96,
                translateY: isReducedMotionEnabled ? 0 : 6,
            },
            isReducedMotionEnabled,
            visible: {
                opacity: 1,
                scale: 1,
                translateY: 0,
            },
        };
    }, [isReducedMotionEnabled]);
}
