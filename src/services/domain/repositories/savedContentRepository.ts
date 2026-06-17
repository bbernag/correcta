import type {
    SavedContentRepository,
    SavedSentence,
    SavedWord,
} from "../../../types";
import {
    readJsonValue,
    removeJsonValue,
    writeJsonValue,
} from "../../storage/localJsonStorage";

const SAVED_WORDS_KEY = "domain.savedWords";
const SAVED_SENTENCES_KEY = "domain.savedSentences";

export function createSavedContentRepository(): SavedContentRepository {
    return {
        async saveWord(word) {
            const words = readJsonValue<SavedWord[]>({
                fallback: [],
                key: SAVED_WORDS_KEY,
            });
            const nextWords = [
                word,
                ...words.filter((storedWord) => {
                    return storedWord.id !== word.id;
                }),
            ];

            writeJsonValue({key: SAVED_WORDS_KEY, value: nextWords});

            return word;
        },
        async saveSentence(sentence) {
            const sentences = readJsonValue<SavedSentence[]>({
                fallback: [],
                key: SAVED_SENTENCES_KEY,
            });
            const nextSentences = [
                sentence,
                ...sentences.filter((storedSentence) => {
                    return storedSentence.id !== sentence.id;
                }),
            ];

            writeJsonValue({
                key: SAVED_SENTENCES_KEY,
                value: nextSentences,
            });

            return sentence;
        },
        async listWords() {
            return readJsonValue<SavedWord[]>({
                fallback: [],
                key: SAVED_WORDS_KEY,
            });
        },
        async listSentences() {
            return readJsonValue<SavedSentence[]>({
                fallback: [],
                key: SAVED_SENTENCES_KEY,
            });
        },
        async clearSavedContent() {
            removeJsonValue(SAVED_WORDS_KEY);
            removeJsonValue(SAVED_SENTENCES_KEY);
        },
    };
}
