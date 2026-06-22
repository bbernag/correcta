import {useCallback, useRef, useState} from "react";

import type {ToastInstance, ToastVariant} from "../../../components/common";

const STATUS_TOAST_DURATION_MS = 3500;

export function usePracticeStatusToast() {
    const idCounterRef = useRef(0);
    const [statusToast, setStatusToast] = useState<ToastInstance | null>(null);

    const showStatusToast = useCallback(
        ({
            description,
            title,
            variant = "default",
        }: {
            description?: string;
            title: string;
            variant?: ToastVariant;
        }) => {
            idCounterRef.current += 1;
            setStatusToast({
                description,
                durationMs: STATUS_TOAST_DURATION_MS,
                id: `practice-status-${idCounterRef.current}`,
                title,
                variant,
            });
        },
        []
    );

    const dismissStatusToast = useCallback((id: string) => {
        setStatusToast((current) => {
            return current && current.id === id ? null : current;
        });
    }, []);

    return {dismissStatusToast, showStatusToast, statusToast};
}
