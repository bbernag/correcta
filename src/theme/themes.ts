import {darkColors, lightColors} from "./colors";
import {motionPrimitives} from "./motion";
import {radius} from "./radius";
import {createShadowTokens} from "./shadows";
import {spacing} from "./spacing";
import {fontSizes, fontWeights, lineHeights} from "./typography";

export const lightTheme = {
    colors: lightColors,
    spacing,
    radius,
    radii: radius,
    typography: fontSizes,
    lineHeights,
    fontWeights,
    shadows: createShadowTokens(lightColors.shadowTint),
    motion: motionPrimitives,
} as const;

export const darkTheme = {
    colors: darkColors,
    spacing,
    radius,
    radii: radius,
    typography: fontSizes,
    lineHeights,
    fontWeights,
    shadows: createShadowTokens(darkColors.shadowTint),
    motion: motionPrimitives,
} as const;

export const appThemes = {
    light: lightTheme,
    dark: darkTheme,
};

export const appBreakpoints = {
    portrait: 0,
    landscape: 768,
};

export type AppTheme = typeof lightTheme;
