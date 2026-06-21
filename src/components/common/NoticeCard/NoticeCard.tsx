import {View} from "react-native";
import {EaseView, type Transition} from "react-native-ease";
import {StyleSheet} from "react-native-unistyles";

import {useReducedMotion} from "../../../hooks/useReducedMotion";
import {motion} from "../../../theme";
import {AppText} from "../AppText";
import {ConnectedCard} from "../ConnectedCard";
import {Icon, type IconName} from "../Icon";
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
    const isReducedMotionEnabled = useReducedMotion();

    return (
        <ConnectedCard
            bridgeSpan={NOTICE_CARD_BRIDGE_SPAN}
            cutoutColor={cutoutColor}
            size="compact"
            style={style}
            tone={tone}
            {...viewProps}
        >
            <ConnectedCard.Item style={styles.titleSection}>
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
            </ConnectedCard.Item>
            <ConnectedCard.Item style={styles.bodySection}>
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
            </ConnectedCard.Item>
        </ConnectedCard>
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
