import {View} from "react-native";
import Svg, {Path} from "react-native-svg";
import {StyleSheet, useUnistyles} from "react-native-unistyles";

import type {CardUnionSurfaceProps} from "./CardUnionTypes";
import {
    getCardUnionCutoutPath,
    getCardUnionSurfacePath,
} from "./CardUnionUtils";

export function CardUnionSurface({
    axis,
    itemLayouts,
    rootLayout,
}: CardUnionSurfaceProps) {
    const {theme} = useUnistyles();
    const surfacePath = getCardUnionSurfacePath({
        axis,
        itemLayouts,
        rootLayout,
        theme,
    });
    const cutoutPath = getCardUnionCutoutPath({
        axis,
        itemLayouts,
        rootLayout,
        theme,
    });

    return (
        <View
            accessibilityElementsHidden
            accessible={false}
            importantForAccessibility="no-hide-descendants"
            pointerEvents="none"
            style={styles.root}
        >
            <Svg
                height={rootLayout.height}
                pointerEvents="none"
                viewBox={`0 0 ${rootLayout.width} ${rootLayout.height}`}
                width={rootLayout.width}
            >
                <Path d={surfacePath} fill={theme.colors.surfaceContrast} />
                {cutoutPath ? (
                    <Path d={cutoutPath} fill={theme.colors.canvas} />
                ) : null}
            </Svg>
        </View>
    );
}

const styles = StyleSheet.create(() => ({
    root: {
        bottom: 0,
        left: 0,
        position: "absolute",
        right: 0,
        top: 0,
        zIndex: 0,
    },
}));
