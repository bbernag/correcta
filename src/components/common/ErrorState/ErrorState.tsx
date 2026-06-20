import {EaseView, type Transition} from "react-native-ease";
import {StyleSheet} from "react-native-unistyles";

import {useReducedMotion} from "../../../hooks/useReducedMotion";
import {motion} from "../../../theme";
import {AppText} from "../AppText";
import {Button} from "../Button";
import {Icon} from "../Icon";
import {Surface} from "../Surface";
import type {ErrorStateProps} from "./errorStateTypes";

const ERROR_STATE_ENTRY_TRANSITION = {
    duration: motion.duration.normal,
    easing: "easeOut",
    type: "timing",
} satisfies Transition;

const REDUCED_MOTION_TRANSITION = {
    type: "none",
} satisfies Transition;

export function ErrorState({
    message,
    onRetry,
    retryLabel = "Try again",
    style,
    title = "Something went wrong",
}: ErrorStateProps) {
    const isReducedMotionEnabled = useReducedMotion();

    return (
        <Surface variant="danger" style={[styles.root, style]}>
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
                        : ERROR_STATE_ENTRY_TRANSITION
                }
            >
                <Icon name="error" size="empty" tone="danger" />
                <AppText variant="subtitle" tone="danger">
                    {title}
                </AppText>
                <AppText tone="secondary">{message}</AppText>
                {onRetry ? (
                    <Button
                        accessibilityLabel={retryLabel}
                        label={retryLabel}
                        onPress={onRetry}
                        variant="danger"
                    />
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
