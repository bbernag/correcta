import {useState} from "react";
import {TextInput as NativeTextInput, View} from "react-native";
import {StyleSheet, useUnistyles} from "react-native-unistyles";

import {AppText} from "../AppText";
import type {AppTextTone} from "../AppText";
import {Icon} from "../Icon";
import type {IconName, IconTone} from "../Icon";
import {SquircleSurface} from "../SquircleSurface";
import type {TextInputProps} from "./textInputTypes";

export function TextInput({
    label,
    error,
    helperText,
    successText,
    status = "default",
    disabled = false,
    leadingIcon,
    trailingIcon,
    containerStyle,
    inputStyle,
    accessibilityHint,
    accessibilityLabel,
    onBlur,
    onFocus,
    ...inputProps
}: TextInputProps) {
    const {theme} = useUnistyles();
    const [isFocused, setIsFocused] = useState(false);
    const isDisabled = disabled || inputProps.editable === false;
    const isSuccess = !error && (status === "success" || Boolean(successText));
    const supportTone = getSupportTone({error, isSuccess});
    const supportText = error ?? successText ?? helperText;
    const supportIcon = getSupportIcon({error, isSuccess});
    const iconTone = getIconTone({
        disabled: isDisabled,
        error,
        isFocused,
        isSuccess,
    });

    function handleFocus(
        event: Parameters<NonNullable<TextInputProps["onFocus"]>>[0]
    ) {
        setIsFocused(true);
        onFocus?.(event);
    }

    function handleBlur(
        event: Parameters<NonNullable<TextInputProps["onBlur"]>>[0]
    ) {
        setIsFocused(false);
        onBlur?.(event);
    }

    return (
        <View style={[styles.root, containerStyle]}>
            <AppText variant="label" tone={isDisabled ? "muted" : "primary"}>
                {label}
            </AppText>
            <SquircleSurface
                style={[
                    styles.inputFrame,
                    isFocused && styles.inputFocused,
                    isSuccess && styles.inputSuccess,
                    error && styles.inputError,
                    isDisabled && styles.inputDisabled,
                ]}
            >
                {leadingIcon ? (
                    <Icon name={leadingIcon} size="default" tone={iconTone} />
                ) : null}
                <NativeTextInput
                    {...inputProps}
                    accessibilityHint={error ?? accessibilityHint}
                    accessibilityLabel={accessibilityLabel ?? label}
                    accessibilityState={{
                        disabled: isDisabled,
                    }}
                    editable={!isDisabled}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    placeholderTextColor={theme.colors.textMuted}
                    style={[styles.input, inputStyle]}
                />
                {trailingIcon ? (
                    <Icon name={trailingIcon} size="default" tone={iconTone} />
                ) : null}
            </SquircleSurface>
            {supportText ? (
                <View style={styles.supportRow}>
                    {supportIcon ? (
                        <Icon
                            name={supportIcon}
                            size="dense"
                            tone={supportTone}
                        />
                    ) : null}
                    <AppText
                        style={styles.supportText}
                        variant="caption"
                        tone={supportTone}
                    >
                        {supportText}
                    </AppText>
                </View>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        gap: theme.spacing.sm,
    },
    inputFrame: {
        alignItems: "center",
        backgroundColor: theme.colors.surfacePrimary,
        borderColor: theme.colors.borderSubtle,
        borderWidth: 1,
        flexDirection: "row",
        gap: theme.spacing.sm,
        minHeight: 52,
        paddingHorizontal: theme.spacing.lg,
    },
    input: {
        color: theme.colors.textPrimary,
        flex: 1,
        fontSize: theme.typography.body,
        fontWeight: theme.fontWeights.body,
        lineHeight: theme.lineHeights.body,
        paddingVertical: theme.spacing.md,
    },
    inputFocused: {
        backgroundColor: theme.colors.surfaceElevated,
        borderColor: theme.colors.focusRing,
        ...theme.shadows.surface,
    },
    inputError: {
        backgroundColor: theme.colors.surfacePrimary,
        borderColor: theme.colors.feedbackDanger,
    },
    inputSuccess: {
        backgroundColor: theme.colors.surfacePrimary,
        borderColor: theme.colors.feedbackSuccess,
    },
    inputDisabled: {
        backgroundColor: theme.colors.surfaceTonal,
        borderColor: theme.colors.borderSubtle,
    },
    supportRow: {
        alignItems: "center",
        flexDirection: "row",
        gap: theme.spacing.xs,
    },
    supportText: {
        flex: 1,
    },
}));

function getSupportTone({
    error,
    isSuccess,
}: {
    error?: string;
    isSuccess: boolean;
}): AppTextTone {
    if (error) {
        return "danger";
    }

    if (isSuccess) {
        return "success";
    }

    return "muted";
}

function getSupportIcon({
    error,
    isSuccess,
}: {
    error?: string;
    isSuccess: boolean;
}): IconName | null {
    if (error) {
        return "warning";
    }

    if (isSuccess) {
        return "success";
    }

    return null;
}

function getIconTone({
    disabled,
    error,
    isFocused,
    isSuccess,
}: {
    disabled: boolean;
    error?: string;
    isFocused: boolean;
    isSuccess: boolean;
}): IconTone {
    if (disabled) {
        return "muted";
    }

    if (error) {
        return "danger";
    }

    if (isSuccess) {
        return "success";
    }

    if (isFocused) {
        return "accent";
    }

    return "secondary";
}
