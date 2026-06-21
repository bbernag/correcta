import {Pressable, View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {
    AppText,
    Button,
    PressableMotionView,
    Surface,
} from "../../../components/common";
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
    isSaving?: boolean;
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
    isSaving = false,
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
                    const selected = preferences.enabled
                        ? option.id !== "none" &&
                          option.time === preferences.reminderTime
                        : option.id === "none";

                    return (
                        <Pressable
                            accessibilityHint="Changes the daily reminder time."
                            accessibilityLabel={getReminderOptionLabel({
                                option,
                                selected,
                            })}
                            accessibilityRole="radio"
                            accessibilityState={{
                                checked: selected,
                                disabled: isSaving,
                            }}
                            disabled={isSaving}
                            key={option.id}
                            onPress={() => {
                                onSelectReminderPreset({
                                    preset: option.id,
                                    time: option.time,
                                });
                            }}
                            style={styles.optionFrame}
                        >
                            {({pressed}) => (
                                <PressableMotionView
                                    disabled={isSaving}
                                    pressed={pressed}
                                    style={[
                                        styles.option,
                                        selected && styles.optionSelected,
                                    ]}
                                >
                                    <AppText variant="label">
                                        {option.label}
                                    </AppText>
                                    <AppText variant="caption" tone="secondary">
                                        {option.time === "none"
                                            ? "No alerts"
                                            : option.time}
                                    </AppText>
                                </PressableMotionView>
                            )}
                        </Pressable>
                    );
                })}
            </View>
            <Button
                disabled={isSaving}
                label={preferences.enabled ? "Turn reminders off" : "Turn on"}
                onPress={onToggleReminders}
                variant={preferences.enabled ? "ghost" : "secondary"}
            />
            <Button
                disabled={isSaving}
                label={
                    preferences.reviewReminderEnabled
                        ? "Pause review reminders"
                        : "Use review reminders"
                }
                onPress={onToggleReviewReminder}
                variant="secondary"
            />
            <AppText variant="caption" tone="secondary">
                {reminderState.preferencesSummary}.{" "}
                {getNativeScheduleSummary(reminderState)}
            </AppText>
        </Surface>
    );
}

function getReminderOptionLabel({
    option,
    selected,
}: {
    option: ReminderPresetOption;
    selected: boolean;
}) {
    const timeLabel = option.time === "none" ? "No alerts" : option.time;
    const selectedLabel = selected ? "Selected" : "Not selected";

    return `${option.label}. ${timeLabel}. ${selectedLabel}.`;
}

function getNativeScheduleSummary(reminderState: NotificationReminderState) {
    if (reminderState.nativePermissionStatus === "denied") {
        return "Notification permission is blocked in system settings.";
    }

    if (reminderState.scheduledNativeReminderCount > 0) {
        const reminderLabel =
            reminderState.scheduledNativeReminderCount === 1
                ? "device reminder"
                : "device reminders";

        return `${reminderState.scheduledNativeReminderCount} ${reminderLabel} scheduled.`;
    }

    if (
        reminderState.nativePermissionStatus === "undetermined" &&
        reminderState.scheduledReminders.length > 0
    ) {
        return "Device reminders are waiting for notification permission.";
    }

    return "No device reminders scheduled.";
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
    optionFrame: {
        flexBasis: "45%",
        flexGrow: 1,
    },
    option: {
        backgroundColor: theme.colors.surfaceTonal,
        borderColor: theme.colors.borderSubtle,
        borderRadius: theme.radii.sm,
        borderWidth: 1,
        gap: theme.spacing.xs,
        minHeight: 56,
        padding: theme.spacing.md,
    },
    optionSelected: {
        backgroundColor: theme.colors.accentPrimarySoft,
        borderColor: theme.colors.accentPrimaryStrong,
    },
}));
