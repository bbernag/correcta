import {StyleSheet} from "react-native-unistyles";

import {PlaygroundCardComposite} from "./PlaygroundCardComposite";
import {PlaygroundCardOrientationExamples} from "./PlaygroundCardOrientationExamples";
import {PlaygroundSectionBody} from "./PlaygroundSectionBody";
import {PlaygroundSectionHeader} from "./PlaygroundSectionHeader";
import {PlaygroundSectionRoot} from "./PlaygroundSectionRoot";

export function PlaygroundExistingCardSection() {
    return (
        <PlaygroundSectionRoot>
            <PlaygroundSectionHeader
                description="Current linked card implementation with orientation examples and the composite sample."
                eyebrow="Linked surfaces"
                title="Existing card"
            />
            <PlaygroundSectionBody style={styles.root}>
                <PlaygroundCardOrientationExamples />
                <PlaygroundCardComposite />
            </PlaygroundSectionBody>
        </PlaygroundSectionRoot>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        gap: theme.spacing.xl,
    },
}));
