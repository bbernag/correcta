import {StyleSheet} from "react-native-unistyles";

import {appBreakpoints, appThemes, type AppTheme} from "./tokens";

declare module "react-native-unistyles" {
    export interface UnistylesThemes {
        light: AppTheme;
        dark: AppTheme;
    }
}

StyleSheet.configure({
    settings: {
        adaptiveThemes: true,
    },
    themes: appThemes,
    breakpoints: appBreakpoints,
});

export {appBreakpoints, appThemes};
export type {AppTheme};
