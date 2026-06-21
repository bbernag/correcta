import {Platform} from "react-native";
import {EaseView, type Transition} from "react-native-ease";
import {useUnistyles} from "react-native-unistyles";

import {useReducedMotion} from "../../../hooks/useReducedMotion";
import {motion} from "../../../theme";
import type {PressableMotionViewProps} from "./pressableMotionViewTypes";

const PRESS_TRANSITION = {
    opacity: {
        duration: motion.duration.micro,
        easing: "easeOut",
        type: "timing",
    },
    transform: {
        damping: motion.spring.press.damping,
        mass: motion.spring.press.mass,
        stiffness: motion.spring.press.stiffness,
        type: "spring",
    },
} satisfies Transition;

const REDUCED_MOTION_TRANSITION = {
    type: "none",
} satisfies Transition;

const DEFAULT_PRESS_SCALE = Platform.OS === "android" ? 0.985 : 0.98;

export function PressableMotionView({
    children,
    disabled = false,
    pressed,
    pressScale = DEFAULT_PRESS_SCALE,
    style,
}: PressableMotionViewProps) {
    const {theme} = useUnistyles();
    const isReducedMotionEnabled = useReducedMotion();
    const isPressed = pressed && !disabled;

    return (
        <EaseView
            animate={{
                opacity: isPressed ? theme.motion.pressOpacity : 1,
                scale: isPressed && !isReducedMotionEnabled ? pressScale : 1,
            }}
            style={style}
            transition={
                isReducedMotionEnabled
                    ? REDUCED_MOTION_TRANSITION
                    : PRESS_TRANSITION
            }
        >
            {children}
        </EaseView>
    );
}
