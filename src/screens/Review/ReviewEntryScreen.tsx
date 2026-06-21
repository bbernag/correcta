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

type ReviewEntryScreenProps = CompositeScreenProps<
    NativeBottomTabScreenProps<MainTabParamList, "Review">,
    NativeStackScreenProps<RootStackParamList>
>;

export function ReviewEntryScreen({navigation}: ReviewEntryScreenProps) {
    function handleStartReview() {
        navigation.navigate("ReviewSession");
    }

    return (
        <Screen contentContainerStyle={styles.content}>
            <ScreenHeader
                eyebrow="Review"
                subtitle="Practice saved words, saved sentences, and recent mistakes."
                title="Review due cards"
            />
            <EmptyState
                action={
                    <Button
                        accessibilityLabel="Start due card review"
                        label="Start review"
                        leadingIcon="review"
                        onPress={handleStartReview}
                    />
                }
                icon="review"
                message="Due cards come from saved content and recent mistakes."
                title="Ready to review"
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
