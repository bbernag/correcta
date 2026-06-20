import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText} from "../AppText";
import type {ScreenHeaderProps} from "./screenHeaderTypes";

export function ScreenHeader({
    action,
    eyebrow,
    style,
    subtitle,
    title,
}: ScreenHeaderProps) {
    return (
        <View style={[styles.root, style]}>
            <View style={styles.copy}>
                {eyebrow ? (
                    <AppText tone="accent" variant="label">
                        {eyebrow}
                    </AppText>
                ) : null}
                <AppText variant="titleLarge">{title}</AppText>
                {subtitle ? (
                    <AppText tone="secondary" variant="bodySmall">
                        {subtitle}
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
        flexShrink: 0,
    },
}));
