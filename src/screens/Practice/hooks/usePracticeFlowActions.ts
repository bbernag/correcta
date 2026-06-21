import type {Dispatch, MutableRefObject, SetStateAction} from "react";

import {
    getPracticeSummary,
    submitPracticeAnswer,
} from "../../../services/domain";
import {playHapticFeedback} from "../../../native";
import type {CorrectaServices, PracticeSentence} from "../../../types";
import type {
    PracticePhase,
    PracticeResult,
    PracticeSessionState,
    PracticeSessionSummaryState,
} from "../types/practiceTypes";
import {getPracticeResultHapticFeedback} from "../utils/practiceUtils";

export function usePracticeFlowActions({
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
}: {
    answerText: string;
    currentAnswer: string;
    currentSentence: PracticeSentence | null;
    mountedRef: MutableRefObject<boolean>;
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
        await checkAnswer({
            answerText: currentAnswer,
            currentSentence,
            mountedRef,
            phase,
            services,
            sessionState,
            setError,
            setPhase,
            setResult,
        });
    }

    async function handleSkip() {
        playHapticFeedback("selection");
        setAnswerText("");
        setSelectedItemIds([]);
        await checkAnswer({
            answerText: "",
            currentSentence,
            mountedRef,
            phase,
            services,
            sessionState,
            setError,
            setPhase,
            setResult,
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

        if (sessionState.currentIndex < sessionState.sentences.length - 1) {
            resetAnswerState();
            setSessionState({
                ...sessionState,
                currentIndex: sessionState.currentIndex + 1,
            });
            setPhase("answering");

            return;
        }

        setPhase("checking");

        try {
            const summary = await getPracticeSummary({
                services,
                sessionId: sessionState.session.id,
            });

            if (!mountedRef.current) {
                return;
            }

            setSummaryState({sentences: sessionState.sentences, summary});
            setPhase("summary");
            playHapticFeedback("success");
        } catch (summaryError) {
            if (!mountedRef.current) {
                return;
            }

            setError(
                summaryError instanceof Error
                    ? summaryError.message
                    : "Practice summary could not be created"
            );
            setPhase("feedback");
        }
    }

    return {
        handleContinue,
        handleRetry,
        handleSkip,
        handleSubmitAnswer,
    };
}

async function checkAnswer({
    answerText,
    currentSentence,
    mountedRef,
    phase,
    services,
    sessionState,
    setError,
    setPhase,
    setResult,
}: {
    answerText: string;
    currentSentence: PracticeSentence | null;
    mountedRef: MutableRefObject<boolean>;
    phase: PracticePhase;
    services: CorrectaServices;
    sessionState: PracticeSessionState | null;
    setError: Dispatch<SetStateAction<string | null>>;
    setPhase: Dispatch<SetStateAction<PracticePhase>>;
    setResult: Dispatch<SetStateAction<PracticeResult | null>>;
}) {
    if (!sessionState || !currentSentence || phase === "checking") {
        return;
    }

    setPhase("checking");
    setError(null);

    try {
        const nextResult = await submitPracticeAnswer({
            answerText,
            inputMode: sessionState.inputMode,
            sentence: currentSentence,
            services,
            session: sessionState.session,
        });

        if (!mountedRef.current) {
            return;
        }

        setResult(nextResult);
        setPhase("feedback");
        playHapticFeedback(
            getPracticeResultHapticFeedback(nextResult.validation.status)
        );
    } catch (submitError) {
        if (!mountedRef.current) {
            return;
        }

        playHapticFeedback("error");
        setError(
            submitError instanceof Error
                ? submitError.message
                : "Answer could not be checked"
        );
        setPhase("answering");
    }
}
