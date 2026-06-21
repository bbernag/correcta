import type {Dispatch, MutableRefObject, SetStateAction} from "react";
import {useState} from "react";
import {AccessibilityInfo} from "react-native";

import {useCorrectaToast} from "../../../components/common";
import {playHapticFeedback} from "../../../native";
import {savePracticeSentence, savePracticeWord} from "../../../services/domain";
import type {CorrectaServices, PracticeSentence} from "../../../types";
import type {PracticeResult} from "../types/practiceTypes";

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
    const {showToast} = useCorrectaToast();
    const [isSavingWord, setIsSavingWord] = useState(false);
    const [isSavingSentence, setIsSavingSentence] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);

    async function handleSaveWord() {
        if (!result || !currentSentence || result.savedWordId) {
            return;
        }

        setIsSavingWord(true);
        setSaveError(null);

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
            playHapticFeedback("success");
            showToast({title: "Word saved", variant: "success"});
        } catch (saveWordError) {
            if (!mountedRef.current) {
                return;
            }

            const message =
                saveWordError instanceof Error
                    ? saveWordError.message
                    : "Word could not be saved";
            playHapticFeedback("error");
            setSaveError(message);
            AccessibilityInfo.announceForAccessibility(message);
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
        setSaveError(null);

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
            playHapticFeedback("success");
            showToast({title: "Sentence saved", variant: "success"});
        } catch (saveSentenceError) {
            if (!mountedRef.current) {
                return;
            }

            const message =
                saveSentenceError instanceof Error
                    ? saveSentenceError.message
                    : "Sentence could not be saved";
            playHapticFeedback("error");
            setSaveError(message);
            AccessibilityInfo.announceForAccessibility(message);
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
        saveError,
    };
}
