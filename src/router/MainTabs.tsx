import {createNativeBottomTabNavigator} from "@bottom-tabs/react-navigation";
import {useColorScheme} from "react-native";

import {appThemes} from "../theme";
import {HomeScreen} from "../screens/Home";
import {LibraryScreen} from "../screens/Library";
import {PracticeScreen} from "../screens/Practice";
import {ProgressScreen} from "../screens/Progress";
import {ReviewScreen} from "../screens/Review";
import type {MainTabParamList} from "./types";

const Tab = createNativeBottomTabNavigator<MainTabParamList>();
const TAB_ICON = require("../assets/favicon.png");

export function MainTabs() {
    const colorScheme = useColorScheme();
    const theme = colorScheme === "dark" ? appThemes.dark : appThemes.light;

    return (
        <Tab.Navigator
            hapticFeedbackEnabled
            initialRouteName="Home"
            labeled
            screenOptions={{
                freezeOnBlur: true,
                sceneStyle: {backgroundColor: theme.colors.background},
                tabBarIcon: () => TAB_ICON,
            }}
            tabBarActiveTintColor={theme.colors.accentStrong}
            tabBarInactiveTintColor={theme.colors.textMuted}
            tabBarStyle={{backgroundColor: theme.colors.surface}}
        >
            <Tab.Screen
                component={HomeScreen}
                name="Home"
                options={{tabBarButtonTestID: "tab-home", title: "Home"}}
            />
            <Tab.Screen
                component={PracticeScreen}
                name="Practice"
                options={{
                    tabBarButtonTestID: "tab-practice",
                    title: "Practice",
                }}
            />
            <Tab.Screen
                component={ReviewScreen}
                name="Review"
                options={{tabBarButtonTestID: "tab-review", title: "Review"}}
            />
            <Tab.Screen
                component={ProgressScreen}
                name="Progress"
                options={{
                    tabBarButtonTestID: "tab-progress",
                    title: "Progress",
                }}
            />
            <Tab.Screen
                component={LibraryScreen}
                name="Library"
                options={{tabBarButtonTestID: "tab-library", title: "Library"}}
            />
        </Tab.Navigator>
    );
}
