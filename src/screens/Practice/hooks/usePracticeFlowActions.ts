import type {Dispatch, MutableRefObject, SetStateAction} from "react";

import {playHapticFeedback} from "../../../native";
import type {CorrectaServices, PracticeSentence} from "../../../types";
import type {
    PracticePhase,
    PracticeResult,
    PracticeSessionState,
    PracticeSessionSummaryState,
} from "../types/practiceTypes";
import {getPracticeResultHapticFeedback} from "../utils/practiceUtils";
import {
    advanceSessionOrShowSummary,
    submitAnswer,
} from "./practiceFlowActionHelpers";

export function usePracticeFlowActions({
    answerText,
    currentAnswer,
    currentSentence,
    mountedRef,
    onCorrectAnswer,
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
}: {
    answerText: string;
    currentAnswer: string;
    currentSentence: PracticeSentence | null;
    mountedRef: MutableRefObject<boolean>;
    onCorrectAnswer: (options: {
        completedResult: PracticeResult;
        completedSentence: PracticeSentence;
    }) => void;
    phase: PracticePhase;
    resetAnswerState: () => void;
    result: PracticeResult | null;
    services: CorrectaServices;
    sessionState: PracticeSessionState | null;
    setAnswerText: Dispatch<SetStateAction<string>>;
    setError: Dispatch<SetStateAction<string | null>>;
    setPhase: Dispatch<SetStateAction<PracticePhase>>;
    setResult: Dispatch<SetStateAction<PracticeResult | null>>;
    setSelectedItemIds: Dispatch<SetStateAction<string[]>>;
    setSessionState: Dispatch<SetStateAction<PracticeSessionState | null>>;
    setSummaryState: Dispatch<
        SetStateAction<PracticeSessionSummaryState | null>
    >;
}) {
    async function handleSubmitAnswer() {
        if (!sessionState || !currentSentence || phase === "checking") {
            return;
        }

        playHapticFeedback("impact");
        const nextResult = await submitAnswer({
            answerText: currentAnswer,
            currentSentence,
            mountedRef,
            phase,
            services,
            sessionState,
            setError,
            setPhase,
        });

        if (!nextResult) {
            return;
        }

        playHapticFeedback(
            getPracticeResultHapticFeedback(nextResult.validation.status)
        );

        if (nextResult.validation.status === "correct") {
            const isLastSentence =
                sessionState.currentIndex ===
                sessionState.sentences.length - 1;
            await advanceSessionOrShowSummary({
                fallbackResult: nextResult,
                mountedRef,
                resetAnswerState,
                services,
                sessionState,
                setError,
                setPhase,
                setResult,
                setSessionState,
                setSummaryState,
            });
            if (mountedRef.current && !isLastSentence) {
                onCorrectAnswer({
                    completedResult: nextResult,
                    completedSentence: currentSentence,
                });
            }
            return;
        }

        setResult(nextResult);
        setPhase("feedback");
    }

    async function handleSkip() {
        if (!sessionState || !currentSentence || phase === "checking") {
            return;
        }

        playHapticFeedback("selection");
        setAnswerText("");
        setSelectedItemIds([]);
        const nextResult = await submitAnswer({
            answerText: "",
            currentSentence,
            mountedRef,
            phase,
            services,
            sessionState,
            setError,
            setPhase,
        });

        if (!nextResult) {
            return;
        }

        playHapticFeedback(
            getPracticeResultHapticFeedback(nextResult.validation.status)
        );
        await advanceSessionOrShowSummary({
            fallbackResult: nextResult,
            mountedRef,
            resetAnswerState,
            services,
            sessionState,
            setError,
            setPhase,
            setResult,
            setSessionState,
            setSummaryState,
        });
    }

    function handleRetry() {
        if (!result) {
            return;
        }

        setAnswerText(result.validation.userAnswer || answerText);
        setSelectedItemIds([]);
        setResult(null);
        setPhase("answering");
    }

    async function handleContinue() {
        if (!sessionState) {
            return;
        }

        await advanceSessionOrShowSummary({
            fallbackResult: result ?? undefined,
            mountedRef,
            resetAnswerState,
            services,
            sessionState,
            setError,
            setPhase,
            setResult,
            setSessionState,
            setSummaryState,
        });
    }

    return {
        handleContinue,
        handleRetry,
        handleSkip,
        handleSubmitAnswer,
    };
}
