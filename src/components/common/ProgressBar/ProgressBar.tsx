import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {SquircleSurface} from "../SquircleSurface";
import type {ProgressBarProps, ProgressBarTone} from "./progressBarTypes";

export function ProgressBar({
    accessibilityLabel,
    max = 1,
    style,
    tone = "accent",
    value,
}: ProgressBarProps) {
    const ratio = getProgressRatio({max, value});

    return (
        <SquircleSurface
            accessibilityLabel={accessibilityLabel}
            accessibilityRole="progressbar"
            accessibilityValue={{
                max,
                min: 0,
                now: Math.min(value, max),
            }}
            radius="pill"
            style={[styles.track, style]}
        >
            <View
                style={[
                    styles.fill,
                    getProgressFillStyle(tone),
                    {
                        width: `${ratio * 100}%`,
                    },
                ]}
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
    if (max <= 0) {
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
