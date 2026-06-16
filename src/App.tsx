import "./theme/unistyles";

import {StatusBar} from "expo-status-bar";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {KeyboardProvider} from "react-native-keyboard-controller";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {StyleSheet} from "react-native-unistyles";

import {RootNavigator} from "./router";

export function App() {
    return (
        <GestureHandlerRootView style={styles.root}>
            <KeyboardProvider>
                <SafeAreaProvider>
                    <RootNavigator />
                    <StatusBar style="auto" />
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
