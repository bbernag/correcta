import type {
    MistakeCategory,
    PracticeAttempt,
    PracticeSentence,
    ValidationStatus,
} from "../../../types";
import {
    LIBRARY_INPUT_MODE_LABELS,
    LIBRARY_LEVEL_LABELS,
    LIBRARY_MISTAKE_CATEGORY_LABELS,
    LIBRARY_SAVED_REASON_LABELS,
    LIBRARY_STATUS_LABELS,
} from "../constants/LibraryConstants";
import type {
    LibraryAttemptRecord,
    LibraryFilter,
    LibraryMistakeGroupRecord,
    LibraryRecords,
    LibrarySavedSentenceRecord,
    LibrarySavedWordRecord,
    LibrarySourceData,
    LibraryTextTone,
} from "../types/LibraryTypes";

export function createLibraryRecords({
    attempts,
    dueReviewItems,
    savedSentences,
    savedWords,
    sentences,
}: LibrarySourceData): LibraryRecords {
    return {
        attempts: createLibraryAttemptRecords({
            attempts,
            savedSentences,
            sentences,
        }),
        dueReviewCount: dueReviewItems.length,
        mistakeGroups: createMistakeGroups({attempts}),
        savedSentences: createSavedSentenceRecords({savedSentences}),
        savedWords: createSavedWordRecords({savedWords}),
    };
}

export function filterAttemptRecords({
    filter,
    records,
}: {
    filter: LibraryFilter;
    records: LibraryAttemptRecord[];
}) {
    return records.filter((record) => {
        switch (filter) {
            case "correct":
                return record.status === "correct";
            case "almostCorrect":
                return record.status === "almostCorrect";
            case "needsWork":
                return (
                    record.status === "incorrect" || record.status === "partial"
                );
            case "skipped":
                return record.status === "skipped";
            case "saved":
                return record.isSaved;
            case "all":
                return true;
        }
    });
}

export function getFilterLabel(filter: LibraryFilter) {
    switch (filter) {
        case "almostCorrect":
            return "Almost";
        case "needsWork":
            return "Needs work";
        default:
            return capitalize(filter);
    }
}

function createLibraryAttemptRecords({
    attempts,
    savedSentences,
    sentences,
}: {
    attempts: PracticeAttempt[];
    savedSentences: LibrarySourceData["savedSentences"];
    sentences: PracticeSentence[];
}): LibraryAttemptRecord[] {
    const sentenceById = new Map(
        sentences.map((sentence) => {
            return [sentence.id, sentence];
        })
    );
    const savedSentenceBySentenceId = new Map(
        savedSentences.map((savedSentence) => {
            return [savedSentence.sentenceId, savedSentence];
        })
    );

    return [...attempts]
        .sort((leftAttempt, rightAttempt) => {
            return rightAttempt.attemptedAt.localeCompare(
                leftAttempt.attemptedAt
            );
        })
        .map((attempt) => {
            const sentence = sentenceById.get(attempt.sentenceId) ?? null;
            const savedSentence =
                savedSentenceBySentenceId.get(attempt.sentenceId) ??
                savedSentences.find((currentSavedSentence) => {
                    return attempt.savedSentenceIds.includes(
                        currentSavedSentence.id
                    );
                });

            return {
                answerText: attempt.answer || "No answer submitted",
                attempt,
                canSaveSentence: Boolean(sentence),
                dateLabel: formatDateLabel(attempt.attemptedAt),
                id: attempt.id,
                inputModeLabel: LIBRARY_INPUT_MODE_LABELS[attempt.inputMode],
                isSaved: Boolean(savedSentence),
                levelLabel: sentence
                    ? LIBRARY_LEVEL_LABELS[sentence.level]
                    : "Level",
                mistakeLabel: getMistakeLabel(attempt.mistakeCategories),
                preferredTranslation:
                    sentence?.acceptedTranslations[0]?.text ??
                    "Translation unavailable",
                savedSentenceId: savedSentence?.id,
                scoreLabel: `${Math.round(attempt.score * 100)}%`,
                sentence,
                sentenceId: attempt.sentenceId,
                sourceText: sentence?.sourceText ?? "Sentence unavailable",
                status: attempt.status,
                statusLabel: LIBRARY_STATUS_LABELS[attempt.status],
                statusTone: getStatusTone(attempt.status),
                topicLabel: getTopicLabel(sentence),
            };
        });
}

