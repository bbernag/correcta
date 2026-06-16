import {AppText, Screen, Surface} from "../../components/common";

export function ProgressScreen() {
    return (
        <Screen>
            <AppText variant="title">Progress</AppText>
            <Surface variant="muted">
                <AppText variant="heading">Streak and accuracy</AppText>
                <AppText tone="secondary">
                    Progress summaries will stay readable without decorative
                    chart chrome.
                </AppText>
            </Surface>
        </Screen>
    );
}
