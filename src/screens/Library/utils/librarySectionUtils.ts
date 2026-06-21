import type {
    LibraryAttemptRecord,
    LibraryFilter,
    LibraryRecords,
    LibrarySection,
    LibrarySegment,
} from "../types/libraryTypes";

export function createLibrarySections({
    attempts,
    historyFilter,
    records,
    segment,
}: {
    attempts: LibraryAttemptRecord[];
    historyFilter: LibraryFilter;
    records: LibraryRecords;
    segment: LibrarySegment;
}): LibrarySection[] {
    switch (segment) {
        case "sentences":
            return [createSavedSentencesSection(records)];
        case "history":
            return createHistorySections({attempts, historyFilter, records});
        case "words":
        default:
            return [createSavedWordsSection(records)];
    }
}

function createSavedWordsSection(records: LibraryRecords): LibrarySection {
    return {
        data:
            records.savedWords.length > 0
                ? records.savedWords.map((record) => {
                      return {
                          id: `saved-word-${record.id}`,
                          kind: "savedWord" as const,
                          record,
                      };
                  })
                : [
                      {
                          actionLabel: "Start practice",
                          icon: "word",
                          id: "empty-words",
                          kind: "empty" as const,
                          message:
                              "Tap a word in feedback, then choose Save to build this list.",
                          title: "No saved words",
                      },
                  ],
        id: "saved-words",
        subtitle: "Vocabulary cards with mastery and mistake context.",
        title: "Words",
    };
}

function createSavedSentencesSection(records: LibraryRecords): LibrarySection {
    return {
        data:
            records.savedSentences.length > 0
                ? records.savedSentences.map((record) => {
                      return {
                          id: `saved-sentence-${record.id}`,
                          kind: "savedSentence" as const,
                          record,
                      };
                  })
                : [
                      {
                          actionLabel: "Start practice",
                          icon: "sentence",
                          id: "empty-sentences",
                          kind: "empty" as const,
                          message:
                              "Use Save sentence from feedback or history to keep useful examples.",
                          title: "No saved sentences",
                      },
                  ],
        id: "saved-sentences",
        subtitle: "Full examples kept for reading and translation review.",
        title: "Sentences",
    };
}

function createHistorySections({
    attempts,
    historyFilter,
    records,
}: {
    attempts: LibraryAttemptRecord[];
    historyFilter: LibraryFilter;
    records: LibraryRecords;
}): LibrarySection[] {
    const sections: LibrarySection[] = [];

    if (records.mistakeGroups.length > 0) {
        sections.push({
            data: records.mistakeGroups.map((record) => {
                return {
                    id: `mistake-${record.id}`,
                    kind: "mistake" as const,
                    record,
                };
            }),
            id: "mistakes",
            subtitle: "Repeated weak spots grouped by feedback category.",
            title: "Mistake Notebook",
        });
    }

    sections.push({
        data:
            attempts.length > 0
                ? attempts.map((record) => {
                      return {
                          id: `attempt-${record.id}`,
                          kind: "attempt" as const,
                          record,
                      };
                  })
                : [
                      {
                          actionLabel:
                              records.attempts.length > 0
                                  ? undefined
                                  : "Start practice",
                          icon: "time",
                          id: "empty-history",
                          kind: "empty" as const,
                          message: getHistoryEmptyMessage({
                              hasAttempts: records.attempts.length > 0,
                              historyFilter,
                          }),
                          title:
                              records.attempts.length > 0
                                  ? "No matching attempts"
                                  : "No attempts yet",
                      },
                  ],
        id: "history",
        subtitle: "Previous translations with result, retry, and save actions.",
        title: "History",
    });

    return sections;
}

function getHistoryEmptyMessage({
    hasAttempts,
    historyFilter,
}: {
    hasAttempts: boolean;
    historyFilter: LibraryFilter;
}) {
    if (!hasAttempts) {
        return "Complete a practice sentence to see attempts here.";
    }

    if (historyFilter === "saved") {
        return "Saved attempts will appear here after you keep a sentence.";
    }

    return "Change the history filter to see more attempts.";
}
