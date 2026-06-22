import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {
    AppText,
    Button,
    SegmentedControl,
    Surface,
    TextInput,
} from "../../../components/common";
import type {PracticeInputMode} from "../../../types";
import type {WordBankItem} from "../types/practiceTypes";
import {PracticeInputModeMorph} from "./PracticeInputModeMorph";
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
    canSubmit: boolean;
    disabled?: boolean;
    inputMode: PracticeInputMode;
    isChecking: boolean;
    onChangeAnswer: (text: string) => void;
    onClearBuilder: () => void;
    onRemoveWord: (itemId: string) => void;
    onSelectInputMode: (inputMode: PracticeInputMode) => void;
    onSelectWord: (itemId: string) => void;
    onSubmitAnswer: () => void;
    selectedItemIds: string[];
    selectedWordBankItems: WordBankItem[];
    wordBankItems: WordBankItem[];
};

export function TranslationInputPanel({
    answerText,
    canSubmit,
    disabled = false,
    inputMode,
    isChecking,
    onChangeAnswer,
    onClearBuilder,
    onRemoveWord,
    onSelectInputMode,
    onSelectWord,
    onSubmitAnswer,
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
                optionRole="tab"
                options={INPUT_MODE_OPTIONS}
                value={inputMode}
            />
            <PracticeInputModeMorph
                contentKey={inputMode}
                minHeight={INPUT_MODE_CONTENT_MIN_HEIGHT}
            >
                {inputMode === "typing" ? (
                    <View style={styles.typingMode}>
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
                        <Button
                            accessibilityLabel="Check answer"
                            disabled={!canSubmit}
                            fullWidth
                            label="Check answer"
                            loading={isChecking}
                            loadingLabel="Checking answer"
                            onPress={onSubmitAnswer}
                        />
                    </View>
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
            </PracticeInputModeMorph>
        </Surface>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        gap: theme.spacing.md,
    },
    typingMode: {
        gap: theme.spacing.md,
    },
    textInput: {
        minHeight: 112,
    },
}));
