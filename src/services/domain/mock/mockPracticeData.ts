import type {PracticeSentence} from "../../../types";
import {normalizeTranslation} from "../validation/normalizeTranslation";

export const MOCK_PRACTICE_SENTENCES: PracticeSentence[] = [
    {
        acceptedTranslations: [
            createAcceptedTranslation("mock-accepted-1", "I need a coffee."),
            createAcceptedTranslation("mock-accepted-2", "I need coffee."),
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
            createAcceptedTranslation("mock-accepted-3", "Where is the train?"),
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
            createAcceptedTranslation(
                "mock-accepted-4",
                "She works on Mondays."
            ),
            createAcceptedTranslation("mock-accepted-5", "She works Mondays."),
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
            createAcceptedTranslation(
                "mock-accepted-6",
                "We are learning together."
            ),
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
            createAcceptedTranslation(
                "mock-accepted-7",
                "Can you repeat that?"
            ),
            createAcceptedTranslation(
                "mock-accepted-8",
                "Could you repeat that?"
            ),
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

function createAcceptedTranslation(id: string, text: string) {
    return {
        id,
        normalizedText: normalizeTranslation(text),
        text,
    };
}
