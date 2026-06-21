import type {ReactNode} from "react";

import {EmptyState} from "../../../components/common";

type ReviewEmptyStateProps = {
    action?: ReactNode;
    message?: string;
    title?: string;
};

export function ReviewEmptyState({
    action,
    message = "Saved words, saved sentences, and mistakes become review cards.",
    title = "Build your review set",
}: ReviewEmptyStateProps) {
    return (
        <EmptyState
            action={action}
            icon="review"
            message={message}
            title={title}
        />
    );
}
