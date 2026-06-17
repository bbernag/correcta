import type {
    LanguageCode,
    LanguagePair,
    PracticeInputMode,
    ProficiencyLevel,
    ValidationMode,
} from "./language";

export type AcceptedTranslation = {
    id: string;
    text: string;
    normalizedText: string;
};

export type PracticeSentence = {
    id: string;
    languagePair: LanguagePair;
    level: ProficiencyLevel;
    sourceText: string;
    prompt: string;
    acceptedTranslations: AcceptedTranslation[];
    wordBank: string[];
    hints: string[];
    tags: string[];
    createdAt: string;
};

export type UserTranslation = {
    sentenceId: string;
    text: string;
    inputMode: PracticeInputMode;
    submittedAt: string;
};

export type ValidationStatus =
    | "correct"
    | "almostCorrect"
    | "partial"
    | "incorrect"
    | "skipped";

export type MistakeCategory =
    | "wordChoice"
    | "wordOrder"
    | "verbTense"
    | "missingWord"
    | "extraWord"
    | "agreement"
    | "accent"
    | "punctuation"
    | "meaning";

export type MistakeSeverity = "low" | "medium" | "high";

export type TranslationMistake = {
    id: string;
    category: MistakeCategory;
    text: string;
    suggestion: string;
    explanation: string;
    severity: MistakeSeverity;
};

export type ValidationResult = {
    id: string;
    sentenceId: string;
    status: ValidationStatus;
    score: number;
    mode: ValidationMode;
    userAnswer: string;
    preferredAnswer: string;
    acceptedTranslations: AcceptedTranslation[];
    mistakes: TranslationMistake[];
    canRetry: boolean;
    checkedAt: string;
};

export type TeacherFeedback = {
    id: string;
    validationId: string;
    summary: string;
    explanation: string;
    simpleExplanation: string;
    encouragement: string;
    createdAt: string;
};

export type PracticeAttempt = {
    id: string;
    sessionId: string;
    sentenceId: string;
    answer: string;
    inputMode: PracticeInputMode;
    status: ValidationStatus;
    score: number;
    mistakeCategories: MistakeCategory[];
    savedWordIds: string[];
    savedSentenceIds: string[];
    attemptedAt: string;
};

export type PracticeSession = {
    id: string;
    languagePair: LanguagePair;
    level: ProficiencyLevel;
    sentenceIds: string[];
    startedAt: string;
    completedAt?: string;
};

export type PracticeSessionSummary = {
    sessionId: string;
    completedAt: string;
    totalAttempts: number;
    correctCount: number;
    almostCorrectCount: number;
    incorrectCount: number;
    skippedCount: number;
    savedWordCount: number;
    savedSentenceCount: number;
};

export type PracticeSetRequest = {
    languagePair: LanguagePair;
    level: ProficiencyLevel;
    count: number;
};

export type ValidateTranslationRequest = {
    sentence: PracticeSentence;
    answer: UserTranslation;
    mode: ValidationMode;
};

export type ExplainFeedbackRequest = {
    sentence: PracticeSentence;
    validation: ValidationResult;
    knownLanguage: LanguageCode;
};
