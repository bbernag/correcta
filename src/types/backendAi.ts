export type BackendAiMode = "localMock" | "remoteReady";

export type BackendAiEndpointContract = {
    id: string;
    method: "GET" | "POST";
    path: string;
    description: string;
    runtimeValidated: boolean;
};

export type BackendAiStatus = {
    baseUrlConfigured: boolean;
    contractVersion: string;
    endpoints: BackendAiEndpointContract[];
    lastCheckedAt: string;
    mode: BackendAiMode;
    safetyRules: string[];
};

export type RemoteLearningConfig = {
    baseUrl: string;
    contractVersion: string;
};
