export function getConnectedCardCutoutSpan(span: number): `${number}%` {
    const cutoutSpan = (1 - span) / 2;

    return `${Number((cutoutSpan * 100).toFixed(2))}%`;
}
