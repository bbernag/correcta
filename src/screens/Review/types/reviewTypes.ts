import type {ReviewDeckId, ReviewDeckSummary, ReviewItem} from "../../../types";

export type ReviewPhase = "loading" | "ready" | "empty" | "error";

export type ReviewDeckState = ReviewDeckSummary & {
    state: "selected" | "available";
};

export type ReviewCardState = {
    currentIndex: number;
    item: ReviewItem;
    totalCount: number;
};

export type ReviewDeckRecords = {
    activeDeckId: ReviewDeckId;
    activeItems: ReviewItem[];
    decks: ReviewDeckState[];
    dueItems: ReviewItem[];
};
