import {EaseView, type Transition} from "react-native-ease";
import {StyleSheet} from "react-native-unistyles";

import {useReducedMotion} from "../../../hooks/useReducedMotion";
import {motion} from "../../../theme";
import {SquircleSurface} from "../SquircleSurface";
import type {ProgressBarProps, ProgressBarTone} from "./progressBarTypes";

const PROGRESS_TRANSITION = {
    duration: motion.duration.normal,
    easing: "easeOut",
    type: "timing",
} satisfies Transition;

const REDUCED_MOTION_TRANSITION = {
    type: "none",
} satisfies Transition;

export function ProgressBar({
    accessibilityLabel,
    max = 1,
    style,
    tone = "accent",
    value,
}: ProgressBarProps) {
    const isReducedMotionEnabled = useReducedMotion();
    const ratio = getProgressRatio({max, value});
    const accessibilityMax = Number.isFinite(max) && max > 0 ? max : 0;
    const accessibilityValue = Number.isFinite(value) ? value : 0;
    const accessibilityNow =
        accessibilityMax === 0
            ? 0
            : Math.min(Math.max(accessibilityValue, 0), accessibilityMax);

    return (
        <SquircleSurface
            accessibilityLabel={accessibilityLabel}
            accessibilityRole="progressbar"
            accessibilityValue={{
                max: accessibilityMax,
                min: 0,
                now: accessibilityNow,
            }}
            radius="pill"
            style={[styles.track, style]}
        >
            <EaseView
                animate={{
                    scaleX: ratio,
                }}
                style={[styles.fill, getProgressFillStyle(tone)]}
                transformOrigin={{x: 0, y: 0.5}}
                transition={
                    isReducedMotionEnabled
                        ? REDUCED_MOTION_TRANSITION
                        : PROGRESS_TRANSITION
                }
            />
        </SquircleSurface>
    );
}

const styles = StyleSheet.create((theme) => ({
    track: {
        backgroundColor: theme.colors.surfaceTonal,
        minHeight: 10,
        width: "100%",
    },
    fill: {
        borderRadius: theme.radii.pill,
        bottom: 0,
        left: 0,
        position: "absolute",
        right: 0,
        top: 0,
    },
    accent: {
        backgroundColor: theme.colors.accentPrimary,
    },
    success: {
        backgroundColor: theme.colors.feedbackSuccess,
    },
    warning: {
        backgroundColor: theme.colors.feedbackWarning,
    },
    danger: {
        backgroundColor: theme.colors.feedbackDanger,
    },
    info: {
        backgroundColor: theme.colors.feedbackInfo,
    },
}));

function getProgressRatio({max, value}: {max: number; value: number}) {
    if (!Number.isFinite(max) || !Number.isFinite(value) || max <= 0) {
        return 0;
    }

    return Math.min(1, Math.max(0, value / max));
}

function getProgressFillStyle(tone: ProgressBarTone) {
    switch (tone) {
        case "success":
            return styles.success;
        case "warning":
            return styles.warning;
        case "danger":
            return styles.danger;
        case "info":
            return styles.info;
        case "accent":
        default:
            return styles.accent;
    }
}
