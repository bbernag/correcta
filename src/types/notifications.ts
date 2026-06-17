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

export type NotificationReminderState = {
    dueReviewCount: number;
    nextReminderLabel: string;
    preferencesSummary: string;
    scheduledReminders: ScheduledReminder[];
};
