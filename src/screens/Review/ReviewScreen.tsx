import {AppText, Screen, Surface} from "../../components/common";

export function ReviewScreen() {
    return (
        <Screen>
            <AppText variant="title">Review</AppText>
            <Surface variant="outline">
                <AppText variant="heading">Saved items</AppText>
                <AppText tone="secondary">
                    Review cards will start from accepted translations and saved
                    corrections.
                </AppText>
            </Surface>
        </Screen>
    );
}