function createSavedWordRecords({
    savedWords,
}: {
    savedWords: LibrarySourceData["savedWords"];
}): LibrarySavedWordRecord[] {
    return [...savedWords]
        .sort((leftWord, rightWord) => {
            return rightWord.savedAt.localeCompare(leftWord.savedAt);
        })
        .map((savedWord) => {
            return {
                dateLabel: formatDateLabel(savedWord.savedAt),
                id: savedWord.id,
                masteryLabel: savedWord.lastReviewedAt ? "Reviewing" : "New",
                noteLabel: savedWord.mistakeCategory
                    ? `Mistake: ${LIBRARY_MISTAKE_CATEGORY_LABELS[savedWord.mistakeCategory]}`
                    : "Saved vocabulary",
                savedWord,
                text: savedWord.text,
                translation: savedWord.translation,
            };
        });
}

function createSavedSentenceRecords({
    savedSentences,
}: {
    savedSentences: LibrarySourceData["savedSentences"];
}): LibrarySavedSentenceRecord[] {
    return [...savedSentences]
        .sort((leftSentence, rightSentence) => {
            return rightSentence.savedAt.localeCompare(leftSentence.savedAt);
        })
        .map((savedSentence) => {
            return {
                dateLabel: formatDateLabel(savedSentence.savedAt),
                id: savedSentence.id,
                reasonLabel: LIBRARY_SAVED_REASON_LABELS[savedSentence.reason],
                savedSentence,
                sourceText: savedSentence.sourceText,
                translation: savedSentence.preferredTranslation,
            };
        });
}

function createMistakeGroups({
    attempts,
}: {
    attempts: PracticeAttempt[];
}): LibraryMistakeGroupRecord[] {
    const groups = new Map<
        MistakeCategory,
        {count: number; latestAttemptAt: string}
    >();

    attempts.forEach((attempt) => {
        attempt.mistakeCategories.forEach((category) => {
            const currentGroup = groups.get(category);

            groups.set(category, {
                count: (currentGroup?.count ?? 0) + 1,
                latestAttemptAt:
                    !currentGroup ||
                    attempt.attemptedAt > currentGroup.latestAttemptAt
                        ? attempt.attemptedAt
                        : currentGroup.latestAttemptAt,
            });
        });
    });

    return Array.from(groups.entries())
        .sort(([, leftGroup], [, rightGroup]) => {
            return (
                rightGroup.count - leftGroup.count ||
                rightGroup.latestAttemptAt.localeCompare(
                    leftGroup.latestAttemptAt
                )
            );
        })
        .map(([category, group]) => {
            return {
                category,
                countLabel:
                    group.count === 1 ? "1 attempt" : `${group.count} attempts`,
                id: `mistake-${category}`,
                label: LIBRARY_MISTAKE_CATEGORY_LABELS[category],
                latestDateLabel: formatDateLabel(group.latestAttemptAt),
                statusLabel: group.count > 1 ? "Still difficult" : "New focus",
            };
        });
}

function getStatusTone(status: ValidationStatus): LibraryTextTone {
    if (status === "correct" || status === "almostCorrect") {
        return "accent";
    }

    if (status === "incorrect" || status === "partial") {
        return "danger";
    }

    return "muted";
}

function getMistakeLabel(categories: MistakeCategory[]) {
    if (categories.length === 0) {
        return "No mistakes recorded";
    }

    return categories
        .map((category) => {
            return LIBRARY_MISTAKE_CATEGORY_LABELS[category];
        })
        .join(", ");
}

function getTopicLabel(sentence: PracticeSentence | null) {
    if (!sentence || sentence.tags.length === 0) {
        return "No topic";
    }

    return sentence.tags.join(" / ");
}

function formatDateLabel(value: string) {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "Date unavailable";
    }

    return new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "short",
    }).format(date);
}

function capitalize(value: string) {
    return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}
