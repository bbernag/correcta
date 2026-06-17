import type {PressableProps, StyleProp, ViewStyle} from "react-native";

import type {HapticFeedback} from "../../../native";
import type {IconName} from "../Icon";

export type IconButtonVariant = "ghost" | "surface" | "tonal" | "danger";

export type IconButtonSize = "small" | "medium" | "large";

export type IconButtonProps = Omit<PressableProps, "children" | "style"> & {
    accessibilityLabel: string;
    hapticFeedback?: HapticFeedback;
    icon: IconName;
    selected?: boolean;
    size?: IconButtonSize;
    style?: StyleProp<ViewStyle>;
    variant?: IconButtonVariant;
};
