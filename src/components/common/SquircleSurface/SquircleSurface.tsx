import FastSquircleView from "react-native-fast-squircle";
import {StyleSheet, useUnistyles} from "react-native-unistyles";

import type {AppTheme} from "../../../theme";
import type {
    SquircleSurfaceProps,
    SquircleSurfaceRadius,
} from "./SquircleSurfaceTypes";

export function SquircleSurface({
    children,
    radius = "compact",
    style,
    ...viewProps
}: SquircleSurfaceProps) {
    const {theme} = useUnistyles();

    return (
        <FastSquircleView
            cornerSmoothing={theme.card.cornerSmoothing}
            style={[
                styles.root,
                getSquircleRadiusStyle({radius, theme}),
                style,
            ]}
            {...viewProps}
        >
            {children}
        </FastSquircleView>
    );
}

function getSquircleRadiusStyle({
    radius,
    theme,
}: {
    radius: SquircleSurfaceRadius;
    theme: AppTheme;
}) {
    if (radius === "pill") {
        return {
            borderRadius: theme.radii.pill,
        };
    }

    return {
        borderRadius: theme.card.radius[radius],
    };
}

const styles = StyleSheet.create(() => ({
    root: {
        overflow: "hidden",
    },
}));
