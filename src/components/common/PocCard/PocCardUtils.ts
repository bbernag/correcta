export const POC_CARD_BRIDGE_SPAN_DEFAULT = 0.74;

const POC_CARD_BRIDGE_SPAN_MIN = 0.6;
const POC_CARD_BRIDGE_SPAN_MAX = 0.9;

export function getPocCardBridgeSpan(bridgeSpan: number) {
    return Math.min(
        POC_CARD_BRIDGE_SPAN_MAX,
        Math.max(POC_CARD_BRIDGE_SPAN_MIN, bridgeSpan)
    );
}

export function getPocCardCutoutSpan(bridgeSpan: number): `${number}%` {
    const cutoutSpan = (1 - getPocCardBridgeSpan(bridgeSpan)) / 2;

    return `${Number((cutoutSpan * 100).toFixed(2))}%`;
}
