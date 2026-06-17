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
        primary: "#F6F7FA",
        secondary: "#EEF1F5",
    },
    surface: {
        primary: "#FFFFFF",
        elevated: "#FBFCFE",
        tonal: "#E8EEF8",
        inverse: "#111827",
        glassFallback: "#FFFFFFE6",
    },
    text: {
        primary: "#111827",
        secondary: "#3F4B5B",
        muted: "#6B7280",
        inverse: "#F9FAFB",
    },
    border: {
        subtle: "#D9DEE7",
        strong: "#AAB4C3",
    },
    accent: {
        primary: "#2F5DA8",
        primaryStrong: "#22477F",
        primarySoft: "#E2EBFA",
        secondary: "#4F6F8F",
    },
    feedback: {
        success: "#16803C",
        successSoft: "#E3F5EA",
        warning: "#B26A00",
        warningSoft: "#FFF1D6",
        danger: "#B42318",
        dangerSoft: "#FDE8E6",
        info: "#496A91",
        infoSoft: "#E6EEF8",
    },
    focus: {
        ring: "#4778D6",
    },
    shadow: {
        tint: "#111827",
    },
} as const satisfies SemanticColorTokens;

const darkSemanticColors = {
    background: {
        primary: "#0D1117",
        secondary: "#121822",
    },
    surface: {
        primary: "#171E28",
        elevated: "#1E2633",
        tonal: "#202A3A",
        inverse: "#F6F7FA",
        glassFallback: "#171E28E6",
    },
    text: {
        primary: "#F4F7FB",
        secondary: "#C6CFDB",
        muted: "#8E9AAC",
        inverse: "#111827",
    },
    border: {
        subtle: "#2B3545",
        strong: "#46566D",
    },
    accent: {
        primary: "#7DA6F7",
        primaryStrong: "#A9C5FF",
        primarySoft: "#1D3357",
        secondary: "#9EB4CC",
    },
    feedback: {
        success: "#5FD28A",
        successSoft: "#163522",
        warning: "#F0B35A",
        warningSoft: "#3A2A12",
        danger: "#FF7A70",
        dangerSoft: "#3D1E1C",
        info: "#98B8E8",
        infoSoft: "#182A43",
    },
    focus: {
        ring: "#9BBEFF",
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
