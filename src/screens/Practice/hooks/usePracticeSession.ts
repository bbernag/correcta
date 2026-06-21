import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {AccessibilityInfo} from "react-native";

import {
    createCorrectaServices,
    startLocalPracticeSession,
} from "../../../services/domain";
import {playHapticFeedback} from "../../../native";
import type {PracticeInputMode} from "../../../types";
import {
    createWordBankItems,
    getBuilderAnswer,
    getStatusLabel,
} from "../utils/practiceUtils";
import {usePracticeFlowActions} from "./usePracticeFlowActions";
import {usePracticeSaveActions} from "./usePracticeSaveActions";
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
    const {
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

    useEffect(() => {
        if (phase === "checking") {
            announcePracticeState("Checking answer");
        }

        if (phase === "feedback" && result) {
            announcePracticeState(
                `${getStatusLabel(result.validation.status)}. ${result.feedback.simpleExplanation}`
            );
        }

        if (phase === "summary" && summaryState) {
            announcePracticeState("Practice summary ready");
        }
    }, [phase, result, summaryState]);

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
        saveError,
        selectedItemIds,
        selectedWordBankItems,
        sessionState,
        summaryState,
        wordBankItems,
    };
}

function announcePracticeState(message: string) {
    try {
        AccessibilityInfo.announceForAccessibility(message);
    } catch {
        // Announcements are best-effort and should not block practice.
    }
}
