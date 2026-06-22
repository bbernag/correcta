import {useCallback, useMemo} from "react";

import {
    getPracticeSwipeAction,
    type PracticeSwipeDirection,
} from "../utils/practiceGestureUtils";
import type {PracticePhase, PracticeResult} from "../types/practiceTypes";

type UsePracticeSwipeNavigationParams = {
    isChecking: boolean;
    onContinue: () => void | Promise<void>;
    onRetry: () => void;
    onSkip: () => void | Promise<void>;
    phase: PracticePhase;
    result: PracticeResult | null;
};

export function usePracticeSwipeNavigation({
    isChecking,
    onContinue,
    onRetry,
    onSkip,
    phase,
    result,
}: UsePracticeSwipeNavigationParams) {
    const canRetry = Boolean(result?.validation.canRetry);
    const hasResult = Boolean(result);

    const getAction = useCallback(
        (direction: PracticeSwipeDirection | null) => {
            return getPracticeSwipeAction({
                canRetry,
                direction,
                hasResult,
                isChecking,
                phase,
            });
        },
        [canRetry, hasResult, isChecking, phase]
    );

    const handleSwipeLeft = useCallback(() => {
        const action = getAction("left");

        if (action === "continue") {
            return onContinue();
        }

        if (action === "skip") {
            return onSkip();
        }

        return undefined;
    }, [getAction, onContinue, onSkip]);

    const handleSwipeRight = useCallback(() => {
        if (getAction("right") === "retry") {
            onRetry();
        }
    }, [getAction, onRetry]);

    const leftAction = getAction("left");
    const canSwipeLeft = leftAction === "continue" || leftAction === "skip";
    const canSwipeRight = getAction("right") === "retry";

    return useMemo(() => {
        return {
            canSwipeLeft,
            canSwipeRight,
            handleSwipeLeft,
            handleSwipeRight,
        };
    }, [canSwipeLeft, canSwipeRight, handleSwipeLeft, handleSwipeRight]);
}
