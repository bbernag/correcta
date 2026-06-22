import {useCallback, useEffect, useState} from "react";

import {
    readJsonValue,
    writeJsonValue,
} from "../../../services/storage/localJsonStorage";
import type {PracticePhase} from "../types/practiceTypes";
import {
    hasEngagedWithCard,
    isSkipHintEligible,
} from "../utils/practiceSkipHintUtils";

const SKIP_HINT_DISMISSED_KEY = "practice.skipHint.dismissed";
const SKIP_HINT_IDLE_DELAY_MS = 1100;

type UsePracticeSkipHintParams = {
    answerText: string;
    canSkip: boolean;
    keyboardVisible: boolean;
    phase: PracticePhase;
    selectedItemCount: number;
};

type PracticeSkipHint = {
    dismissSkipHint: () => void;
    nudgeToken: number;
    skipHintVisible: boolean;
};

export function usePracticeSkipHint({
    answerText,
    canSkip,
    keyboardVisible,
    phase,
    selectedItemCount,
}: UsePracticeSkipHintParams): PracticeSkipHint {
    const [dismissed, setDismissed] = useState(() =>
        readJsonValue<boolean>({
            fallback: false,
            key: SKIP_HINT_DISMISSED_KEY,
        })
    );
    const [revealed, setRevealed] = useState(false);
    const [userInteracted, setUserInteracted] = useState(false);
    const [nudgeToken, setNudgeToken] = useState(0);

    const retire = useCallback(() => {
        setDismissed((current) => {
            if (!current) {
                writeJsonValue({key: SKIP_HINT_DISMISSED_KEY, value: true});
            }

            return true;
        });
    }, []);

    const dismissSkipHint = useCallback(() => {
        setUserInteracted(true);
        retire();
    }, [retire]);

    const engaged = hasEngagedWithCard({answerText, selectedItemCount});
    const eligible = isSkipHintEligible({
        canSkip,
        dismissed,
        keyboardVisible,
        phase,
    });

    // Reveal the one-time cue after a brief idle pause on the first eligible
    // card. State only changes from the timer callback, never synchronously in
    // the effect body, so visibility stays a pure derivation below.
    useEffect(() => {
        if (!eligible || engaged || revealed) {
            return;
        }

        const timer = setTimeout(() => {
            setRevealed(true);
            setNudgeToken((token) => token + 1);
            retire();
        }, SKIP_HINT_IDLE_DELAY_MS);

        return () => {
            clearTimeout(timer);
        };
    }, [eligible, engaged, retire, revealed]);

    const skipHintVisible =
        revealed &&
        !userInteracted &&
        !engaged &&
        !keyboardVisible &&
        phase === "answering";

    return {dismissSkipHint, nudgeToken, skipHintVisible};
}
