import type {ReactNode} from "react";
import type {StyleProp, ViewStyle} from "react-native";

import type {IconName} from "../Icon";

export type EmptyStateProps = {
    action?: ReactNode;
    icon?: IconName;
    message: string;
    style?: StyleProp<ViewStyle>;
    title: string;
};
