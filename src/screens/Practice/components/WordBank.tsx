import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, WordChip} from "../../../components/common";
import type {WordBankItem} from "../types/practiceTypes";

type WordBankProps = {
    disabled?: boolean;
    items: WordBankItem[];
    onSelectWord: (itemId: string) => void;
    selectedItemIds: string[];
};

export function WordBank({
    disabled = false,
    items,
    onSelectWord,
    selectedItemIds,
}: WordBankProps) {
    return (
        <View style={styles.root}>
            {items.map((item) => {
                const isSelected = selectedItemIds.includes(item.id);

                return (
                    <WordChip
                        accessibilityHint={
                            isSelected
                                ? "Already added to your answer."
                                : "Adds this word to your answer."
                        }
                        accessibilityLabel={
                            isSelected
                                ? `${item.label}. Already added.`
                                : `${item.label}. Word bank option.`
                        }
                        disabled={disabled || isSelected}
                        key={item.id}
                        label={item.label}
                        onPress={() => {
                            onSelectWord(item.id);
                        }}
                        status={isSelected ? "selected" : "default"}
                    />
                );
            })}
            {items.length === 0 ? (
                <AppText tone="muted">No word bank is available.</AppText>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: theme.spacing.sm,
    },
}));
