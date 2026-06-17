import type {
    ConectaServices,
    PracticeAttempt,
    PracticeInputMode,
    PracticeSentence,
    PracticeSession,
    PracticeSessionSummary,
    TeacherFeedback,
    UserPreferences,
    ValidationResult,
} from "../../types";
import {
    createMistakeReviewItems,
    createPracticeAttempt,
    createSavedSentence,
    createSavedSentenceReviewItem,
    createSavedWord,
    createSavedWordReviewItem,
    uniqueValues,
} from "./practiceLoopMappers";

export type LocalPracticeSession = {
    preferences: UserPreferences;
    session: PracticeSession;
    sentences: PracticeSentence[];
};

export type PracticeFeedbackResult = {
    attempt: PracticeAttempt;
    feedback: TeacherFeedback;
    validation: ValidationResult;
};

export async function startLocalPracticeSession({
    count = 5,
    services,
}: {
    count?: number;
    services: ConectaServices;
}): Promise<LocalPracticeSession> {
    const preferences = await services.preferences.getPreferences();
    const sentences = await services.sentences.getPracticeSentences({
        count,
        languagePair: preferences.languagePair,
        level: preferences.level,
    });

    if (sentences.length === 0) {
        throw new Error("No practice sentences are available");
    }

    const now = new Date().toISOString();

    return {
        preferences,
        sentences,
        session: {
            id: `session-${Date.now()}`,
            languagePair: preferences.languagePair,
            level: preferences.level,
            sentenceIds: sentences.map((sentence) => sentence.id),
            startedAt: now,
        },
    };
}

export async function submitPracticeAnswer({
    answerText,
    inputMode,
    sentence,
    services,
    session,
}: {
    answerText: string;
    inputMode: PracticeInputMode;
    sentence: PracticeSentence;
    services: ConectaServices;
    session: PracticeSession;
}): Promise<PracticeFeedbackResult> {
    const preferences = await services.preferences.getPreferences();
    const submittedAt = new Date().toISOString();
    const validation = await services.validation.validateTranslation({
        answer: {
            inputMode,
            sentenceId: sentence.id,
            submittedAt,
            text: answerText,
        },
        mode: preferences.validationMode,
        sentence,
    });
    const feedback = await services.feedback.explainValidation({
        knownLanguage: preferences.languagePair.targetLanguage,
        sentence,
        validation,
    });
    const attempt = await services.history.saveAttempt(
        createPracticeAttempt({
            answerText,
            inputMode,
            sentence,
            session,
            validation,
        })
    );

    await Promise.all(
        createMistakeReviewItems({attempt, validation}).map((reviewItem) => {
            return services.reviewQueue.upsertItem(reviewItem);
        })
    );

    return {
        attempt,
        feedback,
        validation,
    };
}

export async function savePracticeWord({
    attempt,
    sentence,
    services,
}: {
    attempt: PracticeAttempt;
    sentence: PracticeSentence;
    services: ConectaServices;
}) {
    const savedWord = await services.savedContent.saveWord(
        createSavedWord({sentence})
    );

    await services.reviewQueue.upsertItem(createSavedWordReviewItem(savedWord));
    await services.history.saveAttempt({
        ...attempt,
        savedWordIds: uniqueValues([...attempt.savedWordIds, savedWord.id]),
    });

    return savedWord;
}

export async function savePracticeSentence({
    attempt,
    sentence,
    services,
    validation,
}: {
    attempt: PracticeAttempt;
    sentence: PracticeSentence;
    services: ConectaServices;
    validation: ValidationResult;
}) {
    const savedSentence = await services.savedContent.saveSentence(
        createSavedSentence({
            sentence,
            validation,
        })
    );

    await services.reviewQueue.upsertItem(
        createSavedSentenceReviewItem(savedSentence)
    );
    await services.history.saveAttempt({
        ...attempt,
        savedSentenceIds: uniqueValues([
            ...attempt.savedSentenceIds,
            savedSentence.id,
        ]),
    });

    return savedSentence;
}

export async function getPracticeSummary({
    services,
    sessionId,
}: {
    services: ConectaServices;
    sessionId: string;
}): Promise<PracticeSessionSummary> {
    const summary = await services.progress.getSessionSummary(sessionId);

    if (!summary) {
        throw new Error("Practice summary is not available");
    }

    return summary;
}
