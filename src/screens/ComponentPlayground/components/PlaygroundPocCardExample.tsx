import {useState} from "react";
import {Pressable, View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText} from "../../../components/common";
import {ConnectedCard} from "../../../components/common/ConnectedCard";

export function PlaygroundPocCardExample() {
    const [replayKey, setReplayKey] = useState(0);

    return (
        <View style={styles.root}>
            <View style={styles.demo}>
                <View style={styles.demoHeader}>
                    <AppText variant="caption" tone="muted">
                        Animated morph
                    </AppText>
                    <Pressable
                        accessibilityLabel="Replay animation"
                        accessibilityRole="button"
                        hitSlop={8}
                        onPress={() => setReplayKey((value) => value + 1)}
                        style={styles.replayButton}
                    >
                        <AppText variant="caption">Replay</AppText>
                    </Pressable>
                </View>
                <View style={styles.canvas}>
                    <ConnectedCard animated key={replayKey}>
                        <ConnectedCard.Item
                            contentStyle={styles.sequenceContent}
                            style={styles.sequenceSection}
                        >
                            <AppText variant="bodySmall">
                                Learning progress
                            </AppText>
                            <AppText variant="heading">1 day streak</AppText>
                        </ConnectedCard.Item>
                        <ConnectedCard.Item
                            contentStyle={styles.scoreContent}
                            style={styles.scoreSection}
                        >
                            <View style={styles.statsRow}>
                                <View style={styles.stat}>
                                    <AppText variant="caption" tone="muted">
                                        {"Today's goal"}
                                    </AppText>
                                    <AppText variant="heading">
                                        5/5 attempts
                                    </AppText>
                                </View>
                            </View>
                        </ConnectedCard.Item>
                    </ConnectedCard>
                </View>
            </View>

            <View style={styles.demo}>
                <AppText variant="caption" tone="muted">
                    Vertical
                </AppText>
                <View style={styles.canvas}>
                    <ConnectedCard>
                        <ConnectedCard.Item
                            contentStyle={styles.sequenceContent}
                            style={styles.sequenceSection}
                        >
                            <AppText variant="bodySmall">Sequence rush</AppText>
                            <AppText
                                variant="caption"
                                tone="muted"
                                style={styles.chevronText}
                            >
                                v
                            </AppText>
                        </ConnectedCard.Item>
                        <ConnectedCard.Item
                            contentStyle={styles.scoreContent}
                            style={styles.scoreSection}
                        >
                            <View style={styles.statsRow}>
                                <View style={styles.stat}>
                                    <AppText variant="bodySmall">
                                        Best score
                                    </AppText>
                                    <AppText variant="caption" tone="muted">
                                        Expert game mode
                                    </AppText>
                                    <AppText variant="heading">2,435</AppText>
                                </View>
                                <View style={styles.stat}>
                                    <AppText variant="bodySmall">
                                        Reaction speed
                                    </AppText>
                                    <AppText variant="caption" tone="muted">
                                        Average time
                                    </AppText>
                                    <AppText variant="heading">319 ms</AppText>
                                </View>
                            </View>
                        </ConnectedCard.Item>
                    </ConnectedCard>
                </View>
            </View>

            <View style={styles.demo}>
                <AppText variant="caption" tone="muted">
                    Horizontal
                </AppText>
                <View style={styles.canvas}>
                    <ConnectedCard orientation="horizontal">
                        <ConnectedCard.Item
                            contentStyle={styles.horizontalSectionContent}
                            style={styles.horizontalSection}
                        >
                            <View style={styles.stat}>
                                <AppText variant="caption" tone="muted">
                                    Saved terms
                                </AppText>
                                <AppText variant="heading">48</AppText>
                            </View>
                        </ConnectedCard.Item>
                        <ConnectedCard.Item
                            contentStyle={styles.horizontalSectionContent}
                            style={styles.horizontalSection}
                        >
                            <View style={styles.stat}>
                                <AppText variant="caption" tone="muted">
                                    Review pace
                                </AppText>
                                <AppText variant="heading">6m</AppText>
                            </View>
                        </ConnectedCard.Item>
                    </ConnectedCard>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        gap: theme.spacing.lg,
    },
    demo: {
        gap: theme.spacing.sm,
    },
    demoHeader: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    replayButton: {
        backgroundColor: theme.colors.surfaceTonal,
        borderRadius: theme.radii.pill,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
    },
    canvas: {
        backgroundColor: theme.colors.canvas,
        borderRadius: theme.radii.sheet,
        padding: theme.spacing.sm,
    },
    sequenceSection: {
        justifyContent: "center",
        minHeight: 64,
    },
    sequenceContent: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    chevronText: {
        textTransform: "uppercase",
    },
    scoreSection: {
        justifyContent: "center",
        minHeight: 112,
    },
    scoreContent: {
        width: "100%",
    },
    statsRow: {
        flexDirection: "row",
        gap: theme.spacing.xl,
    },
    stat: {
        flex: 1,
        gap: theme.spacing.xs,
    },
    horizontalSection: {
        justifyContent: "center",
        minHeight: 112,
    },
    horizontalSectionContent: {
        width: "100%",
    },
}));
