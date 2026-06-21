import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, Chip, ProgressBar} from "../../../components/common";
import type {PracticeInputMode, UserPreferences} from "../../../types";

type PracticeHeaderProps = {
    currentIndex: number;
    inputMode: PracticeInputMode;
    preferences: UserPreferences;
    totalCount: number;
};

export function PracticeHeader({
    currentIndex,
    inputMode,
    preferences,
    totalCount,
}: PracticeHeaderProps) {
    const modeLabel = inputMode === "sentenceBuilder" ? "Builder" : "Typing";
    const currentStep = currentIndex + 1;

    return (
        <View style={styles.root}>
            <View style={styles.headingRow}>
                <View style={styles.headingCopy}>
                    <AppText variant="label" tone="accent">
                        Sentence {currentStep} of {totalCount}
                    </AppText>
                    <AppText accessibilityRole="header" variant="title">
                        Translate
                    </AppText>
                </View>
                <Chip
                    icon="practice"
                    label={modeLabel}
                    size="small"
                    variant="accent"
                />
            </View>
            <ProgressBar
                accessibilityLabel={`Practice progress ${currentStep} of ${totalCount}`}
                max={totalCount}
                value={currentStep}
            />
            <View style={styles.metaRow}>
                <AppText variant="caption" tone="secondary">
                    {preferences.languagePair.sourceLanguage.toUpperCase()} to{" "}
                    {preferences.languagePair.targetLanguage.toUpperCase()}
                </AppText>
                <AppText variant="caption" tone="secondary">
                    {preferences.level}
                </AppText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        gap: theme.spacing.sm,
    },
    headingRow: {
        alignItems: "center",
        flexDirection: "row",
        gap: theme.spacing.lg,
        justifyContent: "space-between",
    },
    headingCopy: {
        flex: 1,
        gap: theme.spacing.xs,
    },
    metaRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: theme.spacing.sm,
    },
}));
