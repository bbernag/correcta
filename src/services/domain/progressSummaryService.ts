import type {
    PracticeAttempt,
    PracticeHistoryRepository,
    PracticeSessionSummary,
    ProgressSummaryService,
    SavedContentRepository,
} from "../../types";

export function createProgressSummaryService({
    history,
    savedContent,
}: {
    history: PracticeHistoryRepository;
    savedContent: SavedContentRepository;
}): ProgressSummaryService {
    return {
        async getProgressSnapshot() {
            const attempts = await history.listAttempts();
            const words = await savedContent.listWords();
            const sentences = await savedContent.listSentences();
            const completedAttempts = attempts.filter((attempt) => {
                return attempt.status !== "skipped";
            });
            const correctAttempts = attempts.filter((attempt) => {
                return attempt.status === "correct";
            });
            const now = new Date().toISOString();

            return {
                attemptsCompleted: completedAttempts.length,
                correctRate: getCorrectRate({
                    attempts,
                    correctAttempts,
                }),
                date: now.slice(0, 10),
                id: `progress-${now.slice(0, 10)}`,
                savedSentences: sentences.length,
                savedWords: words.length,
                sessionsCompleted: getCompletedSessionCount(attempts),
                streakDays: attempts.length > 0 ? 1 : 0,
                updatedAt: now,
            };
        },
        async getSessionSummary(sessionId) {
            const attempts = (await history.listAttempts()).filter(
                (attempt) => {
                    return attempt.sessionId === sessionId;
                }
            );

            if (attempts.length === 0) {
                return null;
            }

            return createSessionSummary({attempts, sessionId});
        },
    };
}

function getCorrectRate({
    attempts,
    correctAttempts,
}: {
    attempts: PracticeAttempt[];
    correctAttempts: PracticeAttempt[];
}) {
    if (attempts.length === 0) {
        return 0;
    }

    return correctAttempts.length / attempts.length;
}

function getCompletedSessionCount(attempts: PracticeAttempt[]) {
    return new Set(attempts.map((attempt) => attempt.sessionId)).size;
}

function createSessionSummary({
    attempts,
    sessionId,
}: {
    attempts: PracticeAttempt[];
    sessionId: string;
}): PracticeSessionSummary {
    return {
        almostCorrectCount: attempts.filter((attempt) => {
            return attempt.status === "almostCorrect";
        }).length,
        completedAt: attempts[0].attemptedAt,
        correctCount: attempts.filter((attempt) => {
            return attempt.status === "correct";
        }).length,
        incorrectCount: attempts.filter((attempt) => {
            return (
                attempt.status === "incorrect" || attempt.status === "partial"
            );
        }).length,
        savedSentenceCount: attempts.reduce((total, attempt) => {
            return total + attempt.savedSentenceIds.length;
        }, 0),
        savedWordCount: attempts.reduce((total, attempt) => {
            return total + attempt.savedWordIds.length;
        }, 0),
        sessionId,
        skippedCount: attempts.filter((attempt) => {
            return attempt.status === "skipped";
        }).length,
        totalAttempts: attempts.length,
    };
}
