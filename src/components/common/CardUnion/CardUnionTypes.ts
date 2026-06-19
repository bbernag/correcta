import type {PropsWithChildren} from "react";
import type {
    GestureResponderEvent,
    LayoutRectangle,
    StyleProp,
    ViewProps,
    ViewStyle,
} from "react-native";

export type CardUnionAxis = "horizontal" | "vertical";

export type CardUnionProps = PropsWithChildren<
    Omit<ViewProps, "style"> & {
        axis?: CardUnionAxis;
        disabled?: boolean;
        onPress?: (event: GestureResponderEvent) => void;
        style?: StyleProp<ViewStyle>;
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
};

export type CardUnionLayout = Pick<
    LayoutRectangle,
    "height" | "width" | "x" | "y"
>;

export type CardUnionSurfaceProps = {
    axis: CardUnionAxis;
    itemLayouts: CardUnionLayout[];
    rootLayout: CardUnionLayout;
};
