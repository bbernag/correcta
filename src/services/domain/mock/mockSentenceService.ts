import type {SentenceService} from "../../../types";
import {MOCK_PRACTICE_SENTENCES} from "./mockPracticeData";

export function createMockSentenceService(): SentenceService {
    return {
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
