import type {PropsWithChildren} from "react";
import type {
    GestureResponderEvent,
    LayoutRectangle,
    StyleProp,
    ViewProps,
    ViewStyle,
} from "react-native";

export type CardOrientation = "horizontal" | "vertical";
export type CardGap = "compact" | "default" | "relaxed";
export type CardSize = "compact" | "default" | "hero";
export type CardTone = "contrast";

export type CardProps = PropsWithChildren<
    Omit<ViewProps, "style"> & {
        gap?: CardGap;
        orientation?: CardOrientation;
        size?: CardSize;
        style?: StyleProp<ViewStyle>;
        tone?: CardTone;
    }
>;

export type CardItemProps = PropsWithChildren<
    Omit<ViewProps, "style"> & {
        contentStyle?: StyleProp<ViewStyle>;
        disabled?: boolean;
        onPress?: (event: GestureResponderEvent) => void;
        style?: StyleProp<ViewStyle>;
    }
>;

export type CardContextValue = {
    orientation: CardOrientation;
    size: CardSize;
    tone: CardTone;
};

export type CardLayout = Pick<LayoutRectangle, "height" | "width" | "x" | "y">;

export type CardSurfaceProps = {
    itemLayouts: CardLayout[];
    orientation: CardOrientation;
    rootLayout: CardLayout;
    size: CardSize;
};
