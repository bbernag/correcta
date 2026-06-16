import type {
    StyleProp,
    TextInputProps as NativeTextInputProps,
    TextStyle,
    ViewStyle,
} from "react-native";
import {TextInput as NativeTextInput, View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

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
    return (
        <View style={[styles.root, containerStyle]}>
            <AppText variant="label">{label}</AppText>
            <NativeTextInput
                accessibilityHint={error ?? accessibilityHint}
                accessibilityLabel={accessibilityLabel ?? label}
                placeholderTextColor="#7B8794"
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
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.border,
        borderRadius: theme.radii.md,
        borderWidth: 1,
        color: theme.colors.text,
        fontSize: theme.typography.body,
        minHeight: 48,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.md,
    },
    inputError: {
        borderColor: theme.colors.danger,
    },
}));
