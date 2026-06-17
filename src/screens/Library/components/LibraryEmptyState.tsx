import {StyleSheet} from "react-native-unistyles";

import {AppText, Surface} from "../../../components/common";

type LibraryEmptyStateProps = {
    message: string;
    title: string;
};

export function LibraryEmptyState({message, title}: LibraryEmptyStateProps) {
    return (
        <Surface variant="muted" style={styles.root}>
            <AppText variant="label">{title}</AppText>
            <AppText tone="secondary">{message}</AppText>
        </Surface>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        gap: theme.spacing.xs,
    },
}));
