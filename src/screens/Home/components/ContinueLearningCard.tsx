import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {
    AppText,
    Button,
    Chip,
    ConnectedCard,
    Icon,
} from "../../../components/common";
import type {HomeContinueLearningCard} from "../types/homeTypes";

type ContinueLearningCardProps = {
    card: HomeContinueLearningCard;
    onOpenLibrary: () => void;
    onOpenReview: () => void;
};

export function ContinueLearningCard({
    card,
    onOpenLibrary,
    onOpenReview,
}: ContinueLearningCardProps) {
    const action = getAction({card, onOpenLibrary, onOpenReview});

    return (
        <ConnectedCard gap="compact">
            <ConnectedCard.Item>
                <View style={styles.headingRow}>
                    <Icon name="review" size="default" tone="accent" />
                    <View style={styles.headingCopy}>
                        <ConnectedCard.Eyebrow>
                            {card.summaryLabel}
                        </ConnectedCard.Eyebrow>
                        <AppText variant="heading">{card.title}</AppText>
                    </View>
                </View>
                <AppText tone="secondary">{card.body}</AppText>
                {action ? (
                    <Button
                        accessibilityLabel={action.label}
                        label={action.label}
                        onPress={action.onPress}
                        trailingIcon={action.icon}
                        variant="secondary"
                    />
                ) : null}
            </ConnectedCard.Item>
            {card.previewItems.length > 0 ? (
                <ConnectedCard.Item>
                    <ConnectedCard.Title>Review queue</ConnectedCard.Title>
                    <View style={styles.previewList}>
                        {card.previewItems.map((item) => {
                            return (
                                <View key={item.id} style={styles.previewItem}>
                                    <AppText variant="bodyStrong">
                                        {item.prompt}
                                    </AppText>
                                    <AppText
                                        tone="secondary"
                                        variant="bodySmall"
                                    >
                                        {item.answer}
                                    </AppText>
                                    <AppText tone="muted" variant="caption">
                                        {item.metaLabel}
                                    </AppText>
                                </View>
                            );
                        })}
                    </View>
                </ConnectedCard.Item>
            ) : null}
            {card.difficultWords.length > 0 ? (
                <ConnectedCard.Item>
                    <ConnectedCard.Title>Difficult words</ConnectedCard.Title>
                    <View style={styles.chipRow}>
                        {card.difficultWords.map((word) => {
                            return (
                                <Chip
                                    key={word}
                                    icon="word"
                                    label={word}
                                    size="small"
                                    variant="warning"
                                />
                            );
                        })}
                    </View>
                </ConnectedCard.Item>
            ) : null}
        </ConnectedCard>
    );
}

function getAction({
    card,
    onOpenLibrary,
    onOpenReview,
}: ContinueLearningCardProps) {
    if (!card.actionLabel || !card.actionTarget) {
        return null;
    }

    return {
        icon: card.actionTarget === "review" ? "review" : "library",
        label: card.actionLabel,
        onPress: card.actionTarget === "review" ? onOpenReview : onOpenLibrary,
    } as const;
}

const styles = StyleSheet.create((theme) => ({
    headingRow: {
        alignItems: "center",
        flexDirection: "row",
        gap: theme.spacing.md,
    },
    headingCopy: {
        flex: 1,
        gap: theme.spacing.xs,
    },
    previewList: {
        gap: theme.spacing.sm,
    },
    previewItem: {
        gap: theme.spacing.xs,
    },
    chipRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: theme.spacing.sm,
    },
}));
