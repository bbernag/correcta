import {SCHEDULED_REMINDER_KINDS, SCHEDULED_REMINDER_ROUTES} from "../../types";
import type {ScheduledReminderKind, ScheduledReminderRoute} from "../../types";
import type {NotificationResponseRoute} from "./notificationTypes";

export const REMINDER_ROUTE_DATA_KEY = "correctaRouteName";
export const REMINDER_ID_DATA_KEY = "correctaReminderId";
export const REMINDER_KIND_DATA_KEY = "correctaReminderKind";

function isReminderRoute(value: unknown): value is ScheduledReminderRoute {
    return SCHEDULED_REMINDER_ROUTES.includes(value as ScheduledReminderRoute);
}

function isReminderKind(value: unknown): value is ScheduledReminderKind {
    return SCHEDULED_REMINDER_KINDS.includes(value as ScheduledReminderKind);
}

export function parseNotificationResponseRoute(
    data: Record<string, unknown> | undefined
): NotificationResponseRoute | null {
    const routeName = data?.[REMINDER_ROUTE_DATA_KEY];

    if (!isReminderRoute(routeName)) {
        return null;
    }

    const reminderId = data?.[REMINDER_ID_DATA_KEY];
    const reminderKind = data?.[REMINDER_KIND_DATA_KEY];

    return {
        reminderId: typeof reminderId === "string" ? reminderId : undefined,
        reminderKind: isReminderKind(reminderKind) ? reminderKind : undefined,
        routeName,
    };
}
