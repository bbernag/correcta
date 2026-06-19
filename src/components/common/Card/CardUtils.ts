import type {ViewStyle} from "react-native";

import type {AppTheme} from "../../../theme";
import type {CardGap, CardLayout, CardOrientation, CardSize} from "./CardTypes";

type CardBridgeGeometry = {
    height: number;
    radius: number;
    slotHeight: number;
    slotWidth: number;
    width: number;
    x: number;
    y: number;
};

type CardSeam = {
    layout: CardLayout;
    nextLayout: CardLayout;
    rootLayout: CardLayout;
    theme: AppTheme;
};

export function getCardGapStyle({
    gap,
    orientation,
    theme,
}: {
    gap: CardGap;
    orientation: CardOrientation;
    theme: AppTheme;
}): ViewStyle {
    const gapValue = theme.card.gap[gap];

    if (orientation === "horizontal") {
        return {
            alignSelf: "stretch",
            width: gapValue,
        };
    }

    return {
        height: gapValue,
    };
}

export function getCardItemStyle({
    orientation,
    size,
    theme,
}: {
    orientation: CardOrientation;
    size: CardSize;
    theme: AppTheme;
}): ViewStyle {
    return {
        backgroundColor: "transparent",
        borderRadius: theme.card.radius[size],
        flex: orientation === "horizontal" ? 1 : undefined,
        padding: theme.card.padding[size],
    };
}

export function getCardSurfacePath({
    itemLayouts,
    orientation,
    rootLayout,
    size,
    theme,
}: {
    itemLayouts: CardLayout[];
    orientation: CardOrientation;
    rootLayout: CardLayout;
    size: CardSize;
    theme: AppTheme;
}) {
    const cardRadius = theme.card.radius[size];
    const itemPaths = itemLayouts.map((layout) =>
        getRoundedRectPath({
            height: layout.height,
            radius: cardRadius,
            width: layout.width,
            x: layout.x,
            y: layout.y,
        })
    );
    const bridgePaths = getCardBridgePaths({
        itemLayouts,
        orientation,
        rootLayout,
        theme,
    });

    return [...itemPaths, ...bridgePaths].join(" ");
}

export function getCardCutoutPath({
    itemLayouts,
    orientation,
    rootLayout,
    theme,
}: {
    itemLayouts: CardLayout[];
    orientation: CardOrientation;
    rootLayout: CardLayout;
    theme: AppTheme;
}) {
    if (itemLayouts.length < 2) {
        return "";
    }

    const getSeamPath =
        orientation === "horizontal"
            ? getHorizontalCardCutoutPath
            : getVerticalCardCutoutPath;

    return itemLayouts
        .slice(0, -1)
        .map((layout, index) =>
            getSeamPath({
                layout,
                nextLayout: itemLayouts[index + 1],
                rootLayout,
                theme,
            })
        )
        .join(" ");
}

function getCardBridgePaths({
    itemLayouts,
    orientation,
    rootLayout,
    theme,
}: {
    itemLayouts: CardLayout[];
    orientation: CardOrientation;
    rootLayout: CardLayout;
    theme: AppTheme;
}) {
    if (itemLayouts.length < 2) {
        return [];
    }

    const getSeamPath =
        orientation === "horizontal"
            ? getHorizontalCardBridgePath
            : getVerticalCardBridgePath;

    return itemLayouts.slice(0, -1).map((layout, index) =>
        getSeamPath({
            layout,
            nextLayout: itemLayouts[index + 1],
            rootLayout,
            theme,
        })
    );
}

