import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText} from "../AppText";
import {Icon, type IconName} from "../Icon";
import {PocCard} from "../PocCard";
import type {NoticeCardProps, NoticeCardTone} from "./NoticeCardTypes";

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

export function NoticeCard({
    children,
    cutoutColor,
    icon,
    style,
    title,
    tone,
    ...viewProps
}: NoticeCardProps) {
    return (
        <PocCard
            bridgeSpan={NOTICE_CARD_BRIDGE_SPAN}
            cutoutColor={cutoutColor}
            style={style}
            tone={tone}
            {...viewProps}
        >
            <PocCard.Section style={styles.titleSection}>
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
            <PocCard.Section style={styles.bodySection}>
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
