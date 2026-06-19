import type {ViewStyle} from "react-native";

import type {AppTheme} from "../../../theme";
import type {
    CardUnionAxis,
    CardUnionGap,
    CardUnionLayout,
    CardUnionSize,
} from "./CardUnionTypes";

const CARD_UNION_EDGE_OVERLAP = 1;

export function clampCardUnionBridgeSpan({
    fallback,
    max,
    min,
    value,
}: {
    fallback: number;
    max: number;
    min: number;
    value: number | undefined;
}) {
    if (typeof value !== "number" || Number.isNaN(value)) {
        return Math.min(Math.max(fallback, min), max);
    }

    return Math.min(Math.max(value, min), max);
}

export function getCardUnionBridgeInset({
    size,
    span,
}: {
    size: number;
    span: number;
}) {
    return Number((((1 - span) / 2) * size).toFixed(2));
}

export function getCardUnionGapStyle({
    axis,
    gap,
    theme,
}: {
    axis: CardUnionAxis;
    gap: CardUnionGap;
    theme: AppTheme;
}): ViewStyle {
    const gapValue = theme.cardUnion.gap[gap];

    if (axis === "horizontal") {
        return {
            alignSelf: "stretch",
            width: gapValue,
        };
    }

    return {
        height: gapValue,
    };
}

export function getCardUnionItemStyle({
    axis,
    size,
    theme,
}: {
    axis: CardUnionAxis;
    size: CardUnionSize;
    theme: AppTheme;
}): ViewStyle {
    return {
        backgroundColor: "transparent",
        borderRadius: theme.cardUnion.radius[size],
        flex: axis === "horizontal" ? 1 : undefined,
        padding: theme.cardUnion.padding[size],
    };
}

export function getCardUnionSurfacePath({
    axis,
    bridgeSpan,
    itemLayouts,
    rootLayout,
    size,
    theme,
}: {
    axis: CardUnionAxis;
    bridgeSpan: number;
    itemLayouts: CardUnionLayout[];
    rootLayout: CardUnionLayout;
    size: CardUnionSize;
    theme: AppTheme;
}) {
    const cardRadius = theme.cardUnion.radius[size];
    const itemPaths = itemLayouts.map((layout) =>
        getRoundedRectPath({
            height: layout.height,
            radius: cardRadius,
            width: layout.width,
            x: layout.x,
            y: layout.y,
        })
    );
    const bridgePaths = getCardUnionBridgePaths({
        axis,
        bridgeSpan,
        itemLayouts,
        rootLayout,
        theme,
    });

    return [...itemPaths, ...bridgePaths].join(" ");
}

export function getCardUnionCutoutPath({
    axis,
    bridgeSpan,
    itemLayouts,
    rootLayout,
    theme,
}: {
    axis: CardUnionAxis;
    bridgeSpan: number;
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
            .map((layout, index) => {
                const nextLayout = itemLayouts[index + 1];
                const gapStart = layout.x + layout.width;
                const gapEnd = nextLayout.x;
                const centerX = gapStart + (gapEnd - gapStart) / 2;
                const width = Math.max(
                    gapEnd - gapStart + theme.cardUnion.bridge.cutoutThickness,
                    theme.cardUnion.bridge.cutoutThickness * 2
                );
                const x = centerX - width / 2;
                const radius = Math.min(
                    theme.cardUnion.bridge.capRadius,
                    theme.cardUnion.bridge.cutoutThickness / 2
                );

                return [
                    getBottomRoundedRectPath({
                        height: theme.cardUnion.bridge.cutoutThickness,
                        radius,
                        width,
                        x,
                        y: 0,
                    }),
                    getTopRoundedRectPath({
                        height: theme.cardUnion.bridge.cutoutThickness,
                        radius,
                        width,
                        x,
                        y:
                            rootLayout.height -
                            theme.cardUnion.bridge.cutoutThickness,
                    }),
                ].join(" ");
            })
            .join(" ");
    }

    return itemLayouts
        .slice(0, -1)
        .map((layout, index) => {
            const nextLayout = itemLayouts[index + 1];
            const gapStart = layout.y + layout.height;
            const gapEnd = nextLayout.y;
            const centerY = gapStart + (gapEnd - gapStart) / 2;
            const gapHeight = gapEnd - gapStart;
            const bridgeGeometry = getVerticalCardUnionBridgeGeometry({
                bridgeSpan,
                centerY,
                gapHeight,
                rootWidth: rootLayout.width,
                theme,
            });
            const height = bridgeGeometry.height + CARD_UNION_EDGE_OVERLAP * 2;
            const y = bridgeGeometry.y - CARD_UNION_EDGE_OVERLAP;
            const radius = Math.min(
                theme.cardUnion.bridge.capRadius,
                height / 2
            );

            return [
                getRightRoundedRectPath({
                    height,
                    radius,
                    width: bridgeGeometry.slotWidth,
                    x: 0,
                    y,
                }),
                getLeftRoundedRectPath({
                    height,
                    radius,
                    width: bridgeGeometry.slotWidth,
                    x: rootLayout.width - bridgeGeometry.slotWidth,
                    y,
                }),
            ].join(" ");
        })
        .join(" ");
}

