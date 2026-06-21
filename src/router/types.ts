import type {NavigatorScreenParams} from "@react-navigation/native";

export type PracticeSessionParams =
    | {restartKey?: number; retrySentenceId?: string}
    | undefined;

export type RootStackParamList = {
    ExpoUiShowcase: undefined;
    MainTabs: NavigatorScreenParams<MainTabParamList> | undefined;
    ComponentPlayground: undefined;
    PracticeSession: PracticeSessionParams;
    ReviewSession: undefined;
};

export type MainTabParamList = {
    Home: undefined;
    Practice: undefined;
    Review: undefined;
    Progress: undefined;
    Library: undefined;
};
