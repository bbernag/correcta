import type {PropsWithChildren} from "react";
import type {StyleProp, ViewProps, ViewStyle} from "react-native";

import type {SquircleSurfaceRadius} from "../SquircleSurface";

export type GlassSurfaceStyle = "clear" | "regular";

export type GlassSurfaceProps = PropsWithChildren<
    Omit<ViewProps, "style"> & {
        glassEffectStyle?: GlassSurfaceStyle;
        isInteractive?: boolean;
        radius?: SquircleSurfaceRadius;
        style?: StyleProp<ViewStyle>;
        tintColor?: string;
    }
>;
