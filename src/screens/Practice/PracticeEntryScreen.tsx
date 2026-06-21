import type {CompositeScreenProps} from "@react-navigation/native";
import type {NativeStackScreenProps} from "@react-navigation/native-stack";
import type {NativeBottomTabScreenProps} from "@bottom-tabs/react-navigation";
import {StyleSheet} from "react-native-unistyles";

import {
    Button,
    EmptyState,
    Screen,
    ScreenHeader,
} from "../../components/common";
import type {MainTabParamList, RootStackParamList} from "../../router/types";

type PracticeEntryScreenProps = CompositeScreenProps<
    NativeBottomTabScreenProps<MainTabParamList, "Practice">,
    NativeStackScreenProps<RootStackParamList>
>;

export function PracticeEntryScreen({navigation}: PracticeEntryScreenProps) {
    function handleStartPractice() {
        navigation.navigate("PracticeSession", {restartKey: Date.now()});
    }

    return (
        <Screen contentContainerStyle={styles.content}>
            <ScreenHeader
                eyebrow="Practice"
                subtitle="Translate five focused sentences at your current level."
                title="Start practice"
            />
            <EmptyState
                action={
                    <Button
                        accessibilityLabel="Start focused practice"
                        label="Start practice"
                        leadingIcon="practice"
                        onPress={handleStartPractice}
                    />
                }
                icon="practice"
                message="Typing and word bank modes are ready for this session."
                title="Ready for focused practice"
            />
        </Screen>
    );
}

const styles = StyleSheet.create((theme) => ({
    content: {
        flexGrow: 1,
        justifyContent: "center",
        paddingBottom: theme.spacing["3xl"],
    },
}));
