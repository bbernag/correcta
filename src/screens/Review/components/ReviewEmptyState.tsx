import {EmptyState} from "../../../components/common";

type ReviewEmptyStateProps = {
    message?: string;
    title?: string;
};

export function ReviewEmptyState({
    message = "Save words, save sentences, or complete practice attempts with mistakes to build your next review deck.",
    title = "No review due",
}: ReviewEmptyStateProps) {
    return <EmptyState icon="review" message={message} title={title} />;
}
