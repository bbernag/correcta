export const lightTheme = {
    colors: {
        background: "#F7F6F2",
        backgroundElevated: "#FFFFFF",
        surface: "#FFFFFF",
        surfaceMuted: "#EEF4F8",
        border: "#D7DEE8",
        text: "#17202A",
        textSecondary: "#52606D",
        textMuted: "#7B8794",
        textInverted: "#FFFFFF",
        accent: "#0F766E",
        accentStrong: "#115E59",
        accentSoft: "#D8F3EF",
        danger: "#B42318",
        shadow: "#17202A",
    },
    spacing: {
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 24,
        xxl: 32,
    },
    radii: {
        sm: 6,
        md: 8,
        lg: 12,
        pill: 999,
    },
    typography: {
        title: 32,
        heading: 22,
        body: 16,
        label: 14,
        caption: 12,
    },
    shadows: {
        surface: {
            shadowColor: "#17202A",
            shadowOffset: {width: 0, height: 8},
            shadowOpacity: 0.08,
            shadowRadius: 18,
            elevation: 3,
        },
    },
    motion: {
        pressOpacity: 0.88,
    },
};

export const darkTheme = {
    ...lightTheme,
    colors: {
        background: "#101820",
        backgroundElevated: "#17212B",
        surface: "#17212B",
        surfaceMuted: "#22303C",
        border: "#344454",
        text: "#F5F7FA",
        textSecondary: "#CBD2D9",
        textMuted: "#9AA5B1",
        textInverted: "#101820",
        accent: "#5EEAD4",
        accentStrong: "#99F6E4",
        accentSoft: "#134E4A",
        danger: "#FDA29B",
        shadow: "#000000",
    },
};

export const appThemes = {
    light: lightTheme,
    dark: darkTheme,
};

export const appBreakpoints = {
    portrait: 0,
    landscape: 768,
};

export type AppTheme = typeof lightTheme;
