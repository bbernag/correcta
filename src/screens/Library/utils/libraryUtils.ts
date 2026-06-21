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
} from "../constants/libraryConstants";
import type {
    LibraryAttemptRecord,
    LibraryChipVariant,
    LibraryFilter,
    LibraryMistakeGroupRecord,
    LibraryRecords,
    LibraryResultTone,
    LibrarySavedSentenceRecord,
    LibrarySavedWordRecord,
    LibrarySourceData,
} from "../types/libraryTypes";

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
                dateLabel: formatDateTimeLabel(attempt.attemptedAt),
                id: attempt.id,
                inputModeLabel: LIBRARY_INPUT_MODE_LABELS[attempt.inputMode],
                isSaved: Boolean(savedSentence),
                levelLabel: sentence
                    ? LIBRARY_LEVEL_LABELS[sentence.level]
                    : "Level",
                mistakeLabel: getMistakeLabel(attempt.mistakeCategories),
                mistakeLabels: getMistakeLabels(attempt.mistakeCategories),
                preferredTranslation:
                    sentence?.acceptedTranslations[0]?.text ??
                    "Translation unavailable",
                resultTone: getResultTone(attempt.status),
                savedSentenceId: savedSentence?.id,
                scoreLabel: `${Math.round(attempt.score * 100)}%`,
                sentence,
                sentenceId: attempt.sentenceId,
                sourceText: sentence?.sourceText ?? "Sentence unavailable",
                status: attempt.status,
                statusLabel: LIBRARY_STATUS_LABELS[attempt.status],
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
            const mastery = getSavedContentMastery(savedWord.lastReviewedAt);

            return {
                dateLabel: formatDateLabel(savedWord.savedAt),
                id: savedWord.id,
                masteryLabel: mastery.label,
                masteryVariant: mastery.variant,
                mistakeLabel: savedWord.mistakeCategory
                    ? LIBRARY_MISTAKE_CATEGORY_LABELS[savedWord.mistakeCategory]
                    : undefined,
                reviewLabel: savedWord.lastReviewedAt
                    ? `Reviewed ${formatDateLabel(savedWord.lastReviewedAt)}`
                    : "Not reviewed yet",
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
                reviewLabel: savedSentence.lastReviewedAt
                    ? `Reviewed ${formatDateLabel(savedSentence.lastReviewedAt)}`
                    : "Not reviewed yet",
                reasonVariant: getSavedSentenceReasonVariant(
                    savedSentence.reason
                ),
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
                statusVariant: group.count > 1 ? "warning" : "info",
                statusLabel: group.count > 1 ? "Still difficult" : "New focus",
            };
        });
}

function getResultTone(status: ValidationStatus): LibraryResultTone {
    switch (status) {
        case "correct":
            return "correct";
        case "almostCorrect":
            return "almost";
        case "skipped":
            return "skipped";
        case "partial":
        case "incorrect":
            return "incorrect";
        default:
            return "info";
    }
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

function getMistakeLabels(categories: MistakeCategory[]) {
    return categories.map((category) => {
        return LIBRARY_MISTAKE_CATEGORY_LABELS[category];
    });
}

function getSavedContentMastery(lastReviewedAt: string | undefined): {
    label: string;
    variant: LibraryChipVariant;
} {
    if (lastReviewedAt) {
        return {
            label: "Reviewing",
            variant: "accent",
        };
    }

    return {
        label: "New",
        variant: "info",
    };
}

function getSavedSentenceReasonVariant(
    reason: LibrarySourceData["savedSentences"][number]["reason"]
): LibraryChipVariant {
    switch (reason) {
        case "mistake":
            return "warning";
        case "favorite":
            return "success";
        case "useful":
        default:
            return "info";
    }
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

function formatDateTimeLabel(value: string) {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "Date unavailable";
    }

    return new Intl.DateTimeFormat("en", {
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        month: "short",
    }).format(date);
}

function capitalize(value: string) {
    return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}
