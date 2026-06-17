import {useCallback, useEffect, useMemo, useRef, useState} from "react";

import {
    createConectaServices,
    startLocalPracticeSession,
} from "../../services/domain";
import type {PracticeInputMode} from "../../types";
import {createWordBankItems, getBuilderAnswer} from "./utils";
import {usePracticeFlowActions} from "./usePracticeFlowActions";
import {usePracticeSaveActions} from "./usePracticeSaveActions";
import type {
    PracticePhase,
    PracticeResult,
    PracticeSessionState,
    PracticeSessionSummaryState,
} from "./types";

export function usePracticeSession({restartKey}: {restartKey?: number}) {
    const services = useMemo(() => {
        return createConectaServices();
    }, []);
    const loadTokenRef = useRef(0);
    const mountedRef = useRef(true);
    const [phase, setPhase] = useState<PracticePhase>("loading");
    const [sessionState, setSessionState] =
        useState<PracticeSessionState | null>(null);
    const [answerText, setAnswerText] = useState("");
    const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
    const [revealedHintCount, setRevealedHintCount] = useState(0);
    const [result, setResult] = useState<PracticeResult | null>(null);
    const [summaryState, setSummaryState] =
        useState<PracticeSessionSummaryState | null>(null);
    const [error, setError] = useState<string | null>(null);

    const currentSentence =
        sessionState?.sentences[sessionState.currentIndex] ?? null;
    const wordBankItems = useMemo(() => {
        return createWordBankItems(currentSentence);
    }, [currentSentence]);
    const builderAnswer = useMemo(() => {
        return getBuilderAnswer({items: wordBankItems, selectedItemIds});
    }, [selectedItemIds, wordBankItems]);
    const currentAnswer =
        sessionState?.inputMode === "sentenceBuilder"
            ? builderAnswer
            : answerText;
    const remainingWordBankItems = wordBankItems.filter((item) => {
        return !selectedItemIds.includes(item.id);
    });
    const selectedWordBankItems = selectedItemIds
        .map((itemId) => {
            return wordBankItems.find((item) => {
                return item.id === itemId;
            });
        })
        .filter((item): item is (typeof wordBankItems)[number] => {
            return Boolean(item);
        });

    const resetAnswerState = useCallback(() => {
        setAnswerText("");
        setSelectedItemIds([]);
        setRevealedHintCount(0);
        setResult(null);
    }, []);
    const {handleSaveSentence, handleSaveWord, isSavingSentence, isSavingWord} =
        usePracticeSaveActions({
            currentSentence,
            mountedRef,
            result,
            services,
            setResult,
        });
    const {handleContinue, handleRetry, handleSkip, handleSubmitAnswer} =
        usePracticeFlowActions({
            answerText,
            currentAnswer,
            currentSentence,
            mountedRef,
            phase,
            resetAnswerState,
            result,
            services,
            sessionState,
            setAnswerText,
            setError,
            setPhase,
            setResult,
            setSelectedItemIds,
            setSessionState,
            setSummaryState,
        });

    const handleRestart = useCallback(async () => {
        const token = loadTokenRef.current + 1;
        loadTokenRef.current = token;

        await Promise.resolve();

        if (!mountedRef.current || loadTokenRef.current !== token) {
            return;
        }

        setPhase("loading");
        setError(null);
        setSummaryState(null);
        resetAnswerState();

        try {
            const nextSession = await startLocalPracticeSession({services});

            if (!mountedRef.current || loadTokenRef.current !== token) {
                return;
            }

            setSessionState({
                ...nextSession,
                currentIndex: 0,
                inputMode: nextSession.preferences.inputMode,
            });
            setPhase("answering");
        } catch (sessionError) {
            if (!mountedRef.current || loadTokenRef.current !== token) {
                return;
            }

            setError(
                sessionError instanceof Error
                    ? sessionError.message
                    : "Practice session failed to load"
            );
            setPhase("error");
        }
    }, [resetAnswerState, services]);

    useEffect(() => {
        mountedRef.current = true;
        const timeoutId = setTimeout(() => {
            void handleRestart();
        }, 0);

        return () => {
            clearTimeout(timeoutId);
            mountedRef.current = false;
            loadTokenRef.current += 1;
        };
    }, [handleRestart, restartKey]);

    function handleChangeAnswer(text: string) {
        setAnswerText(text);
    }

    function handleSelectInputMode(inputMode: PracticeInputMode) {
        if (!sessionState || inputMode === sessionState.inputMode) {
            return;
        }

        setAnswerText(currentAnswer);
        setSelectedItemIds([]);
        setSessionState({...sessionState, inputMode});
    }

    function handleSelectWord(itemId: string) {
        setSelectedItemIds((currentItemIds) => {
            return currentItemIds.includes(itemId)
                ? currentItemIds
                : [...currentItemIds, itemId];
        });
    }

    function handleRemoveWord(itemId: string) {
        setSelectedItemIds((currentItemIds) => {
            return currentItemIds.filter((currentItemId) => {
                return currentItemId !== itemId;
            });
        });
    }

    function handleClearBuilder() {
        setSelectedItemIds([]);
    }

    function handleShowHint() {
        if (!currentSentence) {
            return;
        }

        setRevealedHintCount((currentCount) => {
            return Math.min(currentCount + 1, currentSentence.hints.length);
        });
    }

    return {
        answerText,
        currentAnswer,
        currentSentence,
        error,
        handleChangeAnswer,
        handleClearBuilder,
        handleContinue,
        handleRemoveWord,
        handleRestart,
        handleRetry,
        handleSaveSentence,
        handleSaveWord,
        handleSelectInputMode,
        handleSelectWord,
        handleShowHint,
        handleSkip,
        handleSubmitAnswer,
        isSavingSentence,
        isSavingWord,
        phase,
        remainingWordBankItems,
        result,
        revealedHintCount,
        selectedItemIds,
        selectedWordBankItems,
        sessionState,
        summaryState,
        wordBankItems,
    };
}
