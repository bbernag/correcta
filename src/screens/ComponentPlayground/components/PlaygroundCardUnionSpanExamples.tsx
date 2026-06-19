import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, CardUnion} from "../../../components/common";
import {COMPONENT_PLAYGROUND_CARD_UNION_BRIDGE_SPANS} from "../constants/ComponentPlaygroundConstants";

export function PlaygroundCardUnionSpanExamples() {
    return (
        <View style={styles.spanGrid}>
            {COMPONENT_PLAYGROUND_CARD_UNION_BRIDGE_SPANS.map((span) => (
                <CardUnion
                    bridgeSpan={span}
                    gap="compact"
                    key={span}
                    size="compact"
                    style={styles.spanSample}
                >
                    <CardUnion.Item style={styles.spanItem}>
                        <AppText
                            variant="caption"
                            style={styles.contrastMutedText}
                        >
                            Span
                        </AppText>
                    </CardUnion.Item>
                    <CardUnion.Item style={styles.spanItem}>
                        <AppText variant="button" style={styles.contrastText}>
                            {Math.round(span * 100)}%
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
        flexBasis: 96,
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
