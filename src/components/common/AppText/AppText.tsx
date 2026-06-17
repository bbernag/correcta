import type {PropsWithChildren} from "react";
import type {StyleProp, TextProps, TextStyle} from "react-native";
import {Text} from "react-native";
import {StyleSheet} from "react-native-unistyles";

type AppTextVariant = "title" | "heading" | "body" | "label" | "caption";
type AppTextEnhancedVariant =
    | "display"
    | "titleLarge"
    | "subtitle"
    | "sentence"
    | "answer"
    | "bodyStrong"
    | "bodySmall"
    | "button"
    | "metric";
type AppTextTone =
    | "primary"
    | "secondary"
    | "muted"
    | "accent"
    | "danger"
    | "inverted";

type AppTextProps = PropsWithChildren<
    TextProps & {
        variant?: AppTextVariant | AppTextEnhancedVariant;
        tone?: AppTextTone;
        style?: StyleProp<TextStyle>;
    }
>;

export function AppText({
    children,
    variant = "body",
    tone = "primary",
    style,
    ...textProps
}: AppTextProps) {
    return (
        <Text
            style={[
                styles.base,
                getVariantStyle(variant),
                getToneStyle(tone),
                style,
            ]}
            {...textProps}
        >
            {children}
        </Text>
    );
}

const styles = StyleSheet.create((theme) => ({
    base: {
        color: theme.colors.textPrimary,
        letterSpacing: 0,
    },
    display: {
        fontSize: theme.typography.display,
        fontWeight: theme.fontWeights.display,
        lineHeight: theme.lineHeights.display,
    },
    titleLarge: {
        fontSize: theme.typography.titleLarge,
        fontWeight: theme.fontWeights.titleLarge,
        lineHeight: theme.lineHeights.titleLarge,
    },
    title: {
        fontSize: theme.typography.titleLarge,
        fontWeight: theme.fontWeights.titleLarge,
        lineHeight: theme.lineHeights.titleLarge,
    },
    heading: {
        fontSize: theme.typography.title,
        fontWeight: theme.fontWeights.title,
        lineHeight: theme.lineHeights.title,
    },
    subtitle: {
        fontSize: theme.typography.subtitle,
        fontWeight: theme.fontWeights.subtitle,
        lineHeight: theme.lineHeights.subtitle,
    },
    sentence: {
        fontSize: theme.typography.sentence,
        fontWeight: theme.fontWeights.sentence,
        lineHeight: theme.lineHeights.sentence,
    },
    answer: {
        fontSize: theme.typography.answer,
        fontWeight: theme.fontWeights.answer,
        lineHeight: theme.lineHeights.answer,
    },
    body: {
        fontSize: theme.typography.body,
        fontWeight: theme.fontWeights.body,
        lineHeight: theme.lineHeights.body,
    },
    bodyStrong: {
        fontSize: theme.typography.bodyStrong,
        fontWeight: theme.fontWeights.bodyStrong,
        lineHeight: theme.lineHeights.bodyStrong,
    },
    bodySmall: {
        fontSize: theme.typography.bodySmall,
        fontWeight: theme.fontWeights.bodySmall,
        lineHeight: theme.lineHeights.bodySmall,
    },
    label: {
        fontSize: theme.typography.label,
        fontWeight: theme.fontWeights.label,
        lineHeight: theme.lineHeights.label,
    },
    caption: {
        fontSize: theme.typography.caption,
        fontWeight: theme.fontWeights.caption,
        lineHeight: theme.lineHeights.caption,
    },
    button: {
        fontSize: theme.typography.button,
        fontWeight: theme.fontWeights.button,
        lineHeight: theme.lineHeights.button,
    },
    metric: {
        fontSize: theme.typography.metric,
        fontWeight: theme.fontWeights.metric,
        lineHeight: theme.lineHeights.metric,
    },
    primary: {
        color: theme.colors.textPrimary,
    },
    secondary: {
        color: theme.colors.textSecondary,
    },
    muted: {
        color: theme.colors.textMuted,
    },
    accent: {
        color: theme.colors.accentPrimaryStrong,
    },
    danger: {
        color: theme.colors.feedbackDanger,
    },
    inverted: {
        color: theme.colors.textInverse,
    },
}));

function getVariantStyle(variant: AppTextVariant | AppTextEnhancedVariant) {
    switch (variant) {
        case "display":
            return styles.display;
        case "titleLarge":
        case "title":
            return styles.titleLarge;
        case "heading":
            return styles.heading;
        case "subtitle":
            return styles.subtitle;
        case "sentence":
            return styles.sentence;
        case "answer":
            return styles.answer;
        case "bodyStrong":
            return styles.bodyStrong;
        case "bodySmall":
            return styles.bodySmall;
        case "label":
            return styles.label;
        case "caption":
            return styles.caption;
        case "button":
            return styles.button;
        case "metric":
            return styles.metric;
        case "body":
        default:
            return styles.body;
    }
}

function getToneStyle(tone: AppTextTone) {
    switch (tone) {
        case "secondary":
            return styles.secondary;
        case "muted":
            return styles.muted;
        case "accent":
            return styles.accent;
        case "danger":
            return styles.danger;
        case "inverted":
            return styles.inverted;
        case "primary":
        default:
            return styles.primary;
    }
}
