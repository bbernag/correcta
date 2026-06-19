import type {ViewStyle} from "react-native";

import type {AppTheme} from "../../../theme";
import type {CardUnionAxis, CardUnionLayout} from "./CardUnionTypes";
import {
    getCardUnionBridgePaths,
    getCardUnionCutoutPath,
} from "./CardUnionGeometryUtils";
import {getRoundedRectPath} from "./CardUnionPathUtils";

export {getCardUnionCutoutPath};

export function getCardUnionGapStyle({
    axis,
    theme,
}: {
    axis: CardUnionAxis;
    theme: AppTheme;
}): ViewStyle {
    if (axis === "horizontal") {
        return {
            alignSelf: "stretch",
            width: theme.cardUnion.gap,
        };
    }

    return {
        height: theme.cardUnion.gap,
    };
}

export function getCardUnionItemStyle({
    axis,
    theme,
}: {
    axis: CardUnionAxis;
    theme: AppTheme;
}): ViewStyle {
    return {
        backgroundColor: "transparent",
        borderRadius: theme.cardUnion.radius,
        flex: axis === "horizontal" ? 1 : undefined,
        padding: theme.cardUnion.padding,
    };
}

export function getCardUnionSurfacePath({
    axis,
    itemLayouts,
    rootLayout,
    theme,
}: {
    axis: CardUnionAxis;
    itemLayouts: CardUnionLayout[];
    rootLayout: CardUnionLayout;
    theme: AppTheme;
}) {
    const itemPaths = itemLayouts.map((layout) =>
        getRoundedRectPath({
            height: layout.height,
            radius: theme.cardUnion.radius,
            width: layout.width,
            x: layout.x,
            y: layout.y,
        })
    );
    const bridgePaths = getCardUnionBridgePaths({
        axis,
        itemLayouts,
        rootLayout,
        theme,
    });

    return [...itemPaths, ...bridgePaths].join(" ");
}
