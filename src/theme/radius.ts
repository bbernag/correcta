export const radius = {
    none: 0,
    xs: 6,
    sm: 10,
    md: 14,
    lg: 18,
    xl: 22,
    "2xl": 28,
    "3xl": 34,
    card: 22,
    input: 18,
    button: 16,
    chip: 999,
    pill: 999,
    sheet: 28,
    modal: 30,
} as const;

export type AppRadius = typeof radius;
