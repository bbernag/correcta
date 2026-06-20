import {View} from "react-native";
import {StyleSheet, useUnistyles} from "react-native-unistyles";

import type {AppColors} from "../../../theme/colors";
import {AppText} from "../AppText";
import {Icon, type IconName} from "../Icon";
import {PocCard} from "../PocCard";
import {getNoticeCardGradient} from "./noticeCardColors";
import type {NoticeCardProps, NoticeCardTone} from "./noticeCardTypes";

const TONE_ICONS: Record<NoticeCardTone, IconName> = {
    success: "success",
    warning: "warning",
    danger: "error",
    info: "info",
};

const TONE_LABELS: Record<NoticeCardTone, string> = {
    success: "Success",
    warning: "Warning",
    danger: "Error",
    info: "Note",
};

const TONE_SOFT_COLORS: Record<NoticeCardTone, keyof AppColors> = {
    success: "feedbackSuccessSoft",
    warning: "feedbackWarningSoft",
    danger: "feedbackDangerSoft",
    info: "feedbackInfoSoft",
};

const TONE_STRONG_COLORS: Record<NoticeCardTone, keyof AppColors> = {
    success: "feedbackSuccess",
    warning: "feedbackWarning",
    danger: "feedbackDanger",
    info: "feedbackInfo",
};

const NOTICE_CARD_BRIDGE_SPAN = 0.8;

export function NoticeCard({
    children,
    cutoutColor,
    icon,
    style,
    title,
    tone,
    ...viewProps
}: NoticeCardProps) {
    const {theme} = useUnistyles();
    const gradient = getNoticeCardGradient(
        theme.colors[TONE_SOFT_COLORS[tone]],
        theme.colors[TONE_STRONG_COLORS[tone]]
    );

    return (
        <PocCard
            bridgeColor={gradient.seam}
            bridgeSpan={NOTICE_CARD_BRIDGE_SPAN}
            cutoutColor={cutoutColor}
            style={style}
            tone={tone}
            {...viewProps}
        >
            <PocCard.Section
                gradient={{from: gradient.top, to: gradient.seam}}
                style={styles.titleSection}
            >
                <View style={styles.titleRow}>
                    <Icon
                        name={icon ?? TONE_ICONS[tone]}
                        size="dense"
                        tone={tone}
                    />
                    <AppText
                        accessibilityLabel={`${TONE_LABELS[tone]}: ${title}`}
                        style={styles.title}
                        variant="subtitle"
                    >
                        {title}
                    </AppText>
                </View>
            </PocCard.Section>
            <PocCard.Section
                gradient={{from: gradient.seam, to: gradient.bottom}}
                style={styles.bodySection}
            >
                {children}
            </PocCard.Section>
        </PocCard>
    );
}

const styles = StyleSheet.create((theme) => ({
    titleSection: {
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.sm,
    },
    bodySection: {
        padding: theme.spacing.lg,
    },
    titleRow: {
        alignItems: "center",
        flexDirection: "row",
        gap: theme.spacing.sm,
    },
    title: {
        flex: 1,
    },
}));
