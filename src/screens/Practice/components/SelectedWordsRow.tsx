import {View} from "react-native";
import {EaseView} from "react-native-ease";
import {StyleSheet} from "react-native-unistyles";

import {AppText, WordChip} from "../../../components/common";
import {usePracticeAnimations} from "../hooks/usePracticeAnimations";
import type {WordBankItem} from "../types/practiceTypes";

type SelectedWordsRowProps = {
    disabled?: boolean;
    items: WordBankItem[];
    onRemoveWord: (itemId: string) => void;
};

export function SelectedWordsRow({
    disabled = false,
    items,
    onRemoveWord,
}: SelectedWordsRowProps) {
    const animations = usePracticeAnimations();

    return (
        <View style={styles.root}>
            {items.length > 0 ? (
                items.map((item) => {
                    return (
                        <EaseView
                            animate={animations.visible}
                            initialAnimate={animations.initialWordChip}
                            key={item.id}
                            transition={animations.chipEntryTransition}
                        >
                            <WordChip
                                disabled={disabled}
                                label={item.label}
                                onPress={() => {
                                    onRemoveWord(item.id);
                                }}
                                status="selected"
                            />
                        </EaseView>
                    );
                })
            ) : (
                <AppText tone="muted">
                    Tap words below to build your answer.
                </AppText>
            )}
        </View>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        alignItems: "flex-start",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: theme.spacing.sm,
        minHeight: 52,
    },
}));
