import * as Notifications from "expo-notifications";
import {Platform} from "react-native";

import type {
    NativeNotificationScheduler,
    NotificationPermissionStatus,
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
        async syncScheduledReminders({reminders, requestPermission}) {
            await Notifications.cancelAllScheduledNotificationsAsync();

            if (reminders.length === 0) {
                const permissionStatus = await getPermissionStatus();

                return {
                    permissionStatus,
                    scheduledCount: 0,
                };
            }

            await ensureReminderChannel();

            const permissionStatus = requestPermission
                ? await requestReminderPermission()
                : await getPermissionStatus();

            if (permissionStatus !== "granted") {
                return {
                    permissionStatus,
                    scheduledCount: 0,
                };
            }

            let scheduledCount = 0;

            for (const reminder of reminders) {
                const scheduledDate = new Date(reminder.scheduledFor);

                if (Number.isNaN(scheduledDate.getTime())) {
                    continue;
                }

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
                scheduledCount += 1;
            }

            return {
                permissionStatus,
                scheduledCount,
            };
        },
    };
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
