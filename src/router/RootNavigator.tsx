import {NavigationContainer, type Theme} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useMemo} from "react";
import {useColorScheme} from "react-native";
import {enableFreeze} from "react-native-screens";

import {ComponentPlaygroundScreen} from "../screens/ComponentPlayground";
import {appThemes} from "../theme";
import {MainTabs} from "./MainTabs";
import type {RootStackParamList} from "./types";

enableFreeze(true);

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
    const colorScheme = useColorScheme();
    const theme = colorScheme === "dark" ? appThemes.dark : appThemes.light;

    const navigationTheme = useMemo<Theme>(
        () => ({
            dark: colorScheme === "dark",
            colors: {
                background: theme.colors.backgroundPrimary,
                border: theme.colors.borderSubtle,
                card: theme.colors.surfacePrimary,
                notification: theme.colors.feedbackDanger,
                primary: theme.colors.accentPrimary,
                text: theme.colors.textPrimary,
            },
            fonts: {
                bold: {
                    fontFamily: "System",
                    fontWeight: "700",
                },
                heavy: {
                    fontFamily: "System",
                    fontWeight: "700",
                },
                medium: {
                    fontFamily: "System",
                    fontWeight: "600",
                },
                regular: {
                    fontFamily: "System",
                    fontWeight: "400",
                },
            },
        }),
        [colorScheme, theme]
    );

    return (
        <NavigationContainer theme={navigationTheme}>
            <Stack.Navigator
                screenOptions={{
                    contentStyle: {
                        backgroundColor: theme.colors.backgroundPrimary,
                    },
                    headerTintColor: theme.colors.textPrimary,
                    headerTitleStyle: {fontWeight: "700"},
                }}
            >
                <Stack.Screen
                    component={MainTabs}
                    name="MainTabs"
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    component={ComponentPlaygroundScreen}
                    name="ComponentPlayground"
                    options={{
                        presentation: "modal",
                        title: "Component check",
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
