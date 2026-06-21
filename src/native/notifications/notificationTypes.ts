import type {ScheduledReminder} from "../../types";

export type NotificationResponseRoute = {
    reminderId?: string;
    reminderKind?: ScheduledReminder["kind"];
    routeName: ScheduledReminder["routeName"];
};

export type NotificationResponseRouteListener = (
    route: NotificationResponseRoute
) => void;
