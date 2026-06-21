import {DEFAULT_NOTIFICATION_PREFERENCES} from "../../../constants/domain";
import type {
    NativeNotificationScheduler,
    NotificationPreferences,
    NotificationPreferencesRepository,
    NotificationScheduleRepository,
    ReviewQueueRepository,
} from "../../../types";
import {createNotificationReminderService} from "../notificationReminderService";

function makePreferences(
    overrides: Partial<NotificationPreferences> = {}
): NotificationPreferences {
    return {...DEFAULT_NOTIFICATION_PREFERENCES, enabled: true, ...overrides};
}

function createFakes(preferences: NotificationPreferences) {
    const notifications: NotificationPreferencesRepository = {
        getPreferences: jest.fn(async () => preferences),
        savePreferences: jest.fn(async (next) => next),
    };
    const notificationSchedule: NotificationScheduleRepository = {
        listScheduledReminders: jest.fn(async () => []),
        saveScheduledReminders: jest.fn(async (reminders) => reminders),
        clearScheduledReminders: jest.fn(async () => {}),
    };
    const reviewQueue: ReviewQueueRepository = {
        upsertItem: jest.fn(async (item) => item),
        listItems: jest.fn(async () => []),
        listDueItems: jest.fn(async () => []),
        removeItemsBySource: jest.fn(async () => {}),
        clearItems: jest.fn(async () => {}),
    };
    const nativeNotifications: NativeNotificationScheduler = {
        getPermissionStatus: jest.fn(async () => "granted" as const),
        getScheduledCount: jest.fn(async () => 2),
        syncScheduledReminders: jest.fn(async ({reminders}) => ({
            permissionStatus: "granted" as const,
            scheduledCount: reminders.length,
        })),
    };

    return {
        nativeNotifications,
        notifications,
        notificationSchedule,
        reviewQueue,
    };
}

describe("createNotificationReminderService", () => {
    it("getReminderState reads native status without scheduling", async () => {
        const fakes = createFakes(makePreferences());
        const service = createNotificationReminderService(fakes);

        await service.getReminderState();

        expect(
            fakes.nativeNotifications.syncScheduledReminders
        ).not.toHaveBeenCalled();
        expect(fakes.nativeNotifications.getScheduledCount).toHaveBeenCalled();
    });

    it("getReminderState skips native calls when reminders are disabled", async () => {
        const fakes = createFakes(makePreferences({enabled: false}));
        const service = createNotificationReminderService(fakes);

        const state = await service.getReminderState();

        expect(
            fakes.nativeNotifications.getPermissionStatus
        ).not.toHaveBeenCalled();
        expect(
            fakes.nativeNotifications.getScheduledCount
        ).not.toHaveBeenCalled();
        expect(state.scheduledNativeReminderCount).toBe(0);
    });

    it("savePreferences schedules natively and may prompt when enabling", async () => {
        const fakes = createFakes(makePreferences());
        const service = createNotificationReminderService(fakes);

        await service.savePreferences(makePreferences({enabled: true}));

        expect(
            fakes.nativeNotifications.syncScheduledReminders
        ).toHaveBeenCalledTimes(1);
        expect(
            fakes.nativeNotifications.syncScheduledReminders
        ).toHaveBeenCalledWith(
            expect.objectContaining({requestPermission: true})
        );
    });

    it("syncReminders re-offers permission only when reminders are enabled", async () => {
        const enabledFakes = createFakes(makePreferences({enabled: true}));
        await createNotificationReminderService(enabledFakes).syncReminders();

        expect(
            enabledFakes.nativeNotifications.syncScheduledReminders
        ).toHaveBeenCalledWith(
            expect.objectContaining({requestPermission: true})
        );

        const disabledFakes = createFakes(makePreferences({enabled: false}));
        await createNotificationReminderService(disabledFakes).syncReminders();

        expect(
            disabledFakes.nativeNotifications.syncScheduledReminders
        ).toHaveBeenCalledWith(
            expect.objectContaining({requestPermission: false})
        );
    });
});
