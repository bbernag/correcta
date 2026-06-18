import type {PropsWithChildren} from "react";
import type {StyleProp, TextProps, TextStyle} from "react-native";

export type AppTextVariant =
    | "display"
    | "titleLarge"
    | "title"
    | "heading"
    | "subtitle"
    | "sentence"
    | "answer"
    | "body"
    | "bodyStrong"
    | "bodySmall"
    | "label"
    | "caption"
    | "button"
    | "metric";

export type AppTextTone =
    | "primary"
    | "secondary"
    | "muted"
    | "accent"
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "inverted";

export type AppTextProps = PropsWithChildren<
    TextProps & {
        style?: StyleProp<TextStyle>;
        tone?: AppTextTone;
        variant?: AppTextVariant;
    }
>;
