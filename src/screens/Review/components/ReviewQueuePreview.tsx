import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, Card, Icon} from "../../../components/common";
import type {ReviewItem} from "../../../types";
import {
    getReviewMasteryLabel,
    getReviewSourceIcon,
    getReviewSourceLabel,
} from "../utils/reviewUtils";

type ReviewQueuePreviewProps = {
    items: ReviewItem[];
};

export function ReviewQueuePreview({items}: ReviewQueuePreviewProps) {
    if (items.length === 0) {
        return null;
    }

    return (
        <Card gap="compact">
            <Card.Item>
                <Card.Eyebrow>Queue preview</Card.Eyebrow>
                <AppText variant="heading">Next cards</AppText>
            </Card.Item>
            {items.map((item) => {
                return (
                    <Card.Item key={item.id}>
                        <View style={styles.itemHeader}>
                            <Icon
                                name={getReviewSourceIcon(item.sourceType)}
                                size="dense"
                                tone="accent"
                            />
                            <View style={styles.itemCopy}>
                                <Card.Title>{item.prompt}</Card.Title>
                                <Card.Caption>
                                    {getReviewSourceLabel(item.sourceType)} -{" "}
                                    {getReviewMasteryLabel(item.mastery)}
                                </Card.Caption>
                            </View>
                        </View>
                    </Card.Item>
                );
            })}
        </Card>
    );
}

const styles = StyleSheet.create((theme) => ({
    itemHeader: {
        alignItems: "center",
        flexDirection: "row",
        gap: theme.spacing.md,
    },
    itemCopy: {
        flex: 1,
        gap: theme.spacing.xs,
    },
}));
