import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {
    LoadingState,
    Screen,
    ScreenHeader,
    SectionHeader,
} from "../../components/common";
import {ReviewCard} from "./components/ReviewCard";
import {ReviewDeckSelector} from "./components/ReviewDeckSelector";
import {ReviewEmptyState} from "./components/ReviewEmptyState";
import {ReviewErrorState} from "./components/ReviewErrorState";
import {ReviewQueuePreview} from "./components/ReviewQueuePreview";
import {ReviewSummaryCard} from "./components/ReviewSummaryCard";
import {useReviewViewModel} from "./hooks/useReviewViewModel";

export function ReviewScreen() {
    const review = useReviewViewModel();
    const cardState = review.cardState;

    if (review.phase === "loading") {
        return (
            <Screen contentContainerStyle={styles.centered}>
                <LoadingState
                    message="Finding due words, sentences, and mistakes."
                    title="Preparing review"
                />
            </Screen>
        );
    }

    return (
        <Screen contentContainerStyle={styles.content}>
            <ScreenHeader
                eyebrow="Review"
                subtitle="Choose a focused queue, reveal the answer, then grade your recall."
                title="Due cards"
            />
            {review.phase === "error" ? (
                <ReviewErrorState
                    message={review.error ?? "Review could not be loaded."}
                    onRetry={review.handleRefresh}
                />
            ) : null}
            {review.phase !== "error" ? (
                <>
                    <ReviewSummaryCard summary={review.summary} />
                    {review.isReviewComplete ? <ReviewEmptyState /> : null}
                    {review.isActiveDeckEmpty ? (
                        <ReviewEmptyState
                            message="Choose another deck or complete more practice to add cards here."
                            title="No cards in this deck"
                        />
                    ) : null}
                    {cardState ? (
                        <>
                            <ReviewCard
                                cardState={cardState}
                                isAnswerVisible={review.isAnswerVisible}
                                onCompleteItem={(grade) => {
                                    void review.handleCompleteItem(
                                        grade,
                                        cardState.item
                                    );
                                }}
                                onRevealAnswer={review.handleRevealAnswer}
                                pendingGrade={review.pendingGrade}
                            />
                            <ReviewQueuePreview items={review.queuePreview} />
                        </>
                    ) : null}
                    <View style={styles.section}>
                        <SectionHeader
                            subtitle="Each deck shows the cards due right now."
                            title="Review decks"
                        />
                        <ReviewDeckSelector
                            decks={review.records.decks}
                            onSelectDeck={review.handleSelectDeck}
                        />
                    </View>
                </>
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
    content: {
        paddingBottom: theme.spacing["3xl"],
    },
    section: {
        gap: theme.spacing.md,
    },
}));
