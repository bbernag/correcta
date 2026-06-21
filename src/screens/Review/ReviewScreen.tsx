import type {NativeStackScreenProps} from "@react-navigation/native-stack";
import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {
    AnimatedMount,
    Button,
    LoadingState,
    Screen,
    ScreenHeader,
    SectionHeader,
} from "../../components/common";
import type {RootStackParamList} from "../../router/types";
import {ReviewCard} from "./components/ReviewCard";
import {ReviewDeckSelector} from "./components/ReviewDeckSelector";
import {ReviewEmptyState} from "./components/ReviewEmptyState";
import {ReviewErrorState} from "./components/ReviewErrorState";
import {ReviewQueuePreview} from "./components/ReviewQueuePreview";
import {ReviewSummaryCard} from "./components/ReviewSummaryCard";
import {useReviewViewModel} from "./hooks/useReviewViewModel";

type ReviewScreenProps = NativeStackScreenProps<
    RootStackParamList,
    "ReviewSession"
>;

export function ReviewScreen({navigation}: ReviewScreenProps) {
    const review = useReviewViewModel();
    const cardState = review.cardState;
    const selectableDecks = review.records.decks.filter((deck) => {
        return deck.itemCount > 0;
    });
    const shouldShowDeckSelector = selectableDecks.length > 1;

    function handleStartPractice() {
        navigation.navigate("PracticeSession", {restartKey: Date.now()});
    }

    function handleOpenLibrary() {
        navigation.navigate("MainTabs", {screen: "Library"});
    }

    if (review.phase === "loading") {
        return (
            <Screen contentContainerStyle={styles.centered}>
                <LoadingState
                    message="Finding due words, sentences, and mistakes."
                    title="Preparing review"
                />
            </Screen>
        );
    }

    return (
        <Screen contentContainerStyle={styles.content}>
            <ScreenHeader
                eyebrow="Review"
                subtitle="Choose a focused queue, reveal the answer, then grade your recall."
                title="Due cards"
            />
            {review.phase === "error" ? (
                <ReviewErrorState
                    message={review.error ?? "Review could not be loaded."}
                    onRetry={review.handleRefresh}
                />
            ) : null}
            {review.phase !== "error" ? (
                <>
                    {review.isReviewNewUser ? (
                        <ReviewEmptyState
                            action={
                                <Button
                                    accessibilityLabel="Start practice to build your review set"
                                    label="Start practice"
                                    leadingIcon="practice"
                                    onPress={handleStartPractice}
                                />
                            }
                        />
                    ) : null}
                    {review.isReviewCaughtUp ? (
                        <ReviewEmptyState
                            action={
                                <View style={styles.emptyActions}>
                                    <Button
                                        accessibilityLabel="Practice new sentences"
                                        label="Practice new sentences"
                                        leadingIcon="practice"
                                        onPress={handleStartPractice}
                                    />
                                    <Button
                                        accessibilityLabel="Browse saved items"
                                        label="Browse saved items"
                                        onPress={handleOpenLibrary}
                                        variant="secondary"
                                    />
                                </View>
                            }
                            message="New due cards will appear after more practice or when saved items are ready again."
                            title="You're caught up"
                        />
                    ) : null}
                    {review.phase === "ready" ? (
                        <ReviewSummaryCard summary={review.summary} />
                    ) : null}
                    {review.phase === "ready" && review.isActiveDeckEmpty ? (
                        <ReviewEmptyState
                            message="Choose another review set or complete more practice to add cards here."
                            title="No due cards in this set"
                        />
                    ) : null}
                    {cardState ? (
                        <>
                            <AnimatedMount key={String(cardState.currentIndex)}>
                                <ReviewCard
                                    cardState={cardState}
                                    isAnswerVisible={review.isAnswerVisible}
                                    onCompleteItem={(grade) => {
                                        void review.handleCompleteItem(
                                            grade,
                                            cardState.item
                                        );
                                    }}
                                    onRevealAnswer={review.handleRevealAnswer}
                                    pendingGrade={review.pendingGrade}
                                />
                            </AnimatedMount>
                            <ReviewQueuePreview items={review.queuePreview} />
                        </>
                    ) : null}
                    {shouldShowDeckSelector ? (
                        <View style={styles.section}>
                            <SectionHeader
                                subtitle="Choose which due cards to study now."
                                title="Review sets"
                            />
                            <ReviewDeckSelector
                                decks={selectableDecks}
                                onSelectDeck={review.handleSelectDeck}
                            />
                        </View>
                    ) : null}
                </>
            ) : null}
        </Screen>
    );
}

const styles = StyleSheet.create((theme) => ({
    centered: {
        alignItems: "center",
        flexGrow: 1,
        justifyContent: "center",
    },
    content: {
        paddingBottom: theme.spacing["3xl"],
    },
    emptyActions: {
        gap: theme.spacing.sm,
    },
    section: {
        gap: theme.spacing.md,
    },
}));
