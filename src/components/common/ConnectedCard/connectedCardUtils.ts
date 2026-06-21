export const CONNECTED_CARD_BRIDGE_SPAN_DEFAULT = 0.74;

const CONNECTED_CARD_BRIDGE_SPAN_MIN = 0.4;
const CONNECTED_CARD_BRIDGE_SPAN_MAX = 0.9;

export function getConnectedCardBridgeSpan(bridgeSpan: number) {
    return Math.min(
        CONNECTED_CARD_BRIDGE_SPAN_MAX,
        Math.max(CONNECTED_CARD_BRIDGE_SPAN_MIN, bridgeSpan)
    );
}

export function getConnectedCardCutoutSpan(bridgeSpan: number): `${number}%` {
    const cutoutSpan = (1 - getConnectedCardBridgeSpan(bridgeSpan)) / 2;

    return `${Number((cutoutSpan * 100).toFixed(2))}%`;
}
