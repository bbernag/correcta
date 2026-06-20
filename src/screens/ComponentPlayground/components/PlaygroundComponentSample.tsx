import type {PropsWithChildren} from "react";
import {View} from "react-native";
import type {StyleProp, ViewStyle} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText} from "../../../components/common";

type PlaygroundComponentSampleProps = PropsWithChildren<{
    style?: StyleProp<ViewStyle>;
    title: string;
}>;

export function PlaygroundComponentSample({
    children,
    style,
    title,
}: PlaygroundComponentSampleProps) {
    return (
        <View style={[styles.root, style]}>
            <AppText variant="caption" tone="muted">
                {title}
            </AppText>
            {children}
        </View>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        gap: theme.spacing.sm,
    },
}));
