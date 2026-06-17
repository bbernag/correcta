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
            const words = readJsonValue<SavedWord[]>(SAVED_WORDS_KEY, []);
            const nextWords = [
                word,
                ...words.filter((storedWord) => {
                    return storedWord.id !== word.id;
                }),
            ];

            writeJsonValue(SAVED_WORDS_KEY, nextWords);

            return word;
        },
        async saveSentence(sentence) {
            const sentences = readJsonValue<SavedSentence[]>(
                SAVED_SENTENCES_KEY,
                []
            );
            const nextSentences = [
                sentence,
                ...sentences.filter((storedSentence) => {
                    return storedSentence.id !== sentence.id;
                }),
            ];

            writeJsonValue(SAVED_SENTENCES_KEY, nextSentences);

            return sentence;
        },
        async listWords() {
            return readJsonValue<SavedWord[]>(SAVED_WORDS_KEY, []);
        },
        async listSentences() {
            return readJsonValue<SavedSentence[]>(SAVED_SENTENCES_KEY, []);
        },
        async clearSavedContent() {
            removeJsonValue(SAVED_WORDS_KEY);
            removeJsonValue(SAVED_SENTENCES_KEY);
        },
    };
}
