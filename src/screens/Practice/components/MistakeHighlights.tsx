import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, Surface} from "../../../components/common";
import type {TranslationMistake} from "../../../types";
import {formatMistakeCategory} from "../utils/practiceUtils";

type MistakeHighlightsProps = {
    mistakes: TranslationMistake[];
};

export function MistakeHighlights({mistakes}: MistakeHighlightsProps) {
    if (mistakes.length === 0) {
        return (
            <Surface variant="success" style={styles.root}>
                <AppText variant="label" tone="success">
                    No specific mistakes
                </AppText>
                <AppText tone="secondary">
                    Your answer did not create a focused mistake card.
                </AppText>
            </Surface>
        );
    }

    return (
        <Surface variant="warning" style={styles.root}>
            <AppText variant="heading">Review focus</AppText>
            {mistakes.map((mistake) => {
                return (
                    <View key={mistake.id} style={styles.mistakeItem}>
                        <View style={styles.mistakeHeader}>
                            <AppText variant="label" tone="warning">
                                {formatMistakeCategory(mistake.category)}
                            </AppText>
                            <AppText variant="caption" tone="muted">
                                {mistake.severity}
                            </AppText>
                        </View>
                        <AppText>{mistake.explanation}</AppText>
                        <AppText tone="secondary">
                            Try: {mistake.suggestion}
                        </AppText>
                    </View>
                );
            })}
        </Surface>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        gap: theme.spacing.md,
    },
    mistakeItem: {
        borderTopColor: theme.colors.borderSubtle,
        borderTopWidth: 1,
        gap: theme.spacing.xs,
        paddingTop: theme.spacing.md,
    },
    mistakeHeader: {
        alignItems: "center",
        flexDirection: "row",
        gap: theme.spacing.sm,
        justifyContent: "space-between",
    },
}));
