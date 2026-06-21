import type {
    NotificationPermissionStatus,
    NotificationPreferences,
    NotificationPreferencesRepository,
    NotificationReminderService,
    NotificationScheduleRepository,
    NativeNotificationScheduler,
    ReviewQueueRepository,
    ScheduledReminder,
} from "../../types";

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
        const preferences = await notifications.getPreferences();
        const dueReviewItems = await reviewQueue.listDueItems(
            new Date().toISOString()
        );
        const scheduledReminders = preferences.enabled
            ? createScheduledReminders({
                  dueReviewCount: dueReviewItems.length,
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

function createScheduledReminders({
    dueReviewCount,
    preferences,
}: {
    dueReviewCount: number;
    preferences: NotificationPreferences;
}): ScheduledReminder[] {
    if (
        !preferences.dailyPracticeEnabled &&
        !preferences.reviewReminderEnabled
    ) {
        return [];
    }

    const now = new Date();
    const scheduledFor = getNextScheduledDate({
        now,
        preferences,
    });

    if (!scheduledFor) {
        return [];
    }

    const reminders: ScheduledReminder[] = [];

    if (preferences.dailyPracticeEnabled) {
        reminders.push({
            body: "A short practice session is ready when you are.",
            createdAt: now.toISOString(),
            id: `daily-${scheduledFor.toISOString().slice(0, 10)}`,
            kind: "dailyPractice",
            routeName: "Practice",
            scheduledFor: scheduledFor.toISOString(),
            title: "Practice with Correcta",
        });
    }

    if (preferences.reviewReminderEnabled && dueReviewCount > 0) {
        reminders.push({
            body: `${dueReviewCount} review cards are ready.`,
            createdAt: now.toISOString(),
            id: `review-${scheduledFor.toISOString().slice(0, 10)}`,
            kind: "review",
            routeName: "Review",
            scheduledFor: scheduledFor.toISOString(),
            title: "Review what matters",
        });
    }

    return reminders;
}

function getNextScheduledDate({
    now,
    preferences,
}: {
    now: Date;
    preferences: NotificationPreferences;
}) {
    if (preferences.days.length === 0) {
        return null;
    }

    const {hour, minute} = parseReminderTime(preferences.reminderTime);

    for (let dayOffset = 0; dayOffset < 14; dayOffset += 1) {
        const candidateDate = new Date(now);

        candidateDate.setDate(now.getDate() + dayOffset);
        candidateDate.setHours(hour, minute, 0, 0);

        if (
            candidateDate <= now ||
            !preferences.days.includes(getNotificationDay(candidateDate))
        ) {
            continue;
        }

        if (
            !isInsideQuietHours({
                date: candidateDate,
                quietHoursEnd: preferences.quietHoursEnd,
                quietHoursStart: preferences.quietHoursStart,
            })
        ) {
            return candidateDate;
        }

        const quietEndDate = moveToQuietHoursEnd({
            date: candidateDate,
            quietHoursEnd: preferences.quietHoursEnd,
            quietHoursStart: preferences.quietHoursStart,
        });

        if (quietEndDate > now) {
            return quietEndDate;
        }
    }

    return null;
}

function parseReminderTime(time: string) {
    const [hourText, minuteText] = time.split(":");
    const hour = Number(hourText);
    const minute = Number(minuteText);

    return {
        hour: Number.isFinite(hour) ? hour : 19,
        minute: Number.isFinite(minute) ? minute : 0,
    };
}

function getNotificationDay(
    date: Date
): NotificationPreferences["days"][number] {
    const day = date.getDay();

    switch (day) {
        case 0:
            return "sunday";
        case 1:
            return "monday";
        case 2:
            return "tuesday";
        case 3:
            return "wednesday";
        case 4:
            return "thursday";
        case 5:
            return "friday";
        default:
            return "saturday";
    }
}

function isInsideQuietHours({
    date,
    quietHoursEnd,
    quietHoursStart,
}: {
    date: Date;
    quietHoursEnd: string;
    quietHoursStart: string;
}) {
    const {hour, minute} = parseReminderTime(quietHoursStart);
    const quietStartMinute = hour * 60 + minute;
    const quietEnd = parseReminderTime(quietHoursEnd);
    const quietEndMinute = quietEnd.hour * 60 + quietEnd.minute;
    const candidateMinute = date.getHours() * 60 + date.getMinutes();

    if (quietStartMinute === quietEndMinute) {
        return false;
    }

    if (quietStartMinute < quietEndMinute) {
        return (
            candidateMinute >= quietStartMinute &&
            candidateMinute < quietEndMinute
        );
    }

    return (
        candidateMinute >= quietStartMinute || candidateMinute < quietEndMinute
    );
}

function moveToQuietHoursEnd({
    date,
    quietHoursEnd,
    quietHoursStart,
}: {
    date: Date;
    quietHoursEnd: string;
    quietHoursStart: string;
}) {
    const quietEnd = parseReminderTime(quietHoursEnd);
    const quietStart = parseReminderTime(quietHoursStart);
    const quietEndDate = new Date(date);

    quietEndDate.setHours(quietEnd.hour, quietEnd.minute, 0, 0);

    if (
        quietStart.hour * 60 + quietStart.minute >
            quietEnd.hour * 60 + quietEnd.minute &&
        date.getHours() * 60 + date.getMinutes() >=
            quietStart.hour * 60 + quietStart.minute
    ) {
        quietEndDate.setDate(quietEndDate.getDate() + 1);
    }

    return quietEndDate;
}

function getNextReminderLabel({
    nativePermissionStatus,
    preferences,
    scheduledReminders,
}: {
    nativePermissionStatus: NotificationPermissionStatus;
    preferences: NotificationPreferences;
    scheduledReminders: ScheduledReminder[];
}) {
    if (!preferences.enabled) {
        return "Reminders are off";
    }

    if (nativePermissionStatus === "denied") {
        return "Notifications are blocked in system settings";
    }

    const nextReminder = scheduledReminders[0];

    if (!nextReminder) {
        return "No reminders scheduled";
    }

    return `${nextReminder.title} at ${preferences.reminderTime}`;
}

function getPreferencesSummary(preferences: NotificationPreferences) {
    if (!preferences.enabled) {
        return "Off";
    }

    return `${preferences.days.length} days, quiet ${preferences.quietHoursStart}-${preferences.quietHoursEnd}`;
}
