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

type ReadJsonValueParams<T> = {
    fallback: T;
    key: string;
};

type WriteJsonValueParams<T> = {
    key: string;
    value: T;
};

export function readJsonValue<T>({fallback, key}: ReadJsonValueParams<T>): T {
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

export function writeJsonValue<T>({key, value}: WriteJsonValueParams<T>) {
    getLearningStorage().set(key, JSON.stringify(value));
}

export function removeJsonValue(key: string) {
    getLearningStorage().remove(key);
}
