import {
    hasEngagedWithCard,
    isSkipHintEligible,
} from "../practiceSkipHintUtils";

describe("hasEngagedWithCard", () => {
    it("is false when nothing has been entered", () => {
        expect(
            hasEngagedWithCard({answerText: "", selectedItemCount: 0})
        ).toBe(false);
    });

    it("ignores whitespace-only typing", () => {
        expect(
            hasEngagedWithCard({answerText: "   ", selectedItemCount: 0})
        ).toBe(false);
    });

    it("is true once the learner types", () => {
        expect(
            hasEngagedWithCard({answerText: "Hola", selectedItemCount: 0})
        ).toBe(true);
    });

    it("is true once the learner selects a word", () => {
        expect(
            hasEngagedWithCard({answerText: "", selectedItemCount: 1})
        ).toBe(true);
    });
});

describe("isSkipHintEligible", () => {
    const eligibleParams = {
        canSkip: true,
        dismissed: false,
        keyboardVisible: false,
        phase: "answering" as const,
    };

    it("is eligible on a fresh answering card", () => {
        expect(isSkipHintEligible(eligibleParams)).toBe(true);
    });

    it("is not eligible once dismissed", () => {
        expect(
            isSkipHintEligible({...eligibleParams, dismissed: true})
        ).toBe(false);
    });

    it("is not eligible when skipping is unavailable", () => {
        expect(
            isSkipHintEligible({...eligibleParams, canSkip: false})
        ).toBe(false);
    });

    it("is not eligible while the keyboard is open", () => {
        expect(
            isSkipHintEligible({...eligibleParams, keyboardVisible: true})
        ).toBe(false);
    });

    it("is not eligible outside the answering phase", () => {
        expect(
            isSkipHintEligible({...eligibleParams, phase: "feedback"})
        ).toBe(false);
    });
});
