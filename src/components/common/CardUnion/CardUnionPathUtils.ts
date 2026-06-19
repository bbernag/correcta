import type {CardUnionLayout} from "./CardUnionTypes";

export function getRoundedRectPath({
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

export function getRectPath({height, width, x, y}: CardUnionLayout) {
    const right = x + width;
    const bottom = y + height;

    return [`M ${x} ${y}`, `H ${right}`, `V ${bottom}`, `H ${x}`, "Z"].join(
        " "
    );
}

export function getRightRoundedRectPath({
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

export function getLeftRoundedRectPath({
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

export function getBottomRoundedRectPath({
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

export function getTopRoundedRectPath({
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
