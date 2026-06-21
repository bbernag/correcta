import type {NavigatorScreenParams} from "@react-navigation/native";

export type RootStackParamList = {
    ExpoUiShowcase: undefined;
    MainTabs: NavigatorScreenParams<MainTabParamList> | undefined;
    ComponentPlayground: undefined;
};

export type MainTabParamList = {
    Home: undefined;
    Practice: {restartKey?: number; retrySentenceId?: string} | undefined;
    Review: undefined;
    Progress: undefined;
    Library: undefined;
};
