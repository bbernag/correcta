import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, Button, Surface} from "../../../components/common";
import type {WordBankItem} from "../types/practiceTypes";
import {SelectedWordsRow} from "./SelectedWordsRow";
import {WordBank} from "./WordBank";

type ScrambledWordsInputProps = {
    disabled?: boolean;
    onClearBuilder: () => void;
    onRemoveWord: (itemId: string) => void;
    onSelectWord: (itemId: string) => void;
    selectedItemIds: string[];
    selectedWordBankItems: WordBankItem[];
    wordBankItems: WordBankItem[];
};

export function ScrambledWordsInput({
    disabled = false,
    onClearBuilder,
    onRemoveWord,
    onSelectWord,
    selectedItemIds,
    selectedWordBankItems,
    wordBankItems,
}: ScrambledWordsInputProps) {
    return (
        <View style={styles.root}>
            <Surface variant="muted" style={styles.answerSurface}>
                <View style={styles.sectionHeader}>
                    <AppText variant="label">Your answer</AppText>
                    <Button
                        disabled={disabled || selectedItemIds.length === 0}
                        label="Clear"
                        onPress={onClearBuilder}
                        size="small"
                        variant="ghost"
                    />
                </View>
                <SelectedWordsRow
                    disabled={disabled}
                    items={selectedWordBankItems}
                    onRemoveWord={onRemoveWord}
                />
            </Surface>
            <View style={styles.wordBankSection}>
                <AppText variant="label">Word bank</AppText>
                <WordBank
                    disabled={disabled}
                    items={wordBankItems}
                    onSelectWord={onSelectWord}
                    selectedItemIds={selectedItemIds}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        gap: theme.spacing.md,
    },
    answerSurface: {
        gap: theme.spacing.sm,
    },
    sectionHeader: {
        alignItems: "center",
        flexDirection: "row",
        gap: theme.spacing.md,
        justifyContent: "space-between",
    },
    wordBankSection: {
        gap: theme.spacing.sm,
    },
}));
