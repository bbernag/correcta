import type {
    NotificationPermissionStatus,
    NotificationPreferences,
    ScheduledReminder,
} from "../../types";

// Reminder scheduling uses the device's local wall-clock time. preferences.timezone
// is reserved for a future server-synced schedule and is intentionally not applied
// here, so a reminder set for 19:00 fires at 19:00 on the device.

// The review reminder is staggered slightly after the daily reminder so the two
// never deliver at the same instant.
const REVIEW_REMINDER_OFFSET_MINUTES = 1;
const MINUTE_IN_MS = 60_000;

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
        const reviewScheduledFor = new Date(
            scheduledFor.getTime() +
                REVIEW_REMINDER_OFFSET_MINUTES * MINUTE_IN_MS
        );

        reminders.push({
            body: `${dueReviewCount} review cards are ready.`,
            createdAt: now.toISOString(),
            id: `review-${reviewScheduledFor.toISOString().slice(0, 10)}`,
            kind: "review",
            routeName: "Review",
            scheduledFor: reviewScheduledFor.toISOString(),
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

    return `${nextReminder.title} at ${formatClockTime(
        new Date(nextReminder.scheduledFor)
    )}`;
}

export function getPreferencesSummary(preferences: NotificationPreferences) {
    if (!preferences.enabled) {
        return "Off";
    }

    return `${preferences.days.length} days, quiet ${preferences.quietHoursStart}-${preferences.quietHoursEnd}`;
}

function formatClockTime(date: Date) {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
}

function getNextScheduledDate({
    now,
    preferences,
}: {
    now: Date;
    preferences: NotificationPreferences;
}) {
    const reminderTime = parseReminderTime(preferences.reminderTime);
    const quietEnd = parseReminderTime(preferences.quietHoursEnd);
    const quietStartMinute = toMinuteOfDay(
        parseReminderTime(preferences.quietHoursStart)
    );
    const quietEndMinute = toMinuteOfDay(quietEnd);

    for (let dayOffset = 0; dayOffset < 14; dayOffset += 1) {
        const candidateDate = new Date(now);

        candidateDate.setDate(now.getDate() + dayOffset);
        candidateDate.setHours(reminderTime.hour, reminderTime.minute, 0, 0);

        if (candidateDate <= now || !isDayEnabled(candidateDate, preferences)) {
            continue;
        }

        if (
            !isInsideQuietHours(candidateDate, quietStartMinute, quietEndMinute)
        ) {
            return candidateDate;
        }

        const quietEndDate = moveToQuietHoursEnd(
            candidateDate,
            quietEnd,
            quietStartMinute,
            quietEndMinute
        );

        // Quiet-hours end can roll into the next calendar day; only accept it
        // when that day is still one the user selected.
        if (quietEndDate > now && isDayEnabled(quietEndDate, preferences)) {
            return quietEndDate;
        }
    }

    return null;
}

function toMinuteOfDay({hour, minute}: {hour: number; minute: number}) {
    return hour * 60 + minute;
}

function dateMinuteOfDay(date: Date) {
    return date.getHours() * 60 + date.getMinutes();
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

function isInsideQuietHours(
    date: Date,
    quietStartMinute: number,
    quietEndMinute: number
) {
    if (quietStartMinute === quietEndMinute) {
        return false;
    }

    const candidateMinute = dateMinuteOfDay(date);

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

function moveToQuietHoursEnd(
    date: Date,
    quietEnd: {hour: number; minute: number},
    quietStartMinute: number,
    quietEndMinute: number
) {
    const quietEndDate = new Date(date);

    quietEndDate.setHours(quietEnd.hour, quietEnd.minute, 0, 0);

    if (
        quietStartMinute > quietEndMinute &&
        dateMinuteOfDay(date) >= quietStartMinute
    ) {
        quietEndDate.setDate(quietEndDate.getDate() + 1);
    }

    return quietEndDate;
}
