export const cardUnion = {
    bridge: {
        capRadius: 999,
        cutoutThickness: 8,
        spanDefault: 0.7,
        spanMax: 0.78,
        spanMin: 0.66,
    },
    gap: {
        compact: 6,
        default: 8,
        relaxed: 12,
    },
    padding: {
        compact: 16,
        default: 20,
        hero: 24,
    },
    radius: {
        compact: 24,
        default: 28,
        hero: 32,
    },
} as const;

export type AppCardUnion = typeof cardUnion;
