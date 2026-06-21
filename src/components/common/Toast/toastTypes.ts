import type {IconName} from "../Icon";

export type ToastVariant =
    | "default"
    | "accent"
    | "success"
    | "warning"
    | "danger";

export type ToastAction = {
    label: string;
    onPress: () => void;
};

export type ToastOptions = {
    action?: ToastAction;
    description?: string;
    durationMs?: number;
    icon?: IconName;
    title: string;
    variant?: ToastVariant;
};

export type ToastInstance = {
    action?: ToastAction;
    description?: string;
    durationMs: number;
    icon?: IconName;
    id: string;
    title: string;
    variant: ToastVariant;
};

export type ToastContextValue = {
    dismissToast: (id: string) => void;
    showToast: (options: ToastOptions) => string;
};
