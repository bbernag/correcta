import type {
    ReviewDeckId,
    ReviewDeckSummary,
    ReviewGrade,
    ReviewItem,
    ReviewMastery,
    ReviewSourceType,
} from "../../../types";
import type {
    ButtonVariant,
    IconName,
    StatCardTone,
} from "../../../components/common";
import type {
    ReviewDeckRecords,
    ReviewDeckState,
    ReviewSummaryState,
} from "../types/reviewTypes";

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

export function getReviewSourceIcon(sourceType: ReviewSourceType): IconName {
    const icons: Record<ReviewSourceType, IconName> = {
        mistake: "mistake",
        sentence: "sentence",
        word: "word",
    };

    return icons[sourceType];
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

export function getReviewMasteryTone(mastery: ReviewMastery): StatCardTone {
    if (mastery === "mastered") {
        return "success";
    }

    if (mastery === "learning") {
        return "warning";
    }

    if (mastery === "reviewing") {
        return "accent";
    }

    return "info";
}

export function getReviewGradeButtonVariant(grade: ReviewGrade): ButtonVariant {
    switch (grade) {
        case "known":
            return "success";
        case "difficult":
            return "danger";
        case "unsure":
        default:
            return "secondary";
    }
}

export function getReviewGradeLabel(grade: ReviewGrade) {
    const labels: Record<ReviewGrade, string> = {
        difficult: "Difficult",
        known: "Known",
        unsure: "Unsure",
    };

    return labels[grade];
}

export function createReviewSummary({
    activeDeck,
    activeItems,
    dueItems,
}: {
    activeDeck: ReviewDeckState | null;
    activeItems: ReviewItem[];
    dueItems: ReviewItem[];
}): ReviewSummaryState {
    const learningCount = dueItems.filter((item) => {
        return item.mastery === "learning";
    }).length;

    return {
        activeDeckTitle: activeDeck?.title ?? "Recommended",
        metrics: [
            {
                helper: "Cards ready now",
                icon: "review",
                id: "due",
                label: "Due",
                tone: dueItems.length > 0 ? "warning" : "success",
                value: String(dueItems.length),
            },
            {
                helper: "In selected deck",
                icon: "saved",
                id: "active",
                label: "Queue",
                tone: activeItems.length > 0 ? "accent" : "info",
                value: String(activeItems.length),
            },
            {
                helper: "Marked learning",
                icon: "mistake",
                id: "learning",
                label: "Difficult",
                tone: learningCount > 0 ? "warning" : "success",
                value: String(learningCount),
            },
        ],
        progressLabel:
            dueItems.length > 0
                ? `${activeItems.length}/${dueItems.length} cards in this pass`
                : "Review queue complete",
        progressMax: Math.max(dueItems.length, 1),
        progressTone: dueItems.length === 0 ? "success" : "accent",
        progressValue: activeItems.length,
    };
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
