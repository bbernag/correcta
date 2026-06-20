import {ActivityIndicator} from "react-native";
import {StyleSheet, useUnistyles} from "react-native-unistyles";

import {AppText} from "../AppText";
import {Surface} from "../Surface";
import type {LoadingStateProps} from "./loadingStateTypes";

export function LoadingState({message, style, title}: LoadingStateProps) {
    const {theme} = useUnistyles();

    return (
        <Surface
            accessibilityRole="progressbar"
            variant="muted"
            style={[styles.root, style]}
        >
            <ActivityIndicator
                accessibilityLabel={title}
                color={theme.colors.accentPrimary}
                size="large"
            />
            <AppText variant="subtitle">{title}</AppText>
            {message ? (
                <AppText tone="secondary" variant="bodySmall">
                    {message}
                </AppText>
            ) : null}
        </Surface>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        alignItems: "center",
        gap: theme.spacing.md,
    },
}));
