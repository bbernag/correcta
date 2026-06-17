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
            const items = readJsonValue<ReviewItem[]>({
                fallback: [],
                key: REVIEW_QUEUE_KEY,
            });
            const nextItems = [
                item,
                ...items.filter((storedItem) => {
                    return storedItem.id !== item.id;
                }),
            ];

            writeJsonValue({key: REVIEW_QUEUE_KEY, value: nextItems});

            return item;
        },
        async listItems() {
            return readJsonValue<ReviewItem[]>({
                fallback: [],
                key: REVIEW_QUEUE_KEY,
            });
        },
        async listDueItems(now) {
            const items = readJsonValue<ReviewItem[]>({
                fallback: [],
                key: REVIEW_QUEUE_KEY,
            });

            return items.filter((item) => {
                return item.dueAt <= now;
            });
        },
        async removeItemsBySource({sourceId, sourceType}) {
            const items = readJsonValue<ReviewItem[]>({
                fallback: [],
                key: REVIEW_QUEUE_KEY,
            });

            writeJsonValue({
                key: REVIEW_QUEUE_KEY,
                value: items.filter((item) => {
                    return (
                        item.sourceId !== sourceId ||
                        item.sourceType !== sourceType
                    );
                }),
            });
        },
        async clearItems() {
            removeJsonValue(REVIEW_QUEUE_KEY);
        },
    };
}
