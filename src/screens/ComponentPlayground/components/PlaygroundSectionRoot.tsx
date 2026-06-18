import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import type {ComponentPlaygroundSectionRootProps} from "../types/ComponentPlaygroundTypes";

export function PlaygroundSectionRoot({
    children,
    style,
}: ComponentPlaygroundSectionRootProps) {
    return <View style={[styles.root, style]}>{children}</View>;
}

const styles = StyleSheet.create((theme) => ({
    root: {
        borderTopColor: theme.colors.borderSubtle,
        borderTopWidth: 1,
        gap: theme.spacing.lg,
        paddingTop: theme.spacing["2xl"],
    },
}));
