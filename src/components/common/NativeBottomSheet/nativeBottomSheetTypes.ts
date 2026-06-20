import type {BottomSheetProps} from "@expo/ui/community/bottom-sheet";
import type {ReactNode} from "react";
import type {StyleProp, ViewStyle} from "react-native";

export type NativeBottomSheetProps = Omit<
    BottomSheetProps,
    "children" | "index" | "onClose" | "onDismiss"
> & {
    children?: ReactNode;
    contentStyle?: StyleProp<ViewStyle>;
    isPresented: boolean;
    onDismiss: () => void;
};
