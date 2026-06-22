import {useState} from "react";
import {AccessibilityInfo} from "react-native";

import type {PracticeSentence} from "../../../types";
import type {PracticeResult} from "../types/practiceTypes";
import type {CorrectAnswerToastState} from "./usePracticeSaveActions";

export function useCorrectAnswerToast({
    handleSaveCompletedSentence,
}: {
    handleSaveCompletedSentence: (toast: CorrectAnswerToastState) => void;
}) {
    const [correctAnswerToast, setCorrectAnswerToast] =
        useState<CorrectAnswerToastState | null>(null);

    function showCorrectAnswerToast({
        completedResult,
        completedSentence,
    }: {
        completedResult: PracticeResult;
        completedSentence: PracticeSentence;
    }) {
        setCorrectAnswerToast({
            completedResult,
            completedSentence,
            id: `correct-answer-${completedResult.attempt.id}`,
        });
        announceCorrectAnswer();
    }

    function dismissCorrectAnswerToast(id: string) {
        setCorrectAnswerToast((currentToast) => {
            if (!currentToast || currentToast.id !== id) {
                return currentToast;
            }

            return null;
        });
    }

    function handleSaveCorrectAnswerToast() {
        if (!correctAnswerToast) {
            return;
        }

        const toast = correctAnswerToast;
        setCorrectAnswerToast(null);
        handleSaveCompletedSentence(toast);
    }

    return {
        correctAnswerToast,
        dismissCorrectAnswerToast,
        handleSaveCorrectAnswerToast,
        showCorrectAnswerToast,
    };
}

function announceCorrectAnswer() {
    try {
        AccessibilityInfo.announceForAccessibility(
            "Correct. Moving to the next sentence."
        );
    } catch {
        // Announcements are best-effort and should not block practice.
    }
}
