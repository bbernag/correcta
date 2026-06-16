import {getNativeDateLabel} from "../services/date/nativeDate";
import {getHttpClientName} from "../services/http/httpClient";
import {writeFoundationPreference} from "../services/storage/preferencesStorage";

export type FoundationCheckResult = {
    date: string;
    http: string;
    storage: string;
};

export function runFoundationChecks(): FoundationCheckResult {
    const storedValue = writeFoundationPreference("ready");

    return {
        date: getNativeDateLabel(),
        http: `${getHttpClientName()} adapter ready`,
        storage: `MMKV ${storedValue ?? "missing"}`,
    };
}
