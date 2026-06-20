import type {PressableProps, StyleProp, ViewStyle} from "react-native";

import type {IconName} from "../Icon";

export type ChipSize = "small" | "medium";

export type ChipVariant =
    | "neutral"
    | "accent"
    | "success"
    | "warning"
    | "danger"
    | "info";

export type ChipProps = Omit<PressableProps, "children" | "style"> & {
    disabled?: boolean;
    icon?: IconName;
    label: string;
    selected?: boolean;
    size?: ChipSize;
    style?: StyleProp<ViewStyle>;
    variant?: ChipVariant;
};
