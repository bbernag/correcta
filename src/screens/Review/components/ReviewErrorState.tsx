import {AppText, Button, Surface} from "../../../components/common";

type ReviewErrorStateProps = {
    message: string;
    onRetry: () => void;
};

export function ReviewErrorState({message, onRetry}: ReviewErrorStateProps) {
    return (
        <Surface variant="outline">
            <AppText variant="heading" tone="danger">
                Review unavailable
            </AppText>
            <AppText tone="secondary">{message}</AppText>
            <Button label="Try again" onPress={onRetry} />
        </Surface>
    );
}
