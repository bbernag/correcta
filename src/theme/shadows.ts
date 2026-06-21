import {Platform} from "react-native";

import {createElevationTokens} from "./elevation";

export function createShadowTokens(shadowTint: string) {
    const elevation = createElevationTokens(shadowTint);

    return {
        surface: createPlatformShadow({
            android: elevation.android.level1,
            ios: elevation.ios.level1,
        }),
        elevated: createPlatformShadow({
            android: elevation.android.level2,
            ios: elevation.ios.level2,
        }),
        floating: createPlatformShadow({
            android: elevation.android.level3,
            ios: elevation.ios.level3,
        }),
        overlay: createPlatformShadow({
            android: elevation.android.level4,
            ios: elevation.ios.level4,
        }),
    };
}

function createPlatformShadow({
    android,
    ios,
}: {
    android: {elevation: number};
    ios: {
        shadowColor: string;
        shadowOffset: {height: number; width: number};
        shadowOpacity: number;
        shadowRadius: number;
    };
}) {
    if (Platform.OS === "android") {
        return android;
    }

    if (Platform.OS === "ios") {
        return ios;
    }

    return {
        ...ios,
        ...android,
    };
}

export type AppShadows = ReturnType<typeof createShadowTokens>;
