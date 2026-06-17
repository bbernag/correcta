import type {
    NotificationPreferences,
    NotificationPreferencesRepository,
    NotificationReminderService,
    NotificationScheduleRepository,
    ReviewQueueRepository,
    ScheduledReminder,
} from "../../types";

type CreateNotificationReminderServiceParams = {
    notifications: NotificationPreferencesRepository;
    notificationSchedule: NotificationScheduleRepository;
    reviewQueue: ReviewQueueRepository;
};

export function createNotificationReminderService({
    notifications,
    notificationSchedule,
    reviewQueue,
}: CreateNotificationReminderServiceParams): NotificationReminderService {
    async function getReminderState() {
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

        return {
            dueReviewCount: dueReviewItems.length,
            nextReminderLabel: getNextReminderLabel({
                preferences,
                scheduledReminders,
            }),
            preferencesSummary: getPreferencesSummary(preferences),
            scheduledReminders,
        };
    }

    return {
        getReminderState,
        async savePreferences(preferences) {
            await notifications.savePreferences({
                ...preferences,
                updatedAt: new Date().toISOString(),
            });

            return getReminderState();
        },
    };
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
        reminderTime: preferences.reminderTime,
    });
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
    reminderTime,
}: {
    now: Date;
    reminderTime: string;
}) {
    const [hourText, minuteText] = reminderTime.split(":");
    const nextDate = new Date(now);

    nextDate.setHours(Number(hourText) || 19, Number(minuteText) || 0, 0, 0);

    if (nextDate <= now) {
        nextDate.setDate(nextDate.getDate() + 1);
    }

    return nextDate;
}

function getNextReminderLabel({
    preferences,
    scheduledReminders,
}: {
    preferences: NotificationPreferences;
    scheduledReminders: ScheduledReminder[];
}) {
    if (!preferences.enabled) {
        return "Reminders are off";
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
