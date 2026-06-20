import {StyleSheet} from "react-native-unistyles";

import type {PocCardTone} from "./PocCardTypes";

const toneStyles = StyleSheet.create((theme) => ({
    contrast: {
        backgroundColor: theme.colors.surfaceContrast,
    },
    success: {
        backgroundColor: theme.colors.feedbackSuccessSoft,
    },
    warning: {
        backgroundColor: theme.colors.feedbackWarningSoft,
    },
    danger: {
        backgroundColor: theme.colors.feedbackDangerSoft,
    },
    info: {
        backgroundColor: theme.colors.feedbackInfoSoft,
    },
}));

export function getPocCardToneStyle(tone: PocCardTone) {
    return toneStyles[tone];
}
