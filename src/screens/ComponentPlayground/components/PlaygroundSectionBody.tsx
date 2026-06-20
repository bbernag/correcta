import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import type {ComponentPlaygroundSectionBodyProps} from "../types/componentPlaygroundTypes";

export function PlaygroundSectionBody({
    children,
    style,
}: ComponentPlaygroundSectionBodyProps) {
    return <View style={[styles.root, style]}>{children}</View>;
}

const styles = StyleSheet.create((theme) => ({
    root: {
        gap: theme.spacing.lg,
    },
}));
