import {DEFAULT_NOTIFICATION_PREFERENCES} from "../../constants/domain";
import type {
    PracticeAttempt,
    ReviewItem,
    SavedSentence,
    SavedWord,
} from "../../types";
import {createConectaServices} from "./conectaServices";
import {parseValidationResult} from "./validation/validationResultParser";

export type LocalDomainCheckResult = {
    feedback: string;
    history: string;
    malformedValidation: string;
    progress: string;
    review: string;
    savedContent: string;
    sentences: string;
};

export async function runLocalDomainChecks(): Promise<LocalDomainCheckResult> {
    const services = createConectaServices();
    const preferences = await services.preferences.getPreferences();
    const sentences = await services.sentences.getPracticeSentences({
        count: 5,
        languagePair: preferences.languagePair,
        level: preferences.level,
    });
    const firstSentence = sentences[0];

    if (!firstSentence) {
        throw new Error("No mock practice sentences are available");
    }

    const submittedAt = new Date().toISOString();
    const validation = await services.validation.validateTranslation({
        answer: {
            inputMode: preferences.inputMode,
            sentenceId: firstSentence.id,
            submittedAt,
            text: firstSentence.acceptedTranslations[0].text,
        },
        mode: preferences.validationMode,
        sentence: firstSentence,
    });
    const feedback = await services.feedback.explainValidation({
        knownLanguage: preferences.languagePair.targetLanguage,
        sentence: firstSentence,
        validation,
    });
    const savedWord = await services.savedContent.saveWord(
        createSavedWord({sentenceId: firstSentence.id, submittedAt})
    );
    const savedSentence = await services.savedContent.saveSentence(
        createSavedSentence({
            preferredTranslation: validation.preferredAnswer,
            sentenceId: firstSentence.id,
            sourceText: firstSentence.sourceText,
            submittedAt,
        })
    );
    await services.history.saveAttempt(
        createPracticeAttempt({
            savedSentenceId: savedSentence.id,
            savedWordId: savedWord.id,
            sentenceId: firstSentence.id,
            status: validation.status,
            submittedAt,
        })
    );
    await services.reviewQueue.upsertItem(
        createReviewItem({savedWord, submittedAt})
    );
    await services.notifications.savePreferences({
        ...DEFAULT_NOTIFICATION_PREFERENCES,
        updatedAt: submittedAt,
    });

    const attempts = await services.history.listAttempts();
    const savedWords = await services.savedContent.listWords();
    const savedSentences = await services.savedContent.listSentences();
    const dueItems = await services.reviewQueue.listDueItems(submittedAt);
    const progress = await services.progress.getProgressSnapshot();
    const malformedValidation = parseValidationResult({status: "correct"});

    return {
        feedback: feedback.summary,
        history: `${attempts.length} attempt record`,
        malformedValidation:
            malformedValidation === null ? "rejected" : "accepted",
        progress: `${progress.attemptsCompleted} completed attempt`,
        review: `${dueItems.length} due review item`,
        savedContent: `${savedWords.length} word, ${savedSentences.length} sentence`,
        sentences: `${sentences.length} mock sentences`,
    };
}

function createSavedWord({
    sentenceId,
    submittedAt,
}: {
    sentenceId: string;
    submittedAt: string;
}): SavedWord {
    return {
        id: "saved-word-cafe",
        language: "es",
        savedAt: submittedAt,
        sourceSentenceId: sentenceId,
        text: "café",
        translation: "coffee",
    };
}

function createSavedSentence({
    preferredTranslation,
    sentenceId,
    sourceText,
    submittedAt,
}: {
    preferredTranslation: string;
    sentenceId: string;
    sourceText: string;
    submittedAt: string;
}): SavedSentence {
    return {
        id: "saved-sentence-cafe",
        preferredTranslation,
        reason: "useful",
        savedAt: submittedAt,
        sentenceId,
        sourceText,
    };
}

function createPracticeAttempt({
    savedSentenceId,
    savedWordId,
    sentenceId,
    status,
    submittedAt,
}: {
    savedSentenceId: string;
    savedWordId: string;
    sentenceId: string;
    status: PracticeAttempt["status"];
    submittedAt: string;
}): PracticeAttempt {
    return {
        answer: "I need a coffee.",
        attemptedAt: submittedAt,
        id: "attempt-domain-foundation",
        inputMode: "typing",
        mistakeCategories: [],
        savedSentenceIds: [savedSentenceId],
        savedWordIds: [savedWordId],
        score: status === "correct" ? 1 : 0,
        sentenceId,
        sessionId: "session-domain-foundation",
        status,
    };
}

function createReviewItem({
    savedWord,
    submittedAt,
}: {
    savedWord: SavedWord;
    submittedAt: string;
}): ReviewItem {
    return {
        answer: savedWord.translation,
        createdAt: submittedAt,
        dueAt: submittedAt,
        id: "review-saved-word-cafe",
        intervalDays: 1,
        mastery: "new",
        prompt: savedWord.text,
        sourceId: savedWord.id,
        sourceType: "word",
    };
}
