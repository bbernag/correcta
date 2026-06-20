import type {
    LibraryAttemptRecord,
    LibraryRecords,
    LibrarySection,
} from "../types/libraryTypes";

export function createLibrarySections({
    attempts,
    records,
}: {
    attempts: LibraryAttemptRecord[];
    records: LibraryRecords;
}): LibrarySection[] {
    return [
        {
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
                              id: "empty-history",
                              kind: "empty" as const,
                              message:
                                  "Complete a practice sentence to see attempts here.",
                              title: "No attempts yet",
                          },
                      ],
            id: "history",
            subtitle: "Previous translations with retry and save actions.",
            title: "History",
        },
        {
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
                              id: "empty-words",
                              kind: "empty" as const,
                              message:
                                  "Save useful words from feedback to build vocabulary review.",
                              title: "No saved words",
                          },
                      ],
            id: "saved-words",
            subtitle: "Vocabulary saved from practice feedback.",
            title: "Saved Words",
        },
        {
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
                              id: "empty-sentences",
                              kind: "empty" as const,
                              message:
                                  "Save useful sentences from feedback or history.",
                              title: "No saved sentences",
                          },
                      ],
            id: "saved-sentences",
            subtitle: "Full sentence examples kept for later review.",
            title: "Saved Sentences",
        },
        {
            data:
                records.mistakeGroups.length > 0
                    ? records.mistakeGroups.map((record) => {
                          return {
                              id: `mistake-${record.id}`,
                              kind: "mistake" as const,
                              record,
                          };
                      })
                    : [
                          {
                              id: "empty-mistakes",
                              kind: "empty" as const,
                              message:
                                  "Incorrect and partial answers will become notebook entries.",
                              title: "No mistake patterns",
                          },
                      ],
            id: "mistakes",
            subtitle: "Repeated weak spots grouped by feedback category.",
            title: "Mistake Notebook",
        },
    ];
}
