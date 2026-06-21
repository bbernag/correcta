import {ErrorState} from "../../../components/common";

type ReviewErrorStateProps = {
    message: string;
    onRetry: () => void;
};

export function ReviewErrorState({message, onRetry}: ReviewErrorStateProps) {
    return (
        <ErrorState
            message={message}
            onRetry={onRetry}
            title="Review unavailable"
        />
    );
}
