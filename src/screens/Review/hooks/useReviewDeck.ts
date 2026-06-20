import {useFocusEffect} from "@react-navigation/native";
import {useCallback, useMemo, useRef, useState} from "react";

import {createCorrectaServices} from "../../../services/domain";
import type {ReviewDeckId, ReviewGrade, ReviewItem} from "../../../types";
import type {
    ReviewCardState,
    ReviewDeckRecords,
    ReviewPhase,
} from "../types/reviewTypes";
import {createReviewDeckRecords} from "../utils/reviewUtils";

const EMPTY_REVIEW_RECORDS: ReviewDeckRecords = {
    activeDeckId: "recommended",
    activeItems: [],
    decks: [],
    dueItems: [],
};

export function useReviewDeck() {
    const services = useMemo(() => {
        return createCorrectaServices();
    }, []);
    const mountedRef = useRef(true);
    const [activeDeckId, setActiveDeckId] =
        useState<ReviewDeckId>("recommended");
    const [records, setRecords] =
        useState<ReviewDeckRecords>(EMPTY_REVIEW_RECORDS);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnswerVisible, setIsAnswerVisible] = useState(false);
    const [phase, setPhase] = useState<ReviewPhase>("loading");
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [pendingGrade, setPendingGrade] = useState<ReviewGrade | null>(null);
    const [error, setError] = useState<string | null>(null);
    const cardState = useMemo<ReviewCardState | null>(() => {
        const item = records.activeItems[currentIndex];

        if (!item) {
            return null;
        }

        return {
            currentIndex,
            item,
            totalCount: records.activeItems.length,
        };
    }, [currentIndex, records.activeItems]);

    const loadRecords = useCallback(
        async ({refreshing = false}: {refreshing?: boolean} = {}) => {
            if (refreshing) {
                setIsRefreshing(true);
            } else {
                setPhase("loading");
            }

            try {
                const dueItems = await services.reviewQueue.listDueItems(
                    new Date().toISOString()
                );
                const nextRecords = createReviewDeckRecords({
                    activeDeckId,
                    dueItems,
                });

                if (!mountedRef.current) {
                    return;
                }

                setRecords(nextRecords);
                setCurrentIndex(0);
                setIsAnswerVisible(false);
                setError(null);
                setPhase(dueItems.length > 0 ? "ready" : "empty");
            } catch (recordsError) {
                if (!mountedRef.current) {
                    return;
                }

                setError(
                    recordsError instanceof Error
                        ? recordsError.message
                        : "Review records could not be loaded"
                );
                setPhase("error");
            } finally {
                if (!mountedRef.current) {
                    return;
                }

                setIsRefreshing(false);
            }
        },
        [activeDeckId, services]
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

    function handleSelectDeck(deckId: ReviewDeckId) {
        setActiveDeckId(deckId);
    }

    function handleRevealAnswer() {
        setIsAnswerVisible(true);
    }

    function handleRefresh() {
        void loadRecords({refreshing: true});
    }

    const handleCompleteItem = useCallback(
        async (grade: ReviewGrade, item: ReviewItem) => {
            setPendingGrade(grade);

            try {
                await services.reviewWorkflow.completeReviewItem({
                    grade,
                    item,
                });
                await loadRecords({refreshing: true});
            } catch (reviewError) {
                if (!mountedRef.current) {
                    return;
                }

                setError(
                    reviewError instanceof Error
                        ? reviewError.message
                        : "Review item could not be updated"
                );
            } finally {
                if (mountedRef.current) {
                    setPendingGrade(null);
                }
            }
        },
        [loadRecords, services]
    );

    return {
        cardState,
        error,
        handleCompleteItem,
        handleRefresh,
        handleRevealAnswer,
        handleSelectDeck,
        isAnswerVisible,
        isRefreshing,
        pendingGrade,
        phase,
        records,
    };
}
