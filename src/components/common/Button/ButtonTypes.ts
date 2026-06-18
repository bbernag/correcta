import type {PressableProps, StyleProp, ViewStyle} from "react-native";

import type {IconName} from "../Icon";

export type ButtonVariant =
    | "primary"
    | "secondary"
    | "tertiary"
    | "ghost"
    | "danger"
    | "success";

export type ButtonSize = "small" | "medium" | "large";

export type ButtonProps = Omit<PressableProps, "children" | "style"> & {
    fullWidth?: boolean;
    label: string;
    leadingIcon?: IconName;
    loading?: boolean;
    loadingLabel?: string;
    rightIcon?: IconName;
    size?: ButtonSize;
    style?: StyleProp<ViewStyle>;
    trailingIcon?: IconName;
    variant?: ButtonVariant;
};
