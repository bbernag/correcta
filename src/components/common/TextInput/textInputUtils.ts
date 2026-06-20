import type {AppTextTone} from "../AppText";
import type {IconName, IconTone} from "../Icon";

export function getSupportTone({
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

export function getSupportIcon({
    error,
    isSuccess,
    leadingIcon,
}: {
    error?: string;
    isSuccess: boolean;
    leadingIcon?: IconName;
}): IconName | null {
    if (error) {
        return leadingIcon === "warning" ? null : "warning";
    }

    if (isSuccess) {
        return leadingIcon === "success" ? null : "success";
    }

    return null;
}

export function getIconTone({
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
