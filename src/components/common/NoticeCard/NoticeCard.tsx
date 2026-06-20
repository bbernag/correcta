import {View} from "react-native";
import {EaseView, type Transition} from "react-native-ease";
import {StyleSheet, useUnistyles} from "react-native-unistyles";

import {useReducedMotion} from "../../../hooks/useReducedMotion";
import type {AppColors} from "../../../theme/colors";
import {motion} from "../../../theme";
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

const NOTICE_CARD_ENTRY_TRANSITION = {
    duration: motion.duration.normal,
    easing: "easeOut",
    type: "timing",
} satisfies Transition;

const REDUCED_MOTION_TRANSITION = {
    type: "none",
} satisfies Transition;

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
    const isReducedMotionEnabled = useReducedMotion();
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
                <EaseView
                    animate={{
                        opacity: 1,
                        translateY: 0,
                    }}
                    initialAnimate={{
                        opacity: isReducedMotionEnabled ? 1 : 0,
                        translateY: isReducedMotionEnabled ? 0 : 4,
                    }}
                    transition={
                        isReducedMotionEnabled
                            ? REDUCED_MOTION_TRANSITION
                            : NOTICE_CARD_ENTRY_TRANSITION
                    }
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
                </EaseView>
            </PocCard.Section>
            <PocCard.Section
                gradient={{from: gradient.seam, to: gradient.bottom}}
                style={styles.bodySection}
            >
                <EaseView
                    animate={{
                        opacity: 1,
                        translateY: 0,
                    }}
                    initialAnimate={{
                        opacity: isReducedMotionEnabled ? 1 : 0,
                        translateY: isReducedMotionEnabled ? 0 : 4,
                    }}
                    transition={
                        isReducedMotionEnabled
                            ? REDUCED_MOTION_TRANSITION
                            : NOTICE_CARD_ENTRY_TRANSITION
                    }
                >
                    {children}
                </EaseView>
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
