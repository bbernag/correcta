import type {CardPerformanceItem} from "../types/CardPerformanceTypes";

export const CARD_PERFORMANCE_ITEM_COUNT = 40;

export const CARD_PERFORMANCE_ITEMS: CardPerformanceItem[] = Array.from(
    {length: CARD_PERFORMANCE_ITEM_COUNT},
    (_, index) => {
        const itemNumber = index + 1;

        return {
            bestScore: `${(2400 + itemNumber * 37).toLocaleString("en-US")}`,
            id: `card-performance-${itemNumber}`,
            reactionSpeed: `${280 + (itemNumber % 9) * 7} ms`,
            reviewPace: `${4 + (itemNumber % 5)}m`,
            savedTerms: `${42 + itemNumber}`,
            sequenceTitle: `Sequence rush ${itemNumber}`,
        };
    }
);
