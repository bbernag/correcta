import type {
    BackendAiEndpointContract,
    BackendAiIntegrationService,
    BackendAiStatus,
} from "../../types";

const CONTRACT_VERSION = "2026-06-16";

const ENDPOINTS: BackendAiEndpointContract[] = [
    {
        description: "Generates level-aware practice sentences.",
        id: "generate-sentences",
        method: "POST",
        path: "/v1/sentences/generate",
        runtimeValidated: true,
    },
    {
        description: "Returns one known sentence by id for retry flows.",
        id: "get-sentence",
        method: "POST",
        path: "/v1/sentences/get",
        runtimeValidated: true,
    },
    {
        description: "Validates natural translation alternatives.",
        id: "validate-translation",
        method: "POST",
        path: "/v1/translations/validate",
        runtimeValidated: true,
    },
    {
        description: "Explains correction feedback safely.",
        id: "explain-feedback",
        method: "POST",
        path: "/v1/feedback/explain",
        runtimeValidated: true,
    },
];

const SAFETY_RULES = [
    "AI providers stay behind the backend.",
    "Malformed responses fail before UI rendering.",
    "Sensitive headers and tokens are never logged.",
];

export function createBackendAiIntegrationService({
    baseUrl,
}: {
    baseUrl?: string;
} = {}): BackendAiIntegrationService {
    return {
        async getStatus() {
            return createBackendAiStatus({baseUrl});
        },
    };
}

function createBackendAiStatus({baseUrl}: {baseUrl?: string}): BackendAiStatus {
    const baseUrlConfigured = Boolean(baseUrl);

    return {
        baseUrlConfigured,
        contractVersion: CONTRACT_VERSION,
        endpoints: ENDPOINTS,
        lastCheckedAt: new Date().toISOString(),
        mode: baseUrlConfigured ? "remoteReady" : "localMock",
        safetyRules: SAFETY_RULES,
    };
}
