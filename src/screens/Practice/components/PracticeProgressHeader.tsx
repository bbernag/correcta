import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText} from "../../../components/common";
import type {PracticeInputMode, UserPreferences} from "../../../types";

type PracticeProgressHeaderProps = {
    currentIndex: number;
    inputMode: PracticeInputMode;
    preferences: UserPreferences;
    totalCount: number;
};

export function PracticeProgressHeader({
    currentIndex,
    inputMode,
    preferences,
    totalCount,
}: PracticeProgressHeaderProps) {
    const modeLabel =
        inputMode === "sentenceBuilder" ? "Sentence builder" : "Typing";

    return (
        <View style={styles.root}>
            <View>
                <AppText variant="label" tone="accent">
                    Sentence {currentIndex + 1} of {totalCount}
                </AppText>
                <AppText accessibilityRole="header" variant="title">
                    Translate
                </AppText>
            </View>
            <View style={styles.meta}>
                <AppText variant="caption" tone="secondary">
                    {preferences.languagePair.sourceLanguage.toUpperCase()} to{" "}
                    {preferences.languagePair.targetLanguage.toUpperCase()}
                </AppText>
                <AppText variant="caption" tone="secondary">
                    {modeLabel}
                </AppText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        gap: theme.spacing.md,
    },
    meta: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: theme.spacing.sm,
    },
}));
