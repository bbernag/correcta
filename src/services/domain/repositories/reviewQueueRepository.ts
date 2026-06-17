import type {ReviewItem, ReviewQueueRepository} from "../../../types";
import {
    readJsonValue,
    removeJsonValue,
    writeJsonValue,
} from "../../storage/localJsonStorage";

const REVIEW_QUEUE_KEY = "domain.reviewQueue";

export function createReviewQueueRepository(): ReviewQueueRepository {
    return {
        async upsertItem(item) {
            const items = readJsonValue<ReviewItem[]>(REVIEW_QUEUE_KEY, []);
            const nextItems = [
                item,
                ...items.filter((storedItem) => {
                    return storedItem.id !== item.id;
                }),
            ];

            writeJsonValue(REVIEW_QUEUE_KEY, nextItems);

            return item;
        },
        async listDueItems(now) {
            const items = readJsonValue<ReviewItem[]>(REVIEW_QUEUE_KEY, []);

            return items.filter((item) => {
                return item.dueAt <= now;
            });
        },
        async clearItems() {
            removeJsonValue(REVIEW_QUEUE_KEY);
        },
    };
}
