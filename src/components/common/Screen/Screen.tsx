import {useContext} from "react";
import {View} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-controller";
import {BottomTabBarHeightContext} from "react-native-bottom-tabs";
import type {Edge} from "react-native-safe-area-context";
import {SafeAreaView} from "react-native-safe-area-context";
import {StyleSheet, useUnistyles} from "react-native-unistyles";

import type {
    ScreenBackground,
    ScreenProps,
    ScreenSafeArea,
} from "./ScreenTypes";

export function Screen({
    children,
    background = "primary",
    edges,
    safeArea = "content",
    scroll = true,
    style,
    contentContainerStyle,
}: ScreenProps) {
    const {theme} = useUnistyles();
    const bottomTabBarHeight = useContext(BottomTabBarHeightContext) ?? 0;
    const backgroundStyle = {
        backgroundColor: getScreenBackgroundColor({background, theme}),
    };
    const tabBarInsetStyle = {
        marginBottom: bottomTabBarHeight,
    };

    return (
        <SafeAreaView
            edges={edges ?? getSafeAreaEdges(safeArea)}
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

function getSafeAreaEdges(safeArea: ScreenSafeArea): Edge[] {
    switch (safeArea) {
        case "all":
            return ["top", "bottom", "left", "right"];
        case "horizontal":
            return ["left", "right"];
        case "none":
            return [];
        case "content":
        default:
            return ["top", "left", "right"];
    }
}

function getScreenBackgroundColor({
    background,
    theme,
}: {
    background: ScreenBackground;
    theme: ReturnType<typeof useUnistyles>["theme"];
}) {
    switch (background) {
        case "secondary":
            return theme.colors.backgroundSecondary;
        case "surface":
            return theme.colors.surfacePrimary;
        case "tonal":
            return theme.colors.surfaceTonal;
        case "primary":
        default:
            return theme.colors.backgroundPrimary;
    }
}
