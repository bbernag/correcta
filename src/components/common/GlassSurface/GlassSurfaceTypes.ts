import type {PropsWithChildren} from "react";
import type {StyleProp, ViewProps, ViewStyle} from "react-native";

export type GlassSurfaceVariant =
    | "floatingControl"
    | "headerControl"
    | "tabBar"
    | "overlay"
    | "menu"
    | "chip";

export type GlassSurfaceProps = PropsWithChildren<
    Omit<ViewProps, "style"> & {
        style?: StyleProp<ViewStyle>;
        variant?: GlassSurfaceVariant;
    }
>;
