import * as Notifications from "expo-notifications";
import {Platform} from "react-native";

import type {
    NativeNotificationScheduler,
    NotificationPermissionStatus,
    ScheduledReminder,
} from "../../types";
import {
    parseNotificationResponseRoute,
    REMINDER_ID_DATA_KEY,
    REMINDER_KIND_DATA_KEY,
    REMINDER_ROUTE_DATA_KEY,
} from "./notificationRoute";
import type {NotificationResponseRouteListener} from "./notificationTypes";

const REMINDER_CHANNEL_ID = "correcta-reminders";

export function configureNotificationPresentation() {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldPlaySound: false,
            shouldSetBadge: false,
            shouldShowBanner: true,
            shouldShowList: true,
        }),
    });
}

export function createExpoNotificationScheduler(): NativeNotificationScheduler {
    return {
        getPermissionStatus,
        getScheduledCount,
        async syncScheduledReminders({reminders, requestPermission}) {
            const permissionStatus = await resolvePermission(requestPermission);

            // Without permission we cannot manage the OS schedule, so report
            // the current state without cancelling what is already there.
            if (permissionStatus !== "granted") {
                return {
                    permissionStatus,
                    scheduledCount: await getScheduledCount(),
                };
            }

            await ensureReminderChannel();
            await Notifications.cancelAllScheduledNotificationsAsync();

            const results = await Promise.all(
                reminders.map((reminder) => scheduleReminder(reminder))
            );

            return {
                permissionStatus,
                scheduledCount: results.filter(Boolean).length,
            };
        },
    };
}

async function scheduleReminder(reminder: ScheduledReminder) {
    const scheduledDate = new Date(reminder.scheduledFor);

    if (Number.isNaN(scheduledDate.getTime())) {
        return false;
    }

    try {
        await Notifications.scheduleNotificationAsync({
            content: {
                body: reminder.body,
                data: {
                    [REMINDER_ID_DATA_KEY]: reminder.id,
                    [REMINDER_KIND_DATA_KEY]: reminder.kind,
                    [REMINDER_ROUTE_DATA_KEY]: reminder.routeName,
                },
                sound: false,
                title: reminder.title,
            },
            identifier: reminder.id,
            trigger: {
                channelId: REMINDER_CHANNEL_ID,
                date: scheduledDate,
                type: Notifications.SchedulableTriggerInputTypes.DATE,
            },
        });

        return true;
    } catch (error) {
        // One reminder failing to schedule must not reject the whole sync
        // (which would wipe every reminder and surface as a screen error).
        console.warn(`Failed to schedule reminder ${reminder.id}`, error);

        return false;
    }
}

export function addNotificationResponseRouteListener(
    listener: NotificationResponseRouteListener
) {
    return Notifications.addNotificationResponseReceivedListener((response) => {
        const route = parseNotificationResponseRoute(
            response.notification.request.content.data
        );

        if (route) {
            listener(route);
        }
    });
}

export function getLastNotificationResponseRoute() {
    const response = Notifications.getLastNotificationResponse();

    if (!response) {
        return null;
    }

    return parseNotificationResponseRoute(
        response.notification.request.content.data
    );
}

async function requestReminderPermission() {
    await ensureReminderChannel();

    const permissions = await Notifications.requestPermissionsAsync({
        ios: {
            allowAlert: true,
            allowBadge: false,
            allowSound: false,
        },
    });

    return getPermissionStatusFromResponse(permissions);
}

async function getPermissionStatus() {
    const permissions = await Notifications.getPermissionsAsync();

    return getPermissionStatusFromResponse(permissions);
}

async function getScheduledCount() {
    const scheduled = await Notifications.getAllScheduledNotificationsAsync();

    return scheduled.length;
}

async function resolvePermission(requestPermission: boolean) {
    const current = await getPermissionStatus();

    // Only surface the OS prompt when the user has not decided yet; changing an
    // unrelated setting while already granted or denied must not re-prompt.
    if (requestPermission && current === "undetermined") {
        return requestReminderPermission();
    }

    return current;
}

async function ensureReminderChannel() {
    if (Platform.OS !== "android") {
        return;
    }

    await Notifications.setNotificationChannelAsync(REMINDER_CHANNEL_ID, {
        description: "Gentle practice and review reminders.",
        importance: Notifications.AndroidImportance.DEFAULT,
        name: "Learning reminders",
        showBadge: false,
    });
}

function getPermissionStatusFromResponse(
    permissions: Notifications.NotificationPermissionsStatus
): NotificationPermissionStatus {
    if (permissions.granted) {
        return "granted";
    }

    const iosStatus = permissions.ios?.status;

    if (
        iosStatus === Notifications.IosAuthorizationStatus.AUTHORIZED ||
        iosStatus === Notifications.IosAuthorizationStatus.PROVISIONAL ||
        iosStatus === Notifications.IosAuthorizationStatus.EPHEMERAL
    ) {
        return "granted";
    }

    if (
        permissions.status === "denied" ||
        iosStatus === Notifications.IosAuthorizationStatus.DENIED
    ) {
        return "denied";
    }

    return "undetermined";
}
