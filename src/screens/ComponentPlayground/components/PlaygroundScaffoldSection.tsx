import {useState} from "react";
import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {
    AppText,
    Button,
    Chip,
    EmptyState,
    ErrorState,
    FeedbackHighlight,
    LoadingState,
    ProgressBar,
    ResultBadge,
    ScreenHeader,
    SectionHeader,
    SegmentedControl,
    StatCard,
    WordChip,
} from "../../../components/common";
import {
    COMPONENT_PLAYGROUND_CHIP_EXAMPLES,
    COMPONENT_PLAYGROUND_PROGRESS_EXAMPLES,
    COMPONENT_PLAYGROUND_RESULT_BADGE_EXAMPLES,
    COMPONENT_PLAYGROUND_STAT_EXAMPLES,
    COMPONENT_PLAYGROUND_WORD_CHIP_EXAMPLES,
} from "../constants/ComponentPlaygroundConstants";
import {PlaygroundSectionBody} from "./PlaygroundSectionBody";
import {PlaygroundSectionHeader} from "./PlaygroundSectionHeader";
import {PlaygroundSectionRoot} from "./PlaygroundSectionRoot";

const SEGMENTED_OPTIONS = [
    {
        icon: "practice",
        label: "Type",
        value: "type",
    },
    {
        icon: "word",
        label: "Build",
        value: "build",
    },
    {
        icon: "hint",
        label: "Hint",
        value: "hint",
    },
] as const;

export function PlaygroundScaffoldSection() {
    const [selectedMode, setSelectedMode] = useState("type");

    function handlePress() {
        return undefined;
    }

    return (
        <PlaygroundSectionRoot>
            <PlaygroundSectionHeader
                description="Shared scaffold components used before feature screens create local one-offs."
                eyebrow="Scaffold"
                title="Common component scaffold"
            />
            <PlaygroundSectionBody style={styles.stack}>
                <ScreenHeader
                    eyebrow="Correcta"
                    subtitle="A compact screen header with optional action."
                    title="Practice foundation"
                    action={
                        <Button
                            accessibilityLabel="Start practice from scaffold example"
                            label="Start"
                            onPress={handlePress}
                            size="small"
                            variant="secondary"
                        />
                    }
                />
                <SectionHeader
                    eyebrow="Selection"
                    subtitle="Chips and segments use the same squircle surface contract."
                    title="Modes and filters"
                />
                <View style={styles.wrapRow}>
                    {COMPONENT_PLAYGROUND_CHIP_EXAMPLES.map((item) => (
                        <Chip
                            disabled={item.disabled}
                            icon={item.icon}
                            key={item.label}
                            label={item.label}
                            onPress={handlePress}
                            selected={item.selected}
                            variant={item.variant}
                        />
                    ))}
                </View>
                <View style={styles.wrapRow}>
                    {COMPONENT_PLAYGROUND_WORD_CHIP_EXAMPLES.map((item) => (
                        <WordChip
                            disabled={item.disabled}
                            key={item.label}
                            label={item.label}
                            onPress={handlePress}
                            status={item.status}
                        />
                    ))}
                </View>
                <SegmentedControl
                    accessibilityLabel="Practice input mode example"
                    onChange={setSelectedMode}
                    options={[...SEGMENTED_OPTIONS]}
                    value={selectedMode}
                />
                <SectionHeader
                    eyebrow="Progress"
                    subtitle="Stats and progress bars use semantic tones without gradients."
                    title="Learning data"
                />
                <View style={styles.statGrid}>
                    {COMPONENT_PLAYGROUND_STAT_EXAMPLES.map((item) => (
                        <StatCard
                            helper={item.helper}
                            icon={item.icon}
                            key={item.label}
                            label={item.label}
                            tone={item.tone}
                            value={item.value}
                            style={styles.statCard}
                        />
                    ))}
                </View>
                <View style={styles.progressStack}>
                    {COMPONENT_PLAYGROUND_PROGRESS_EXAMPLES.map((item) => (
                        <View key={item.label} style={styles.progressItem}>
                            <AppText variant="label">{item.label}</AppText>
                            <ProgressBar
                                accessibilityLabel={item.accessibilityLabel}
                                max={item.max}
                                tone={item.tone}
                                value={item.value}
                            />
                        </View>
                    ))}
                </View>
                <SectionHeader
                    eyebrow="Feedback"
                    subtitle="Result badges and highlights keep correction states explicit."
                    title="Teacher markup"
                />
                <View style={styles.wrapRow}>
                    {COMPONENT_PLAYGROUND_RESULT_BADGE_EXAMPLES.map((item) => (
                        <ResultBadge
                            key={item.label}
                            label={item.label}
                            tone={item.tone}
                        />
                    ))}
                </View>
                <FeedbackHighlight
                    message="The meaning is right, but the tense needs work."
                    title="Close translation"
                    tone="warning"
                />
                <SectionHeader
                    eyebrow="States"
                    subtitle="Shared state panels keep loading, empty, and error treatment consistent."
                    title="System states"
                />
                <LoadingState
                    title="Preparing practice"
                    message="Loading a focused sentence queue."
                />
                <EmptyState
                    icon="review"
                    title="No review cards"
                    message="Complete practice to build a useful review queue."
                    action={
                        <Button
                            accessibilityLabel="Start practice from empty state example"
                            label="Start practice"
                            onPress={handlePress}
                            size="small"
                            variant="secondary"
                        />
                    }
                />
                <ErrorState
                    message="The local session could not be loaded."
                    onRetry={handlePress}
                    title="Session unavailable"
                />
            </PlaygroundSectionBody>
        </PlaygroundSectionRoot>
    );
}

const styles = StyleSheet.create((theme) => ({
    stack: {
        gap: theme.spacing.xl,
    },
    wrapRow: {
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: theme.spacing.md,
    },
    statGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: theme.spacing.lg,
    },
    statCard: {
        flexBasis: "30%",
        flexGrow: 1,
        minWidth: 130,
    },
    progressStack: {
        gap: theme.spacing.lg,
    },
    progressItem: {
        gap: theme.spacing.sm,
    },
}));