function getRoundedRectPath({
    height,
    radius,
    width,
    x,
    y,
}: CardUnionLayout & {radius: number}) {
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

function getCardUnionBridgePaths({
    axis,
    bridgeSpan,
    itemLayouts,
    rootLayout,
    theme,
}: {
    axis: CardUnionAxis;
    bridgeSpan: number;
    itemLayouts: CardUnionLayout[];
    rootLayout: CardUnionLayout;
    theme: AppTheme;
}) {
    if (itemLayouts.length < 2) {
        return [];
    }

    if (axis === "horizontal") {
        return itemLayouts.slice(0, -1).map((layout, index) => {
            const nextLayout = itemLayouts[index + 1];
            const gapStart = layout.x + layout.width;
            const gapEnd = nextLayout.x;
            const width = gapEnd - gapStart;

            return getRectPath({
                height: rootLayout.height,
                width,
                x: gapStart,
                y: 0,
            });
        });
    }

    return itemLayouts.slice(0, -1).map((layout, index) => {
        const nextLayout = itemLayouts[index + 1];
        const gapStart = layout.y + layout.height;
        const gapEnd = nextLayout.y;
        const centerY = gapStart + (gapEnd - gapStart) / 2;
        const gapHeight = gapEnd - gapStart;
        const bridgeGeometry = getVerticalCardUnionBridgeGeometry({
            bridgeSpan,
            centerY,
            gapHeight,
            rootWidth: rootLayout.width,
            theme,
        });
        const bridgeUnderlap = Math.min(
            bridgeGeometry.radius,
            bridgeGeometry.slotWidth
        );
        const x = bridgeGeometry.x - bridgeUnderlap;
        const right = bridgeGeometry.x + bridgeGeometry.width + bridgeUnderlap;

        return getRectPath({
            height: bridgeGeometry.height,
            width: right - x,
            x,
            y: bridgeGeometry.y,
        });
    });
}

function getVerticalCardUnionBridgeGeometry({
    bridgeSpan,
    centerY,
    gapHeight,
    rootWidth,
    theme,
}: {
    bridgeSpan: number;
    centerY: number;
    gapHeight: number;
    rootWidth: number;
    theme: AppTheme;
}) {
    const width = Number((rootWidth * bridgeSpan).toFixed(2));
    const height = Math.min(gapHeight, theme.cardUnion.bridge.cutoutThickness);
    const x = Number(((rootWidth - width) / 2).toFixed(2));
    const y = centerY - height / 2;
    const slotWidth = x;
    const radius = Math.min(theme.cardUnion.bridge.capRadius, height / 2);

    return {
        height,
        radius,
        slotWidth,
        width,
        x,
        y,
    };
}

function getRectPath({height, width, x, y}: CardUnionLayout) {
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
}: CardUnionLayout & {radius: number}) {
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
}: CardUnionLayout & {radius: number}) {
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
}: CardUnionLayout & {radius: number}) {
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
}: CardUnionLayout & {radius: number}) {
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
