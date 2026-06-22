import type {PropsWithChildren} from "react";
import type {
    ColorValue,
    GestureResponderEvent,
    StyleProp,
    ViewProps,
    ViewStyle,
} from "react-native";

export type ConnectedCardOrientation = "horizontal" | "vertical";

export type ConnectedCardGap = "compact" | "default" | "relaxed";

export type ConnectedCardSize = "compact" | "default" | "hero";

export type ConnectedCardTone =
    | "contrast"
    | "success"
    | "warning"
    | "danger"
    | "info";

export type ConnectedCardProps = PropsWithChildren<
    Omit<ViewProps, "style"> & {
        animated?: boolean;
        animationDelayMs?: number;
        bridgeColor?: string;
        cutoutColor?: ColorValue;
        gap?: ConnectedCardGap;
        orientation?: ConnectedCardOrientation;
        size?: ConnectedCardSize;
        style?: StyleProp<ViewStyle>;
        tone?: ConnectedCardTone;
    }
>;

export type ConnectedCardItemProps = PropsWithChildren<
    Omit<ViewProps, "style"> & {
        contentStyle?: StyleProp<ViewStyle>;
        disabled?: boolean;
        onPress?: (event: GestureResponderEvent) => void;
        style?: StyleProp<ViewStyle>;
    }
>;

// Internal: ConnectedCardConnector is an implementation detail of ConnectedCard
// and is not part of the public barrel (src/components/common/index.ts).
export type ConnectedCardConnectorProps = {
    animated: boolean;
    bridgeColor?: string;
    cutoutColor?: ColorValue;
    delayMs: number;
    gap: ConnectedCardGap;
    morphIndex: number;
    orientation: ConnectedCardOrientation;
    size: ConnectedCardSize;
    tone: ConnectedCardTone;
};

export type ConnectedCardContextValue = {
    orientation: ConnectedCardOrientation;
    size: ConnectedCardSize;
    tone: ConnectedCardTone;
};
