import type {PropsWithChildren} from "react";
import type {StyleProp, ViewProps, ViewStyle} from "react-native";

export type SurfaceVariant =
    | "default"
    | "muted"
    | "outline"
    | "flat"
    | "card"
    | "elevated"
    | "tonal"
    | "inverse"
    | "success"
    | "warning"
    | "danger"
    | "info";

export type SurfaceProps = PropsWithChildren<
    Omit<ViewProps, "style"> & {
        style?: StyleProp<ViewStyle>;
        variant?: SurfaceVariant;
    }
>;
