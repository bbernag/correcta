import type {PickerItemProps, PickerItemValue, PickerProps} from "@expo/ui";
import type {StyleProp, ViewStyle} from "react-native";

export type NativePickerItemValue = PickerItemValue;

export type NativePickerProps<
    T extends NativePickerItemValue = NativePickerItemValue,
> = PickerProps<T> & {
    accessibilityLabel: string;
    style?: StyleProp<ViewStyle>;
};

export type NativePickerItemProps<
    T extends NativePickerItemValue = NativePickerItemValue,
> = PickerItemProps<T>;
