import {ActivityIndicator} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, Screen, Surface} from "../../components/common";
import {ReviewCard} from "./components/ReviewCard";
import {ReviewDeckSelector} from "./components/ReviewDeckSelector";
import {ReviewEmptyState} from "./components/ReviewEmptyState";
import {ReviewErrorState} from "./components/ReviewErrorState";
import {useReviewDeck} from "./hooks/useReviewDeck";

export function ReviewScreen() {
    const review = useReviewDeck();

    if (review.phase === "loading") {
        return (
            <Screen contentContainerStyle={styles.centered}>
                <ActivityIndicator
                    accessibilityLabel="Loading review cards"
                    size="large"
                />
                <AppText variant="heading">Preparing Review</AppText>
                <AppText tone="secondary">
                    Finding due words, sentences, and mistakes.
                </AppText>
            </Screen>
        );
    }

    return (
        <Screen>
            <AppText variant="title">Review</AppText>
            <Surface variant="outline" style={styles.section}>
                <AppText variant="heading">Recommended decks</AppText>
                <AppText tone="secondary">
                    Choose a focused queue, reveal the answer, then mark each
                    card known, unsure, or difficult.
                </AppText>
                <ReviewDeckSelector
                    decks={review.records.decks}
                    onSelectDeck={review.handleSelectDeck}
                />
            </Surface>
            {review.phase === "error" ? (
                <ReviewErrorState
                    message={review.error ?? "Review could not be loaded."}
                    onRetry={review.handleRefresh}
                />
            ) : null}
            {review.phase === "empty" ? <ReviewEmptyState /> : null}
            {review.phase === "ready" && !review.cardState ? (
                <ReviewEmptyState
                    message="Choose another deck or complete more practice to add cards here."
                    title="No cards in this deck"
                />
            ) : null}
            {review.cardState ? (
                <ReviewCard
                    cardState={review.cardState}
                    isAnswerVisible={review.isAnswerVisible}
                    onCompleteItem={(grade) => {
                        if (review.cardState) {
                            void review.handleCompleteItem(
                                grade,
                                review.cardState.item
                            );
                        }
                    }}
                    onRevealAnswer={review.handleRevealAnswer}
                    pendingGrade={review.pendingGrade}
                />
            ) : null}
        </Screen>
    );
}

const styles = StyleSheet.create((theme) => ({
    centered: {
        alignItems: "center",
        flexGrow: 1,
        justifyContent: "center",
    },
    section: {
        gap: theme.spacing.md,
    },
}));
