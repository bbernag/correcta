import {Pressable, View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {
    AppText,
    Icon,
    PressableMotionView,
    Surface,
} from "../../../components/common";
import type {ReviewDeckId} from "../../../types";
import type {ReviewDeckState} from "../types/reviewTypes";
import {getReviewSourceIcon} from "../utils/reviewUtils";

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
                        accessibilityHint="Changes the active review deck."
                        accessibilityLabel={getDeckAccessibilityLabel(deck)}
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
                            <PressableMotionView pressed={pressed}>
                                <Surface
                                    variant={
                                        deck.state === "selected"
                                            ? "tonal"
                                            : "outline"
                                    }
                                    style={styles.deck}
                                >
                                    <View style={styles.deckHeader}>
                                        <Icon
                                            name={getDeckIcon(deck)}
                                            size="default"
                                            tone={
                                                deck.itemCount > 0
                                                    ? "accent"
                                                    : "muted"
                                            }
                                        />
                                        <View style={styles.deckCopy}>
                                            <AppText variant="bodyStrong">
                                                {deck.title}
                                            </AppText>
                                            <AppText
                                                variant="caption"
                                                tone="secondary"
                                            >
                                                {deck.description}
                                            </AppText>
                                        </View>
                                    </View>
                                    <View style={styles.deckFooter}>
                                        <AppText variant="label" tone="accent">
                                            {deck.itemCount} due
                                        </AppText>
                                        <AppText variant="caption" tone="muted">
                                            {deck.state === "selected"
                                                ? "Selected"
                                                : "Tap to focus"}
                                        </AppText>
                                    </View>
                                </Surface>
                            </PressableMotionView>
                        )}
                    </Pressable>
                );
            })}
        </View>
    );
}

function getDeckIcon(deck: ReviewDeckState) {
    return deck.sourceTypes[0]
        ? getReviewSourceIcon(deck.sourceTypes[0])
        : "review";
}

function getDeckAccessibilityLabel(deck: ReviewDeckState) {
    const selectedLabel =
        deck.state === "selected" ? "Selected deck" : "Available deck";

    return `${deck.title}. ${deck.itemCount} due. ${selectedLabel}.`;
}

const styles = StyleSheet.create((theme) => ({
    root: {
        gap: theme.spacing.sm,
    },
    deck: {
        gap: theme.spacing.xs,
    },
    deckHeader: {
        alignItems: "center",
        flexDirection: "row",
        gap: theme.spacing.md,
    },
    deckCopy: {
        flex: 1,
        gap: theme.spacing.xs,
    },
    deckFooter: {
        alignItems: "center",
        flexDirection: "row",
        gap: theme.spacing.md,
        justifyContent: "space-between",
    },
}));
