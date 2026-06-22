import {GlassView, isLiquidGlassAvailable} from "expo-glass-effect";
import {StyleSheet, useUnistyles} from "react-native-unistyles";

import type {AppTheme} from "../../../theme";
import {SquircleSurface} from "../SquircleSurface";
import type {SquircleSurfaceRadius} from "../SquircleSurface";
import type {GlassSurfaceProps} from "./glassSurfaceTypes";

// Liquid Glass availability is fixed at build time (OS + compiler + Info.plist),
// so it is resolved once at module load rather than on every render.
const LIQUID_GLASS_AVAILABLE = isLiquidGlassAvailable();

export function GlassSurface({
    children,
    glassEffectStyle = "regular",
    isInteractive = false,
    radius = "compact",
    style,
    tintColor,
    ...viewProps
}: GlassSurfaceProps) {
    const {theme} = useUnistyles();

    if (LIQUID_GLASS_AVAILABLE) {
        return (
            <GlassView
                glassEffectStyle={glassEffectStyle}
                isInteractive={isInteractive}
                style={[{borderRadius: getRadiusValue(radius, theme)}, style]}
                tintColor={tintColor}
                {...viewProps}
            >
                {children}
            </GlassView>
        );
    }

    return (
        <SquircleSurface
            radius={radius}
            style={[
                styles.fallback,
                tintColor ? {backgroundColor: tintColor} : null,
                style,
            ]}
            {...viewProps}
        >
            {children}
        </SquircleSurface>
    );
}

function getRadiusValue(radius: SquircleSurfaceRadius, theme: AppTheme) {
    if (radius === "pill") {
        return theme.radii.pill;
    }

    return theme.card.radius[radius];
}

const styles = StyleSheet.create((theme) => ({
    fallback: {
        backgroundColor: theme.colors.surfaceGlassFallback,
    },
}));
