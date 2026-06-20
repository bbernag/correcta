import type {ReactNode} from "react";
import type {StyleProp, ViewStyle} from "react-native";

export type ScreenHeaderProps = {
    action?: ReactNode;
    eyebrow?: string;
    style?: StyleProp<ViewStyle>;
    subtitle?: string;
    title: string;
};
