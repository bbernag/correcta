import {Appearance} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {appBreakpoints, appThemes, type AppTheme} from "./themes";

declare module "react-native-unistyles" {
    export interface UnistylesThemes {
        light: AppTheme;
        dark: AppTheme;
    }
}

type AppThemeName = keyof typeof appThemes;

function getInitialTheme(): AppThemeName {
    return Appearance.getColorScheme() === "dark" ? "dark" : "light";
}

StyleSheet.configure({
    settings: {
        initialTheme: getInitialTheme,
    },
    themes: appThemes,
    breakpoints: appBreakpoints,
});

export {appBreakpoints, appThemes};
export type {AppTheme};
