import {useEffect, useRef} from "react";

export function useWordBankAutoSubmit({
    onSubmitAnswer,
    wordBankAutoSubmitKey,
}: {
    onSubmitAnswer: () => void | Promise<void>;
    wordBankAutoSubmitKey: string | null;
}) {
    const wordBankAutoSubmitKeyRef = useRef<string | null>(null);

    useEffect(() => {
        if (!wordBankAutoSubmitKey) {
            wordBankAutoSubmitKeyRef.current = null;
            return;
        }

        if (wordBankAutoSubmitKeyRef.current === wordBankAutoSubmitKey) {
            return;
        }

        wordBankAutoSubmitKeyRef.current = wordBankAutoSubmitKey;
        void onSubmitAnswer();
    }, [onSubmitAnswer, wordBankAutoSubmitKey]);
}
