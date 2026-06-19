import {Pressable, View} from "react-native";
import {StyleSheet, useUnistyles} from "react-native-unistyles";

import {AppText, CardUnion, Icon} from "../../../components/common";
import {COMPONENT_PLAYGROUND_CARD_UNION_PROGRESS_SEGMENTS} from "../constants/ComponentPlaygroundConstants";

const ACTIVE_PROGRESS_SEGMENTS = 14;

export function PlaygroundCardUnionCanvasExample() {
    const {theme} = useUnistyles();

    function handleLinkedSurfacePress() {
        return undefined;
    }

    return (
        <View style={styles.canvas}>
            <CardUnion>
                <CardUnion.Item>
                    <View style={styles.brandRow}>
                        <View style={styles.brandMark}>
                            <Icon
                                color={theme.colors.surfaceContrastAccent}
                                name="practice"
                                size="hero"
                            />
                            <AppText
                                variant="subtitle"
                                style={styles.contrastText}
                            >
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
                </CardUnion.Item>
            </CardUnion>

            <CardUnion
                accessibilityLabel="Open daily rhythm linked surface example"
                onPress={handleLinkedSurfacePress}
            >
                <CardUnion.Item style={styles.welcomeItem}>
                    <AppText variant="titleLarge" style={styles.contrastText}>
                        Luis, welcome back
                    </AppText>
                    <AppText variant="body" style={styles.contrastMutedText}>
                        Your grammar streak is waiting.
                    </AppText>
                </CardUnion.Item>
                <CardUnion.Item style={styles.progressItem}>
                    <AppText variant="bodyStrong" style={styles.contrastText}>
                        Your progress
                    </AppText>
                    <AppText
                        variant="bodySmall"
                        style={styles.contrastMutedText}
                    >
                        Complete one short review before practice.
                    </AppText>
                    <View style={styles.progressRow}>
                        <AppText variant="metric" style={styles.metricText}>
                            79%
                        </AppText>
                        <View style={styles.progressTrack}>
                            {COMPONENT_PLAYGROUND_CARD_UNION_PROGRESS_SEGMENTS.map(
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
                </CardUnion.Item>
            </CardUnion>

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
                    style={({pressed}) => [
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
                </Pressable>
            </View>

            <CardUnion axis="horizontal">
                <CardUnion.Item
                    accessibilityLabel="Open best score details"
                    onPress={handleLinkedSurfacePress}
                >
                    <AppText variant="bodyStrong" style={styles.contrastText}>
                        Best score
                    </AppText>
                    <AppText
                        variant="bodySmall"
                        style={styles.contrastMutedText}
                    >
                        Expert mode
                    </AppText>
                    <AppText variant="heading" style={styles.metricText}>
                        7,593
                    </AppText>
                </CardUnion.Item>
                <CardUnion.Item
                    accessibilityLabel="Open reaction speed details"
                    onPress={handleLinkedSurfacePress}
                >
                    <AppText variant="bodyStrong" style={styles.contrastText}>
                        Reaction speed
                    </AppText>
                    <AppText
                        variant="bodySmall"
                        style={styles.contrastMutedText}
                    >
                        Average time
                    </AppText>
                    <AppText variant="heading" style={styles.metricText}>
                        285 ms
                    </AppText>
                </CardUnion.Item>
            </CardUnion>
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
    contrastText: {
        color: theme.colors.surfaceContrastForeground,
    },
    contrastMutedText: {
        color: theme.colors.surfaceContrastMutedForeground,
    },
    metricText: {
        color: theme.colors.surfaceContrastAccent,
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
        borderRadius: theme.cardUnion.radius,
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
