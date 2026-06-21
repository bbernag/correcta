import type {ReactNode} from "react";
import type {StyleProp, ViewStyle} from "react-native";
import {EaseView, type Transition} from "react-native-ease";

import {useReducedMotion} from "../../../hooks/useReducedMotion";
import {motion} from "../../../theme";

const ENTRY_TRANSITION = {
    duration: motion.duration.normal,
    easing: "easeOut",
    type: "timing",
} satisfies Transition;

const REDUCED_MOTION_TRANSITION = {
    type: "none",
} satisfies Transition;

type AnimatedMountProps = {
    children: ReactNode;
    delayMs?: number;
    style?: StyleProp<ViewStyle>;
};

export function AnimatedMount({
    children,
    delayMs = 0,
    style,
}: AnimatedMountProps) {
    const isReducedMotionEnabled = useReducedMotion();

    return (
        <EaseView
            animate={{opacity: 1, translateY: 0}}
            initialAnimate={{
                opacity: isReducedMotionEnabled ? 1 : 0,
                translateY: isReducedMotionEnabled ? 0 : 8,
            }}
            style={style}
            transition={
                isReducedMotionEnabled
                    ? REDUCED_MOTION_TRANSITION
                    : {...ENTRY_TRANSITION, delay: delayMs}
            }
        >
            {children}
        </EaseView>
    );
}
