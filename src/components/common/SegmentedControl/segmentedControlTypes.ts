import type {StyleProp, ViewStyle} from "react-native";

import type {IconName} from "../Icon";

export type SegmentedControlOption = {
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
    options: SegmentedControlOption[];
    style?: StyleProp<ViewStyle>;
    value: string;
};
