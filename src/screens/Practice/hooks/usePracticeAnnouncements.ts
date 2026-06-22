import {useEffect} from "react";
import {AccessibilityInfo} from "react-native";

import type {
    PracticePhase,
    PracticeResult,
    PracticeSessionSummaryState,
} from "../types/practiceTypes";
import {getStatusLabel} from "../utils/practiceUtils";

export function usePracticeAnnouncements({
    phase,
    result,
    summaryState,
}: {
    phase: PracticePhase;
    result: PracticeResult | null;
    summaryState: PracticeSessionSummaryState | null;
}) {
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
}

function announcePracticeState(message: string) {
    try {
        AccessibilityInfo.announceForAccessibility(message);
    } catch {
        // Announcements are best-effort and should not block practice.
    }
}
