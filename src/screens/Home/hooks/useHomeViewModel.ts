import {useFocusEffect} from "@react-navigation/native";
import {useCallback, useMemo, useRef, useState} from "react";

import {createCorrectaServices} from "../../../services/domain";
import type {HomeDashboard, HomePhase} from "../types/homeTypes";
import {createHomeDashboard} from "../utils/homeUtils";

export function useHomeViewModel() {
    const services = useMemo(() => {
        return createCorrectaServices();
    }, []);
    const mountedRef = useRef(true);
    const [dashboard, setDashboard] = useState<HomeDashboard | null>(null);
    const [phase, setPhase] = useState<HomePhase>("loading");
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadHome = useCallback(
        async ({refreshing = false}: {refreshing?: boolean} = {}) => {
            if (refreshing) {
                setIsRefreshing(true);
            } else {
                setPhase("loading");
            }

            try {
                const preferences = await services.preferences.getPreferences();
                const now = new Date().toISOString();
                const [
                    attempts,
                    dueReviewItems,
                    reviewItems,
                    savedSentences,
                    savedWords,
                    sentences,
                    snapshot,
                ] = await Promise.all([
                    services.history.listAttempts(),
                    services.reviewQueue.listDueItems(now),
                    services.reviewQueue.listItems(),
                    services.savedContent.listSentences(),
                    services.savedContent.listWords(),
                    services.sentences.getPracticeSentences({
                        count: 5,
                        languagePair: preferences.languagePair,
                        level: preferences.level,
                    }),
                    services.progress.getProgressSnapshot(),
                ]);
                const nextDashboard = createHomeDashboard({
                    attempts,
                    dueReviewItems,
                    preferences,
                    reviewItems,
                    savedSentences,
                    savedWords,
                    sentences,
                    snapshot,
                });

                if (!mountedRef.current) {
                    return;
                }

                setDashboard(nextDashboard);
                setError(null);
                setPhase(nextDashboard ? "ready" : "empty");
            } catch (homeError) {
                if (!mountedRef.current) {
                    return;
                }

                setError(
                    homeError instanceof Error
                        ? homeError.message
                        : "Home could not be loaded"
                );
                setPhase("error");
            } finally {
                if (!mountedRef.current) {
                    return;
                }

                setIsRefreshing(false);
            }
        },
        [services]
    );

    useFocusEffect(
        useCallback(() => {
            mountedRef.current = true;
            void loadHome();

            return () => {
                mountedRef.current = false;
            };
        }, [loadHome])
    );

    const handleRefresh = useCallback(() => {
        void loadHome({refreshing: true});
    }, [loadHome]);

    return {
        dashboard,
        error,
        handleRefresh,
        isRefreshing,
        phase,
    };
}
