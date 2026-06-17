import type {SentenceService} from "../../../types";
import {MOCK_PRACTICE_SENTENCES} from "./mockPracticeData";

export function createMockSentenceService(): SentenceService {
    return {
        async getPracticeSentenceById(sentenceId) {
            return (
                MOCK_PRACTICE_SENTENCES.find((sentence) => {
                    return sentence.id === sentenceId;
                }) ?? null
            );
        },
        async getPracticeSentences({languagePair, level, count}) {
            return MOCK_PRACTICE_SENTENCES.filter((sentence) => {
                return (
                    sentence.level === level &&
                    sentence.languagePair.sourceLanguage ===
                        languagePair.sourceLanguage &&
                    sentence.languagePair.targetLanguage ===
                        languagePair.targetLanguage
                );
            }).slice(0, count);
        },
    };
}
