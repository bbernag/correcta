import {StyleSheet} from "react-native-unistyles";

import {PlaygroundPocCardExample} from "./PlaygroundPocCardExample";
import {PlaygroundSectionBody} from "./PlaygroundSectionBody";
import {PlaygroundSectionHeader} from "./PlaygroundSectionHeader";
import {PlaygroundSectionRoot} from "./PlaygroundSectionRoot";

export function PlaygroundPocCardSection() {
    return (
        <PlaygroundSectionRoot>
            <PlaygroundSectionHeader
                description="View-based linked cards with fast-squircle surfaces and no SVG geometry."
                eyebrow="Linked surfaces"
                title="POC card"
            />
            <PlaygroundSectionBody style={styles.root}>
                <PlaygroundPocCardExample />
            </PlaygroundSectionBody>
        </PlaygroundSectionRoot>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        gap: theme.spacing.xl,
    },
}));
