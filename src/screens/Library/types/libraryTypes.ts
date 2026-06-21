import type {IconName} from "../../../components/common";
import type {
    MistakeCategory,
    PracticeAttempt,
    PracticeSentence,
    ReviewItem,
    SavedSentence,
    SavedWord,
    ValidationStatus,
} from "../../../types";

export type LibrarySegment = "words" | "sentences" | "history";

export type LibraryFilter =
    | "all"
    | "correct"
    | "almostCorrect"
    | "needsWork"
    | "skipped"
    | "saved";

export type LibraryChipVariant =
    | "neutral"
    | "accent"
    | "success"
    | "warning"
    | "danger"
    | "info";

export type LibraryResultTone =
    | "correct"
    | "almost"
    | "incorrect"
    | "skipped"
    | "info";

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
    mistakeLabels: string[];
    preferredTranslation: string;
    resultTone: LibraryResultTone;
    savedSentenceId?: string;
    scoreLabel: string;
    sentence: PracticeSentence | null;
    sentenceId: string;
    sourceText: string;
    status: ValidationStatus;
    statusLabel: string;
    topicLabel: string;
};

export type LibrarySavedWordRecord = {
    dateLabel: string;
    id: string;
    masteryLabel: string;
    masteryVariant: LibraryChipVariant;
    mistakeLabel?: string;
    reviewLabel: string;
    savedWord: SavedWord;
    text: string;
    translation: string;
};

export type LibrarySavedSentenceRecord = {
    dateLabel: string;
    id: string;
    reasonLabel: string;
    reviewLabel: string;
    reasonVariant: LibraryChipVariant;
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
    statusVariant: LibraryChipVariant;
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
    | {
          actionLabel?: string;
          icon: IconName;
          id: string;
          kind: "empty";
          message: string;
          title: string;
      };

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
