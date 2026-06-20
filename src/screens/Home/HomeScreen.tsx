import type {CompositeScreenProps} from "@react-navigation/native";
import type {NativeStackScreenProps} from "@react-navigation/native-stack";
import type {NativeBottomTabScreenProps} from "@bottom-tabs/react-navigation";

import {AppText, Button, Screen, Surface} from "../../components/common";
import {APP_NAME} from "../../constants/app";
import type {MainTabParamList, RootStackParamList} from "../../router/types";

type HomeScreenProps = CompositeScreenProps<
    NativeBottomTabScreenProps<MainTabParamList, "Home">,
    NativeStackScreenProps<RootStackParamList>
>;

export function HomeScreen({navigation}: HomeScreenProps) {
    function handleStartPractice() {
        navigation.navigate("Practice", {restartKey: Date.now()});
    }

    function handleOpenPlayground() {
        navigation.navigate("ComponentPlayground");
    }

    function handleOpenExpoUiShowcase() {
        navigation.navigate("ExpoUiShowcase");
    }

    function handleOpenPocCardPerformance() {
        navigation.navigate("PocCardPerformance");
    }

    function handleOpenExistingCardPerformance() {
        navigation.navigate("ExistingCardPerformance");
    }

    return (
        <Screen>
            <AppText variant="label" tone="accent">
                {APP_NAME}
            </AppText>
            <AppText variant="title">Daily practice</AppText>
            <Surface>
                <AppText variant="heading">Next session</AppText>
                <AppText tone="secondary">
                    Five focused sentence prompts are queued for the first app
                    shell build.
                </AppText>
            </Surface>
            <Button
                accessibilityLabel="Start practice session"
                label="Start practice"
                onPress={handleStartPractice}
            />
            <Button
                accessibilityLabel="Open component check"
                label="Open component check"
                onPress={handleOpenPlayground}
                variant="secondary"
            />
            <Button
                accessibilityLabel="Open Expo UI showcase"
                label="Open Expo UI showcase"
                onPress={handleOpenExpoUiShowcase}
                variant="secondary"
            />
            <Button
                accessibilityLabel="Open POC card benchmark"
                label="Open POC card benchmark"
                onPress={handleOpenPocCardPerformance}
                variant="tertiary"
            />
            <Button
                accessibilityLabel="Open existing card benchmark"
                label="Open existing card benchmark"
                onPress={handleOpenExistingCardPerformance}
                variant="tertiary"
            />
        </Screen>
    );
}
