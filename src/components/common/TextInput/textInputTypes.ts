import type {
    StyleProp,
    TextInputProps as NativeTextInputProps,
    TextStyle,
    ViewStyle,
} from "react-native";

import type {IconName} from "../Icon";

export type TextInputStatus = "default" | "success";

export type TextInputProps = Omit<NativeTextInputProps, "style"> & {
    containerStyle?: StyleProp<ViewStyle>;
    disabled?: boolean;
    error?: string;
    helperText?: string;
    inputStyle?: StyleProp<TextStyle>;
    label: string;
    leadingIcon?: IconName;
    status?: TextInputStatus;
    successText?: string;
    trailingIcon?: IconName;
};
