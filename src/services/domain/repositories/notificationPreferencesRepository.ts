import {DEFAULT_NOTIFICATION_PREFERENCES} from "../../../constants/domain";
import type {
    NotificationPreferences,
    NotificationPreferencesRepository,
} from "../../../types";
import {getPreferencesStorage} from "../../storage/preferencesStorage";

const NOTIFICATION_PREFERENCES_KEY = "domain.notificationPreferences";

export function createNotificationPreferencesRepository(): NotificationPreferencesRepository {
    return {
        async getPreferences() {
            const storedValue = getPreferencesStorage().getString(
                NOTIFICATION_PREFERENCES_KEY
            );

            if (!storedValue) {
                return DEFAULT_NOTIFICATION_PREFERENCES;
            }

            try {
                return JSON.parse(storedValue) as NotificationPreferences;
            } catch {
                return DEFAULT_NOTIFICATION_PREFERENCES;
            }
        },
        async savePreferences(preferences) {
            getPreferencesStorage().set(
                NOTIFICATION_PREFERENCES_KEY,
                JSON.stringify(preferences)
            );

            return preferences;
        },
    };
}
