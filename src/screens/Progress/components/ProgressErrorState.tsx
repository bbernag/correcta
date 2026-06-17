import {AppText, Button, Surface} from "../../../components/common";

type ProgressErrorStateProps = {
    message: string;
    onRetry: () => void;
};

export function ProgressErrorState({
    message,
    onRetry,
}: ProgressErrorStateProps) {
    return (
        <Surface variant="outline">
            <AppText variant="heading" tone="danger">
                Progress unavailable
            </AppText>
            <AppText tone="secondary">{message}</AppText>
            <Button label="Try again" onPress={onRetry} />
        </Surface>
    );
}
