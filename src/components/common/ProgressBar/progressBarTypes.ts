import type {StyleProp, ViewStyle} from "react-native";

export type ProgressBarTone =
    | "accent"
    | "success"
    | "warning"
    | "danger"
    | "info";

export type ProgressBarProps = {
    accessibilityLabel: string;
    max?: number;
    style?: StyleProp<ViewStyle>;
    tone?: ProgressBarTone;
    value: number;
};
