import {useMemo} from "react";

import {usePracticeSession} from "./usePracticeSession";

type UsePracticeViewModelParams = {
    restartKey?: number;
    retrySentenceId?: string;
};

export function usePracticeViewModel({
    restartKey,
    retrySentenceId,
}: UsePracticeViewModelParams) {
    const practice = usePracticeSession({restartKey, retrySentenceId});
    const {
        currentAnswer,
        currentSentence,
        phase,
        result,
        sessionState,
        summaryState,
    } = practice;
    const isChecking = phase === "checking";
    const isAnswering = phase === "answering" || (isChecking && !result);
    const canSubmit =
        currentAnswer.trim().length > 0 &&
        phase !== "checking" &&
        phase !== "feedback";
    const hasHiddenHints = Boolean(
        currentSentence &&
        practice.revealedHintCount < currentSentence.hints.length
    );
    const isLastSentence = Boolean(
        sessionState &&
        sessionState.currentIndex === sessionState.sentences.length - 1
    );

    return useMemo(() => {
        return {
            ...practice,
            canSubmit,
            hasHiddenHints,
            isAnswering,
            isChecking,
            isLastSentence,
            isLoadingInitial: phase === "loading" && !sessionState,
            isSessionUnavailable: !sessionState || !currentSentence,
            showSummary: phase === "summary" && Boolean(summaryState),
        };
    }, [
        canSubmit,
        currentSentence,
        hasHiddenHints,
        isAnswering,
        isChecking,
        isLastSentence,
        phase,
        practice,
        sessionState,
        summaryState,
    ]);
}
