import type {AppTheme} from "../../../theme";
import type {CardUnionAxis, CardUnionLayout} from "./CardUnionTypes";
import {
    getBottomRoundedRectPath,
    getLeftRoundedRectPath,
    getRectPath,
    getRightRoundedRectPath,
    getTopRoundedRectPath,
} from "./CardUnionPathUtils";

type CardUnionBridgeGeometry = {
    height: number;
    radius: number;
    slotHeight: number;
    slotWidth: number;
    width: number;
    x: number;
    y: number;
};

export function getCardUnionCutoutPath({
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
    if (itemLayouts.length < 2) {
        return "";
    }

    if (axis === "horizontal") {
        return itemLayouts
            .slice(0, -1)
            .map((layout, index) =>
                getHorizontalCardUnionCutoutPath({
                    layout,
                    nextLayout: itemLayouts[index + 1],
                    rootLayout,
                    theme,
                })
            )
            .join(" ");
    }

    return itemLayouts
        .slice(0, -1)
        .map((layout, index) =>
            getVerticalCardUnionCutoutPath({
                layout,
                nextLayout: itemLayouts[index + 1],
                rootLayout,
                theme,
            })
        )
        .join(" ");
}

export function getCardUnionBridgePaths({
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
    if (itemLayouts.length < 2) {
        return [];
    }

    if (axis === "horizontal") {
        return itemLayouts.slice(0, -1).map((layout, index) =>
            getHorizontalCardUnionBridgePath({
                layout,
                nextLayout: itemLayouts[index + 1],
                rootLayout,
                theme,
            })
        );
    }

    return itemLayouts.slice(0, -1).map((layout, index) =>
        getVerticalCardUnionBridgePath({
            layout,
            nextLayout: itemLayouts[index + 1],
            rootLayout,
            theme,
        })
    );
}

function getHorizontalCardUnionBridgePath({
    layout,
    nextLayout,
    rootLayout,
    theme,
}: {
    layout: CardUnionLayout;
    nextLayout: CardUnionLayout;
    rootLayout: CardUnionLayout;
    theme: AppTheme;
}) {
    const geometry = getHorizontalCardUnionBridgeGeometry({
        gapStart: layout.x + layout.width,
        gapEnd: nextLayout.x,
        rootHeight: rootLayout.height,
        theme,
    });
    const bridgeUnderlap = Math.min(geometry.radius, geometry.slotHeight);
    const y = geometry.y - bridgeUnderlap;
    const bottom = geometry.y + geometry.height + bridgeUnderlap;

    return getRectPath({
        height: bottom - y,
        width: geometry.width,
        x: geometry.x,
        y,
    });
}

function getVerticalCardUnionBridgePath({
    layout,
    nextLayout,
    rootLayout,
    theme,
}: {
    layout: CardUnionLayout;
    nextLayout: CardUnionLayout;
    rootLayout: CardUnionLayout;
    theme: AppTheme;
}) {
    const geometry = getVerticalCardUnionBridgeGeometry({
        gapStart: layout.y + layout.height,
        gapEnd: nextLayout.y,
        rootWidth: rootLayout.width,
        theme,
    });
    const bridgeUnderlap = Math.min(geometry.radius, geometry.slotWidth);
    const x = geometry.x - bridgeUnderlap;
    const right = geometry.x + geometry.width + bridgeUnderlap;

    return getRectPath({
        height: geometry.height,
        width: right - x,
        x,
        y: geometry.y,
    });
}

function getHorizontalCardUnionCutoutPath({
    layout,
    nextLayout,
    rootLayout,
    theme,
}: {
    layout: CardUnionLayout;
    nextLayout: CardUnionLayout;
    rootLayout: CardUnionLayout;
    theme: AppTheme;
}) {
    const geometry = getHorizontalCardUnionBridgeGeometry({
        gapStart: layout.x + layout.width,
        gapEnd: nextLayout.x,
        rootHeight: rootLayout.height,
        theme,
    });
    const edgeOverlap = theme.cardUnion.bridge.edgeOverlap;
    const width = geometry.width + edgeOverlap * 2;
    const x = geometry.x - edgeOverlap;
    const topHeight = geometry.slotHeight + edgeOverlap;
    const bottomY = geometry.y + geometry.height - edgeOverlap;
    const bottomHeight =
        rootLayout.height - (geometry.y + geometry.height) + edgeOverlap;

    return [
        getBottomRoundedRectPath({
            height: topHeight,
            radius: geometry.radius,
            width,
            x,
            y: 0,
        }),
        getTopRoundedRectPath({
            height: bottomHeight,
            radius: geometry.radius,
            width,
            x,
            y: bottomY,
        }),
    ].join(" ");
}

function getVerticalCardUnionCutoutPath({
    layout,
    nextLayout,
    rootLayout,
    theme,
}: {
    layout: CardUnionLayout;
    nextLayout: CardUnionLayout;
    rootLayout: CardUnionLayout;
    theme: AppTheme;
}) {
    const geometry = getVerticalCardUnionBridgeGeometry({
        gapStart: layout.y + layout.height,
        gapEnd: nextLayout.y,
        rootWidth: rootLayout.width,
        theme,
    });
    const edgeOverlap = theme.cardUnion.bridge.edgeOverlap;
    const height = geometry.height + edgeOverlap * 2;
    const y = geometry.y - edgeOverlap;
    const radius = Math.min(theme.cardUnion.bridge.capRadius, height / 2);

    return [
        getRightRoundedRectPath({
            height,
            radius,
            width: geometry.slotWidth,
            x: 0,
            y,
        }),
        getLeftRoundedRectPath({
            height,
            radius,
            width: geometry.slotWidth,
            x: rootLayout.width - geometry.slotWidth,
            y,
        }),
    ].join(" ");
}

function getHorizontalCardUnionBridgeGeometry({
    gapEnd,
    gapStart,
    rootHeight,
    theme,
}: {
    gapEnd: number;
    gapStart: number;
    rootHeight: number;
    theme: AppTheme;
}): CardUnionBridgeGeometry {
    const gapWidth = Math.max(0, gapEnd - gapStart);
    const centerX = gapStart + gapWidth / 2;
    const height = Number(
        (rootHeight * theme.cardUnion.bridge.span).toFixed(2)
    );
    const width = Math.min(gapWidth, theme.cardUnion.bridge.cutoutThickness);
    const x = centerX - width / 2;
    const y = Number(((rootHeight - height) / 2).toFixed(2));
    const radius = Math.min(theme.cardUnion.bridge.capRadius, width / 2);

    return {
        height,
        radius,
        slotHeight: y,
        slotWidth: 0,
        width,
        x,
        y,
    };
}

function getVerticalCardUnionBridgeGeometry({
    gapEnd,
    gapStart,
    rootWidth,
    theme,
}: {
    gapEnd: number;
    gapStart: number;
    rootWidth: number;
    theme: AppTheme;
}): CardUnionBridgeGeometry {
    const gapHeight = Math.max(0, gapEnd - gapStart);
    const centerY = gapStart + gapHeight / 2;
    const width = Number((rootWidth * theme.cardUnion.bridge.span).toFixed(2));
    const height = Math.min(gapHeight, theme.cardUnion.bridge.cutoutThickness);
    const x = Number(((rootWidth - width) / 2).toFixed(2));
    const y = centerY - height / 2;
    const radius = Math.min(theme.cardUnion.bridge.capRadius, height / 2);

    return {
        height,
        radius,
        slotHeight: 0,
        slotWidth: x,
        width,
        x,
        y,
    };
}
