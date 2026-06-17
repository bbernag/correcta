import {DEFAULT_USER_PREFERENCES} from "../../../constants/domain";
import type {UserPreferences, UserPreferencesRepository} from "../../../types";
import {getPreferencesStorage} from "../../storage/preferencesStorage";

const USER_PREFERENCES_KEY = "domain.userPreferences";

export function createUserPreferencesRepository(): UserPreferencesRepository {
    return {
        async getPreferences() {
            const storedValue =
                getPreferencesStorage().getString(USER_PREFERENCES_KEY);

            if (!storedValue) {
                return DEFAULT_USER_PREFERENCES;
            }

            try {
                return JSON.parse(storedValue) as UserPreferences;
            } catch {
                return DEFAULT_USER_PREFERENCES;
            }
        },
        async savePreferences(preferences) {
            getPreferencesStorage().set(
                USER_PREFERENCES_KEY,
                JSON.stringify(preferences)
            );

            return preferences;
        },
    };
}
