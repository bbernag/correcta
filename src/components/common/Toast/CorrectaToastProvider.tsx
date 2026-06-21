import {type ReactNode, useCallback, useMemo, useRef, useState} from "react";
import {AccessibilityInfo, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {StyleSheet} from "react-native-unistyles";

import {Toast} from "./Toast";
import {ToastContext} from "./toastContext";
import type {ToastInstance, ToastOptions} from "./toastTypes";

const MAX_VISIBLE_TOASTS = 3;
const DEFAULT_DURATION_MS = 3500;
const TAB_BAR_CLEARANCE = 64;

type CorrectaToastProviderProps = {
    children: ReactNode;
};

export function CorrectaToastProvider({children}: CorrectaToastProviderProps) {
    const insets = useSafeAreaInsets();
    const idCounterRef = useRef(0);
    const [toasts, setToasts] = useState<ToastInstance[]>([]);

    const dismissToast = useCallback((id: string) => {
        setToasts((current) => {
            return current.filter((toast) => {
                return toast.id !== id;
            });
        });
    }, []);

    const showToast = useCallback((options: ToastOptions) => {
        idCounterRef.current += 1;
        const id = `toast-${idCounterRef.current}`;
        const instance: ToastInstance = {
            action: options.action,
            description: options.description,
            durationMs: options.durationMs ?? DEFAULT_DURATION_MS,
            icon: options.icon,
            id,
            title: options.title,
            variant: options.variant ?? "default",
        };

        setToasts((current) => {
            return [...current, instance].slice(-MAX_VISIBLE_TOASTS);
        });
        AccessibilityInfo.announceForAccessibility(
            options.description
                ? `${options.title}. ${options.description}`
                : options.title
        );

        return id;
    }, []);

    const value = useMemo(() => {
        return {dismissToast, showToast};
    }, [dismissToast, showToast]);

    return (
        <ToastContext.Provider value={value}>
            {children}
            <View
                pointerEvents="box-none"
                style={[
                    styles.overlay,
                    {bottom: insets.bottom + TAB_BAR_CLEARANCE},
                ]}
            >
                {toasts.map((toast) => {
                    return (
                        <Toast
                            instance={toast}
                            key={toast.id}
                            onDismiss={dismissToast}
                        />
                    );
                })}
            </View>
        </ToastContext.Provider>
    );
}

const styles = StyleSheet.create((theme) => ({
    overlay: {
        gap: theme.spacing.sm,
        left: 0,
        paddingHorizontal: theme.spacing.screenHorizontal,
        position: "absolute",
        right: 0,
    },
}));
