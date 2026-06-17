import type {LanguageCode} from "./language";
import type {MistakeCategory} from "./practice";

export type SavedWord = {
    id: string;
    text: string;
    translation: string;
    language: LanguageCode;
    sourceSentenceId?: string;
    mistakeCategory?: MistakeCategory;
    savedAt: string;
    lastReviewedAt?: string;
};

export type SavedSentenceReason = "useful" | "mistake" | "favorite";

export type SavedSentence = {
    id: string;
    sentenceId: string;
    sourceText: string;
    preferredTranslation: string;
    reason: SavedSentenceReason;
    savedAt: string;
    lastReviewedAt?: string;
};
