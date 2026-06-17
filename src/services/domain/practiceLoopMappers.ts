import type {
    PracticeAttempt,
    PracticeInputMode,
    PracticeSentence,
    PracticeSession,
    ReviewItem,
    SavedSentence,
    SavedWord,
    ValidationResult,
} from "../../types";

export function createPracticeAttempt({
    answerText,
    inputMode,
    sentence,
    session,
    validation,
}: {
    answerText: string;
    inputMode: PracticeInputMode;
    sentence: PracticeSentence;
    session: PracticeSession;
    validation: ValidationResult;
}): PracticeAttempt {
    return {
        answer: answerText,
        attemptedAt: validation.checkedAt,
        id: `${session.id}-${sentence.id}`,
        inputMode,
        mistakeCategories: validation.mistakes.map((mistake) => {
            return mistake.category;
        }),
        savedSentenceIds: [],
        savedWordIds: [],
        score: validation.score,
        sentenceId: sentence.id,
        sessionId: session.id,
        status: validation.status,
    };
}

export function createSavedWord({
    sentence,
}: {
    sentence: PracticeSentence;
}): SavedWord {
    const acceptedTranslation = sentence.acceptedTranslations[0];
    const sourceWords = sentence.sourceText
        .replace(/[^\p{Letter}\s]/gu, "")
        .split(/\s+/)
        .filter(Boolean);
    const translatedWords = acceptedTranslation.text
        .replace(/[^\p{Letter}\s]/gu, "")
        .split(/\s+/)
        .filter(Boolean);
    const sourceWord = sourceWords[sourceWords.length - 1];
    const translatedWord = translatedWords[translatedWords.length - 1];

    return {
        id: `word-${sentence.id}`,
        language: sentence.languagePair.sourceLanguage,
        savedAt: new Date().toISOString(),
        sourceSentenceId: sentence.id,
        text: sourceWord ?? sentence.sourceText,
        translation: translatedWord ?? acceptedTranslation.text,
    };
}

export function createSavedSentence({
    sentence,
    validation,
}: {
    sentence: PracticeSentence;
    validation: ValidationResult;
}): SavedSentence {
    return {
        id: `sentence-${sentence.id}`,
        preferredTranslation: validation.preferredAnswer,
        reason: validation.status === "correct" ? "useful" : "mistake",
        savedAt: new Date().toISOString(),
        sentenceId: sentence.id,
        sourceText: sentence.sourceText,
    };
}

export function createSavedSentenceFromAttempt({
    attempt,
    sentence,
}: {
    attempt: PracticeAttempt;
    sentence: PracticeSentence;
}): SavedSentence {
    const preferredTranslation =
        sentence.acceptedTranslations[0]?.text || attempt.answer;

    return {
        id: `sentence-${sentence.id}`,
        preferredTranslation,
        reason: attempt.status === "correct" ? "useful" : "mistake",
        savedAt: new Date().toISOString(),
        sentenceId: sentence.id,
        sourceText: sentence.sourceText,
    };
}

export function createSavedWordReviewItem(savedWord: SavedWord): ReviewItem {
    return {
        answer: savedWord.translation,
        createdAt: savedWord.savedAt,
        dueAt: savedWord.savedAt,
        id: `review-${savedWord.id}`,
        intervalDays: 1,
        mastery: "new",
        prompt: savedWord.text,
        sourceId: savedWord.id,
        sourceType: "word",
    };
}

export function createSavedSentenceReviewItem(
    savedSentence: SavedSentence
): ReviewItem {
    return {
        answer: savedSentence.preferredTranslation,
        createdAt: savedSentence.savedAt,
        dueAt: savedSentence.savedAt,
        id: `review-${savedSentence.id}`,
        intervalDays: 1,
        mastery: "new",
        prompt: savedSentence.sourceText,
        sourceId: savedSentence.id,
        sourceType: "sentence",
    };
}

export function createMistakeReviewItems({
    attempt,
    validation,
}: {
    attempt: PracticeAttempt;
    validation: ValidationResult;
}): ReviewItem[] {
    return validation.mistakes.map((mistake) => {
        const now = new Date().toISOString();

        return {
            answer: mistake.suggestion,
            createdAt: now,
            dueAt: now,
            id: `review-${attempt.id}-${mistake.category}`,
            intervalDays: 1,
            mastery: "new",
            prompt: mistake.text,
            sourceId: mistake.id,
            sourceType: "mistake",
        };
    });
}

export function uniqueValues(values: string[]) {
    return Array.from(new Set(values));
}