function getHorizontalCardBridgePath({
    layout,
    nextLayout,
    rootLayout,
    theme,
}: CardSeam) {
    const geometry = getHorizontalCardBridgeGeometry({
        gapEnd: nextLayout.x,
        gapStart: layout.x + layout.width,
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

function getVerticalCardBridgePath({
    layout,
    nextLayout,
    rootLayout,
    theme,
}: CardSeam) {
    const geometry = getVerticalCardBridgeGeometry({
        gapEnd: nextLayout.y,
        gapStart: layout.y + layout.height,
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

function getHorizontalCardCutoutPath({
    layout,
    nextLayout,
    rootLayout,
    theme,
}: CardSeam) {
    const geometry = getHorizontalCardBridgeGeometry({
        gapEnd: nextLayout.x,
        gapStart: layout.x + layout.width,
        rootHeight: rootLayout.height,
        theme,
    });
    const edgeOverlap = theme.card.bridge.edgeOverlap;
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

function getVerticalCardCutoutPath({
    layout,
    nextLayout,
    rootLayout,
    theme,
}: CardSeam) {
    const geometry = getVerticalCardBridgeGeometry({
        gapEnd: nextLayout.y,
        gapStart: layout.y + layout.height,
        rootWidth: rootLayout.width,
        theme,
    });
    const edgeOverlap = theme.card.bridge.edgeOverlap;
    const height = geometry.height + edgeOverlap * 2;
    const y = geometry.y - edgeOverlap;
    const radius = Math.min(theme.card.bridge.capRadius, height / 2);

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

function getHorizontalCardBridgeGeometry({
    gapEnd,
    gapStart,
    rootHeight,
    theme,
}: {
    gapEnd: number;
    gapStart: number;
    rootHeight: number;
    theme: AppTheme;
}): CardBridgeGeometry {
    const gapWidth = Math.max(0, gapEnd - gapStart);
    const centerX = gapStart + gapWidth / 2;
    const height = Number((rootHeight * theme.card.bridge.span).toFixed(2));
    const width = Math.min(gapWidth, theme.card.bridge.cutoutThickness);
    const x = centerX - width / 2;
    const y = Number(((rootHeight - height) / 2).toFixed(2));
    const radius = Math.min(theme.card.bridge.capRadius, width / 2);

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

function getVerticalCardBridgeGeometry({
    gapEnd,
    gapStart,
    rootWidth,
    theme,
}: {
    gapEnd: number;
    gapStart: number;
    rootWidth: number;
    theme: AppTheme;
}): CardBridgeGeometry {
    const gapHeight = Math.max(0, gapEnd - gapStart);
    const centerY = gapStart + gapHeight / 2;
    const width = Number((rootWidth * theme.card.bridge.span).toFixed(2));
    const height = Math.min(gapHeight, theme.card.bridge.cutoutThickness);
    const x = Number(((rootWidth - width) / 2).toFixed(2));
    const y = centerY - height / 2;
    const radius = Math.min(theme.card.bridge.capRadius, height / 2);

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

function getRoundedRectPath({
    height,
    radius,
    width,
    x,
    y,
}: CardLayout & {radius: number}) {
    const resolvedRadius = getClampedRadius({height, radius, width});
    const right = x + width;
    const bottom = y + height;

    return [
        `M ${x + resolvedRadius} ${y}`,
        `H ${right - resolvedRadius}`,
        `Q ${right} ${y} ${right} ${y + resolvedRadius}`,
        `V ${bottom - resolvedRadius}`,
        `Q ${right} ${bottom} ${right - resolvedRadius} ${bottom}`,
        `H ${x + resolvedRadius}`,
        `Q ${x} ${bottom} ${x} ${bottom - resolvedRadius}`,
        `V ${y + resolvedRadius}`,
        `Q ${x} ${y} ${x + resolvedRadius} ${y}`,
        "Z",
    ].join(" ");
}

function getRectPath({height, width, x, y}: CardLayout) {
    const right = x + width;
    const bottom = y + height;

    return [`M ${x} ${y}`, `H ${right}`, `V ${bottom}`, `H ${x}`, "Z"].join(
        " "
    );
}

function getRightRoundedRectPath({
    height,
    radius,
    width,
    x,
    y,
}: CardLayout & {radius: number}) {
    const resolvedRadius = Math.min(radius, height / 2, width);
    const right = x + width;
    const bottom = y + height;

    return [
        `M ${x} ${y}`,
        `H ${right - resolvedRadius}`,
        `Q ${right} ${y} ${right} ${y + resolvedRadius}`,
        `V ${bottom - resolvedRadius}`,
        `Q ${right} ${bottom} ${right - resolvedRadius} ${bottom}`,
        `H ${x}`,
        "Z",
    ].join(" ");
}

function getLeftRoundedRectPath({
    height,
    radius,
    width,
    x,
    y,
}: CardLayout & {radius: number}) {
    const resolvedRadius = Math.min(radius, height / 2, width);
    const right = x + width;
    const bottom = y + height;

    return [
        `M ${x + resolvedRadius} ${y}`,
        `H ${right}`,
        `V ${bottom}`,
        `H ${x + resolvedRadius}`,
        `Q ${x} ${bottom} ${x} ${bottom - resolvedRadius}`,
        `V ${y + resolvedRadius}`,
        `Q ${x} ${y} ${x + resolvedRadius} ${y}`,
        "Z",
    ].join(" ");
}

function getBottomRoundedRectPath({
    height,
    radius,
    width,
    x,
    y,
}: CardLayout & {radius: number}) {
    const resolvedRadius = Math.min(radius, height, width / 2);
    const right = x + width;
    const bottom = y + height;

    return [
        `M ${x} ${y}`,
        `H ${right}`,
        `V ${bottom - resolvedRadius}`,
        `Q ${right} ${bottom} ${right - resolvedRadius} ${bottom}`,
        `H ${x + resolvedRadius}`,
        `Q ${x} ${bottom} ${x} ${bottom - resolvedRadius}`,
        "Z",
    ].join(" ");
}

function getTopRoundedRectPath({
    height,
    radius,
    width,
    x,
    y,
}: CardLayout & {radius: number}) {
    const resolvedRadius = Math.min(radius, height, width / 2);
    const right = x + width;
    const bottom = y + height;

    return [
        `M ${x + resolvedRadius} ${y}`,
        `H ${right - resolvedRadius}`,
        `Q ${right} ${y} ${right} ${y + resolvedRadius}`,
        `V ${bottom}`,
        `H ${x}`,
        `V ${y + resolvedRadius}`,
        `Q ${x} ${y} ${x + resolvedRadius} ${y}`,
        "Z",
    ].join(" ");
}

function getClampedRadius({
    height,
    radius,
    width,
}: {
    height: number;
    radius: number;
    width: number;
}) {
    return Math.min(radius, height / 2, width / 2);
}
