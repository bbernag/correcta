import type {PropsWithChildren} from "react";
import type {StyleProp, ViewStyle} from "react-native";

export type PressableMotionViewProps = PropsWithChildren<{
    disabled?: boolean;
    pressed: boolean;
    pressScale?: number;
    style?: StyleProp<ViewStyle>;
}>;
