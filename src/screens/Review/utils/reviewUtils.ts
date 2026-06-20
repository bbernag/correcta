import type {
    ReviewDeckId,
    ReviewDeckSummary,
    ReviewItem,
    ReviewSourceType,
} from "../../../types";
import type {ReviewDeckRecords} from "../types/reviewTypes";

const REVIEW_DECK_DEFINITIONS: (Omit<ReviewDeckSummary, "itemCount"> & {
    sourceTypes: ReviewSourceType[];
})[] = [
    {
        description:
            "A balanced queue from saved words, sentences, and errors.",
        id: "recommended",
        sourceTypes: ["word", "sentence", "mistake"],
        title: "Recommended",
    },
    {
        description: "Quick recall for vocabulary saved from practice.",
        id: "wordFlashcards",
        sourceTypes: ["word"],
        title: "Word flashcards",
    },
    {
        description: "Full sentence context from saved translations.",
        id: "sentenceFlashcards",
        sourceTypes: ["sentence"],
        title: "Sentence flashcards",
    },
    {
        description: "Corrections from previous misses and partial answers.",
        id: "mistakeCards",
        sourceTypes: ["mistake"],
        title: "Mistake cards",
    },
    {
        description: "Saved sentences prepared for word-order practice.",
        id: "sentenceBuilder",
        sourceTypes: ["sentence"],
        title: "Sentence Builder",
    },
];

export function createReviewDeckRecords({
    activeDeckId,
    dueItems,
}: {
    activeDeckId: ReviewDeckId;
    dueItems: ReviewItem[];
}): ReviewDeckRecords {
    const decks = REVIEW_DECK_DEFINITIONS.map((deck) => {
        const itemCount = countItemsBySourceTypes({
            items: dueItems,
            sourceTypes: deck.sourceTypes,
        });

        return {
            ...deck,
            itemCount,
            state:
                deck.id === activeDeckId
                    ? ("selected" as const)
                    : ("available" as const),
        };
    });

    return {
        activeDeckId,
        activeItems: getDeckItems({deckId: activeDeckId, dueItems}),
        decks,
        dueItems,
    };
}

export function getDeckItems({
    deckId,
    dueItems,
}: {
    deckId: ReviewDeckId;
    dueItems: ReviewItem[];
}) {
    const deck = REVIEW_DECK_DEFINITIONS.find((definition) => {
        return definition.id === deckId;
    });

    if (!deck) {
        return dueItems;
    }

    return dueItems.filter((item) => {
        return deck.sourceTypes.includes(item.sourceType);
    });
}

export function getReviewSourceLabel(sourceType: ReviewSourceType) {
    const labels: Record<ReviewSourceType, string> = {
        mistake: "Mistake",
        sentence: "Sentence",
        word: "Word",
    };

    return labels[sourceType];
}

export function getReviewMasteryLabel(mastery: ReviewItem["mastery"]) {
    const labels: Record<ReviewItem["mastery"], string> = {
        learning: "Learning",
        mastered: "Mastered",
        new: "New",
        reviewing: "Reviewing",
    };

    return labels[mastery];
}

function countItemsBySourceTypes({
    items,
    sourceTypes,
}: {
    items: ReviewItem[];
    sourceTypes: ReviewSourceType[];
}) {
    return items.filter((item) => {
        return sourceTypes.includes(item.sourceType);
    }).length;
}
