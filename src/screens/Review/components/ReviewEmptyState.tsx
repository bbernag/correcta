import {AppText, Surface} from "../../../components/common";

type ReviewEmptyStateProps = {
    message?: string;
    title?: string;
};

export function ReviewEmptyState({
    message = "Save words, save sentences, or complete practice attempts with mistakes to build your next review deck.",
    title = "No review due",
}: ReviewEmptyStateProps) {
    return (
        <Surface variant="muted">
            <AppText variant="heading">{title}</AppText>
            <AppText tone="secondary">{message}</AppText>
        </Surface>
    );
}
