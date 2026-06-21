import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {
    AnimatedMount,
    AppText,
    ConnectedCard,
    Icon,
} from "../../../components/common";
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
        <ConnectedCard gap="compact">
            <ConnectedCard.Item>
                <View style={styles.promptHeader}>
                    <Icon name="sentence" size="default" tone="accent" />
                    <View style={styles.promptCopy}>
                        <ConnectedCard.Eyebrow>
                            {sentence.prompt}
                        </ConnectedCard.Eyebrow>
                        <AppText accessibilityRole="text" variant="sentence">
                            {sentence.sourceText}
                        </AppText>
                    </View>
                </View>
            </ConnectedCard.Item>
            {visibleHints.length > 0 ? (
                <ConnectedCard.Item>
                    <ConnectedCard.Title>Hint</ConnectedCard.Title>
                    <View style={styles.hints}>
                        {visibleHints.map((hint) => {
                            return (
                                <AnimatedMount key={hint}>
                                    <AppText tone="secondary">{hint}</AppText>
                                </AnimatedMount>
                            );
                        })}
                    </View>
                </ConnectedCard.Item>
            ) : null}
        </ConnectedCard>
    );
}

const styles = StyleSheet.create((theme) => ({
    promptHeader: {
        alignItems: "center",
        flexDirection: "row",
        gap: theme.spacing.md,
    },
    promptCopy: {
        flex: 1,
        gap: theme.spacing.xs,
    },
    hints: {
        gap: theme.spacing.sm,
    },
}));
