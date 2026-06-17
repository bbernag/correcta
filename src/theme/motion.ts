export const motion = {
    duration: {
        instant: 0,
        micro: 90,
        fast: 140,
        normal: 220,
        emphasis: 320,
        slow: 420,
    },
    spring: {
        press: {
            damping: 18,
            stiffness: 420,
            mass: 0.7,
        },
        snappy: {
            damping: 20,
            stiffness: 320,
            mass: 0.8,
        },
        soft: {
            damping: 24,
            stiffness: 220,
            mass: 1,
        },
        emphasis: {
            damping: 22,
            stiffness: 260,
            mass: 0.9,
        },
        settle: {
            damping: 30,
            stiffness: 160,
            mass: 1,
        },
    },
    pressOpacity: 0.88,
    disabledOpacity: 0.48,
} as const;

export const motionPrimitives = {
    pressOpacity: motion.pressOpacity,
    disabledOpacity: motion.disabledOpacity,
} as const;

export type AppMotion = typeof motion;
