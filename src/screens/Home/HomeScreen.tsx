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
    function handleOpenPlayground() {
        navigation.navigate("ComponentPlayground");
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
                label="Open component check"
                onPress={handleOpenPlayground}
            />
        </Screen>
    );
}
