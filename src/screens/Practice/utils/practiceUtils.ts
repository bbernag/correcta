import type {ValidationStatus, PracticeSentence} from "../../../types";
import type {HapticFeedback} from "../../../native";
import type {WordBankItem} from "../types/practiceTypes";

export function createWordBankItems(
    sentence: PracticeSentence | null
): WordBankItem[] {
    if (!sentence) {
        return [];
    }

    return sentence.wordBank.map((word, index) => {
        return {
            id: `${sentence.id}-${word}-${index}`,
            label: word,
        };
    });
}

export function getBuilderAnswer({
    items,
    selectedItemIds,
}: {
    items: WordBankItem[];
    selectedItemIds: string[];
}) {
    const itemById = new Map(
        items.map((item) => {
            return [item.id, item.label];
        })
    );

    return selectedItemIds
        .map((itemId) => {
            return itemById.get(itemId);
        })
        .filter((word): word is string => {
            return Boolean(word);
        })
        .join(" ");
}

export function getStatusLabel(status: ValidationStatus) {
    const labels: Record<ValidationStatus, string> = {
        almostCorrect: "Almost correct",
        correct: "Correct",
        incorrect: "Needs review",
        partial: "Partially correct",
        skipped: "Skipped",
    };

    return labels[status];
}

export function getStatusTone(status: ValidationStatus) {
    if (status === "correct" || status === "almostCorrect") {
        return "accent";
    }

    if (status === "skipped") {
        return "muted";
    }

    return "danger";
}

export function getPracticeResultHapticFeedback(
    status: ValidationStatus
): HapticFeedback {
    if (status === "correct") {
        return "success";
    }

    if (status === "skipped") {
        return "impact";
    }

    return "warning";
}

export function formatScore(score: number) {
    return `${Math.round(score * 100)}%`;
}

export function getAccuracyLabel({
    correctCount,
    totalAttempts,
}: {
    correctCount: number;
    totalAttempts: number;
}) {
    if (totalAttempts === 0) {
        return "0%";
    }

    return formatScore(correctCount / totalAttempts);
}
