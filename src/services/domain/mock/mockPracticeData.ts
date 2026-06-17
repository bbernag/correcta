import type {PracticeSentence} from "../../../types";
import {normalizeTranslation} from "../validation/normalizeTranslation";

export const MOCK_PRACTICE_SENTENCES: PracticeSentence[] = [
    {
        acceptedTranslations: [
            createAcceptedTranslation({
                id: "mock-accepted-1",
                text: "I need a coffee.",
            }),
            createAcceptedTranslation({
                id: "mock-accepted-2",
                text: "I need coffee.",
            }),
        ],
        createdAt: "2026-06-16T00:00:00.000Z",
        hints: ["The verb means need.", "The object is coffee."],
        id: "sentence-cafe-need",
        languagePair: {
            sourceLanguage: "es",
            targetLanguage: "en",
        },
        level: "beginner",
        prompt: "Translate the sentence naturally.",
        sourceText: "Necesito un café.",
        tags: ["daily", "food"],
        wordBank: ["I", "need", "a", "coffee"],
    },
    {
        acceptedTranslations: [
            createAcceptedTranslation({
                id: "mock-accepted-3",
                text: "Where is the train?",
            }),
        ],
        createdAt: "2026-06-16T00:00:00.000Z",
        hints: ["Start with where.", "The noun is train."],
        id: "sentence-train-where",
        languagePair: {
            sourceLanguage: "es",
            targetLanguage: "en",
        },
        level: "beginner",
        prompt: "Translate the sentence as a question.",
        sourceText: "¿Dónde está el tren?",
        tags: ["travel"],
        wordBank: ["Where", "is", "the", "train"],
    },
    {
        acceptedTranslations: [
            createAcceptedTranslation({
                id: "mock-accepted-4",
                text: "She works on Mondays.",
            }),
            createAcceptedTranslation({
                id: "mock-accepted-5",
                text: "She works Mondays.",
            }),
        ],
        createdAt: "2026-06-16T00:00:00.000Z",
        hints: ["Use she.", "The schedule is Mondays."],
        id: "sentence-work-mondays",
        languagePair: {
            sourceLanguage: "es",
            targetLanguage: "en",
        },
        level: "beginner",
        prompt: "Translate the routine.",
        sourceText: "Ella trabaja los lunes.",
        tags: ["routine", "work"],
        wordBank: ["She", "works", "on", "Mondays"],
    },
    {
        acceptedTranslations: [
            createAcceptedTranslation({
                id: "mock-accepted-6",
                text: "We are learning together.",
            }),
        ],
        createdAt: "2026-06-16T00:00:00.000Z",
        hints: ["Use we.", "Together comes at the end."],
        id: "sentence-learning-together",
        languagePair: {
            sourceLanguage: "es",
            targetLanguage: "en",
        },
        level: "beginner",
        prompt: "Translate the present-progressive sentence.",
        sourceText: "Estamos aprendiendo juntos.",
        tags: ["learning"],
        wordBank: ["We", "are", "learning", "together"],
    },
    {
        acceptedTranslations: [
            createAcceptedTranslation({
                id: "mock-accepted-7",
                text: "Can you repeat that?",
            }),
            createAcceptedTranslation({
                id: "mock-accepted-8",
                text: "Could you repeat that?",
            }),
        ],
        createdAt: "2026-06-16T00:00:00.000Z",
        hints: ["This is a polite question.", "Repeat is the main verb."],
        id: "sentence-repeat-that",
        languagePair: {
            sourceLanguage: "es",
            targetLanguage: "en",
        },
        level: "beginner",
        prompt: "Translate the request.",
        sourceText: "¿Puedes repetir eso?",
        tags: ["conversation"],
        wordBank: ["Can", "you", "repeat", "that"],
    },
];

type CreateAcceptedTranslationParams = {
    id: string;
    text: string;
};

function createAcceptedTranslation({
    id,
    text,
}: CreateAcceptedTranslationParams) {
    return {
        id,
        normalizedText: normalizeTranslation(text),
        text,
    };
}
