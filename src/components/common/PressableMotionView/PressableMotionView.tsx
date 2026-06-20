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

export function PressableMotionView({
    children,
    disabled = false,
    pressed,
    pressScale = 0.97,
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
            transition={PRESS_TRANSITION}
        >
            {children}
        </EaseView>
    );
}
