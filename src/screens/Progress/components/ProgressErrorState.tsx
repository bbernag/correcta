import {ErrorState} from "../../../components/common";

type ProgressErrorStateProps = {
    message: string;
    onRetry: () => void;
};

export function ProgressErrorState({
    message,
    onRetry,
}: ProgressErrorStateProps) {
    return (
        <ErrorState
            message={message}
            onRetry={onRetry}
            title="Progress unavailable"
        />
    );
}
