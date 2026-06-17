import type {Dispatch, MutableRefObject, SetStateAction} from "react";
import {useState} from "react";

import {savePracticeSentence, savePracticeWord} from "../../../services/domain";
import type {CorrectaServices, PracticeSentence} from "../../../types";
import type {PracticeResult} from "../types/PracticeTypes";

export function usePracticeSaveActions({
    currentSentence,
    mountedRef,
    result,
    services,
    setResult,
}: {
    currentSentence: PracticeSentence | null;
    mountedRef: MutableRefObject<boolean>;
    result: PracticeResult | null;
    services: CorrectaServices;
    setResult: Dispatch<SetStateAction<PracticeResult | null>>;
}) {
    const [isSavingWord, setIsSavingWord] = useState(false);
    const [isSavingSentence, setIsSavingSentence] = useState(false);

    async function handleSaveWord() {
        if (!result || !currentSentence || result.savedWordId) {
            return;
        }

        setIsSavingWord(true);

        try {
            const savedWord = await savePracticeWord({
                attempt: result.attempt,
                sentence: currentSentence,
                services,
            });

            if (!mountedRef.current) {
                return;
            }

            setResult({
                ...result,
                attempt: {
                    ...result.attempt,
                    savedWordIds: [
                        ...result.attempt.savedWordIds,
                        savedWord.id,
                    ],
                },
                savedWordId: savedWord.id,
            });
        } finally {
            if (mountedRef.current) {
                setIsSavingWord(false);
            }
        }
    }

    async function handleSaveSentence() {
        if (!result || !currentSentence || result.savedSentenceId) {
            return;
        }

        setIsSavingSentence(true);

        try {
            const savedSentence = await savePracticeSentence({
                attempt: result.attempt,
                sentence: currentSentence,
                services,
                validation: result.validation,
            });

            if (!mountedRef.current) {
                return;
            }

            setResult({
                ...result,
                attempt: {
                    ...result.attempt,
                    savedSentenceIds: [
                        ...result.attempt.savedSentenceIds,
                        savedSentence.id,
                    ],
                },
                savedSentenceId: savedSentence.id,
            });
        } finally {
            if (mountedRef.current) {
                setIsSavingSentence(false);
            }
        }
    }

    return {
        handleSaveSentence,
        handleSaveWord,
        isSavingSentence,
        isSavingWord,
    };
}
