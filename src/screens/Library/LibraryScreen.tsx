import {AppText, Screen, Surface} from "../../components/common";

export function LibraryScreen() {
    return (
        <Screen>
            <AppText variant="title">Library</AppText>
            <Surface>
                <AppText variant="heading">History</AppText>
                <AppText tone="secondary">
                    Saved sentences, words, and notebook entries will live here.
                </AppText>
            </Surface>
        </Screen>
    );
}
