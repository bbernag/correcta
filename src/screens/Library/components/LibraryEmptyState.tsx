import type {ReactNode} from "react";

import {EmptyState, type IconName} from "../../../components/common";

type LibraryEmptyStateProps = {
    action?: ReactNode;
    icon: IconName;
    message: string;
    title: string;
};

export function LibraryEmptyState({
    action,
    icon,
    message,
    title,
}: LibraryEmptyStateProps) {
    return (
        <EmptyState
            action={action}
            icon={icon}
            message={message}
            title={title}
        />
    );
}
