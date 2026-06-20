import type {ReactNode} from "react";
import type {StyleProp, ViewStyle} from "react-native";

export type NativeListProps = {
    children?: ReactNode;
    onRefresh?: () => Promise<void>;
    style?: StyleProp<ViewStyle>;
    testID?: string;
    useViewportSizeMeasurement?: boolean;
};

export type NativeListItemProps = {
    children?: ReactNode;
    onPress?: () => void;
    testID?: string;
};

export type NativeListItemSlotProps = {
    children?: ReactNode;
};

export type NativeListItemSlots = {
    headline: ReactNode;
    leading?: ReactNode;
    supporting?: ReactNode;
    trailing?: ReactNode;
};
