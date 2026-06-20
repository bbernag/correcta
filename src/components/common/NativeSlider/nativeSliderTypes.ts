import type {SliderProps} from "@expo/ui";
import type {StyleProp, ViewStyle} from "react-native";

export type NativeSliderProps = Omit<SliderProps, "modifiers"> & {
    accessibilityLabel: string;
    style?: StyleProp<ViewStyle>;
};
