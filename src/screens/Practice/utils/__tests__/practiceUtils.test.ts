import {getWordBankAutoSubmitKey} from "../practiceUtils";

describe("getWordBankAutoSubmitKey", () => {
    const baseParams = {
        answer: "I need coffee",
        inputMode: "sentenceBuilder" as const,
        phase: "answering" as const,
        selectedItemIds: ["sentence-1-I-0", "sentence-1-need-1"],
        sentenceId: "sentence-1",
        totalItemCount: 2,
    };

    it("returns a completion key when every word bank item is selected", () => {
        expect(getWordBankAutoSubmitKey(baseParams)).toBe(
            "sentence-1:sentence-1-I-0|sentence-1-need-1"
        );
    });

    it("waits until all word bank items are selected", () => {
        expect(
            getWordBankAutoSubmitKey({
                ...baseParams,
                selectedItemIds: ["sentence-1-I-0"],
            })
        ).toBeNull();
    });

    it("does not submit in typing mode", () => {
        expect(
            getWordBankAutoSubmitKey({
                ...baseParams,
                inputMode: "typing",
            })
        ).toBeNull();
    });

    it("does not submit outside the answering phase", () => {
        expect(
            getWordBankAutoSubmitKey({
                ...baseParams,
                phase: "checking",
            })
        ).toBeNull();
    });

    it("does not submit an empty word bank", () => {
        expect(
            getWordBankAutoSubmitKey({
                ...baseParams,
                answer: "",
                selectedItemIds: [],
                totalItemCount: 0,
            })
        ).toBeNull();
    });
});
