import {useEffect} from "react";
import {useColorScheme} from "react-native";
import {UnistylesRuntime} from "react-native-unistyles";

import {appThemes} from "../theme/themes";

type AppThemeName = keyof typeof appThemes;

export function useSyncUnistylesTheme() {
    const colorScheme = useColorScheme();
    const themeName: AppThemeName = colorScheme === "dark" ? "dark" : "light";

    useEffect(() => {
        if (UnistylesRuntime.themeName !== themeName) {
            UnistylesRuntime.setTheme(themeName);
        }

        UnistylesRuntime.setRootViewBackgroundColor(
            appThemes[themeName].colors.backgroundPrimary
        );
    }, [themeName]);

    return themeName;
}
