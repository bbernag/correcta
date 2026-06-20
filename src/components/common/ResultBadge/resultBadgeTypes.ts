import type {StyleProp, ViewStyle} from "react-native";

export type ResultBadgeTone =
    | "correct"
    | "almost"
    | "incorrect"
    | "skipped"
    | "info";

export type ResultBadgeProps = {
    label: string;
    style?: StyleProp<ViewStyle>;
    tone: ResultBadgeTone;
};
