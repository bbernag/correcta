import {AppText, Screen, Surface, TextInput} from "../../components/common";

export function PracticeScreen() {
    return (
        <Screen>
            <AppText variant="title">Practice</AppText>
            <Surface>
                <AppText variant="heading">Sentence prompt</AppText>
                <AppText tone="secondary">
                    Translate a short sentence and keep the primary action
                    reachable while editing.
                </AppText>
            </Surface>
            <TextInput
                autoCapitalize="sentences"
                label="Translation"
                returnKeyType="done"
            />
        </Screen>
    );
}
