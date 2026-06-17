import {Presets, Settings} from "react-native-pulsar";

import type {HapticFeedback} from "./hapticsTypes";

const HAPTIC_FEEDBACK_PRESETS: Record<HapticFeedback, () => void> = {
    error: Presets.System.notificationError,
    impact: Presets.System.impactLight,
    selection: Presets.System.selection,
    success: Presets.System.notificationSuccess,
    warning: Presets.System.notificationWarning,
};

export function playHapticFeedback(feedback: HapticFeedback) {
    try {
        HAPTIC_FEEDBACK_PRESETS[feedback]();
    } catch {
        // Haptics are non-critical and may be unavailable on some devices.
    }
}

export function setHapticsEnabled(enabled: boolean) {
    try {
        Settings.enableHaptics(enabled);
    } catch {
        // Haptics are non-critical and may be unavailable on some devices.
    }
}
