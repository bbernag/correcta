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
} from "../constants/componentPlaygroundConstants";
import {PlaygroundComponentSample} from "./PlaygroundComponentSample";
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
                <PlaygroundComponentSample title="ScreenHeader">
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
                </PlaygroundComponentSample>
                <PlaygroundComponentSample title="SectionHeader">
                    <SectionHeader
                        eyebrow="Selection"
                        subtitle="Chips and segments use the same squircle surface contract."
                        title="Modes and filters"
                    />
                </PlaygroundComponentSample>
                <PlaygroundComponentSample title="Chip">
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
                </PlaygroundComponentSample>
                <PlaygroundComponentSample title="WordChip">
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
                </PlaygroundComponentSample>
                <PlaygroundComponentSample title="SegmentedControl">
                    <SegmentedControl
                        accessibilityLabel="Practice input mode example"
                        onChange={setSelectedMode}
                        options={[...SEGMENTED_OPTIONS]}
                        value={selectedMode}
                    />
                </PlaygroundComponentSample>
                <PlaygroundComponentSample title="SectionHeader">
                    <SectionHeader
                        eyebrow="Progress"
                        subtitle="Stats and progress bars use semantic tones without gradients."
                        title="Learning data"
                    />
                </PlaygroundComponentSample>
                <PlaygroundComponentSample title="StatCard">
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
                </PlaygroundComponentSample>
                <PlaygroundComponentSample title="ProgressBar">
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
                </PlaygroundComponentSample>
                <PlaygroundComponentSample title="SectionHeader">
                    <SectionHeader
                        eyebrow="Feedback"
                        subtitle="Result badges and highlights keep correction states explicit."
                        title="Teacher markup"
                    />
                </PlaygroundComponentSample>
                <PlaygroundComponentSample title="ResultBadge">
                    <View style={styles.wrapRow}>
                        {COMPONENT_PLAYGROUND_RESULT_BADGE_EXAMPLES.map(
                            (item) => (
                                <ResultBadge
                                    key={item.label}
                                    label={item.label}
                                    tone={item.tone}
                                />
                            )
                        )}
                    </View>
                </PlaygroundComponentSample>
                <PlaygroundComponentSample title="FeedbackHighlight">
                    <FeedbackHighlight
                        message="The meaning is right, but the tense needs work."
                        title="Close translation"
                        tone="warning"
                    />
                </PlaygroundComponentSample>
                <PlaygroundComponentSample title="SectionHeader">
                    <SectionHeader
                        eyebrow="States"
                        subtitle="Shared state panels keep loading, empty, and error treatment consistent."
                        title="System states"
                    />
                </PlaygroundComponentSample>
                <PlaygroundComponentSample title="LoadingState">
                    <LoadingState
                        title="Preparing practice"
                        message="Loading a focused sentence queue."
                    />
                </PlaygroundComponentSample>
                <PlaygroundComponentSample title="EmptyState">
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
                </PlaygroundComponentSample>
                <PlaygroundComponentSample title="ErrorState">
                    <ErrorState
                        message="The local session could not be loaded."
                        onRetry={handlePress}
                        title="Session unavailable"
                    />
                </PlaygroundComponentSample>
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
