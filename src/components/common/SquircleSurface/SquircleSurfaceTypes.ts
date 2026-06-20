import type {PropsWithChildren} from "react";
import type {StyleProp, ViewProps, ViewStyle} from "react-native";

export type SquircleSurfaceRadius = "compact" | "default" | "hero" | "pill";

export type SquircleSurfaceProps = PropsWithChildren<
    Omit<ViewProps, "style"> & {
        radius?: SquircleSurfaceRadius;
        style?: StyleProp<ViewStyle>;
    }
>;
