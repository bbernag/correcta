import type {
    NotificationScheduleRepository,
    ScheduledReminder,
} from "../../../types";
import {
    readJsonValue,
    removeJsonValue,
    writeJsonValue,
} from "../../storage/localJsonStorage";

const SCHEDULED_REMINDERS_KEY = "domain.scheduledReminders";

export function createNotificationScheduleRepository(): NotificationScheduleRepository {
    return {
        async clearScheduledReminders() {
            removeJsonValue(SCHEDULED_REMINDERS_KEY);
        },
        async listScheduledReminders() {
            return readJsonValue<ScheduledReminder[]>({
                fallback: [],
                key: SCHEDULED_REMINDERS_KEY,
            });
        },
        async saveScheduledReminders(reminders) {
            writeJsonValue({
                key: SCHEDULED_REMINDERS_KEY,
                value: reminders,
            });

            return reminders;
        },
    };
}
