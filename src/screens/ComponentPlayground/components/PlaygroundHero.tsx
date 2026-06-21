import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, Icon, Surface} from "../../../components/common";

export function PlaygroundHero() {
    return (
        <View style={styles.hero}>
            <Surface variant="tonal" style={styles.passBadge}>
                <Icon name="check" size="dense" tone="accent" />
                <AppText variant="caption" tone="accent">
                    Native elegance pass
                </AppText>
            </Surface>
            <AppText variant="titleLarge">Common primitives</AppText>
            <AppText variant="bodySmall" tone="secondary">
                A device QA surface for Scribe Blue typography, controls,
                feedback states, platform surfaces, and haptics.
            </AppText>
        </View>
    );
}

const styles = StyleSheet.create((theme) => ({
    hero: {
        gap: theme.spacing.md,
        paddingBottom: theme.spacing.md,
    },
    passBadge: {
        alignItems: "center",
        alignSelf: "flex-start",
        flexDirection: "row",
        gap: theme.spacing.xs,
    },
}));
