import {StyleSheet} from "react-native-unistyles";

import {
    AppText,
    Crossfade,
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
        accessibilityHint: "Switches to the word bank translation controls.",
        accessibilityLabel: "Word bank input mode",
        icon: "word",
        label: "Word bank",
        value: "sentenceBuilder",
    },
] satisfies {
    accessibilityHint: string;
    accessibilityLabel: string;
    icon: "practice" | "word";
    label: string;
    value: PracticeInputMode;
}[];

const INPUT_MODE_CONTENT_MIN_HEIGHT = 260;

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
            <AppText variant="heading">Answer</AppText>
            <SegmentedControl
                accessibilityLabel="Practice input mode"
                disabled={disabled}
                onChange={handleChangeInputMode}
                options={INPUT_MODE_OPTIONS}
                value={inputMode}
            />
            <Crossfade
                contentKey={inputMode}
                minHeight={INPUT_MODE_CONTENT_MIN_HEIGHT}
            >
                {inputMode === "typing" ? (
                    <TextInput
                        autoCapitalize="sentences"
                        autoCorrect
                        blurOnSubmit
                        disabled={disabled}
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
            </Crossfade>
        </Surface>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        gap: theme.spacing.md,
    },
    textInput: {
        minHeight: 112,
    },
}));
