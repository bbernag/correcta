import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, Surface} from "../../../components/common";
import type {
    ExpoUiCatalogItem as ExpoUiCatalogItemModel,
    ExpoUiCatalogItemProps,
} from "../types/ExpoUiShowcaseTypes";

export function ExpoUiCatalogItem({item}: ExpoUiCatalogItemProps) {
    return (
        <Surface variant="muted" style={styles.root}>
            <View style={styles.header}>
                <AppText variant="label">{item.name}</AppText>
                <View style={[styles.badge, getBadgeStyle(item)]}>
                    <AppText variant="caption" tone={item.tone}>
                        {item.status}
                    </AppText>
                </View>
            </View>
            <AppText variant="bodySmall" tone="secondary">
                {item.description}
            </AppText>
        </Surface>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        flex: 1,
        gap: theme.spacing.sm,
        minWidth: 148,
        padding: theme.spacing.lg,
    },
    header: {
        alignItems: "flex-start",
        flexDirection: "row",
        gap: theme.spacing.sm,
        justifyContent: "space-between",
    },
    badge: {
        borderRadius: theme.radii.pill,
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: 2,
    },
    accentBadge: {
        backgroundColor: theme.colors.accentPrimarySoft,
    },
    infoBadge: {
        backgroundColor: theme.colors.feedbackInfoSoft,
    },
    successBadge: {
        backgroundColor: theme.colors.feedbackSuccessSoft,
    },
    secondaryBadge: {
        backgroundColor: theme.colors.surfacePrimary,
    },
}));

function getBadgeStyle(item: ExpoUiCatalogItemModel) {
    switch (item.tone) {
        case "accent":
            return styles.accentBadge;
        case "info":
            return styles.infoBadge;
        case "success":
            return styles.successBadge;
        case "secondary":
        default:
            return styles.secondaryBadge;
    }
}
