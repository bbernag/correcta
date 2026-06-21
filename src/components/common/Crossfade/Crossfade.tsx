import type {ReactNode} from "react";
import {View} from "react-native";
import {EaseView, type Transition} from "react-native-ease";
import {StyleSheet} from "react-native-unistyles";

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

type CrossfadeProps = {
    children: ReactNode;
    contentKey: string;
    minHeight?: number;
};

export function Crossfade({children, contentKey, minHeight}: CrossfadeProps) {
    const isReducedMotionEnabled = useReducedMotion();

    return (
        <View style={minHeight === undefined ? undefined : {minHeight}}>
            <EaseView
                animate={{opacity: 1, translateY: 0}}
                initialAnimate={{
                    opacity: isReducedMotionEnabled ? 1 : 0,
                    translateY: isReducedMotionEnabled ? 0 : 8,
                }}
                key={contentKey}
                style={styles.content}
                transition={
                    isReducedMotionEnabled
                        ? REDUCED_MOTION_TRANSITION
                        : ENTRY_TRANSITION
                }
            >
                {children}
            </EaseView>
        </View>
    );
}

const styles = StyleSheet.create(() => ({
    content: {
        flex: 1,
    },
}));
