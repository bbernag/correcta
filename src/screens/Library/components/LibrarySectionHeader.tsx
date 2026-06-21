import {StyleSheet} from "react-native-unistyles";

import {SectionHeader} from "../../../components/common";
import type {LibrarySection} from "../types/libraryTypes";

type LibrarySectionHeaderProps = {
    section: LibrarySection;
};

export function LibrarySectionHeader({section}: LibrarySectionHeaderProps) {
    return (
        <SectionHeader
            style={styles.root}
            subtitle={section.subtitle}
            title={section.title}
        />
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        backgroundColor: theme.colors.backgroundPrimary,
        paddingTop: theme.spacing.md,
    },
}));
