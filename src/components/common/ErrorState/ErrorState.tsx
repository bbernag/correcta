import {StyleSheet} from "react-native-unistyles";

import {AppText} from "../AppText";
import {Button} from "../Button";
import {Icon} from "../Icon";
import {Surface} from "../Surface";
import type {ErrorStateProps} from "./ErrorStateTypes";

export function ErrorState({
    message,
    onRetry,
    retryLabel = "Try again",
    style,
    title = "Something went wrong",
}: ErrorStateProps) {
    return (
        <Surface variant="danger" style={[styles.root, style]}>
            <Icon name="error" size="empty" tone="danger" />
            <AppText variant="subtitle" tone="danger">
                {title}
            </AppText>
            <AppText tone="secondary">{message}</AppText>
            {onRetry ? (
                <Button
                    accessibilityLabel={retryLabel}
                    label={retryLabel}
                    onPress={onRetry}
                    variant="danger"
                />
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
