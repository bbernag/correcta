import type {ReviewDeckId, ReviewDeckSummary, ReviewItem} from "../../../types";
import type {
    IconName,
    ProgressBarTone,
    StatCardTone,
} from "../../../components/common";

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
    totalItemCount: number;
};

export type ReviewSummaryMetric = {
    helper: string;
    icon: IconName;
    id: string;
    label: string;
    tone: StatCardTone;
    value: string;
};

export type ReviewSummaryState = {
    activeDeckTitle: string;
    metrics: ReviewSummaryMetric[];
    progressLabel: string;
    progressMax: number;
    progressTone: ProgressBarTone;
    progressValue: number;
};
