import type {PracticeAttempt, PracticeHistoryRepository} from "../../../types";
import {
    readJsonValue,
    removeJsonValue,
    writeJsonValue,
} from "../../storage/localJsonStorage";

const PRACTICE_ATTEMPTS_KEY = "domain.practiceAttempts";

export function createPracticeHistoryRepository(): PracticeHistoryRepository {
    return {
        async saveAttempt(attempt) {
            const attempts = readJsonValue<PracticeAttempt[]>({
                fallback: [],
                key: PRACTICE_ATTEMPTS_KEY,
            });
            const nextAttempts = [
                attempt,
                ...attempts.filter((storedAttempt) => {
                    return storedAttempt.id !== attempt.id;
                }),
            ];

            writeJsonValue({key: PRACTICE_ATTEMPTS_KEY, value: nextAttempts});

            return attempt;
        },
        async listAttempts() {
            return readJsonValue<PracticeAttempt[]>({
                fallback: [],
                key: PRACTICE_ATTEMPTS_KEY,
            });
        },
        async clearAttempts() {
            removeJsonValue(PRACTICE_ATTEMPTS_KEY);
        },
    };
}
