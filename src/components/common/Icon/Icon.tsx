import {useUnistyles} from "react-native-unistyles";

import type {AppTheme} from "../../../theme";
import type {IconProps, IconSize, IconTone} from "./iconTypes";
import {iconRegistry} from "./iconRegistry";

export function Icon({
    color,
    name,
    size = "default",
    tone = "primary",
    ...iconProps
}: IconProps) {
    const {theme} = useUnistyles();
    const LucideIcon = iconRegistry[name];

    return (
        <LucideIcon
            accessible={false}
            color={color ?? getIconToneColor({theme, tone})}
            size={getIconSize(size)}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            {...iconProps}
        />
    );
}

function getIconSize(size: IconSize) {
    const sizes: Record<IconSize, number> = {
        default: 20,
        dense: 16,
        empty: 32,
        hero: 24,
        tab: 22,
    };

    return sizes[size];
}

function getIconToneColor({theme, tone}: {theme: AppTheme; tone: IconTone}) {
    const colors: Record<IconTone, string> = {
        accent: theme.colors.accentPrimaryStrong,
        danger: theme.colors.feedbackDanger,
        info: theme.colors.feedbackInfo,
        inverted: theme.colors.textInverse,
        muted: theme.colors.textMuted,
        primary: theme.colors.textPrimary,
        secondary: theme.colors.textSecondary,
        success: theme.colors.feedbackSuccess,
        warning: theme.colors.feedbackWarning,
    };

    return colors[tone];
}
