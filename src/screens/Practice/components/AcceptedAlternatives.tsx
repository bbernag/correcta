import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, Surface} from "../../../components/common";
import type {AcceptedTranslation} from "../../../types";

type AcceptedAlternativesProps = {
    acceptedTranslations: AcceptedTranslation[];
    preferredAnswer: string;
    sourceText: string;
    userAnswer: string;
};

export function AcceptedAlternatives({
    acceptedTranslations,
    preferredAnswer,
    sourceText,
    userAnswer,
}: AcceptedAlternativesProps) {
    return (
        <Surface variant="outline" style={styles.root}>
            <View style={styles.answerPair}>
                <AppText variant="label">Original sentence</AppText>
                <AppText tone="secondary">{sourceText}</AppText>
            </View>
            <View style={styles.answerPair}>
                <AppText variant="label">Your answer</AppText>
                <AppText tone="secondary">{userAnswer || "Skipped"}</AppText>
            </View>
            <View style={styles.answerPair}>
                <AppText variant="label">Accepted answer</AppText>
                <AppText tone="secondary">{preferredAnswer}</AppText>
            </View>
            {acceptedTranslations.length > 1 ? (
                <View style={styles.answerPair}>
                    <AppText variant="label">Other accepted answers</AppText>
                    {acceptedTranslations
                        .filter((translation) => {
                            return translation.text !== preferredAnswer;
                        })
                        .map((translation) => {
                            return (
                                <AppText
                                    key={translation.id}
                                    tone="secondary"
                                    variant="bodySmall"
                                >
                                    {translation.text}
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
    answerPair: {
        gap: theme.spacing.xs,
    },
}));
