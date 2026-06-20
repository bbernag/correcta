import {Pressable, View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, PressableMotionView} from "../../../components/common";
import type {ReviewDeckId} from "../../../types";
import type {ReviewDeckState} from "../types/reviewTypes";

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
                    >
                        {({pressed}) => (
                            <PressableMotionView
                                pressed={pressed}
                                style={[
                                    styles.deck,
                                    deck.state === "selected" &&
                                        styles.selected,
                                ]}
                            >
                                <AppText variant="label">{deck.title}</AppText>
                                <AppText variant="caption" tone="secondary">
                                    {deck.itemCount} due
                                </AppText>
                            </PressableMotionView>
                        )}
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
        backgroundColor: theme.colors.surfaceTonal,
        borderColor: theme.colors.borderSubtle,
        borderRadius: theme.radii.md,
        borderWidth: 1,
        gap: theme.spacing.xs,
        minHeight: 64,
        padding: theme.spacing.md,
    },
    selected: {
        backgroundColor: theme.colors.accentPrimarySoft,
        borderColor: theme.colors.accentPrimaryStrong,
    },
}));
