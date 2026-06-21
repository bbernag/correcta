export const SCHEDULED_REMINDER_KINDS = [
    "dailyPractice",
    "review",
    "wordOfDay",
    "sentenceChallenge",
] as const;

export type ScheduledReminderKind = (typeof SCHEDULED_REMINDER_KINDS)[number];

export const SCHEDULED_REMINDER_ROUTES = [
    "Practice",
    "Review",
    "Progress",
] as const;

export type ScheduledReminderRoute = (typeof SCHEDULED_REMINDER_ROUTES)[number];

export type ScheduledReminder = {
    id: string;
    kind: ScheduledReminderKind;
    title: string;
    body: string;
    routeName: ScheduledReminderRoute;
    scheduledFor: string;
    createdAt: string;
};

export type NotificationPermissionStatus =
    | "granted"
    | "denied"
    | "undetermined";

export type NotificationReminderState = {
    dueReviewCount: number;
    nativePermissionStatus: NotificationPermissionStatus;
    nextReminderLabel: string;
    preferencesSummary: string;
    scheduledNativeReminderCount: number;
    scheduledReminders: ScheduledReminder[];
};
