import {Pressable, View} from "react-native";
import {StyleSheet, useUnistyles} from "react-native-unistyles";

import {
    AppText,
    Card,
    Icon,
    PressableMotionView,
} from "../../../components/common";
import {COMPONENT_PLAYGROUND_CARD_PROGRESS_SEGMENTS} from "../constants/componentPlaygroundConstants";

const ACTIVE_PROGRESS_SEGMENTS = 14;

export function PlaygroundCardComposite() {
    const {theme} = useUnistyles();

    function handleLinkedSurfacePress() {
        return undefined;
    }

    return (
        <View style={styles.canvas}>
            <Pressable
                accessibilityLabel="Open daily rhythm linked surface example"
                accessibilityRole="button"
                onPress={handleLinkedSurfacePress}
            >
                {({pressed}) => (
                    <PressableMotionView
                        pressScale={0.985}
                        pressed={pressed}
                        style={styles.wholeAction}
                    >
                        <Card size="hero">
                            <Card.Item>
                                <View style={styles.brandRow}>
                                    <View style={styles.brandMark}>
                                        <Icon
                                            color={
                                                theme.colors
                                                    .surfaceContrastAccent
                                            }
                                            name="practice"
                                            size="hero"
                                        />
                                        <AppText variant="subtitle">
                                            Correcta
                                        </AppText>
                                    </View>
                                    <View style={styles.levelPill}>
                                        <AppText
                                            variant="button"
                                            style={styles.levelPillText}
                                        >
                                            12 level
                                        </AppText>
                                    </View>
                                </View>
                            </Card.Item>
                        </Card>

                        <Card size="hero">
                            <Card.Item style={styles.welcomeItem}>
                                <AppText variant="titleLarge">
                                    Luis, welcome back
                                </AppText>
                                <Card.Caption variant="body">
                                    Your grammar streak is waiting.
                                </Card.Caption>
                            </Card.Item>
                            <Card.Item style={styles.progressItem}>
                                <Card.Title>Your progress</Card.Title>
                                <Card.Caption>
                                    Complete one short review before practice.
                                </Card.Caption>
                                <View style={styles.progressRow}>
                                    <AppText tone="accent" variant="metric">
                                        79%
                                    </AppText>
                                    <View style={styles.progressTrack}>
                                        {COMPONENT_PLAYGROUND_CARD_PROGRESS_SEGMENTS.map(
                                            (segment) => (
                                                <View
                                                    key={segment}
                                                    style={[
                                                        styles.progressSegment,
                                                        segment <
                                                            ACTIVE_PROGRESS_SEGMENTS &&
                                                            styles.progressSegmentActive,
                                                    ]}
                                                />
                                            )
                                        )}
                                    </View>
                                </View>
                            </Card.Item>
                        </Card>
                    </PressableMotionView>
                )}
            </Pressable>

            <View style={styles.challengeRow}>
                <View style={styles.challengeCopy}>
                    <AppText variant="caption" tone="secondary">
                        New challenge
                    </AppText>
                    <View style={styles.challengeTimer}>
                        <AppText
                            variant="button"
                            style={styles.challengeTimerText}
                        >
                            3H 41M left
                        </AppText>
                    </View>
                    <AppText variant="subtitle">Rhythm lightning</AppText>
                </View>
                <Pressable
                    accessibilityLabel="Start rhythm lightning challenge"
                    accessibilityRole="button"
                    onPress={handleLinkedSurfacePress}
                >
                    {({pressed}) => (
                        <PressableMotionView
                            pressed={pressed}
                            style={[
                                styles.challengeAction,
                                pressed && styles.challengeActionPressed,
                            ]}
                        >
                            <AppText
                                variant="button"
                                style={styles.challengeActionText}
                            >
                                Start
                            </AppText>
                        </PressableMotionView>
                    )}
                </Pressable>
            </View>

            <Card orientation="horizontal" gap="default">
                <Card.Item
                    accessibilityLabel="Open best score details"
                    onPress={handleLinkedSurfacePress}
                >
                    <Card.Title>Best score</Card.Title>
                    <Card.Caption>Expert mode</Card.Caption>
                    <Card.Metric>7,593</Card.Metric>
                </Card.Item>
                <Card.Item
                    accessibilityLabel="Open reaction speed details"
                    onPress={handleLinkedSurfacePress}
                >
                    <Card.Title>Reaction speed</Card.Title>
                    <Card.Caption>Average time</Card.Caption>
                    <Card.Metric>285 ms</Card.Metric>
                </Card.Item>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create((theme) => ({
    canvas: {
        backgroundColor: theme.colors.canvas,
        borderRadius: theme.radii.sheet,
        gap: theme.spacing.xl,
        padding: theme.spacing.lg,
    },
    wholeAction: {
        borderRadius: theme.card.radius.hero,
        gap: theme.spacing.xl,
    },
    brandRow: {
        alignItems: "center",
        flexDirection: "row",
        gap: theme.spacing.lg,
        justifyContent: "space-between",
    },
    brandMark: {
        alignItems: "center",
        flexDirection: "row",
        gap: theme.spacing.sm,
    },
    levelPill: {
        backgroundColor: theme.colors.surfaceContrastAccent,
        borderRadius: theme.radii.pill,
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.sm,
    },
    levelPillText: {
        color: theme.colors.surfaceContrast,
        textTransform: "uppercase",
    },
    welcomeItem: {
        minHeight: 132,
    },
    progressItem: {
        minHeight: 168,
    },
    progressRow: {
        alignItems: "center",
        flexDirection: "row",
        gap: theme.spacing.xl,
        marginTop: theme.spacing.md,
    },
    progressTrack: {
        flex: 1,
        flexDirection: "row",
        gap: theme.spacing.xs,
    },
    progressSegment: {
        backgroundColor: theme.colors.surfaceContrastPressed,
        borderRadius: theme.radii.pill,
        flex: 1,
        height: 28,
    },
    progressSegmentActive: {
        backgroundColor: theme.colors.surfaceContrastAccent,
    },
    challengeRow: {
        alignItems: "center",
        flexDirection: "row",
        gap: theme.spacing.lg,
        justifyContent: "space-between",
        paddingHorizontal: theme.spacing.lg,
    },
    challengeCopy: {
        alignItems: "flex-start",
        flex: 1,
        gap: theme.spacing.sm,
    },
    challengeTimer: {
        backgroundColor: theme.colors.surfaceContrast,
        borderRadius: theme.radii.pill,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
    },
    challengeTimerText: {
        color: theme.colors.surfaceContrastForeground,
        textTransform: "uppercase",
    },
    challengeAction: {
        alignItems: "center",
        backgroundColor: theme.colors.surfaceContrast,
        borderRadius: theme.card.radius.compact,
        justifyContent: "center",
        minHeight: 64,
        minWidth: 112,
        paddingHorizontal: theme.spacing.xl,
    },
    challengeActionPressed: {
        backgroundColor: theme.colors.surfaceContrastPressed,
    },
    challengeActionText: {
        color: theme.colors.surfaceContrastForeground,
        textTransform: "uppercase",
    },
}));
