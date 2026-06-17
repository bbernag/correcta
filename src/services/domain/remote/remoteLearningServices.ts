import type {
    ExplainFeedbackRequest,
    PracticeSentence,
    PracticeSetRequest,
    RemoteLearningConfig,
    SentenceService,
    TeacherFeedback,
    TeacherFeedbackService,
    TranslationValidationService,
    ValidateTranslationRequest,
} from "../../../types";
import {request} from "../../http/httpClient";
import {parseValidationResult} from "../validation/validationResultParser";

export function createRemoteSentenceService({
    baseUrl,
    contractVersion,
}: RemoteLearningConfig): SentenceService {
    return {
        async getPracticeSentenceById(sentenceId) {
            const value = await postJson({
                body: {sentenceId},
                contractVersion,
                url: `${baseUrl}/v1/sentences/get`,
            });
            const sentences = parsePracticeSentences(value);

            return sentences[0] ?? null;
        },
        async getPracticeSentences(requestBody) {
            const value = await postJson({
                body: requestBody,
                contractVersion,
                url: `${baseUrl}/v1/sentences/generate`,
            });

            return parsePracticeSentences(value);
        },
    };
}

export function createRemoteTranslationValidationService({
    baseUrl,
    contractVersion,
}: RemoteLearningConfig): TranslationValidationService {
    return {
        async validateTranslation(requestBody) {
            const value = await postJson({
                body: requestBody,
                contractVersion,
                url: `${baseUrl}/v1/translations/validate`,
            });
            const result = parseValidationResult(value);

            if (!result) {
                throw new Error("Remote validation response was malformed");
            }

            return result;
        },
    };
}

export function createRemoteTeacherFeedbackService({
    baseUrl,
    contractVersion,
}: RemoteLearningConfig): TeacherFeedbackService {
    return {
        async explainValidation(requestBody) {
            const value = await postJson({
                body: requestBody,
                contractVersion,
                url: `${baseUrl}/v1/feedback/explain`,
            });
            const feedback = parseTeacherFeedback(value);

            if (!feedback) {
                throw new Error("Remote feedback response was malformed");
            }

            return feedback;
        },
    };
}

async function postJson({
    body,
    contractVersion,
    url,
}: {
    body:
        | PracticeSetRequest
        | ValidateTranslationRequest
        | ExplainFeedbackRequest
        | {sentenceId: string};
    contractVersion: string;
    url: string;
}) {
    const response = await request({
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            "X-Correcta-Contract": contractVersion,
        },
        method: "POST",
        url,
    });

    if (!response.ok) {
        throw new Error("Remote learning service is unavailable");
    }

    return response.json() as Promise<unknown>;
}

function parsePracticeSentences(value: unknown): PracticeSentence[] {
    if (!Array.isArray(value)) {
        return [];
    }

    return value.filter(isPracticeSentence);
}

function isPracticeSentence(value: unknown): value is PracticeSentence {
    if (!isRecord(value)) {
        return false;
    }

    return (
        typeof value.id === "string" &&
        isRecord(value.languagePair) &&
        typeof value.sourceText === "string" &&
        typeof value.prompt === "string" &&
        Array.isArray(value.acceptedTranslations) &&
        Array.isArray(value.wordBank) &&
        Array.isArray(value.hints) &&
        Array.isArray(value.tags) &&
        typeof value.createdAt === "string"
    );
}

function parseTeacherFeedback(value: unknown): TeacherFeedback | null {
    if (!isRecord(value)) {
        return null;
    }

    if (
        typeof value.id !== "string" ||
        typeof value.validationId !== "string" ||
        typeof value.summary !== "string" ||
        typeof value.explanation !== "string" ||
        typeof value.simpleExplanation !== "string" ||
        typeof value.encouragement !== "string" ||
        typeof value.createdAt !== "string"
    ) {
        return null;
    }

    return value as TeacherFeedback;
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
}
