import {
    parseNotificationResponseRoute,
    REMINDER_ID_DATA_KEY,
    REMINDER_KIND_DATA_KEY,
    REMINDER_ROUTE_DATA_KEY,
} from "../notificationRoute";

describe("parseNotificationResponseRoute", () => {
    it("parses a valid reminder payload", () => {
        const route = parseNotificationResponseRoute({
            [REMINDER_ROUTE_DATA_KEY]: "Review",
            [REMINDER_ID_DATA_KEY]: "review-2026-06-21",
            [REMINDER_KIND_DATA_KEY]: "review",
        });

        expect(route).toEqual({
            reminderId: "review-2026-06-21",
            reminderKind: "review",
            routeName: "Review",
        });
    });

    it("returns null when data is missing", () => {
        expect(parseNotificationResponseRoute(undefined)).toBeNull();
    });

    it("returns null for an unknown route name", () => {
        expect(
            parseNotificationResponseRoute({
                [REMINDER_ROUTE_DATA_KEY]: "Settings",
            })
        ).toBeNull();
    });

    it("returns null for a foreign payload without the route key", () => {
        expect(
            parseNotificationResponseRoute({someOtherKey: "Practice"})
        ).toBeNull();
    });

    it("drops a non-string reminder id", () => {
        const route = parseNotificationResponseRoute({
            [REMINDER_ROUTE_DATA_KEY]: "Practice",
            [REMINDER_ID_DATA_KEY]: 42,
        });

        expect(route).toEqual({
            reminderId: undefined,
            reminderKind: undefined,
            routeName: "Practice",
        });
    });

    it("drops an unknown reminder kind", () => {
        const route = parseNotificationResponseRoute({
            [REMINDER_ROUTE_DATA_KEY]: "Progress",
            [REMINDER_KIND_DATA_KEY]: "streakFreeze",
        });

        expect(route?.reminderKind).toBeUndefined();
        expect(route?.routeName).toBe("Progress");
    });
});
