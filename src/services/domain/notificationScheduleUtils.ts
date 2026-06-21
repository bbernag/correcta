import type {
    NotificationPermissionStatus,
    NotificationPreferences,
    ScheduledReminder,
} from "../../types";

// Reminder scheduling uses the device's local wall-clock time. preferences.timezone
// is reserved for a future server-synced schedule and is intentionally not applied
// here, so a reminder set for 19:00 fires at 19:00 on the device.

export function buildScheduledReminders({
    dueReviewCount,
    now,
    preferences,
}: {
    dueReviewCount: number;
    now: Date;
    preferences: NotificationPreferences;
}): ScheduledReminder[] {
    if (
        !preferences.dailyPracticeEnabled &&
        !preferences.reviewReminderEnabled
    ) {
        return [];
    }

    const scheduledFor = getNextScheduledDate({now, preferences});

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

export function getNextReminderLabel({
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

export function getPreferencesSummary(preferences: NotificationPreferences) {
    if (!preferences.enabled) {
        return "Off";
    }

    return `${preferences.days.length} days, quiet ${preferences.quietHoursStart}-${preferences.quietHoursEnd}`;
}

function getNextScheduledDate({
    now,
    preferences,
}: {
    now: Date;
    preferences: NotificationPreferences;
}) {
    const {hour, minute} = parseReminderTime(preferences.reminderTime);

    for (let dayOffset = 0; dayOffset < 14; dayOffset += 1) {
        const candidateDate = new Date(now);

        candidateDate.setDate(now.getDate() + dayOffset);
        candidateDate.setHours(hour, minute, 0, 0);

        if (candidateDate <= now || !isDayEnabled(candidateDate, preferences)) {
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

        // Quiet-hours end can roll into the next calendar day; only accept it
        // when that day is still one the user selected.
        if (quietEndDate > now && isDayEnabled(quietEndDate, preferences)) {
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

function isDayEnabled(date: Date, preferences: NotificationPreferences) {
    return (
        preferences.days.length === 0 ||
        preferences.days.includes(getNotificationDay(date))
    );
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
