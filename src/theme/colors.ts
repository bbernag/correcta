type SemanticColorTokens = {
    background: {
        primary: string;
        secondary: string;
    };
    surface: {
        primary: string;
        elevated: string;
        tonal: string;
        inverse: string;
        glassFallback: string;
    };
    text: {
        primary: string;
        secondary: string;
        muted: string;
        inverse: string;
    };
    border: {
        subtle: string;
        strong: string;
    };
    accent: {
        primary: string;
        primaryStrong: string;
        primarySoft: string;
        secondary: string;
    };
    feedback: {
        success: string;
        successSoft: string;
        warning: string;
        warningSoft: string;
        danger: string;
        dangerSoft: string;
        info: string;
        infoSoft: string;
    };
    focus: {
        ring: string;
    };
    shadow: {
        tint: string;
    };
};

const lightSemanticColors = {
    background: {
        primary: "#F5F7F8",
        secondary: "#ECEFF1",
    },
    surface: {
        primary: "#FFFFFF",
        elevated: "#FBFCFC",
        tonal: "#E7F0EE",
        inverse: "#11181B",
        glassFallback: "#FFFFFFD9",
    },
    text: {
        primary: "#11181B",
        secondary: "#405056",
        muted: "#6D7A7F",
        inverse: "#F7FAFA",
    },
    border: {
        subtle: "#D9E1E4",
        strong: "#AAB8BE",
    },
    accent: {
        primary: "#0F766E",
        primaryStrong: "#0B5F59",
        primarySoft: "#D7F0EC",
        secondary: "#315C7C",
    },
    feedback: {
        success: "#15803D",
        successSoft: "#DFF5E7",
        warning: "#A15C07",
        warningSoft: "#FFF2D6",
        danger: "#B42318",
        dangerSoft: "#FDE7E5",
        info: "#2D6A8E",
        infoSoft: "#E2F1F8",
    },
    focus: {
        ring: "#12A594",
    },
    shadow: {
        tint: "#0B1F24",
    },
} as const satisfies SemanticColorTokens;

const darkSemanticColors = {
    background: {
        primary: "#0E1315",
        secondary: "#121A1D",
    },
    surface: {
        primary: "#171F22",
        elevated: "#1D282C",
        tonal: "#18302F",
        inverse: "#F5F7F8",
        glassFallback: "#182125D9",
    },
    text: {
        primary: "#F4F8F8",
        secondary: "#C4D0D3",
        muted: "#8C9A9F",
        inverse: "#11181B",
    },
    border: {
        subtle: "#2A383D",
        strong: "#43565C",
    },
    accent: {
        primary: "#41C7BA",
        primaryStrong: "#7DE2D8",
        primarySoft: "#173D3A",
        secondary: "#9FB7D1",
    },
    feedback: {
        success: "#5FD28A",
        successSoft: "#183A27",
        warning: "#F2B84B",
        warningSoft: "#3D2E16",
        danger: "#FF7A70",
        dangerSoft: "#3F1F1D",
        info: "#73B7FF",
        infoSoft: "#172E42",
    },
    focus: {
        ring: "#5ADFD3",
    },
    shadow: {
        tint: "#000000",
    },
} as const satisfies SemanticColorTokens;

function createColorTokens(colors: SemanticColorTokens) {
    return {
        backgroundPrimary: colors.background.primary,
        backgroundSecondary: colors.background.secondary,
        surfacePrimary: colors.surface.primary,
        surfaceElevated: colors.surface.elevated,
        surfaceTonal: colors.surface.tonal,
        surfaceInverse: colors.surface.inverse,
        surfaceGlassFallback: colors.surface.glassFallback,
        textPrimary: colors.text.primary,
        textSecondary: colors.text.secondary,
        textMuted: colors.text.muted,
        textInverse: colors.text.inverse,
        borderSubtle: colors.border.subtle,
        borderStrong: colors.border.strong,
        accentPrimary: colors.accent.primary,
        accentPrimaryStrong: colors.accent.primaryStrong,
        accentPrimarySoft: colors.accent.primarySoft,
        accentSecondary: colors.accent.secondary,
        feedbackSuccess: colors.feedback.success,
        feedbackSuccessSoft: colors.feedback.successSoft,
        feedbackWarning: colors.feedback.warning,
        feedbackWarningSoft: colors.feedback.warningSoft,
        feedbackDanger: colors.feedback.danger,
        feedbackDangerSoft: colors.feedback.dangerSoft,
        feedbackInfo: colors.feedback.info,
        feedbackInfoSoft: colors.feedback.infoSoft,
        focusRing: colors.focus.ring,
        shadowTint: colors.shadow.tint,
        background: colors.background.primary,
        backgroundElevated: colors.surface.elevated,
        surface: colors.surface.primary,
        surfaceMuted: colors.surface.tonal,
        border: colors.border.subtle,
        text: colors.text.primary,
        textInverted: colors.text.inverse,
        accent: colors.accent.primary,
        accentStrong: colors.accent.primaryStrong,
        accentSoft: colors.accent.primarySoft,
        danger: colors.feedback.danger,
        shadow: colors.shadow.tint,
    };
}

export const lightColors = createColorTokens(lightSemanticColors);
export const darkColors = createColorTokens(darkSemanticColors);

export type AppColors = typeof lightColors;
