import {ActivityIndicator} from "react-native";
import {EaseView, type Transition} from "react-native-ease";
import {StyleSheet, useUnistyles} from "react-native-unistyles";

import {useReducedMotion} from "../../../hooks/useReducedMotion";
import {motion} from "../../../theme";
import {AppText} from "../AppText";
import {Surface} from "../Surface";
import type {LoadingStateProps} from "./loadingStateTypes";

const LOADING_STATE_ENTRY_TRANSITION = {
    duration: motion.duration.normal,
    easing: "easeOut",
    type: "timing",
} satisfies Transition;

const REDUCED_MOTION_TRANSITION = {
    type: "none",
} satisfies Transition;

export function LoadingState({message, style, title}: LoadingStateProps) {
    const {theme} = useUnistyles();
    const isReducedMotionEnabled = useReducedMotion();

    return (
        <Surface
            accessibilityRole="progressbar"
            variant="muted"
            style={[styles.root, style]}
        >
            <EaseView
                animate={{
                    opacity: 1,
                    translateY: 0,
                }}
                initialAnimate={{
                    opacity: isReducedMotionEnabled ? 1 : 0,
                    translateY: isReducedMotionEnabled ? 0 : 8,
                }}
                style={styles.content}
                transition={
                    isReducedMotionEnabled
                        ? REDUCED_MOTION_TRANSITION
                        : LOADING_STATE_ENTRY_TRANSITION
                }
            >
                <ActivityIndicator
                    accessibilityLabel={title}
                    color={theme.colors.accentPrimary}
                    size="large"
                />
                <AppText variant="subtitle">{title}</AppText>
                {message ? (
                    <AppText tone="secondary" variant="bodySmall">
                        {message}
                    </AppText>
                ) : null}
            </EaseView>
        </Surface>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        alignItems: "center",
        gap: theme.spacing.md,
    },
    content: {
        alignItems: "center",
        gap: theme.spacing.md,
    },
}));
