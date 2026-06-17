import {createElevationTokens} from "./elevation";

export function createShadowTokens(shadowTint: string) {
    const elevation = createElevationTokens(shadowTint);

    return {
        surface: {
            ...elevation.ios.level1,
            elevation: elevation.android.level1.elevation,
        },
        elevated: {
            ...elevation.ios.level2,
            elevation: elevation.android.level2.elevation,
        },
        floating: {
            ...elevation.ios.level3,
            elevation: elevation.android.level3.elevation,
        },
        overlay: {
            ...elevation.ios.level4,
            elevation: elevation.android.level4.elevation,
        },
    };
}

export type AppShadows = ReturnType<typeof createShadowTokens>;
