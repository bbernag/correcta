import type {TeacherFeedbackService, ValidationStatus} from "../../../types";

export function createMockTeacherFeedbackService(): TeacherFeedbackService {
    return {
        async explainValidation({validation}) {
            const copy = FEEDBACK_COPY[validation.status];

            return {
                createdAt: validation.checkedAt,
                encouragement: copy.encouragement,
                explanation: copy.explanation,
                id: `feedback-${validation.id}`,
                simpleExplanation: copy.simpleExplanation,
                summary: copy.summary,
                validationId: validation.id,
            };
        },
    };
}

const FEEDBACK_COPY: Record<
    ValidationStatus,
    {
        summary: string;
        explanation: string;
        simpleExplanation: string;
        encouragement: string;
    }
> = {
    almostCorrect: {
        encouragement: "You are close. Fix the highlighted part and try again.",
        explanation:
            "The meaning is mostly clear, but the answer needs a more natural word order.",
        simpleExplanation: "Good idea, but the sentence needs a small fix.",
        summary: "Almost correct",
    },
    correct: {
        encouragement: "Keep going.",
        explanation: "Your answer matches an accepted translation.",
        simpleExplanation: "That translation works.",
        summary: "Correct",
    },
    incorrect: {
        encouragement: "Use the accepted answer as a model for the next try.",
        explanation:
            "The answer does not preserve enough meaning from the original sentence.",
        simpleExplanation: "This says something different.",
        summary: "Needs review",
    },
    partial: {
        encouragement: "Keep the correct words and rebuild the full sentence.",
        explanation:
            "Some important words are present, but the full translation is incomplete.",
        simpleExplanation:
            "Some words are right, but the sentence is not done.",
        summary: "Partially correct",
    },
    skipped: {
        encouragement: "Review the model answer, then continue.",
        explanation:
            "Skipped prompts are saved separately from incorrect answers.",
        simpleExplanation: "No answer was checked.",
        summary: "Skipped",
    },
};
