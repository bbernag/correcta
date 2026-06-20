import type {ReactNode} from "react";
import type {StyleProp, ViewStyle} from "react-native";

export type SectionHeaderProps = {
    action?: ReactNode;
    eyebrow?: string;
    style?: StyleProp<ViewStyle>;
    subtitle?: string;
    title: string;
};
