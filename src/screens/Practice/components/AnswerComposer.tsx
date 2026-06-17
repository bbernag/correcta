import {Pressable, View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, Button, TextInput} from "../../../components/common";
import type {PracticeInputMode} from "../../../types";
import type {WordBankItem} from "../types/PracticeTypes";

type AnswerComposerProps = {
    answerText: string;
    inputMode: PracticeInputMode;
    onChangeAnswer: (text: string) => void;
    onClearBuilder: () => void;
    onRemoveWord: (itemId: string) => void;
    onSelectWord: (itemId: string) => void;
    remainingWordBankItems: WordBankItem[];
    selectedWordBankItems: WordBankItem[];
};

export function AnswerComposer({
    answerText,
    inputMode,
    onChangeAnswer,
    onClearBuilder,
    onRemoveWord,
    onSelectWord,
    remainingWordBankItems,
    selectedWordBankItems,
}: AnswerComposerProps) {
    if (inputMode === "typing") {
        return (
            <TextInput
                autoCapitalize="sentences"
                autoCorrect
                inputStyle={styles.textInput}
                label="Your translation"
                multiline
                onChangeText={onChangeAnswer}
                returnKeyType="done"
                textAlignVertical="top"
                value={answerText}
            />
        );
    }

    return (
        <View style={styles.root}>
            <View style={styles.answerArea}>
                {selectedWordBankItems.length > 0 ? (
                    selectedWordBankItems.map((item) => {
                        return (
                            <Pressable
                                accessibilityLabel={`Remove ${item.label}`}
                                accessibilityRole="button"
                                key={item.id}
                                onPress={() => {
                                    onRemoveWord(item.id);
                                }}
                                style={({pressed}) => [
                                    styles.selectedChip,
                                    pressed && styles.pressed,
                                ]}
                            >
                                <AppText variant="label">{item.label}</AppText>
                            </Pressable>
                        );
                    })
                ) : (
                    <AppText tone="muted">Build your answer</AppText>
                )}
            </View>
            <View style={styles.wordBank}>
                {remainingWordBankItems.length > 0 ? (
                    remainingWordBankItems.map((item) => {
                        return (
                            <Pressable
                                accessibilityLabel={`Add ${item.label}`}
                                accessibilityRole="button"
                                key={item.id}
                                onPress={() => {
                                    onSelectWord(item.id);
                                }}
                                style={({pressed}) => [
                                    styles.bankChip,
                                    pressed && styles.pressed,
                                ]}
                            >
                                <AppText variant="label" tone="accent">
                                    {item.label}
                                </AppText>
                            </Pressable>
                        );
                    })
                ) : (
                    <View
                        accessibilityLabel="All words used"
                        style={styles.emptyWordBank}
                    >
                        <AppText tone="muted">All words used</AppText>
                    </View>
                )}
            </View>
            <Button
                disabled={selectedWordBankItems.length === 0}
                label="Clear builder"
                onPress={onClearBuilder}
                variant="ghost"
            />
        </View>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        gap: theme.spacing.md,
    },
    textInput: {
        minHeight: 112,
    },
    answerArea: {
        alignItems: "flex-start",
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.border,
        borderRadius: theme.radii.md,
        borderWidth: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        gap: theme.spacing.sm,
        minHeight: 96,
        padding: theme.spacing.md,
    },
    wordBank: {
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: theme.spacing.sm,
        minHeight: 44,
    },
    selectedChip: {
        backgroundColor: theme.colors.accentSoft,
        borderRadius: theme.radii.sm,
        minHeight: 44,
        justifyContent: "center",
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
    },
    bankChip: {
        backgroundColor: theme.colors.surfaceMuted,
        borderColor: theme.colors.border,
        borderRadius: theme.radii.sm,
        borderWidth: 1,
        minHeight: 44,
        justifyContent: "center",
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
    },
    pressed: {
        opacity: theme.motion.pressOpacity,
    },
    emptyWordBank: {
        minHeight: 44,
        justifyContent: "center",
    },
}));
