import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText} from "../AppText";
import {Icon} from "../Icon";
import {Surface} from "../Surface";
import type {EmptyStateProps} from "./emptyStateTypes";

export function EmptyState({
    action,
    icon = "info",
    message,
    style,
    title,
}: EmptyStateProps) {
    return (
        <Surface variant="muted" style={[styles.root, style]}>
            <Icon name={icon} size="empty" tone="accent" />
            <View style={styles.copy}>
                <AppText variant="subtitle">{title}</AppText>
                <AppText tone="secondary">{message}</AppText>
            </View>
            {action}
        </Surface>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        alignItems: "center",
        gap: theme.spacing.lg,
    },
    copy: {
        alignItems: "center",
        gap: theme.spacing.xs,
    },
}));
