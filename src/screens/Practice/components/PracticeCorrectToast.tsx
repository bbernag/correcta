import {useEffect, useRef} from "react";
import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {
    AppText,
    Button,
    Icon,
    IconButton,
} from "../../../components/common";

type PracticeCorrectToastProps = {
    durationMs: number;
    onDismiss: () => void;
    onSaveSentence: () => void;
};

export function PracticeCorrectToast({
    durationMs,
    onDismiss,
    onSaveSentence,
}: PracticeCorrectToastProps) {
    const onDismissRef = useRef(onDismiss);

    useEffect(() => {
        onDismissRef.current = onDismiss;
    }, [onDismiss]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onDismissRef.current();
        }, durationMs);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [durationMs]);

    return (
        <View
            accessibilityLiveRegion="polite"
            style={styles.root}
        >
            <View style={styles.row}>
                <Icon name="success" tone="success" />
                <View style={styles.copy}>
                    <AppText variant="label">Correct</AppText>
                    <AppText variant="bodySmall" tone="secondary">
                        Moving to the next sentence.
                    </AppText>
                </View>
                <IconButton
                    accessibilityLabel="Dismiss notification"
                    icon="clear"
                    onPress={onDismiss}
                    variant="ghost"
                />
            </View>
            <Button
                label="Save sentence"
                onPress={onSaveSentence}
                size="small"
                variant="ghost"
            />
        </View>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        backgroundColor: theme.colors.feedbackSuccessSoft,
        borderColor: theme.colors.feedbackSuccess,
        borderRadius: 20,
        borderWidth: 1,
        gap: theme.spacing.sm,
        padding: theme.spacing.lg,
        ...theme.shadows.floating,
    },
    row: {
        alignItems: "flex-start",
        flexDirection: "row",
        gap: theme.spacing.sm,
    },
    copy: {
        flex: 1,
        gap: theme.spacing.xxs,
    },
}));
