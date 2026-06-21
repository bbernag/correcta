import type {
    NativeNotificationScheduler,
    NotificationPreferencesRepository,
    NotificationReminderService,
    NotificationScheduleRepository,
    ReviewQueueRepository,
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

export function createNotificationReminderService({
    nativeNotifications,
    notifications,
    notificationSchedule,
    reviewQueue,
}: CreateNotificationReminderServiceParams): NotificationReminderService {
    async function getReminderState() {
        return createReminderState({requestPermission: false});
    }

    return {
        getReminderState,
        async savePreferences(preferences) {
            await notifications.savePreferences({
                ...preferences,
                updatedAt: new Date().toISOString(),
            });

            return createReminderState({
                requestPermission: preferences.enabled,
            });
        },
    };

    async function createReminderState({
        requestPermission,
    }: {
        requestPermission: boolean;
    }) {
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

        const nativeResult = nativeNotifications
            ? await nativeNotifications.syncScheduledReminders({
                  reminders: scheduledReminders,
                  requestPermission,
              })
            : {
                  permissionStatus: "undetermined" as const,
                  scheduledCount: 0,
              };

        return {
            dueReviewCount: dueReviewItems.length,
            nativePermissionStatus: nativeResult.permissionStatus,
            nextReminderLabel: getNextReminderLabel({
                nativePermissionStatus: nativeResult.permissionStatus,
                preferences,
                scheduledReminders,
            }),
            preferencesSummary: getPreferencesSummary(preferences),
            scheduledNativeReminderCount: nativeResult.scheduledCount,
            scheduledReminders,
        };
    }
}
