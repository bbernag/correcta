import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText} from "../../../components/common";
import type {ExpoUiShowcaseSectionProps} from "../types/expoUiShowcaseTypes";

export function ExpoUiShowcaseSection({
    children,
    description,
    eyebrow,
    style,
    title,
}: ExpoUiShowcaseSectionProps) {
    return (
        <View style={[styles.root, style]}>
            <View style={styles.header}>
                <AppText variant="caption" tone="muted">
                    {eyebrow}
                </AppText>
                <AppText variant="subtitle">{title}</AppText>
                {description ? (
                    <AppText variant="bodySmall" tone="secondary">
                        {description}
                    </AppText>
                ) : null}
            </View>
            {children}
        </View>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        borderTopColor: theme.colors.borderSubtle,
        borderTopWidth: 1,
        gap: theme.spacing.lg,
        paddingTop: theme.spacing["2xl"],
    },
    header: {
        gap: theme.spacing.xs,
    },
}));
