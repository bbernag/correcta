import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, PocCard} from "../../../components/common";
import type {CardPerformanceItem} from "../types/CardPerformanceTypes";

export function CardPerformancePocGroup({item}: {item: CardPerformanceItem}) {
    return (
        <View style={styles.root}>
            <PocCard bridgeSpan={0.4} orientation="horizontal">
                <PocCard.Section
                    contentStyle={styles.horizontalContent}
                    style={styles.section}
                >
                    <AppText variant="caption" tone="muted">
                        Saved terms
                    </AppText>
                    <AppText variant="heading">{item.savedTerms}</AppText>
                </PocCard.Section>
                <PocCard.Section
                    contentStyle={styles.horizontalContent}
                    style={styles.section}
                >
                    <AppText variant="caption" tone="muted">
                        Review pace
                    </AppText>
                    <AppText variant="heading">{item.reviewPace}</AppText>
                </PocCard.Section>
            </PocCard>

            <PocCard>
                <PocCard.Section
                    contentStyle={styles.headerContent}
                    style={styles.section}
                >
                    <AppText variant="bodySmall">{item.sequenceTitle}</AppText>
                    <AppText variant="caption" tone="muted">
                        v
                    </AppText>
                </PocCard.Section>
                <PocCard.Section
                    contentStyle={styles.scoreContent}
                    style={styles.section}
                >
                    <View style={styles.statsRow}>
                        <View style={styles.stat}>
                            <AppText variant="bodySmall">Best score</AppText>
                            <AppText variant="caption" tone="muted">
                                Expert game mode
                            </AppText>
                            <AppText variant="heading">
                                {item.bestScore}
                            </AppText>
                        </View>
                        <View style={styles.stat}>
                            <AppText variant="bodySmall">
                                Reaction speed
                            </AppText>
                            <AppText variant="caption" tone="muted">
                                Average time
                            </AppText>
                            <AppText variant="heading">
                                {item.reactionSpeed}
                            </AppText>
                        </View>
                    </View>
                </PocCard.Section>
            </PocCard>
        </View>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        gap: theme.spacing.md,
    },
    section: {
        padding: theme.spacing.xl,
    },
    horizontalContent: {
        justifyContent: "center",
        minHeight: 80,
    },
    headerContent: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        minHeight: 52,
    },
    scoreContent: {
        justifyContent: "center",
        minHeight: 96,
    },
    statsRow: {
        flexDirection: "row",
        gap: theme.spacing.lg,
    },
    stat: {
        flex: 1,
        gap: theme.spacing.xs,
    },
}));
