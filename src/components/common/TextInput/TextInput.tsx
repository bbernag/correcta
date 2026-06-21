import {useState} from "react";
import {TextInput as NativeTextInput, View} from "react-native";
import {EaseView, type Transition} from "react-native-ease";
import {StyleSheet, useUnistyles} from "react-native-unistyles";

import {useReducedMotion} from "../../../hooks/useReducedMotion";
import {motion} from "../../../theme";
import {AppText} from "../AppText";
import {Icon} from "../Icon";
import {SquircleSurface} from "../SquircleSurface";
import type {TextInputProps} from "./textInputTypes";
import {getIconTone, getSupportIcon, getSupportTone} from "./textInputUtils";

const INPUT_FRAME_TRANSITION = {
    transform: {
        damping: motion.spring.snappy.damping,
        mass: motion.spring.snappy.mass,
        stiffness: motion.spring.snappy.stiffness,
        type: "spring",
    },
} satisfies Transition;

const SUPPORT_TEXT_TRANSITION = {
    duration: motion.duration.fast,
    easing: "easeOut",
    type: "timing",
} satisfies Transition;

const REDUCED_MOTION_TRANSITION = {
    type: "none",
} satisfies Transition;

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
    const isReducedMotionEnabled = useReducedMotion();
    const [isFocused, setIsFocused] = useState(false);
    const isDisabled = disabled || inputProps.editable === false;
    const isSuccess = !error && (status === "success" || Boolean(successText));
    const supportTone = getSupportTone({error, isSuccess});
    const supportText = error ?? successText ?? helperText;
    const supportIcon = getSupportIcon({error, isSuccess, leadingIcon});
    const iconTone = getIconTone({
        disabled: isDisabled,
        error,
        isFocused,
        isSuccess,
    });
    const autoCorrect = inputProps.autoCorrect ?? false;
    const spellCheck = inputProps.spellCheck ?? autoCorrect;
    const isMultiline = inputProps.multiline === true;
    const placeholderTextColor = isDisabled
        ? theme.colors.textSecondary
        : theme.colors.textMuted;

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
        <View style={containerStyle}>
            <AppText
                style={styles.label}
                variant="label"
                tone={isDisabled ? "muted" : "primary"}
            >
                {label}
            </AppText>
            <EaseView
                animate={{
                    scale:
                        isFocused && !isReducedMotionEnabled && !isDisabled
                            ? 1.01
                            : 1,
                }}
                transition={
                    isReducedMotionEnabled
                        ? REDUCED_MOTION_TRANSITION
                        : INPUT_FRAME_TRANSITION
                }
            >
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
                        <Icon
                            name={leadingIcon}
                            size="default"
                            tone={iconTone}
                        />
                    ) : null}
                    <NativeTextInput
                        {...inputProps}
                        accessibilityHint={error ?? accessibilityHint}
                        accessibilityLabel={accessibilityLabel ?? label}
                        accessibilityState={{
                            disabled: isDisabled,
                        }}
                        autoCorrect={autoCorrect}
                        editable={!isDisabled}
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                        placeholderTextColor={placeholderTextColor}
                        spellCheck={spellCheck}
                        style={[
                            styles.input,
                            !isMultiline && styles.inputSingleLine,
                            isDisabled && styles.inputDisabledText,
                            inputStyle,
                        ]}
                        underlineColorAndroid="transparent"
                    />
                    {trailingIcon ? (
                        <Icon
                            name={trailingIcon}
                            size="default"
                            tone={iconTone}
                        />
                    ) : null}
                </SquircleSurface>
            </EaseView>
            {supportText ? (
                <EaseView
                    animate={{
                        opacity: 1,
                        translateY: 0,
                    }}
                    initialAnimate={{
                        opacity: isReducedMotionEnabled ? 1 : 0,
                        translateY: isReducedMotionEnabled ? 0 : 4,
                    }}
                    style={styles.supportRow}
                    transition={
                        isReducedMotionEnabled
                            ? REDUCED_MOTION_TRANSITION
                            : SUPPORT_TEXT_TRANSITION
                    }
                >
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
                </EaseView>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create((theme) => ({
    label: {
        marginBottom: theme.spacing.sm,
    },
    inputFrame: {
        alignItems: "center",
        backgroundColor: theme.colors.surfacePrimary,
        borderColor: theme.colors.borderSubtle,
        borderWidth: 1,
        borderRadius: theme.radii.lg,
        flexDirection: "row",
        gap: theme.spacing.md,
        minHeight: 50,
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.sm,
    },
    input: {
        color: theme.colors.textPrimary,
        flex: 1,
        fontSize: theme.typography.body,
        fontWeight: theme.fontWeights.body,
        includeFontPadding: false,
        lineHeight: theme.lineHeights.body,
        paddingHorizontal: 0,
        paddingVertical: 0,
    },
    inputSingleLine: {
        minHeight: theme.lineHeights.body + theme.spacing.sm,
        textAlignVertical: "center",
    },
    inputDisabledText: {
        color: theme.colors.textSecondary,
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
        marginTop: theme.spacing.xs,
    },
    supportText: {
        flex: 1,
        fontWeight: theme.fontWeights.body,
    },
}));
