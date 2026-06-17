import type {
    PracticeFeedbackResult,
    LocalPracticeSession,
} from "../../services/domain";
import type {
    PracticeInputMode,
    PracticeSentence,
    PracticeSessionSummary,
} from "../../types";

export type PracticePhase =
    | "loading"
    | "answering"
    | "checking"
    | "feedback"
    | "summary"
    | "error";

export type PracticeResult = PracticeFeedbackResult & {
    savedSentenceId?: string;
    savedWordId?: string;
};

export type WordBankItem = {
    id: string;
    label: string;
};

export type PracticeSessionState = LocalPracticeSession & {
    currentIndex: number;
    inputMode: PracticeInputMode;
};

export type PracticeSessionSummaryState = {
    summary: PracticeSessionSummary;
    sentences: PracticeSentence[];
};
