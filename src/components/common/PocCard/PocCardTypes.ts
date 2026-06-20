import type {PropsWithChildren} from "react";
import type {StyleProp, ViewProps, ViewStyle} from "react-native";

export type PocCardOrientation = "horizontal" | "vertical";

export type PocCardProps = PropsWithChildren<
    Omit<ViewProps, "style"> & {
        bridgeSpan?: number;
        orientation?: PocCardOrientation;
        style?: StyleProp<ViewStyle>;
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
    orientation: PocCardOrientation;
};

export type PocCardContextValue = {
    orientation: PocCardOrientation;
};
