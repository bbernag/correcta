import type {TextStyle} from "react-native";

type TextRole = {
    fontSize: number;
    lineHeight: number;
    fontWeight: NonNullable<TextStyle["fontWeight"]>;
};

export const typography = {
    display: {
        fontSize: 34,
        lineHeight: 40,
        fontWeight: "700",
    },
    titleLarge: {
        fontSize: 28,
        lineHeight: 34,
        fontWeight: "700",
    },
    title: {
        fontSize: 22,
        lineHeight: 28,
        fontWeight: "700",
    },
    subtitle: {
        fontSize: 17,
        lineHeight: 24,
        fontWeight: "600",
    },
    sentence: {
        fontSize: 24,
        lineHeight: 34,
        fontWeight: "600",
    },
    answer: {
        fontSize: 18,
        lineHeight: 26,
        fontWeight: "500",
    },
    body: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: "400",
    },
    bodyStrong: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: "600",
    },
    bodySmall: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: "400",
    },
    label: {
        fontSize: 13,
        lineHeight: 18,
        fontWeight: "600",
    },
    caption: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: "500",
    },
    button: {
        fontSize: 16,
        lineHeight: 20,
        fontWeight: "700",
    },
    metric: {
        fontSize: 30,
        lineHeight: 36,
        fontWeight: "700",
    },
} as const satisfies Record<string, TextRole>;

export const fontSizes = {
    display: typography.display.fontSize,
    titleLarge: typography.titleLarge.fontSize,
    title: typography.title.fontSize,
    subtitle: typography.subtitle.fontSize,
    sentence: typography.sentence.fontSize,
    answer: typography.answer.fontSize,
    body: typography.body.fontSize,
    bodyStrong: typography.bodyStrong.fontSize,
    bodySmall: typography.bodySmall.fontSize,
    label: typography.label.fontSize,
    caption: typography.caption.fontSize,
    button: typography.button.fontSize,
    metric: typography.metric.fontSize,
} as const;

export const lineHeights = {
    display: typography.display.lineHeight,
    titleLarge: typography.titleLarge.lineHeight,
    title: typography.title.lineHeight,
    subtitle: typography.subtitle.lineHeight,
    sentence: typography.sentence.lineHeight,
    answer: typography.answer.lineHeight,
    body: typography.body.lineHeight,
    bodyStrong: typography.bodyStrong.lineHeight,
    bodySmall: typography.bodySmall.lineHeight,
    label: typography.label.lineHeight,
    caption: typography.caption.lineHeight,
    button: typography.button.lineHeight,
    metric: typography.metric.lineHeight,
} as const;

export const fontWeights = {
    display: typography.display.fontWeight,
    titleLarge: typography.titleLarge.fontWeight,
    title: typography.title.fontWeight,
    subtitle: typography.subtitle.fontWeight,
    sentence: typography.sentence.fontWeight,
    answer: typography.answer.fontWeight,
    body: typography.body.fontWeight,
    bodyStrong: typography.bodyStrong.fontWeight,
    bodySmall: typography.bodySmall.fontWeight,
    label: typography.label.fontWeight,
    caption: typography.caption.fontWeight,
    button: typography.button.fontWeight,
    metric: typography.metric.fontWeight,
} as const;

export type AppTypography = typeof typography;
