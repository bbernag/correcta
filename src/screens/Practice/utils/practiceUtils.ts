import type {NoticeCardTone, ResultBadgeTone} from "../../../components/common";
import type {
    MistakeCategory,
    PracticeInputMode,
    ValidationStatus,
    PracticeSentence,
} from "../../../types";
import type {HapticFeedback} from "../../../native";
import type {PracticePhase, WordBankItem} from "../types/practiceTypes";

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
        incorrect: "Needs work",
        partial: "Needs work",
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

export function getFeedbackTone(status: ValidationStatus): NoticeCardTone {
    if (status === "correct") {
        return "success";
    }

    if (status === "incorrect" || status === "partial") {
        return "warning";
    }

    if (status === "skipped") {
        return "info";
    }

    return "info";
}

export function getResultBadgeTone(status: ValidationStatus): ResultBadgeTone {
    switch (status) {
        case "correct":
            return "correct";
        case "almostCorrect":
            return "almost";
        case "skipped":
            return "skipped";
        case "incorrect":
        case "partial":
        default:
            return "incorrect";
    }
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

export function getWordBankAutoSubmitKey({
    answer,
    inputMode,
    phase,
    selectedItemIds,
    sentenceId,
    totalItemCount,
}: {
    answer: string;
    inputMode: PracticeInputMode | undefined;
    phase: PracticePhase;
    selectedItemIds: string[];
    sentenceId: string | undefined;
    totalItemCount: number;
}) {
    if (
        inputMode !== "sentenceBuilder" ||
        phase !== "answering" ||
        !sentenceId ||
        totalItemCount === 0 ||
        selectedItemIds.length !== totalItemCount ||
        answer.trim().length === 0
    ) {
        return null;
    }

    return `${sentenceId}:${selectedItemIds.join("|")}`;
}

export function formatScore(score: number) {
    return `${Math.round(score * 100)}%`;
}

export function formatMistakeCategory(category: MistakeCategory) {
    const labels: Record<MistakeCategory, string> = {
        accent: "Accent",
        agreement: "Agreement",
        extraWord: "Extra word",
        meaning: "Meaning",
        missingWord: "Missing word",
        punctuation: "Punctuation",
        verbTense: "Verb tense",
        wordChoice: "Word choice",
        wordOrder: "Word order",
    };

    return labels[category];
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
