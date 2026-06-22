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

export async function submitAnswer({
    answerText,
    currentSentence,
    mountedRef,
    phase,
    services,
    sessionState,
    setError,
    setPhase,
}: {
    answerText: string;
    currentSentence: PracticeSentence | null;
    mountedRef: MutableRefObject<boolean>;
    phase: PracticePhase;
    services: CorrectaServices;
    sessionState: PracticeSessionState | null;
    setError: Dispatch<SetStateAction<string | null>>;
    setPhase: Dispatch<SetStateAction<PracticePhase>>;
}): Promise<PracticeResult | null> {
    if (!sessionState || !currentSentence || phase === "checking") {
        return null;
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
            return null;
        }

        return nextResult;
    } catch (submitError) {
        if (!mountedRef.current) {
            return null;
        }

        playHapticFeedback("error");
        setError(
            submitError instanceof Error
                ? submitError.message
                : "Answer could not be checked"
        );
        setPhase("answering");
        return null;
    }
}

export async function advanceSessionOrShowSummary({
    fallbackResult,
    mountedRef,
    resetAnswerState,
    services,
    sessionState,
    setError,
    setPhase,
    setResult,
    setSessionState,
    setSummaryState,
}: {
    fallbackResult?: PracticeResult;
    mountedRef: MutableRefObject<boolean>;
    resetAnswerState: () => void;
    services: CorrectaServices;
    sessionState: PracticeSessionState;
    setError: Dispatch<SetStateAction<string | null>>;
    setPhase: Dispatch<SetStateAction<PracticePhase>>;
    setResult: Dispatch<SetStateAction<PracticeResult | null>>;
    setSessionState: Dispatch<SetStateAction<PracticeSessionState | null>>;
    setSummaryState: Dispatch<
        SetStateAction<PracticeSessionSummaryState | null>
    >;
}) {
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

        if (fallbackResult) {
            setResult(fallbackResult);
            setPhase("feedback");
            return;
        }

        setPhase("error");
    }
}
