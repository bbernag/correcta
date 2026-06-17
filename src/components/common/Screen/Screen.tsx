import type {PropsWithChildren} from "react";
import type {StyleProp, ViewStyle} from "react-native";
import {View} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-controller";
import type {Edge} from "react-native-safe-area-context";
import {SafeAreaView} from "react-native-safe-area-context";
import {StyleSheet} from "react-native-unistyles";

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
    return (
        <SafeAreaView edges={edges} style={[styles.safeArea, style]}>
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
        backgroundColor: theme.colors.background,
        flex: 1,
    },
    content: {
        gap: theme.spacing.lg,
        padding: theme.spacing.xl,
    },
    fixed: {
        flex: 1,
    },
}));
