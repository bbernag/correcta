import type {StyleProp, ViewStyle} from "react-native";

import type {IconName} from "../Icon";

export type StatCardTone = "accent" | "success" | "warning" | "danger" | "info";

export type StatCardProps = {
    helper?: string;
    icon?: IconName;
    label: string;
    style?: StyleProp<ViewStyle>;
    tone?: StatCardTone;
    value: string;
};
