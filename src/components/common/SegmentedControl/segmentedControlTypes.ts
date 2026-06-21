import type {AccessibilityRole, StyleProp, ViewStyle} from "react-native";

import type {IconName} from "../Icon";

export type SegmentedControlOption = {
    accessibilityHint?: string;
    accessibilityLabel?: string;
    disabled?: boolean;
    icon?: IconName;
    label: string;
    value: string;
};

export type SegmentedControlProps = {
    accessibilityLabel: string;
    disabled?: boolean;
    onChange: (value: string) => void;
    optionRole?: Extract<AccessibilityRole, "button" | "tab">;
    options: SegmentedControlOption[];
    style?: StyleProp<ViewStyle>;
    value: string;
};
