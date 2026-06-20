import type {ListRenderItem} from "react-native";
import {FlatList, View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, Screen} from "../../components/common";
import {CardPerformanceCardGroup} from "./components/CardPerformanceCardGroup";
import {
    CARD_PERFORMANCE_ITEM_COUNT,
    CARD_PERFORMANCE_ITEMS,
} from "./constants/CardPerformanceConstants";
import type {
    CardPerformanceItem,
    CardPerformanceVariant,
} from "./types/CardPerformanceTypes";

type CardPerformanceScreenProps = {
    title: string;
    variant: CardPerformanceVariant;
};

export function CardPerformanceScreen({
    title,
    variant,
}: CardPerformanceScreenProps) {
    const renderItem: ListRenderItem<CardPerformanceItem> = ({item}) => (
        <CardPerformanceCardGroup item={item} variant={variant} />
    );

    return (
        <Screen scroll={false}>
            <FlatList
                ListHeaderComponent={
                    <View style={styles.header}>
                        <AppText variant="label" tone="accent">
                            Card performance
                        </AppText>
                        <AppText variant="title">{title}</AppText>
                        <AppText tone="secondary">
                            {CARD_PERFORMANCE_ITEM_COUNT} rows, each rendering
                            one horizontal pair and one vertical stack.
                        </AppText>
                    </View>
                }
                contentContainerStyle={styles.listContent}
                data={CARD_PERFORMANCE_ITEMS}
                initialNumToRender={24}
                keyExtractor={(item) => item.id}
                maxToRenderPerBatch={16}
                removeClippedSubviews
                renderItem={renderItem}
                style={styles.list}
                testID={`card-performance-${variant}`}
                windowSize={10}
            />
        </Screen>
    );
}

const styles = StyleSheet.create((theme) => ({
    list: {
        flex: 1,
    },
    listContent: {
        gap: theme.spacing.xl,
        paddingBottom: theme.spacing["3xl"],
    },
    header: {
        gap: theme.spacing.xs,
    },
}));
