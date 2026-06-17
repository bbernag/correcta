import {createMMKV, type MMKV} from "react-native-mmkv";

const FOUNDATION_CHECK_KEY = "foundation.check";

let preferencesStorage: MMKV | null = null;

export function getPreferencesStorage() {
    if (!preferencesStorage) {
        preferencesStorage = createMMKV({
            id: "conecta.preferences",
        });
    }

    return preferencesStorage;
}

export function writeFoundationPreference(value: string) {
    const storage = getPreferencesStorage();

    storage.set(FOUNDATION_CHECK_KEY, value);

    return storage.getString(FOUNDATION_CHECK_KEY);
}
