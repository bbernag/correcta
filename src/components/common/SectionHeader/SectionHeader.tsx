import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText} from "../AppText";
import type {SectionHeaderProps} from "./sectionHeaderTypes";

export function SectionHeader({
    action,
    eyebrow,
    style,
    subtitle,
    title,
}: SectionHeaderProps) {
    return (
        <View style={[styles.root, style]}>
            <View style={styles.copy}>
                {eyebrow ? (
                    <AppText tone="accent" variant="caption">
                        {eyebrow}
                    </AppText>
                ) : null}
                <AppText variant="subtitle">{title}</AppText>
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
        alignItems: "center",
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
