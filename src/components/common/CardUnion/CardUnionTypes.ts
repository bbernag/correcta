import type {PropsWithChildren} from "react";
import type {
    GestureResponderEvent,
    LayoutRectangle,
    StyleProp,
    ViewProps,
    ViewStyle,
} from "react-native";

export type CardUnionAxis = "horizontal" | "vertical";
export type CardUnionGap = "compact" | "default" | "relaxed";
export type CardUnionSize = "compact" | "default" | "hero";
export type CardUnionTone = "contrast";

export type CardUnionProps = PropsWithChildren<
    Omit<ViewProps, "style"> & {
        axis?: CardUnionAxis;
        bridgeSpan?: number;
        gap?: CardUnionGap;
        size?: CardUnionSize;
        style?: StyleProp<ViewStyle>;
        tone?: CardUnionTone;
    }
>;

export type CardUnionItemProps = PropsWithChildren<
    Omit<ViewProps, "style"> & {
        contentStyle?: StyleProp<ViewStyle>;
        disabled?: boolean;
        onPress?: (event: GestureResponderEvent) => void;
        style?: StyleProp<ViewStyle>;
    }
>;

export type CardUnionContextValue = {
    axis: CardUnionAxis;
    size: CardUnionSize;
    tone: CardUnionTone;
};

export type CardUnionLayout = Pick<
    LayoutRectangle,
    "height" | "width" | "x" | "y"
>;

export type CardUnionSurfaceProps = {
    axis: CardUnionAxis;
    bridgeSpan: number;
    itemLayouts: CardUnionLayout[];
    rootLayout: CardUnionLayout;
    size: CardUnionSize;
};
