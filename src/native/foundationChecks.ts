import {getNativeDateLabel} from "../services/date/nativeDate";
import {
    runLocalDomainChecks,
    type LocalDomainCheckResult,
} from "../services/domain";
import {getHttpClientName} from "../services/http/httpClient";
import {writeFoundationPreference} from "../services/storage/preferencesStorage";

export type FoundationCheckResult = {
    date: string;
    domain: LocalDomainCheckResult;
    http: string;
    storage: string;
};

export async function runFoundationChecks(): Promise<FoundationCheckResult> {
    const storedValue = writeFoundationPreference("ready");
    const domain = await runLocalDomainChecks();

    return {
        date: getNativeDateLabel(),
        domain,
        http: `${getHttpClientName()} adapter ready`,
        storage: `MMKV ${storedValue ?? "missing"}`,
    };
}
