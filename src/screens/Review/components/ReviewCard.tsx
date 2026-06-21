import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, Button, Icon, Surface} from "../../../components/common";
import type {IconName} from "../../../components/common";
import type {ReviewGrade} from "../../../types";
import type {ReviewCardState} from "../types/reviewTypes";
import {
    getReviewGradeButtonVariant,
    getReviewGradeLabel,
    getReviewMasteryLabel,
    getReviewMasteryTone,
    getReviewSourceIcon,
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
    const masteryTone = getReviewMasteryTone(item.mastery);
    const gradeOptions: ReviewGrade[] = ["known", "unsure", "difficult"];

    return (
        <Surface variant="card" style={styles.root}>
            <View style={styles.header}>
                <View style={styles.sourceRow}>
                    <Icon
                        name={getReviewSourceIcon(item.sourceType)}
                        size="default"
                        tone="accent"
                    />
                    <View style={styles.meta}>
                        <AppText variant="label" tone="accent">
                            {getReviewSourceLabel(item.sourceType)}
                        </AppText>
                        <AppText variant="bodySmall" tone="secondary">
                            Card {cardState.currentIndex + 1} of{" "}
                            {cardState.totalCount}
                        </AppText>
                    </View>
                </View>
                <View style={styles.masteryBadge}>
                    <Icon name="progress" size="dense" tone={masteryTone} />
                    <AppText variant="caption" tone={masteryTone}>
                        {getReviewMasteryLabel(item.mastery)}
                    </AppText>
                </View>
            </View>
            <View style={styles.prompt}>
                <AppText accessibilityRole="header" variant="heading">
                    {item.prompt}
                </AppText>
            </View>
            {isAnswerVisible ? (
                <View style={styles.answer}>
                    <AppText variant="label" tone="accent">
                        Answer
                    </AppText>
                    <AppText variant="answer">{item.answer}</AppText>
                </View>
            ) : (
                <Button
                    fullWidth
                    label="Reveal answer"
                    leadingIcon="review"
                    onPress={onRevealAnswer}
                    variant="secondary"
                />
            )}
            {isAnswerVisible ? (
                <View style={styles.actions}>
                    <View style={styles.gradeRow}>
                        {gradeOptions.map((grade) => {
                            return (
                                <Button
                                    key={grade}
                                    label={getReviewGradeLabel(grade)}
                                    loading={pendingGrade === grade}
                                    loadingLabel="Saving"
                                    onPress={() => {
                                        onCompleteItem(grade);
                                    }}
                                    rightIcon={getReviewGradeIcon(grade)}
                                    size="small"
                                    style={styles.gradeButton}
                                    variant={getReviewGradeButtonVariant(grade)}
                                />
                            );
                        })}
                    </View>
                    <AppText
                        variant="caption"
                        tone="secondary"
                        style={styles.actionHint}
                    >
                        Known spaces it out, unsure keeps it nearby, difficult
                        brings it back sooner.
                    </AppText>
                </View>
            ) : null}
        </Surface>
    );
}

function getReviewGradeIcon(grade: ReviewGrade): IconName {
    if (grade === "known") {
        return "success";
    }

    if (grade === "difficult") {
        return "warning";
    }

    return "info";
}

const styles = StyleSheet.create((theme) => ({
    root: {
        gap: theme.spacing.lg,
    },
    header: {
        alignItems: "flex-start",
        flexDirection: "row",
        gap: theme.spacing.md,
        justifyContent: "space-between",
    },
    sourceRow: {
        alignItems: "center",
        flex: 1,
        flexDirection: "row",
        gap: theme.spacing.md,
    },
    meta: {
        gap: theme.spacing.xs,
    },
    masteryBadge: {
        alignItems: "center",
        backgroundColor: theme.colors.surfaceTonal,
        borderRadius: theme.radii.pill,
        flexDirection: "row",
        gap: theme.spacing.xs,
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
    },
    prompt: {
        gap: theme.spacing.sm,
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
    gradeRow: {
        flexDirection: "row",
        gap: theme.spacing.sm,
    },
    gradeButton: {
        flex: 1,
    },
    actionHint: {
        textAlign: "center",
    },
}));
