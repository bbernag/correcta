import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, ConnectedCard, Icon} from "../../../components/common";
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
        <ConnectedCard gap="compact">
            <ConnectedCard.Item>
                <ConnectedCard.Eyebrow>Queue preview</ConnectedCard.Eyebrow>
                <AppText variant="heading">Next cards</AppText>
            </ConnectedCard.Item>
            {items.map((item) => {
                return (
                    <ConnectedCard.Item key={item.id}>
                        <View style={styles.itemHeader}>
                            <Icon
                                name={getReviewSourceIcon(item.sourceType)}
                                size="dense"
                                tone="accent"
                            />
                            <View style={styles.itemCopy}>
                                <ConnectedCard.Title>
                                    {item.prompt}
                                </ConnectedCard.Title>
                                <ConnectedCard.Caption>
                                    {getReviewSourceLabel(item.sourceType)} -{" "}
                                    {getReviewMasteryLabel(item.mastery)}
                                </ConnectedCard.Caption>
                            </View>
                        </View>
                    </ConnectedCard.Item>
                );
            })}
        </ConnectedCard>
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
