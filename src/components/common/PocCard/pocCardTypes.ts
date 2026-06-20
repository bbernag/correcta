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
        bridgeColor?: string;
        bridgeSpan?: number;
        cutoutColor?: ColorValue;
        orientation?: PocCardOrientation;
        style?: StyleProp<ViewStyle>;
        tone?: PocCardTone;
    }
>;

export type PocCardSectionGradient = {
    from: string;
    to: string;
};

export type PocCardSectionProps = PropsWithChildren<
    Omit<ViewProps, "style"> & {
        contentStyle?: StyleProp<ViewStyle>;
        gradient?: PocCardSectionGradient;
        style?: StyleProp<ViewStyle>;
    }
>;

export type PocCardConnectorProps = {
    bridgeColor?: string;
    bridgeSpan: number;
    cutoutColor?: ColorValue;
    orientation: PocCardOrientation;
    tone: PocCardTone;
};

export type PocCardContextValue = {
    orientation: PocCardOrientation;
    tone: PocCardTone;
};
