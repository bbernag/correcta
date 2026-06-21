export type ScheduledReminderKind =
    | "dailyPractice"
    | "review"
    | "wordOfDay"
    | "sentenceChallenge";

export type ScheduledReminder = {
    id: string;
    kind: ScheduledReminderKind;
    title: string;
    body: string;
    routeName: "Practice" | "Review" | "Progress";
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
