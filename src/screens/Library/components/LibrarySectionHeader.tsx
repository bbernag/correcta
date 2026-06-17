import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText} from "../../../components/common";
import type {LibrarySection} from "../types/LibraryTypes";

type LibrarySectionHeaderProps = {
    section: LibrarySection;
};

export function LibrarySectionHeader({section}: LibrarySectionHeaderProps) {
    return (
        <View style={styles.root}>
            <AppText variant="heading">{section.title}</AppText>
            <AppText tone="secondary">{section.subtitle}</AppText>
        </View>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        backgroundColor: theme.colors.background,
        gap: theme.spacing.xs,
        paddingTop: theme.spacing.md,
    },
}));
