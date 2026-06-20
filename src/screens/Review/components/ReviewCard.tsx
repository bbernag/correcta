import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, Button, Surface} from "../../../components/common";
import type {ReviewGrade} from "../../../types";
import type {ReviewCardState} from "../types/reviewTypes";
import {
    getReviewMasteryLabel,
    getReviewSourceLabel,
} from "../utils/reviewUtils";

type ReviewCardProps = {
    cardState: ReviewCardState;
    isAnswerVisible: boolean;
    onCompleteItem: (grade: ReviewGrade) => void;
    onRevealAnswer: () => void;
    pendingGrade: ReviewGrade | null;
};

export function ReviewCard({
    cardState,
    isAnswerVisible,
    onCompleteItem,
    onRevealAnswer,
    pendingGrade,
}: ReviewCardProps) {
    const {item} = cardState;

    return (
        <Surface style={styles.root}>
            <View style={styles.meta}>
                <AppText variant="caption" tone="accent">
                    {getReviewSourceLabel(item.sourceType)}
                </AppText>
                <AppText variant="caption" tone="secondary">
                    {cardState.currentIndex + 1} of {cardState.totalCount} -{" "}
                    {getReviewMasteryLabel(item.mastery)}
                </AppText>
            </View>
            <AppText accessibilityRole="header" variant="heading">
                {item.prompt}
            </AppText>
            {isAnswerVisible ? (
                <View style={styles.answer}>
                    <AppText variant="label">Answer</AppText>
                    <AppText>{item.answer}</AppText>
                </View>
            ) : (
                <Button
                    label="Reveal answer"
                    onPress={onRevealAnswer}
                    variant="secondary"
                />
            )}
            {isAnswerVisible ? (
                <View style={styles.actions}>
                    <Button
                        label="Known"
                        loading={pendingGrade === "known"}
                        onPress={() => {
                            onCompleteItem("known");
                        }}
                    />
                    <Button
                        label="Unsure"
                        loading={pendingGrade === "unsure"}
                        onPress={() => {
                            onCompleteItem("unsure");
                        }}
                        variant="secondary"
                    />
                    <Button
                        label="Difficult"
                        loading={pendingGrade === "difficult"}
                        onPress={() => {
                            onCompleteItem("difficult");
                        }}
                        variant="ghost"
                    />
                </View>
            ) : null}
        </Surface>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        gap: theme.spacing.lg,
    },
    meta: {
        gap: theme.spacing.xs,
    },
    answer: {
        backgroundColor: theme.colors.surfaceTonal,
        borderRadius: theme.radii.md,
        gap: theme.spacing.sm,
        padding: theme.spacing.md,
    },
    actions: {
        gap: theme.spacing.sm,
    },
}));
