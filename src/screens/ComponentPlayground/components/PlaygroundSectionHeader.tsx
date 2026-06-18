import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText} from "../../../components/common";
import type {ComponentPlaygroundSectionHeaderProps} from "../types/ComponentPlaygroundTypes";

export function PlaygroundSectionHeader({
    action,
    description,
    eyebrow,
    title,
}: ComponentPlaygroundSectionHeaderProps) {
    return (
        <View style={styles.root}>
            <View style={styles.copy}>
                {eyebrow ? (
                    <AppText variant="caption" tone="muted">
                        {eyebrow}
                    </AppText>
                ) : null}
                <AppText variant="subtitle">{title}</AppText>
                {description ? (
                    <AppText variant="bodySmall" tone="secondary">
                        {description}
                    </AppText>
                ) : null}
            </View>
            {action ? <View style={styles.action}>{action}</View> : null}
        </View>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        alignItems: "flex-start",
        flexDirection: "row",
        gap: theme.spacing.lg,
        justifyContent: "space-between",
    },
    copy: {
        flex: 1,
        gap: theme.spacing.xs,
    },
    action: {
        alignItems: "flex-end",
    },
}));
