import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, Card, Icon} from "../../../components/common";
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
        <Card gap="compact">
            <Card.Item>
                <View style={styles.promptHeader}>
                    <Icon name="sentence" size="default" tone="accent" />
                    <View style={styles.promptCopy}>
                        <Card.Eyebrow>{sentence.prompt}</Card.Eyebrow>
                        <AppText accessibilityRole="text" variant="sentence">
                            {sentence.sourceText}
                        </AppText>
                    </View>
                </View>
            </Card.Item>
            {visibleHints.length > 0 ? (
                <Card.Item>
                    <Card.Title>Hint</Card.Title>
                    <View style={styles.hints}>
                        {visibleHints.map((hint) => {
                            return (
                                <AppText key={hint} tone="secondary">
                                    {hint}
                                </AppText>
                            );
                        })}
                    </View>
                </Card.Item>
            ) : null}
        </Card>
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
