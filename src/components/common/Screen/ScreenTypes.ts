import type {PropsWithChildren} from "react";
import type {StyleProp, ViewStyle} from "react-native";
import type {Edge} from "react-native-safe-area-context";

export type ScreenBackground = "primary" | "secondary" | "surface" | "tonal";

export type ScreenSafeArea = "content" | "all" | "horizontal" | "none";

export type ScreenProps = PropsWithChildren<{
    background?: ScreenBackground;
    contentContainerStyle?: StyleProp<ViewStyle>;
    edges?: Edge[];
    safeArea?: ScreenSafeArea;
    scroll?: boolean;
    style?: StyleProp<ViewStyle>;
}>;
