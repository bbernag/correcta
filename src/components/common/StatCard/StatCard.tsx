import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, type AppTextTone} from "../AppText";
import {Icon, type IconTone} from "../Icon";
import {Surface} from "../Surface";
import type {StatCardProps, StatCardTone} from "./statCardTypes";

export function StatCard({
    helper,
    icon,
    label,
    style,
    tone = "accent",
    value,
}: StatCardProps) {
    const textTone = getStatTextTone(tone);

    return (
        <Surface variant="outline" style={[styles.root, style]}>
            <View style={styles.headingRow}>
                <AppText variant="label" tone="secondary">
                    {label}
                </AppText>
                {icon ? (
                    <Icon
                        name={icon}
                        size="dense"
                        tone={textTone as IconTone}
                    />
                ) : null}
            </View>
            <AppText variant="metric" tone={textTone}>
                {value}
            </AppText>
            {helper ? (
                <AppText variant="caption" tone="muted">
                    {helper}
                </AppText>
            ) : null}
        </Surface>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        gap: theme.spacing.sm,
    },
    headingRow: {
        alignItems: "center",
        flexDirection: "row",
        gap: theme.spacing.sm,
        justifyContent: "space-between",
    },
}));

function getStatTextTone(tone: StatCardTone): AppTextTone {
    switch (tone) {
        case "success":
            return "success";
        case "warning":
            return "warning";
        case "danger":
            return "danger";
        case "info":
            return "info";
        case "accent":
        default:
            return "accent";
    }
}
