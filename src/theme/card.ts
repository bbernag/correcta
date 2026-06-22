export const card = {
    bridge: {
        capRadius: 999,
        cutoutThickness: 8,
        edgeOverlap: 1,
        horizontalOverlap: {
            compact: 16,
            default: 20,
            hero: 24,
        },
        span: {
            horizontal: {
                compact: 0.4,
                default: 0.4,
                hero: 0.4,
            },
            vertical: {
                compact: 0.8,
                default: 0.74,
                hero: 0.74,
            },
        },
    },
    cornerSmoothing: 1,
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

export type AppCard = typeof card;
