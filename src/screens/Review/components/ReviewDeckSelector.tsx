import {Pressable, View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText} from "../../../components/common";
import type {ReviewDeckId} from "../../../types";
import type {ReviewDeckState} from "../types/ReviewTypes";

type ReviewDeckSelectorProps = {
    decks: ReviewDeckState[];
    onSelectDeck: (deckId: ReviewDeckId) => void;
};

export function ReviewDeckSelector({
    decks,
    onSelectDeck,
}: ReviewDeckSelectorProps) {
    return (
        <View style={styles.root}>
            {decks.map((deck) => {
                return (
                    <Pressable
                        accessibilityRole="button"
                        accessibilityState={{
                            selected: deck.state === "selected",
                        }}
                        key={deck.id}
                        onPress={() => {
                            onSelectDeck(deck.id);
                        }}
                        style={({pressed}) => [
                            styles.deck,
                            deck.state === "selected" && styles.selected,
                            pressed && styles.pressed,
                        ]}
                    >
                        <AppText variant="label">{deck.title}</AppText>
                        <AppText variant="caption" tone="secondary">
                            {deck.itemCount} due
                        </AppText>
                    </Pressable>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        gap: theme.spacing.sm,
    },
    deck: {
        backgroundColor: theme.colors.surfaceMuted,
        borderColor: theme.colors.border,
        borderRadius: theme.radii.md,
        borderWidth: 1,
        gap: theme.spacing.xs,
        minHeight: 64,
        padding: theme.spacing.md,
    },
    selected: {
        backgroundColor: theme.colors.accentSoft,
        borderColor: theme.colors.accentStrong,
    },
    pressed: {
        opacity: theme.motion.pressOpacity,
    },
}));
