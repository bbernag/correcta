import type {NativeBottomTabScreenProps} from "@bottom-tabs/react-navigation";
import {useMemo} from "react";
import {SectionList, View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {
    AppText,
    ErrorState,
    LoadingState,
    Screen,
    ScreenHeader,
} from "../../components/common";
import type {MainTabParamList} from "../../router/types";
import {HistoryAttemptCard} from "./components/HistoryAttemptCard";
import {LibraryEmptyState} from "./components/LibraryEmptyState";
import {LibraryFilterBar} from "./components/LibraryFilterBar";
import {LibraryListSeparator} from "./components/LibraryListSeparator";
import {LibraryOverviewCard} from "./components/LibraryOverviewCard";
import {LibrarySectionHeader} from "./components/LibrarySectionHeader";
import {LibrarySegmentControl} from "./components/LibrarySegmentControl";
import {MistakeNotebookCard} from "./components/MistakeNotebookCard";
import {SavedSentenceCard} from "./components/SavedSentenceCard";
import {SavedWordCard} from "./components/SavedWordCard";
import {useLibraryRecords} from "./hooks/useLibraryRecords";
import type {
    LibraryAttemptRecord,
    LibrarySectionItem,
} from "./types/libraryTypes";
import {createLibrarySections} from "./utils/librarySectionUtils";

type LibraryScreenProps = NativeBottomTabScreenProps<
    MainTabParamList,
    "Library"
>;

export function LibraryScreen({navigation}: LibraryScreenProps) {
    const library = useLibraryRecords();
    const sections = useMemo(() => {
        return createLibrarySections({
            attempts: library.filteredAttempts,
            historyFilter: library.historyFilter,
            records: library.records,
            segment: library.segment,
        });
    }, [
        library.filteredAttempts,
        library.historyFilter,
        library.records,
        library.segment,
    ]);
    const hasRecords =
        library.records.attempts.length > 0 ||
        library.records.savedWords.length > 0 ||
        library.records.savedSentences.length > 0 ||
        library.records.mistakeGroups.length > 0;

    function handleRetryAttempt(record: LibraryAttemptRecord) {
        navigation.navigate("Practice", {
            restartKey: Date.now(),
            retrySentenceId: record.sentenceId,
        });
    }

    if (library.isLoading && !hasRecords) {
        return (
            <Screen contentContainerStyle={styles.centered}>
                <LoadingState
                    message="Finding your practice history and saved content."
                    title="Loading Library"
                />
            </Screen>
        );
    }

    return (
        <Screen scroll={false}>
            <SectionList
                ListHeaderComponent={
                    <View style={styles.header}>
                        <ScreenHeader
                            eyebrow="Library"
                            subtitle="Saved words, useful sentences, and practice history from local learning."
                            title="Learning notebook"
                        />
                        <LibraryOverviewCard records={library.records} />
                        <LibrarySegmentControl
                            onChange={library.handleSelectSegment}
                            value={library.segment}
                        />
                        {library.segment === "history" ? (
                            <View style={styles.filterGroup}>
                                <AppText variant="label">
                                    History result
                                </AppText>
                                <LibraryFilterBar
                                    onChange={library.handleSelectHistoryFilter}
                                    value={library.historyFilter}
                                />
                            </View>
                        ) : null}
                        {library.error ? (
                            <ErrorState
                                message={library.error}
                                onRetry={library.handleRefresh}
                                retryLabel="Refresh library"
                                title="Library action failed"
                            />
                        ) : null}
                    </View>
                }
                contentContainerStyle={styles.listContent}
                ItemSeparatorComponent={LibraryListSeparator}
                keyExtractor={(item) => {
                    return item.id;
                }}
                onRefresh={library.handleRefresh}
                refreshing={library.isRefreshing}
                renderItem={({item}) => {
                    return renderLibraryItem({
                        item,
                        library,
                        onRetryAttempt: handleRetryAttempt,
                    });
                }}
                renderSectionHeader={({section}) => {
                    return <LibrarySectionHeader section={section} />;
                }}
                sections={sections}
                stickySectionHeadersEnabled={false}
            />
        </Screen>
    );
}

function renderLibraryItem({
    item,
    library,
    onRetryAttempt,
}: {
    item: LibrarySectionItem;
    library: ReturnType<typeof useLibraryRecords>;
    onRetryAttempt: (record: LibraryAttemptRecord) => void;
}) {
    switch (item.kind) {
        case "attempt":
            return (
                <HistoryAttemptCard
                    isPending={
                        library.pendingActionId === `save-${item.record.id}` ||
                        library.pendingActionId ===
                            `remove-sentence-${item.record.savedSentenceId}`
                    }
                    onRemoveSavedSentence={library.handleRemoveSavedSentence}
                    onRetry={onRetryAttempt}
                    onSaveSentence={library.handleSaveAttemptSentence}
                    record={item.record}
                />
            );
        case "savedWord":
            return (
                <SavedWordCard
                    isPending={
                        library.pendingActionId ===
                        `remove-word-${item.record.id}`
                    }
                    onRemove={library.handleRemoveSavedWord}
                    record={item.record}
                />
            );
        case "savedSentence":
            return (
                <SavedSentenceCard
                    isPending={
                        library.pendingActionId ===
                        `remove-sentence-${item.record.id}`
                    }
                    onRemove={library.handleRemoveSavedSentence}
                    record={item.record}
                />
            );
        case "mistake":
            return <MistakeNotebookCard record={item.record} />;
        case "empty":
            return (
                <LibraryEmptyState
                    icon={item.icon}
                    message={item.message}
                    title={item.title}
                />
            );
    }
}

const styles = StyleSheet.create((theme) => ({
    centered: {
        alignItems: "center",
        flexGrow: 1,
        justifyContent: "center",
    },
    filterGroup: {
        gap: theme.spacing.sm,
    },
    header: {
        gap: theme.spacing.md,
        paddingBottom: theme.spacing.md,
    },
    listContent: {
        paddingBottom: theme.spacing["3xl"],
    },
}));
