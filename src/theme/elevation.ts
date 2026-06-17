import type {ViewStyle} from "react-native";

type ShadowOffset = NonNullable<ViewStyle["shadowOffset"]>;

function createIosElevationLevel({
    shadowColor,
    shadowOpacity,
    shadowRadius,
    shadowOffset,
}: {
    shadowColor: string;
    shadowOpacity: number;
    shadowRadius: number;
    shadowOffset: ShadowOffset;
}) {
    return {
        shadowColor,
        shadowOffset,
        shadowOpacity,
        shadowRadius,
    };
}

export function createElevationTokens(shadowTint: string) {
    const ios = {
        level0: createIosElevationLevel({
            shadowColor: shadowTint,
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 0,
            shadowRadius: 0,
        }),
        level1: createIosElevationLevel({
            shadowColor: shadowTint,
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.06,
            shadowRadius: 8,
        }),
        level2: createIosElevationLevel({
            shadowColor: shadowTint,
            shadowOffset: {width: 0, height: 6},
            shadowOpacity: 0.08,
            shadowRadius: 14,
        }),
        level3: createIosElevationLevel({
            shadowColor: shadowTint,
            shadowOffset: {width: 0, height: 12},
            shadowOpacity: 0.1,
            shadowRadius: 22,
        }),
        level4: createIosElevationLevel({
            shadowColor: shadowTint,
            shadowOffset: {width: 0, height: 18},
            shadowOpacity: 0.14,
            shadowRadius: 32,
        }),
    };

    const android = {
        level0: {elevation: 0},
        level1: {elevation: 1},
        level2: {elevation: 3},
        level3: {elevation: 6},
        level4: {elevation: 8},
    } as const;

    return {
        ios,
        android,
    };
}

export type AppElevation = ReturnType<typeof createElevationTokens>;
