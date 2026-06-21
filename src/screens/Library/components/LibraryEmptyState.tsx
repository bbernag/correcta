import {EmptyState, type IconName} from "../../../components/common";

type LibraryEmptyStateProps = {
    icon: IconName;
    message: string;
    title: string;
};

export function LibraryEmptyState({
    icon,
    message,
    title,
}: LibraryEmptyStateProps) {
    return <EmptyState icon={icon} message={message} title={title} />;
}
