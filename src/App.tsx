import "./theme/unistyles";

import {StatusBar} from "expo-status-bar";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {
    KeyboardProvider,
    KeyboardToolbar,
} from "react-native-keyboard-controller";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {StyleSheet} from "react-native-unistyles";

import {CorrectaToastProvider} from "./components/common";
import {useSyncUnistylesTheme} from "./hooks/useSyncUnistylesTheme";
import {RootNavigator} from "./router";
import {appThemes} from "./theme/themes";

export function App() {
    const themeName = useSyncUnistylesTheme();
    const appBackground = appThemes[themeName].colors.backgroundPrimary;

    return (
        <GestureHandlerRootView
            style={[styles.root, {backgroundColor: appBackground}]}
        >
            <KeyboardProvider>
                <SafeAreaProvider>
                    <CorrectaToastProvider>
                        <RootNavigator />
                        <KeyboardToolbar>
                            <KeyboardToolbar.Done text="Done" />
                        </KeyboardToolbar>
                        <StatusBar style="auto" />
                    </CorrectaToastProvider>
                </SafeAreaProvider>
            </KeyboardProvider>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create(() => ({
    root: {
        flex: 1,
    },
}));
