import {Pressable, View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, Button, Surface} from "../../../components/common";
import type {
    NotificationPreferences,
    NotificationReminderState,
} from "../../../types";

type ReminderPresetOption = {
    id: NotificationPreferences["reminderPreset"];
    label: string;
    time: string;
};

type ReminderPreferencesCardProps = {
    onSelectReminderPreset: (params: {
        preset: NotificationPreferences["reminderPreset"];
        time: string;
    }) => void;
    onToggleReminders: () => void;
    onToggleReviewReminder: () => void;
    preferences: NotificationPreferences;
    reminderState: NotificationReminderState;
};

const REMINDER_OPTIONS: ReminderPresetOption[] = [
    {id: "morning", label: "Morning", time: "08:00"},
    {id: "afternoon", label: "Afternoon", time: "13:00"},
    {id: "evening", label: "Evening", time: "19:00"},
    {id: "none", label: "Off", time: "none"},
];

export function ReminderPreferencesCard({
    onSelectReminderPreset,
    onToggleReminders,
    onToggleReviewReminder,
    preferences,
    reminderState,
}: ReminderPreferencesCardProps) {
    return (
        <Surface variant="outline" style={styles.root}>
            <View style={styles.header}>
                <AppText variant="heading">Reminders</AppText>
                <AppText tone="secondary">
                    {reminderState.nextReminderLabel}
                </AppText>
            </View>
            <View style={styles.options}>
                {REMINDER_OPTIONS.map((option) => {
                    const selected =
                        option.time === preferences.reminderTime ||
                        (option.id === "none" && !preferences.enabled);

                    return (
                        <Pressable
                            accessibilityRole="button"
                            accessibilityState={{selected}}
                            key={option.id}
                            onPress={() => {
                                onSelectReminderPreset({
                                    preset: option.id,
                                    time: option.time,
                                });
                            }}
                            style={({pressed}) => [
                                styles.option,
                                selected && styles.optionSelected,
                                pressed && styles.pressed,
                            ]}
                        >
                            <AppText variant="label">{option.label}</AppText>
                            <AppText variant="caption" tone="secondary">
                                {option.time === "none"
                                    ? "No alerts"
                                    : option.time}
                            </AppText>
                        </Pressable>
                    );
                })}
            </View>
            <Button
                label={preferences.enabled ? "Turn reminders off" : "Turn on"}
                onPress={onToggleReminders}
                variant={preferences.enabled ? "ghost" : "secondary"}
            />
            <Button
                label={
                    preferences.reviewReminderEnabled
                        ? "Pause review reminders"
                        : "Use review reminders"
                }
                onPress={onToggleReviewReminder}
                variant="secondary"
            />
            <AppText variant="caption" tone="secondary">
                {reminderState.preferencesSummary}. Quiet hours are respected in
                local schedule metadata.
            </AppText>
        </Surface>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        gap: theme.spacing.md,
    },
    header: {
        gap: theme.spacing.xs,
    },
    options: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: theme.spacing.sm,
    },
    option: {
        backgroundColor: theme.colors.surfaceTonal,
        borderColor: theme.colors.borderSubtle,
        borderRadius: theme.radii.sm,
        borderWidth: 1,
        flexBasis: "45%",
        flexGrow: 1,
        gap: theme.spacing.xs,
        minHeight: 56,
        padding: theme.spacing.md,
    },
    optionSelected: {
        backgroundColor: theme.colors.accentPrimarySoft,
        borderColor: theme.colors.accentPrimaryStrong,
    },
    pressed: {
        opacity: theme.motion.pressOpacity,
    },
}));
