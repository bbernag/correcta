import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {
    createCorrectaServices,
    startLocalPracticeSession,
} from "../../../services/domain";
import {playHapticFeedback} from "../../../native";
import type {PracticeInputMode} from "../../../types";
import {
    createWordBankItems,
    getBuilderAnswer,
    getWordBankAutoSubmitKey,
} from "../utils/practiceUtils";
import {useCorrectAnswerToast} from "./useCorrectAnswerToast";
import {usePracticeAnnouncements} from "./usePracticeAnnouncements";
import {usePracticeFlowActions} from "./usePracticeFlowActions";
import {usePracticeSaveActions} from "./usePracticeSaveActions";
import {usePracticeStatusToast} from "./usePracticeStatusToast";
import {useWordBankAutoSubmit} from "./useWordBankAutoSubmit";
import type {
    PracticePhase,
    PracticeResult,
    PracticeSessionState,
    PracticeSessionSummaryState,
} from "../types/practiceTypes";

export function usePracticeSession({
    restartKey,
    retrySentenceId,
}: {
    restartKey?: number;
    retrySentenceId?: string;
}) {
    const services = useMemo(() => {
        return createCorrectaServices();
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
    const wordBankAutoSubmitKey = useMemo(() => {
        return getWordBankAutoSubmitKey({
            answer: builderAnswer,
            inputMode: sessionState?.inputMode,
            phase,
            selectedItemIds,
            sentenceId: currentSentence?.id,
            totalItemCount: wordBankItems.length,
        });
    }, [
        builderAnswer,
        currentSentence?.id,
        phase,
        selectedItemIds,
        sessionState?.inputMode,
        wordBankItems.length,
    ]);
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
    const {dismissStatusToast, showStatusToast, statusToast} =
        usePracticeStatusToast();
    const {
        correctToastDurationMs,
        handleSaveCompletedSentence,
        handleSaveSentence,
        handleSaveWord,
        isSavingSentence,
        isSavingWord,
        saveError,
    } = usePracticeSaveActions({
        currentSentence,
        mountedRef,
        result,
        services,
        setResult,
        showStatusToast,
    });
    const {
        correctAnswerToast,
        dismissCorrectAnswerToast,
        handleSaveCorrectAnswerToast,
        showCorrectAnswerToast,
    } = useCorrectAnswerToast({handleSaveCompletedSentence});
    const {handleContinue, handleRetry, handleSkip, handleSubmitAnswer} =
        usePracticeFlowActions({
            answerText,
            currentAnswer,
            currentSentence,
            mountedRef,
            onCorrectAnswer: showCorrectAnswerToast,
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
    useWordBankAutoSubmit({
        onSubmitAnswer: handleSubmitAnswer,
        wordBankAutoSubmitKey,
    });
    usePracticeAnnouncements({phase, result, summaryState});

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
            const nextSession = await startLocalPracticeSession({
                retrySentenceId,
                services,
            });

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
    }, [resetAnswerState, retrySentenceId, services]);

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
        setSessionState({...sessionState, inputMode});
        playHapticFeedback("selection");
    }

    function handleSelectWord(itemId: string) {
        if (selectedItemIds.includes(itemId)) {
            return;
        }

        playHapticFeedback("selection");
        setSelectedItemIds((currentItemIds) => {
            if (currentItemIds.includes(itemId)) {
                return currentItemIds;
            }

            return [...currentItemIds, itemId];
        });
    }

    function handleRemoveWord(itemId: string) {
        if (!selectedItemIds.includes(itemId)) {
            return;
        }

        playHapticFeedback("selection");
        setSelectedItemIds((currentItemIds) => {
            return currentItemIds.filter((currentItemId) => {
                return currentItemId !== itemId;
            });
        });
    }

    function handleClearBuilder() {
        if (selectedItemIds.length === 0) {
            return;
        }

        setSelectedItemIds([]);
        playHapticFeedback("selection");
    }

    function handleShowHint() {
        if (!currentSentence) {
            return;
        }

        playHapticFeedback("selection");
        setRevealedHintCount((currentCount) => {
            return Math.min(currentCount + 1, currentSentence.hints.length);
        });
    }

    return {
        answerText,
        currentAnswer,
        currentSentence,
        correctAnswerToast,
        correctToastDurationMs,
        dismissCorrectAnswerToast,
        dismissStatusToast,
        error,
        handleChangeAnswer,
        handleClearBuilder,
        handleContinue,
        handleRemoveWord,
        handleRestart,
        handleRetry,
        handleSaveCorrectAnswerToast,
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
        saveError,
        selectedItemIds,
        selectedWordBankItems,
        sessionState,
        statusToast,
        summaryState,
        wordBankItems,
    };
}
