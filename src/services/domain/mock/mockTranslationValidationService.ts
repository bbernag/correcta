import type {
    MistakeCategory,
    TranslationMistake,
    TranslationValidationService,
    ValidationStatus,
} from "../../../types";
import {normalizeTranslation} from "../validation/normalizeTranslation";

export function createMockTranslationValidationService(): TranslationValidationService {
    return {
        async validateTranslation({sentence, answer, mode}) {
            const normalizedAnswer = normalizeTranslation(answer.text);
            const preferredAnswer = sentence.acceptedTranslations[0];
            const exactMatch = sentence.acceptedTranslations.some(
                (acceptedTranslation) => {
                    return (
                        acceptedTranslation.normalizedText === normalizedAnswer
                    );
                }
            );
            const status = exactMatch
                ? "correct"
                : getApproximateStatus({
                      normalizedAnswer,
                      preferredAnswer: preferredAnswer.normalizedText,
                  });
            const mistakes = exactMatch
                ? []
                : createMistakes({
                      status,
                      preferredAnswer: preferredAnswer.text,
                  });

            return {
                acceptedTranslations: sentence.acceptedTranslations,
                canRetry: status !== "correct" && status !== "skipped",
                checkedAt: answer.submittedAt,
                id: `validation-${sentence.id}-${normalizedAnswer || "empty"}`,
                mistakes,
                mode,
                preferredAnswer: preferredAnswer.text,
                score: getScore(status),
                sentenceId: sentence.id,
                status,
                userAnswer: answer.text,
            };
        },
    };
}

function getApproximateStatus({
    normalizedAnswer,
    preferredAnswer,
}: {
    normalizedAnswer: string;
    preferredAnswer: string;
}): ValidationStatus {
    if (!normalizedAnswer) {
        return "skipped";
    }

    const answerWords = new Set(normalizedAnswer.split(" "));
    const preferredWords = preferredAnswer.split(" ");
    const matchedWords = preferredWords.filter((word) => answerWords.has(word));
    const matchRatio = matchedWords.length / preferredWords.length;

    if (matchRatio >= 0.75) {
        return "almostCorrect";
    }

    if (matchRatio >= 0.4) {
        return "partial";
    }

    return "incorrect";
}

function createMistakes({
    status,
    preferredAnswer,
}: {
    status: ValidationStatus;
    preferredAnswer: string;
}): TranslationMistake[] {
    const category: MistakeCategory =
        status === "almostCorrect" ? "wordOrder" : "meaning";

    return [
        {
            category,
            explanation: "Compare your answer with the accepted translation.",
            id: `mistake-${category}`,
            severity: status === "incorrect" ? "high" : "medium",
            suggestion: preferredAnswer,
            text: "Accepted translation",
        },
    ];
}

function getScore(status: ValidationStatus) {
    const scores: Record<ValidationStatus, number> = {
        almostCorrect: 0.82,
        correct: 1,
        incorrect: 0,
        partial: 0.48,
        skipped: 0,
    };

    return scores[status];
}
