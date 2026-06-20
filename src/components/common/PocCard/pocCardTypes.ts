import type {PropsWithChildren} from "react";
import type {ColorValue, StyleProp, ViewProps, ViewStyle} from "react-native";

export type PocCardOrientation = "horizontal" | "vertical";

export type PocCardTone =
    | "contrast"
    | "success"
    | "warning"
    | "danger"
    | "info";

export type PocCardProps = PropsWithChildren<
    Omit<ViewProps, "style"> & {
        bridgeSpan?: number;
        cutoutColor?: ColorValue;
        orientation?: PocCardOrientation;
        style?: StyleProp<ViewStyle>;
        tone?: PocCardTone;
    }
>;

export type PocCardSectionProps = PropsWithChildren<
    Omit<ViewProps, "style"> & {
        contentStyle?: StyleProp<ViewStyle>;
        style?: StyleProp<ViewStyle>;
    }
>;

export type PocCardConnectorProps = {
    bridgeSpan: number;
    cutoutColor?: ColorValue;
    orientation: PocCardOrientation;
    tone: PocCardTone;
};

export type PocCardContextValue = {
    orientation: PocCardOrientation;
    tone: PocCardTone;
};
