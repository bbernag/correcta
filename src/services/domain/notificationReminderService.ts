import type {
    NativeNotificationScheduler,
    NativeNotificationSyncResult,
    NotificationPreferences,
    NotificationPreferencesRepository,
    NotificationReminderService,
    NotificationReminderState,
    NotificationScheduleRepository,
    ReviewQueueRepository,
    ScheduledReminder,
} from "../../types";
import {
    buildScheduledReminders,
    getNextReminderLabel,
    getPreferencesSummary,
} from "./notificationScheduleUtils";

type CreateNotificationReminderServiceParams = {
    nativeNotifications?: NativeNotificationScheduler;
    notifications: NotificationPreferencesRepository;
    notificationSchedule: NotificationScheduleRepository;
    reviewQueue: ReviewQueueRepository;
};

const IDLE_NATIVE_RESULT: NativeNotificationSyncResult = {
    permissionStatus: "undetermined",
    scheduledCount: 0,
};

export function createNotificationReminderService({
    nativeNotifications,
    notifications,
    notificationSchedule,
    reviewQueue,
}: CreateNotificationReminderServiceParams): NotificationReminderService {
    return {
        getReminderState,
        syncReminders,
        async savePreferences(preferences) {
            await notifications.savePreferences({
                ...preferences,
                updatedAt: new Date().toISOString(),
            });

            return syncReminderState({requestPermission: preferences.enabled});
        },
    };

    // Read-only: computes the schedule for display and reads native status, but
    // never cancels or reschedules OS notifications and never prompts.
    async function getReminderState() {
        const schedule = await computeSchedule();

        const native: NativeNotificationSyncResult =
            nativeNotifications && schedule.preferences.enabled
                ? {
                      permissionStatus:
                          await nativeNotifications.getPermissionStatus(),
                      scheduledCount:
                          await nativeNotifications.getScheduledCount(),
                  }
                : IDLE_NATIVE_RESULT;

        return toReminderState({native, ...schedule});
    }

    // Command: (re)schedules OS notifications without prompting. Intended for
    // app launch so reminders re-arm without a destructive read on every screen.
    async function syncReminders() {
        return syncReminderState({requestPermission: false});
    }

    async function syncReminderState({
        requestPermission,
    }: {
        requestPermission: boolean;
    }) {
        const schedule = await computeSchedule();

        const native = nativeNotifications
            ? await nativeNotifications.syncScheduledReminders({
                  reminders: schedule.scheduledReminders,
                  requestPermission,
              })
            : IDLE_NATIVE_RESULT;

        return toReminderState({native, ...schedule});
    }

    async function computeSchedule() {
        const now = new Date();
        const preferences = await notifications.getPreferences();
        const dueReviewItems = await reviewQueue.listDueItems(
            now.toISOString()
        );
        const scheduledReminders = preferences.enabled
            ? buildScheduledReminders({
                  dueReviewCount: dueReviewItems.length,
                  now,
                  preferences,
              })
            : [];

        await notificationSchedule.saveScheduledReminders(scheduledReminders);

        return {
            dueReviewCount: dueReviewItems.length,
            preferences,
            scheduledReminders,
        };
    }
}

function toReminderState({
    dueReviewCount,
    native,
    preferences,
    scheduledReminders,
}: {
    dueReviewCount: number;
    native: NativeNotificationSyncResult;
    preferences: NotificationPreferences;
    scheduledReminders: ScheduledReminder[];
}): NotificationReminderState {
    return {
        dueReviewCount,
        nativePermissionStatus: native.permissionStatus,
        nextReminderLabel: getNextReminderLabel({
            nativePermissionStatus: native.permissionStatus,
            preferences,
            scheduledReminders,
        }),
        preferencesSummary: getPreferencesSummary(preferences),
        scheduledNativeReminderCount: native.scheduledCount,
        scheduledReminders,
    };
}
