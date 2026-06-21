import {useEffect, useRef, useState} from "react";
import {View} from "react-native";
import {EaseView, type Transition} from "react-native-ease";
import {StyleSheet} from "react-native-unistyles";

import {useReducedMotion} from "../../../hooks/useReducedMotion";
import {motion} from "../../../theme";
import {AppText} from "../AppText";
import {Button} from "../Button";
import {Icon, type IconName, type IconTone} from "../Icon";
import {IconButton} from "../IconButton";
import {SquircleSurface} from "../SquircleSurface";
import type {ToastInstance, ToastVariant} from "./toastTypes";

const VARIANT_ICON: Record<ToastVariant, IconName> = {
    default: "info",
    accent: "info",
    success: "success",
    warning: "warning",
    danger: "error",
};

const VARIANT_ICON_TONE: Record<ToastVariant, IconTone> = {
    default: "info",
    accent: "accent",
    success: "success",
    warning: "warning",
    danger: "danger",
};

const VARIANT_SURFACE = {
    default: "surfaceDefault",
    accent: "surfaceAccent",
    success: "surfaceSuccess",
    warning: "surfaceWarning",
    danger: "surfaceDanger",
} as const;

const ENTRY_TRANSITION = {
    duration: motion.duration.normal,
    easing: "easeOut",
    type: "timing",
} satisfies Transition;

const REDUCED_MOTION_TRANSITION = {
    type: "none",
} satisfies Transition;

type ToastProps = {
    instance: ToastInstance;
    onDismiss: (id: string) => void;
};

export function Toast({instance, onDismiss}: ToastProps) {
    const isReducedMotionEnabled = useReducedMotion();
    const [isLeaving, setIsLeaving] = useState(false);
    const dismissedRef = useRef(false);

    function beginDismiss() {
        if (dismissedRef.current) {
            return;
        }

        dismissedRef.current = true;

        if (isReducedMotionEnabled) {
            onDismiss(instance.id);
            return;
        }

        setIsLeaving(true);
        setTimeout(() => {
            onDismiss(instance.id);
        }, motion.duration.fast);
    }

    useEffect(() => {
        const timeoutId = setTimeout(beginDismiss, instance.durationMs);

        return () => {
            clearTimeout(timeoutId);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleActionPress() {
        instance.action?.onPress();
        beginDismiss();
    }

    const icon = instance.icon ?? VARIANT_ICON[instance.variant];

    return (
        <EaseView
            animate={{
                opacity: isLeaving ? 0 : 1,
                translateY: isLeaving && !isReducedMotionEnabled ? 8 : 0,
            }}
            initialAnimate={{
                opacity: isReducedMotionEnabled ? 1 : 0,
                translateY: isReducedMotionEnabled ? 0 : 12,
            }}
            transition={
                isReducedMotionEnabled
                    ? REDUCED_MOTION_TRANSITION
                    : ENTRY_TRANSITION
            }
        >
            <SquircleSurface
                accessibilityLiveRegion="polite"
                radius="compact"
                style={[
                    styles.surface,
                    styles[VARIANT_SURFACE[instance.variant]],
                ]}
            >
                <View style={styles.row}>
                    <Icon
                        name={icon}
                        size="default"
                        tone={VARIANT_ICON_TONE[instance.variant]}
                    />
                    <View style={styles.content}>
                        <AppText variant="label">{instance.title}</AppText>
                        {instance.description ? (
                            <AppText tone="secondary" variant="bodySmall">
                                {instance.description}
                            </AppText>
                        ) : null}
                    </View>
                    <IconButton
                        accessibilityLabel="Dismiss notification"
                        icon="clear"
                        onPress={beginDismiss}
                        variant="ghost"
                    />
                </View>
                {instance.action ? (
                    <Button
                        label={instance.action.label}
                        onPress={handleActionPress}
                        size="small"
                        variant="ghost"
                    />
                ) : null}
            </SquircleSurface>
        </EaseView>
    );
}

const styles = StyleSheet.create((theme) => ({
    surface: {
        borderWidth: 1,
        gap: theme.spacing.sm,
        padding: theme.spacing.lg,
        ...theme.shadows.floating,
    },
    surfaceDefault: {
        backgroundColor: theme.colors.surfaceElevated,
        borderColor: theme.colors.borderSubtle,
    },
    surfaceAccent: {
        backgroundColor: theme.colors.accentPrimarySoft,
        borderColor: theme.colors.accentPrimary,
    },
    surfaceSuccess: {
        backgroundColor: theme.colors.feedbackSuccessSoft,
        borderColor: theme.colors.feedbackSuccess,
    },
    surfaceWarning: {
        backgroundColor: theme.colors.feedbackWarningSoft,
        borderColor: theme.colors.feedbackWarning,
    },
    surfaceDanger: {
        backgroundColor: theme.colors.feedbackDangerSoft,
        borderColor: theme.colors.feedbackDanger,
    },
    row: {
        alignItems: "flex-start",
        flexDirection: "row",
        gap: theme.spacing.sm,
    },
    content: {
        flex: 1,
        gap: theme.spacing.xxs,
    },
}));
