import type {ReactNode} from "react";
import type {StyleProp, ViewStyle} from "react-native";

export type NativeMenuAction = {
    destructive?: boolean;
    disabled?: boolean;
    displayInline?: boolean;
    hidden?: boolean;
    id: string;
    selected?: boolean;
    subactions?: NativeMenuAction[];
    title: string;
};

export type NativeMenuProps = {
    actions: NativeMenuAction[];
    children: ReactNode;
    onAction?: (actionId: string) => void;
    onClose?: () => void;
    onOpen?: () => void;
    shouldOpenOnLongPress?: boolean;
    style?: StyleProp<ViewStyle>;
    testID?: string;
    title?: string;
};
