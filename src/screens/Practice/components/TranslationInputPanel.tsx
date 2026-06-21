import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {
    AppText,
    SegmentedControl,
    Surface,
    TextInput,
} from "../../../components/common";
import type {PracticeInputMode} from "../../../types";
import type {WordBankItem} from "../types/practiceTypes";
import {ScrambledWordsInput} from "./ScrambledWordsInput";

const INPUT_MODE_OPTIONS = [
    {
        accessibilityHint: "Switches to the keyboard translation field.",
        accessibilityLabel: "Typing input mode",
        icon: "practice",
        label: "Type",
        value: "typing",
    },
    {
        accessibilityHint: "Switches to the word builder translation controls.",
        accessibilityLabel: "Builder input mode",
        icon: "word",
        label: "Build",
        value: "sentenceBuilder",
    },
] satisfies {
    accessibilityHint: string;
    accessibilityLabel: string;
    icon: "practice" | "word";
    label: string;
    value: PracticeInputMode;
}[];

type TranslationInputPanelProps = {
    answerText: string;
    disabled?: boolean;
    inputMode: PracticeInputMode;
    onChangeAnswer: (text: string) => void;
    onClearBuilder: () => void;
    onRemoveWord: (itemId: string) => void;
    onSelectInputMode: (inputMode: PracticeInputMode) => void;
    onSelectWord: (itemId: string) => void;
    selectedItemIds: string[];
    selectedWordBankItems: WordBankItem[];
    wordBankItems: WordBankItem[];
};

export function TranslationInputPanel({
    answerText,
    disabled = false,
    inputMode,
    onChangeAnswer,
    onClearBuilder,
    onRemoveWord,
    onSelectInputMode,
    onSelectWord,
    selectedItemIds,
    selectedWordBankItems,
    wordBankItems,
}: TranslationInputPanelProps) {
    function handleChangeInputMode(value: string) {
        if (value === "typing" || value === "sentenceBuilder") {
            onSelectInputMode(value);
        }
    }

    return (
        <Surface variant="card" style={styles.root}>
            <View style={styles.heading}>
                <AppText variant="heading">Answer</AppText>
                <AppText tone="secondary" variant="bodySmall">
                    Choose how you want to compose this translation.
                </AppText>
            </View>
            <SegmentedControl
                accessibilityLabel="Practice input mode"
                disabled={disabled}
                onChange={handleChangeInputMode}
                options={INPUT_MODE_OPTIONS}
                value={inputMode}
            />
            {inputMode === "typing" ? (
                <TextInput
                    autoCapitalize="sentences"
                    autoCorrect
                    blurOnSubmit
                    disabled={disabled}
                    helperText="Write the most natural translation you can."
                    inputStyle={styles.textInput}
                    label="Your translation"
                    multiline
                    onChangeText={onChangeAnswer}
                    placeholder="Type your answer"
                    returnKeyType="done"
                    textAlignVertical="top"
                    value={answerText}
                />
            ) : (
                <ScrambledWordsInput
                    disabled={disabled}
                    onClearBuilder={onClearBuilder}
                    onRemoveWord={onRemoveWord}
                    onSelectWord={onSelectWord}
                    selectedItemIds={selectedItemIds}
                    selectedWordBankItems={selectedWordBankItems}
                    wordBankItems={wordBankItems}
                />
            )}
        </Surface>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        gap: theme.spacing.md,
    },
    heading: {
        gap: theme.spacing.xs,
    },
    textInput: {
        minHeight: 112,
    },
}));
