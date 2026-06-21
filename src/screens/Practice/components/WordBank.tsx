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
