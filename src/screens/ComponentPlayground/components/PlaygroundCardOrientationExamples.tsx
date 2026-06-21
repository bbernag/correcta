import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, ConnectedCard} from "../../../components/common";

export function PlaygroundCardOrientationExamples() {
    return (
        <View style={styles.root}>
            <View style={styles.demo}>
                <AppText variant="caption" tone="muted">
                    Horizontal
                </AppText>
                <ConnectedCard gap="default" orientation="horizontal">
                    <ConnectedCard.Item>
                        <ConnectedCard.Title>Best score</ConnectedCard.Title>
                        <ConnectedCard.Caption>
                            Expert mode
                        </ConnectedCard.Caption>
                        <ConnectedCard.Metric>7,593</ConnectedCard.Metric>
                    </ConnectedCard.Item>
                    <ConnectedCard.Item>
                        <ConnectedCard.Title>
                            Reaction speed
                        </ConnectedCard.Title>
                        <ConnectedCard.Caption>
                            Average time
                        </ConnectedCard.Caption>
                        <ConnectedCard.Metric>285 ms</ConnectedCard.Metric>
                    </ConnectedCard.Item>
                </ConnectedCard>
            </View>

            <View style={styles.demo}>
                <AppText variant="caption" tone="muted">
                    Vertical
                </AppText>
                <ConnectedCard
                    gap="default"
                    orientation="vertical"
                    style={styles.verticalSample}
                >
                    <ConnectedCard.Item>
                        <ConnectedCard.Eyebrow>
                            Daily streak
                        </ConnectedCard.Eyebrow>
                        <ConnectedCard.Metric>7 days</ConnectedCard.Metric>
                    </ConnectedCard.Item>
                    <ConnectedCard.Item>
                        <ConnectedCard.Eyebrow>Accuracy</ConnectedCard.Eyebrow>
                        <ConnectedCard.Metric>92%</ConnectedCard.Metric>
                    </ConnectedCard.Item>
                </ConnectedCard>
            </View>
        </View>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        gap: theme.spacing.xl,
    },
    demo: {
        gap: theme.spacing.sm,
    },
    verticalSample: {
        alignSelf: "flex-start",
        maxWidth: 240,
        width: "100%",
    },
}));
