import type {
    MistakeCategory,
    PracticeAttempt,
    PracticeSentence,
    ReviewItem,
    SavedSentence,
    SavedWord,
    ValidationStatus,
} from "../../../types";

export type LibraryFilter =
    | "all"
    | "correct"
    | "almostCorrect"
    | "needsWork"
    | "skipped"
    | "saved";

export type LibraryTextTone =
    | "primary"
    | "secondary"
    | "muted"
    | "accent"
    | "danger";

export type LibraryAttemptRecord = {
    answerText: string;
    attempt: PracticeAttempt;
    canSaveSentence: boolean;
    dateLabel: string;
    id: string;
    inputModeLabel: string;
    isSaved: boolean;
    levelLabel: string;
    mistakeLabel: string;
    preferredTranslation: string;
    savedSentenceId?: string;
    scoreLabel: string;
    sentence: PracticeSentence | null;
    sentenceId: string;
    sourceText: string;
    status: ValidationStatus;
    statusLabel: string;
    statusTone: LibraryTextTone;
    topicLabel: string;
};

export type LibrarySavedWordRecord = {
    dateLabel: string;
    id: string;
    masteryLabel: string;
    noteLabel: string;
    savedWord: SavedWord;
    text: string;
    translation: string;
};

export type LibrarySavedSentenceRecord = {
    dateLabel: string;
    id: string;
    reasonLabel: string;
    savedSentence: SavedSentence;
    sourceText: string;
    translation: string;
};

export type LibraryMistakeGroupRecord = {
    category: MistakeCategory;
    countLabel: string;
    id: string;
    label: string;
    latestDateLabel: string;
    statusLabel: string;
};

export type LibraryRecords = {
    attempts: LibraryAttemptRecord[];
    dueReviewCount: number;
    mistakeGroups: LibraryMistakeGroupRecord[];
    savedSentences: LibrarySavedSentenceRecord[];
    savedWords: LibrarySavedWordRecord[];
};

export type LibrarySectionItem =
    | {id: string; kind: "attempt"; record: LibraryAttemptRecord}
    | {id: string; kind: "savedWord"; record: LibrarySavedWordRecord}
    | {
          id: string;
          kind: "savedSentence";
          record: LibrarySavedSentenceRecord;
      }
    | {id: string; kind: "mistake"; record: LibraryMistakeGroupRecord}
    | {id: string; kind: "empty"; message: string; title: string};

export type LibrarySection = {
    data: LibrarySectionItem[];
    id: string;
    subtitle: string;
    title: string;
};

export type LibrarySourceData = {
    attempts: PracticeAttempt[];
    dueReviewItems: ReviewItem[];
    savedSentences: SavedSentence[];
    savedWords: SavedWord[];
    sentences: PracticeSentence[];
};
