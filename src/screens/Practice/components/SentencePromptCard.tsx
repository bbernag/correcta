import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, Surface} from "../../../components/common";
import type {PracticeSentence} from "../../../types";

type SentencePromptCardProps = {
    revealedHintCount: number;
    sentence: PracticeSentence;
};

export function SentencePromptCard({
    revealedHintCount,
    sentence,
}: SentencePromptCardProps) {
    const visibleHints = sentence.hints.slice(0, revealedHintCount);

    return (
        <Surface style={styles.root}>
            <AppText variant="label" tone="secondary">
                {sentence.prompt}
            </AppText>
            <AppText accessibilityRole="text" variant="heading">
                {sentence.sourceText}
            </AppText>
            {visibleHints.length > 0 ? (
                <View style={styles.hints}>
                    {visibleHints.map((hint) => {
                        return (
                            <AppText key={hint} tone="secondary">
                                {hint}
                            </AppText>
                        );
                    })}
                </View>
            ) : null}
        </Surface>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        gap: theme.spacing.md,
    },
    hints: {
        borderTopColor: theme.colors.border,
        borderTopWidth: 1,
        gap: theme.spacing.sm,
        paddingTop: theme.spacing.md,
    },
}));
