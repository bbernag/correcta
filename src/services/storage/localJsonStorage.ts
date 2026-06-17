import {createMMKV, type MMKV} from "react-native-mmkv";

let learningStorage: MMKV | null = null;

export function getLearningStorage() {
    if (!learningStorage) {
        learningStorage = createMMKV({
            id: "conecta.learning",
        });
    }

    return learningStorage;
}

export function readJsonValue<T>(key: string, fallback: T): T {
    const storedValue = getLearningStorage().getString(key);

    if (!storedValue) {
        return fallback;
    }

    try {
        return JSON.parse(storedValue) as T;
    } catch {
        return fallback;
    }
}

export function writeJsonValue<T>(key: string, value: T) {
    getLearningStorage().set(key, JSON.stringify(value));
}

export function removeJsonValue(key: string) {
    getLearningStorage().remove(key);
}
