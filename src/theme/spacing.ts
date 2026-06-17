export const spacing = {
    none: 0,
    xxs: 2,
    xs: 4,
    sm: 6,
    md: 8,
    lg: 12,
    xl: 16,
    "2xl": 20,
    "3xl": 24,
    "4xl": 32,
    "5xl": 40,
    "6xl": 48,
    "7xl": 64,
    screenHorizontal: 20,
    screenVertical: 16,
    cardPadding: 16,
    cardGap: 12,
    sectionGap: 24,
    controlGap: 8,
    xxl: 32,
} as const;

export type AppSpacing = typeof spacing;
