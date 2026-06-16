import type {PropsWithChildren} from "react";
import type {StyleProp, TextProps, TextStyle} from "react-native";
import {Text} from "react-native";
import {StyleSheet} from "react-native-unistyles";

type AppTextVariant = "title" | "heading" | "body" | "label" | "caption";
type AppTextTone =
    | "primary"
    | "secondary"
    | "muted"
    | "accent"
    | "danger"
    | "inverted";

type AppTextProps = PropsWithChildren<
    TextProps & {
        variant?: AppTextVariant;
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
            style={[styles.base, styles[variant], styles[tone], style]}
            {...textProps}
        >
            {children}
        </Text>
    );
}

const styles = StyleSheet.create((theme) => ({
    base: {
        color: theme.colors.text,
        letterSpacing: 0,
    },
    title: {
        fontSize: theme.typography.title,
        fontWeight: "700",
        lineHeight: 38,
    },
    heading: {
        fontSize: theme.typography.heading,
        fontWeight: "700",
        lineHeight: 28,
    },
    body: {
        fontSize: theme.typography.body,
        lineHeight: 24,
    },
    label: {
        fontSize: theme.typography.label,
        fontWeight: "700",
        lineHeight: 20,
    },
    caption: {
        fontSize: theme.typography.caption,
        lineHeight: 18,
    },
    primary: {
        color: theme.colors.text,
    },
    secondary: {
        color: theme.colors.textSecondary,
    },
    muted: {
        color: theme.colors.textMuted,
    },
    accent: {
        color: theme.colors.accentStrong,
    },
    danger: {
        color: theme.colors.danger,
    },
    inverted: {
        color: theme.colors.textInverted,
    },
}));
