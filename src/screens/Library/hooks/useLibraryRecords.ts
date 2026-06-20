import {useFocusEffect} from "@react-navigation/native";
import {useCallback, useMemo, useRef, useState} from "react";

import {
    createCorrectaServices,
    removeSavedPracticeSentence,
    removeSavedPracticeWord,
    savePracticeAttemptSentence,
} from "../../../services/domain";
import type {PracticeSentence} from "../../../types";
import type {
    LibraryAttemptRecord,
    LibraryFilter,
    LibraryRecords,
} from "../types/libraryTypes";
import {
    createLibraryRecords,
    filterAttemptRecords,
} from "../utils/libraryUtils";

const EMPTY_LIBRARY_RECORDS: LibraryRecords = {
    attempts: [],
    dueReviewCount: 0,
    mistakeGroups: [],
    savedSentences: [],
    savedWords: [],
};

export function useLibraryRecords() {
    const services = useMemo(() => {
        return createCorrectaServices();
    }, []);
    const mountedRef = useRef(true);
    const [records, setRecords] = useState<LibraryRecords>(
        EMPTY_LIBRARY_RECORDS
    );
    const [filter, setFilter] = useState<LibraryFilter>("all");
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [pendingActionId, setPendingActionId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const filteredAttempts = useMemo(() => {
        return filterAttemptRecords({
            filter,
            records: records.attempts,
        });
    }, [filter, records.attempts]);

    const loadRecords = useCallback(
        async ({refreshing = false}: {refreshing?: boolean} = {}) => {
            if (refreshing) {
                setIsRefreshing(true);
            } else {
                setIsLoading(true);
            }

            try {
                const preferences = await services.preferences.getPreferences();
                const now = new Date().toISOString();
                const [
                    attempts,
                    savedWords,
                    savedSentences,
                    dueReviewItems,
                    sentences,
                ] = await Promise.all([
                    services.history.listAttempts(),
                    services.savedContent.listWords(),
                    services.savedContent.listSentences(),
                    services.reviewQueue.listDueItems(now),
                    services.sentences.getPracticeSentences({
                        count: 50,
                        languagePair: preferences.languagePair,
                        level: preferences.level,
                    }),
                ]);

                if (!mountedRef.current) {
                    return;
                }

                setRecords(
                    createLibraryRecords({
                        attempts,
                        dueReviewItems,
                        savedSentences,
                        savedWords,
                        sentences,
                    })
                );
                setError(null);
            } catch (recordsError) {
                if (!mountedRef.current) {
                    return;
                }

                setError(
                    recordsError instanceof Error
                        ? recordsError.message
                        : "Library records could not be loaded"
                );
            } finally {
                if (!mountedRef.current) {
                    return;
                }

                setIsLoading(false);
                setIsRefreshing(false);
            }
        },
        [services]
    );

    useFocusEffect(
        useCallback(() => {
            mountedRef.current = true;
            void loadRecords();

            return () => {
                mountedRef.current = false;
            };
        }, [loadRecords])
    );

    const handleRefresh = useCallback(() => {
        void loadRecords({refreshing: true});
    }, [loadRecords]);

    const handleSelectFilter = useCallback((nextFilter: LibraryFilter) => {
        setFilter(nextFilter);
    }, []);

    const handleSaveAttemptSentence = useCallback(
        async (record: LibraryAttemptRecord) => {
            if (!record.sentence) {
                setError("This sentence is not available to save.");
                return;
            }

            await runRecordAction({
                action: async () => {
                    await savePracticeAttemptSentence({
                        attempt: record.attempt,
                        sentence: record.sentence as PracticeSentence,
                        services,
                    });
                    await loadRecords({refreshing: true});
                },
                actionId: `save-${record.id}`,
                setError,
                setPendingActionId,
            });
        },
        [loadRecords, services]
    );

    const handleRemoveSavedSentence = useCallback(
        async (savedSentenceId: string) => {
            await runRecordAction({
                action: async () => {
                    await removeSavedPracticeSentence({
                        savedSentenceId,
                        services,
                    });
                    await loadRecords({refreshing: true});
                },
                actionId: `remove-sentence-${savedSentenceId}`,
                setError,
                setPendingActionId,
            });
        },
        [loadRecords, services]
    );

    const handleRemoveSavedWord = useCallback(
        async (savedWordId: string) => {
            await runRecordAction({
                action: async () => {
                    await removeSavedPracticeWord({
                        savedWordId,
                        services,
                    });
                    await loadRecords({refreshing: true});
                },
                actionId: `remove-word-${savedWordId}`,
                setError,
                setPendingActionId,
            });
        },
        [loadRecords, services]
    );

    return {
        error,
        filter,
        filteredAttempts,
        handleRefresh,
        handleRemoveSavedSentence,
        handleRemoveSavedWord,
        handleSaveAttemptSentence,
        handleSelectFilter,
        isLoading,
        isRefreshing,
        pendingActionId,
        records,
    };
}

async function runRecordAction({
    action,
    actionId,
    setError,
    setPendingActionId,
}: {
    action: () => Promise<void>;
    actionId: string;
    setError: (message: string | null) => void;
    setPendingActionId: (actionId: string | null) => void;
}) {
    try {
        setPendingActionId(actionId);
        await action();
        setError(null);
    } catch (actionError) {
        setError(
            actionError instanceof Error
                ? actionError.message
                : "Library action failed"
        );
    } finally {
        setPendingActionId(null);
    }
}
