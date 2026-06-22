import type {PracticePhase} from "../types/practiceTypes";

export function hasEngagedWithCard({
    answerText,
    selectedItemCount,
}: {
    answerText: string;
    selectedItemCount: number;
}): boolean {
    return answerText.trim().length > 0 || selectedItemCount > 0;
}

export function isSkipHintEligible({
    canSkip,
    dismissed,
    keyboardVisible,
    phase,
}: {
    canSkip: boolean;
    dismissed: boolean;
    keyboardVisible: boolean;
    phase: PracticePhase;
}): boolean {
    return phase === "answering" && canSkip && !keyboardVisible && !dismissed;
}
