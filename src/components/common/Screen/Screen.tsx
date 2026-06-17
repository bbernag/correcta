import {useContext, type PropsWithChildren} from "react";
import type {StyleProp, ViewStyle} from "react-native";
import {useColorScheme, View} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-controller";
import {BottomTabBarHeightContext} from "react-native-bottom-tabs";
import type {Edge} from "react-native-safe-area-context";
import {SafeAreaView} from "react-native-safe-area-context";
import {StyleSheet} from "react-native-unistyles";

import {appThemes} from "../../../theme/themes";

type ScreenProps = PropsWithChildren<{
    edges?: Edge[];
    scroll?: boolean;
    style?: StyleProp<ViewStyle>;
    contentContainerStyle?: StyleProp<ViewStyle>;
}>;

export function Screen({
    children,
    edges = ["top", "left", "right"],
    scroll = true,
    style,
    contentContainerStyle,
}: ScreenProps) {
    const colorScheme = useColorScheme();
    const theme = colorScheme === "dark" ? appThemes.dark : appThemes.light;
    const bottomTabBarHeight = useContext(BottomTabBarHeightContext) ?? 0;
    const backgroundStyle = {
        backgroundColor: theme.colors.backgroundPrimary,
    };
    const tabBarInsetStyle = {
        marginBottom: bottomTabBarHeight,
    };

    return (
        <SafeAreaView
            edges={edges}
            style={[styles.safeArea, backgroundStyle, tabBarInsetStyle, style]}
        >
            {scroll ? (
                <KeyboardAwareScrollView
                    bottomOffset={24}
                    contentContainerStyle={[
                        styles.content,
                        contentContainerStyle,
                    ]}
                    keyboardShouldPersistTaps="handled"
                    mode="insets"
                >
                    {children}
                </KeyboardAwareScrollView>
            ) : (
                <View
                    style={[
                        styles.content,
                        styles.fixed,
                        contentContainerStyle,
                    ]}
                >
                    {children}
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create((theme) => ({
    safeArea: {
        backgroundColor: theme.colors.backgroundPrimary,
        flex: 1,
    },
    content: {
        gap: theme.spacing.sectionGap,
        paddingHorizontal: theme.spacing.screenHorizontal,
        paddingVertical: theme.spacing.screenVertical,
    },
    fixed: {
        flex: 1,
    },
}));
