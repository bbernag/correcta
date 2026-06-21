import {DEFAULT_NOTIFICATION_PREFERENCES} from "../../../constants/domain";
import type {NotificationPreferences} from "../../../types";
import {
    buildScheduledReminders,
    getNextReminderLabel,
    getPreferencesSummary,
} from "../notificationScheduleUtils";

function makePreferences(
    overrides: Partial<NotificationPreferences> = {}
): NotificationPreferences {
    return {...DEFAULT_NOTIFICATION_PREFERENCES, enabled: true, ...overrides};
}

// A Wednesday at midday, before the default 19:00 reminder time.
const WEDNESDAY_NOON = new Date(2026, 5, 17, 12, 0, 0);

describe("buildScheduledReminders", () => {
    it("schedules the daily reminder for today's reminder time", () => {
        const reminders = buildScheduledReminders({
            dueReviewCount: 0,
            now: WEDNESDAY_NOON,
            preferences: makePreferences(),
        });

        expect(reminders).toHaveLength(1);
        expect(reminders[0].kind).toBe("dailyPractice");
        expect(reminders[0].routeName).toBe("Practice");

        const scheduledFor = new Date(reminders[0].scheduledFor);
        expect(scheduledFor.getHours()).toBe(19);
        expect(scheduledFor.getDay()).toBe(3); // still Wednesday
    });

    it("adds a review reminder when there are due review cards", () => {
        const reminders = buildScheduledReminders({
            dueReviewCount: 3,
            now: WEDNESDAY_NOON,
            preferences: makePreferences(),
        });

        expect(reminders.map((reminder) => reminder.kind)).toEqual([
            "dailyPractice",
            "review",
        ]);
    });

    it("treats an empty day list as every day so reminders are not dropped", () => {
        const reminders = buildScheduledReminders({
            dueReviewCount: 0,
            now: WEDNESDAY_NOON,
            preferences: makePreferences({days: []}),
        });

        expect(reminders).toHaveLength(1);
        expect(reminders[0].kind).toBe("dailyPractice");
    });

    it("never schedules on a day outside the selected days when quiet hours roll over", () => {
        const fridayNoon = new Date(2026, 5, 19, 12, 0, 0);

        const reminders = buildScheduledReminders({
            dueReviewCount: 0,
            now: fridayNoon,
            preferences: makePreferences({
                days: ["friday"],
                reminderTime: "22:00",
                quietHoursStart: "21:00",
                quietHoursEnd: "07:00",
            }),
        });

        for (const reminder of reminders) {
            // Friday is day 5; the old rollover bug produced Saturday (6).
            expect(new Date(reminder.scheduledFor).getDay()).toBe(5);
        }
    });

    it("defers into the next day's quiet-hours end when that day is selected", () => {
        const fridayNoon = new Date(2026, 5, 19, 12, 0, 0);

        const reminders = buildScheduledReminders({
            dueReviewCount: 0,
            now: fridayNoon,
            preferences: makePreferences({
                days: ["friday", "saturday"],
                reminderTime: "22:00",
                quietHoursStart: "21:00",
                quietHoursEnd: "07:00",
            }),
        });

        expect(reminders).toHaveLength(1);

        const scheduledFor = new Date(reminders[0].scheduledFor);
        expect(scheduledFor.getDay()).toBe(6); // Saturday, which is selected
        expect(scheduledFor.getHours()).toBe(7); // quiet-hours end
    });
});

describe("getNextReminderLabel", () => {
    it("reports the next reminder time when enabled", () => {
        const preferences = makePreferences();
        const scheduledReminders = buildScheduledReminders({
            dueReviewCount: 0,
            now: WEDNESDAY_NOON,
            preferences,
        });

        expect(
            getNextReminderLabel({
                nativePermissionStatus: "granted",
                preferences,
                scheduledReminders,
            })
        ).toBe("Practice with Correcta at 19:00");
    });

    it("reports off when reminders are disabled", () => {
        expect(
            getNextReminderLabel({
                nativePermissionStatus: "granted",
                preferences: makePreferences({enabled: false}),
                scheduledReminders: [],
            })
        ).toBe("Reminders are off");
    });

    it("reports a blocked permission", () => {
        expect(
            getNextReminderLabel({
                nativePermissionStatus: "denied",
                preferences: makePreferences(),
                scheduledReminders: [],
            })
        ).toBe("Notifications are blocked in system settings");
    });

    it("labels the actual scheduled time after a quiet-hours deferral", () => {
        const fridayNoon = new Date(2026, 5, 19, 12, 0, 0);
        const preferences = makePreferences({
            days: ["friday", "saturday"],
            reminderTime: "22:00",
            quietHoursStart: "21:00",
            quietHoursEnd: "07:00",
        });
        const scheduledReminders = buildScheduledReminders({
            dueReviewCount: 0,
            now: fridayNoon,
            preferences,
        });

        // Requested 22:00 but deferred to 07:00 — the label must show 07:00.
        expect(
            getNextReminderLabel({
                nativePermissionStatus: "granted",
                preferences,
                scheduledReminders,
            })
        ).toBe("Practice with Correcta at 07:00");
    });
});

describe("getPreferencesSummary", () => {
    it("summarizes the active schedule", () => {
        expect(getPreferencesSummary(makePreferences())).toBe(
            "5 days, quiet 21:00-07:00"
        );
    });

    it("summarizes a disabled schedule", () => {
        expect(getPreferencesSummary(makePreferences({enabled: false}))).toBe(
            "Off"
        );
    });
});
