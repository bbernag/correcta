import type {
    MistakeCategory,
    PracticeInputMode,
    ProficiencyLevel,
    SavedSentenceReason,
    ValidationStatus,
} from "../../../types";
import type {LibraryFilter} from "../types/LibraryTypes";

export const LIBRARY_FILTERS: LibraryFilter[] = [
    "all",
    "correct",
    "almostCorrect",
    "needsWork",
    "skipped",
    "saved",
];

export const LIBRARY_STATUS_LABELS: Record<ValidationStatus, string> = {
    almostCorrect: "Almost correct",
    correct: "Correct",
    incorrect: "Needs work",
    partial: "Partial",
    skipped: "Skipped",
};

export const LIBRARY_MISTAKE_CATEGORY_LABELS: Record<MistakeCategory, string> =
    {
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

export const LIBRARY_INPUT_MODE_LABELS: Record<PracticeInputMode, string> = {
    sentenceBuilder: "Sentence Builder",
    typing: "Typing",
};

export const LIBRARY_LEVEL_LABELS: Record<ProficiencyLevel, string> = {
    advanced: "Advanced",
    beginner: "Beginner",
    intermediate: "Intermediate",
};

export const LIBRARY_SAVED_REASON_LABELS: Record<SavedSentenceReason, string> =
    {
        favorite: "Favorite",
        mistake: "Mistake",
        useful: "Useful",
    };
