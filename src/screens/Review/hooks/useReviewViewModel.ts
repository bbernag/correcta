import {useMemo} from "react";

import {createReviewSummary} from "../utils/reviewUtils";
import {useReviewDeck} from "./useReviewDeck";

export function useReviewViewModel() {
    const review = useReviewDeck();
    const activeDeck = useMemo(() => {
        return (
            review.records.decks.find((deck) => {
                return deck.id === review.records.activeDeckId;
            }) ?? null
        );
    }, [review.records.activeDeckId, review.records.decks]);
    const summary = useMemo(() => {
        return createReviewSummary({
            activeDeck,
            activeItems: review.records.activeItems,
            dueItems: review.records.dueItems,
        });
    }, [activeDeck, review.records.activeItems, review.records.dueItems]);
    const queuePreviewStart = review.cardState
        ? review.cardState.currentIndex + 1
        : 0;
    const queuePreview = review.records.activeItems.slice(
        queuePreviewStart,
        queuePreviewStart + 3
    );

    return {
        ...review,
        activeDeck,
        isActiveDeckEmpty:
            review.phase === "ready" && review.records.activeItems.length === 0,
        isReviewComplete:
            review.phase === "empty" || review.records.dueItems.length === 0,
        queuePreview,
        summary,
    };
}
