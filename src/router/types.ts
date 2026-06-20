export type RootStackParamList = {
    ExpoUiShowcase: undefined;
    MainTabs: undefined;
    ComponentPlayground: undefined;
};

export type MainTabParamList = {
    Home: undefined;
    Practice: {restartKey?: number; retrySentenceId?: string} | undefined;
    Review: undefined;
    Progress: undefined;
    Library: undefined;
};
