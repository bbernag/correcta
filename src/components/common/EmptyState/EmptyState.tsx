import {View} from "react-native";
import {EaseView, type Transition} from "react-native-ease";
import {StyleSheet} from "react-native-unistyles";

import {useReducedMotion} from "../../../hooks/useReducedMotion";
import {motion} from "../../../theme";
import {AppText} from "../AppText";
import {Icon} from "../Icon";
import {Surface} from "../Surface";
import type {EmptyStateProps} from "./emptyStateTypes";

const EMPTY_STATE_ENTRY_TRANSITION = {
    duration: motion.duration.normal,
    easing: "easeOut",
    type: "timing",
} satisfies Transition;

const REDUCED_MOTION_TRANSITION = {
    type: "none",
} satisfies Transition;

export function EmptyState({
    action,
    icon = "info",
    message,
    style,
    title,
}: EmptyStateProps) {
    const isReducedMotionEnabled = useReducedMotion();

    return (
        <Surface variant="muted" style={[styles.root, style]}>
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
                        : EMPTY_STATE_ENTRY_TRANSITION
                }
            >
                <Icon name={icon} size="empty" tone="accent" />
                <View style={styles.copy}>
                    <AppText variant="subtitle">{title}</AppText>
                    <AppText tone="secondary">{message}</AppText>
                </View>
                {action}
            </EaseView>
        </Surface>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        alignItems: "center",
        gap: theme.spacing.lg,
    },
    content: {
        alignItems: "center",
        gap: theme.spacing.lg,
    },
    copy: {
        alignItems: "center",
        gap: theme.spacing.xs,
    },
}));
