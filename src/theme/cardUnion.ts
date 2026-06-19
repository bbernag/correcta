export const cardUnion = {
    bridge: {
        capRadius: 999,
        edgeOverlap: 1,
        cutoutThickness: 8,
        span: 0.7,
    },
    gap: 8,
    padding: 20,
    radius: 28,
} as const;

export type AppCardUnion = typeof cardUnion;
