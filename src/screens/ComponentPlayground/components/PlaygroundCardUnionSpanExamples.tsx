import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, CardUnion} from "../../../components/common";

const COMPONENT_PLAYGROUND_CARD_UNION_SAMPLES = [
    {
        label: "Streak",
        value: "12d",
    },
    {
        label: "Focus",
        value: "70%",
    },
    {
        label: "Review",
        value: "8m",
    },
] as const;

export function PlaygroundCardUnionSpanExamples() {
    return (
        <View style={styles.spanGrid}>
            {COMPONENT_PLAYGROUND_CARD_UNION_SAMPLES.map((sample) => (
                <CardUnion key={sample.label} style={styles.spanSample}>
                    <CardUnion.Item style={styles.spanItem}>
                        <AppText
                            variant="caption"
                            style={styles.contrastMutedText}
                        >
                            {sample.label}
                        </AppText>
                    </CardUnion.Item>
                    <CardUnion.Item style={styles.spanItem}>
                        <AppText variant="button" style={styles.contrastText}>
                            {sample.value}
                        </AppText>
                    </CardUnion.Item>
                </CardUnion>
            ))}
        </View>
    );
}

const styles = StyleSheet.create((theme) => ({
    spanGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: theme.spacing.lg,
    },
    spanSample: {
        flexBasis: 112,
        flexGrow: 1,
    },
    spanItem: {
        alignItems: "center",
        minHeight: 56,
    },
    contrastText: {
        color: theme.colors.surfaceContrastForeground,
    },
    contrastMutedText: {
        color: theme.colors.surfaceContrastMutedForeground,
    },
}));
