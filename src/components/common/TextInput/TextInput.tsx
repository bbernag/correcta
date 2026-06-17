import type {
    StyleProp,
    TextInputProps as NativeTextInputProps,
    TextStyle,
    ViewStyle,
} from "react-native";
import {TextInput as NativeTextInput, View} from "react-native";
import {StyleSheet, useUnistyles} from "react-native-unistyles";

import {AppText} from "../AppText";

type TextInputProps = Omit<NativeTextInputProps, "style"> & {
    label: string;
    error?: string;
    containerStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<TextStyle>;
};

export function TextInput({
    label,
    error,
    containerStyle,
    inputStyle,
    accessibilityHint,
    accessibilityLabel,
    ...inputProps
}: TextInputProps) {
    const {theme} = useUnistyles();

    return (
        <View style={[styles.root, containerStyle]}>
            <AppText variant="label">{label}</AppText>
            <NativeTextInput
                accessibilityHint={error ?? accessibilityHint}
                accessibilityLabel={accessibilityLabel ?? label}
                placeholderTextColor={theme.colors.textMuted}
                style={[styles.input, error && styles.inputError, inputStyle]}
                {...inputProps}
            />
            {error ? (
                <AppText variant="caption" tone="danger">
                    {error}
                </AppText>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        gap: theme.spacing.sm,
    },
    input: {
        backgroundColor: theme.colors.surfacePrimary,
        borderColor: theme.colors.borderSubtle,
        borderRadius: theme.radii.input,
        borderWidth: 1,
        color: theme.colors.textPrimary,
        fontSize: theme.typography.body,
        fontWeight: theme.fontWeights.body,
        lineHeight: theme.lineHeights.body,
        minHeight: 48,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.md,
    },
    inputError: {
        borderColor: theme.colors.feedbackDanger,
    },
}));
