import {StyleSheet} from "react-native-unistyles";

import {AppText} from "../AppText";
import {NoticeCard} from "../NoticeCard";
import type {FeedbackHighlightProps} from "./FeedbackHighlightTypes";

export function FeedbackHighlight({
    children,
    message,
    style,
    title,
    tone,
}: FeedbackHighlightProps) {
    return (
        <NoticeCard
            accessibilityLiveRegion="polite"
            style={style}
            title={title}
            tone={tone}
        >
            {message ? (
                <AppText style={styles.message} tone="secondary">
                    {message}
                </AppText>
            ) : null}
            {children}
        </NoticeCard>
    );
}

const styles = StyleSheet.create((theme) => ({
    message: {
        marginBottom: theme.spacing.sm,
    },
}));
