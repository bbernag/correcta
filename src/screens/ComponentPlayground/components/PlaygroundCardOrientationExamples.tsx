import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, Card} from "../../../components/common";

export function PlaygroundCardOrientationExamples() {
    return (
        <View style={styles.root}>
            <View style={styles.demo}>
                <AppText variant="caption" tone="muted">
                    Horizontal
                </AppText>
                <Card gap="default" orientation="horizontal">
                    <Card.Item>
                        <Card.Title>Best score</Card.Title>
                        <Card.Caption>Expert mode</Card.Caption>
                        <Card.Metric>7,593</Card.Metric>
                    </Card.Item>
                    <Card.Item>
                        <Card.Title>Reaction speed</Card.Title>
                        <Card.Caption>Average time</Card.Caption>
                        <Card.Metric>285 ms</Card.Metric>
                    </Card.Item>
                </Card>
            </View>

            <View style={styles.demo}>
                <AppText variant="caption" tone="muted">
                    Vertical
                </AppText>
                <Card
                    gap="default"
                    orientation="vertical"
                    style={styles.verticalSample}
                >
                    <Card.Item>
                        <Card.Eyebrow>Daily streak</Card.Eyebrow>
                        <Card.Metric>7 days</Card.Metric>
                    </Card.Item>
                    <Card.Item>
                        <Card.Eyebrow>Accuracy</Card.Eyebrow>
                        <Card.Metric>92%</Card.Metric>
                    </Card.Item>
                </Card>
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
