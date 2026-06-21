import {createContext, useContext} from "react";

import type {ToastContextValue} from "./toastTypes";

export const ToastContext = createContext<ToastContextValue | null>(null);

export function useCorrectaToast(): ToastContextValue {
    const value = useContext(ToastContext);

    if (!value) {
        throw new Error(
            "useCorrectaToast must be used within a CorrectaToastProvider."
        );
    }

    return value;
}
