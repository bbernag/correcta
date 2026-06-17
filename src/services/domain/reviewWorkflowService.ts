import type {
    ReviewGrade,
    ReviewItem,
    ReviewQueueRepository,
    ReviewWorkflowService,
    SavedContentRepository,
} from "../../types";

type CreateReviewWorkflowServiceParams = {
    reviewQueue: ReviewQueueRepository;
    savedContent: SavedContentRepository;
};

export function createReviewWorkflowService({
    reviewQueue,
    savedContent,
}: CreateReviewWorkflowServiceParams): ReviewWorkflowService {
    return {
        async completeReviewItem({grade, item}) {
            const reviewedAt = new Date().toISOString();
            const nextItem = getNextReviewItem({
                grade,
                item,
                reviewedAt,
            });

            await reviewQueue.upsertItem(nextItem);
            await updateSavedSourceReviewDate({
                item,
                reviewedAt,
                savedContent,
            });

            return nextItem;
        },
    };
}

function getNextReviewItem({
    grade,
    item,
    reviewedAt,
}: {
    grade: ReviewGrade;
    item: ReviewItem;
    reviewedAt: string;
}): ReviewItem {
    const intervalDays = getNextIntervalDays({grade, item});
    const dueAt = new Date(reviewedAt);

    dueAt.setDate(dueAt.getDate() + intervalDays);

    return {
        ...item,
        dueAt: dueAt.toISOString(),
        intervalDays,
        lastReviewedAt: reviewedAt,
        mastery: getNextMastery({grade, item}),
    };
}

function getNextIntervalDays({
    grade,
    item,
}: {
    grade: ReviewGrade;
    item: ReviewItem;
}) {
    if (grade === "known") {
        return Math.min(Math.max(item.intervalDays * 2, 2), 30);
    }

    if (grade === "unsure") {
        return Math.max(item.intervalDays, 1);
    }

    return 1;
}

function getNextMastery({grade, item}: {grade: ReviewGrade; item: ReviewItem}) {
    if (grade === "difficult") {
        return "learning";
    }

    if (grade === "unsure") {
        return item.mastery === "new" ? "learning" : item.mastery;
    }

    if (item.intervalDays >= 14 || item.mastery === "reviewing") {
        return "mastered";
    }

    return "reviewing";
}

async function updateSavedSourceReviewDate({
    item,
    reviewedAt,
    savedContent,
}: {
    item: ReviewItem;
    reviewedAt: string;
    savedContent: SavedContentRepository;
}) {
    if (item.sourceType === "word") {
        const savedWords = await savedContent.listWords();
        const savedWord = savedWords.find((word) => {
            return word.id === item.sourceId;
        });

        if (savedWord) {
            await savedContent.saveWord({
                ...savedWord,
                lastReviewedAt: reviewedAt,
            });
        }
    }

    if (item.sourceType === "sentence") {
        const savedSentences = await savedContent.listSentences();
        const savedSentence = savedSentences.find((sentence) => {
            return sentence.id === item.sourceId;
        });

        if (savedSentence) {
            await savedContent.saveSentence({
                ...savedSentence,
                lastReviewedAt: reviewedAt,
            });
        }
    }
}
