import {StyleSheet} from "react-native-unistyles";

import {PlaygroundCardComposite} from "./PlaygroundCardComposite";
import {PlaygroundCardOrientationExamples} from "./PlaygroundCardOrientationExamples";
import {PlaygroundSectionBody} from "./PlaygroundSectionBody";
import {PlaygroundSectionHeader} from "./PlaygroundSectionHeader";
import {PlaygroundSectionRoot} from "./PlaygroundSectionRoot";

export function PlaygroundCardSection() {
    return (
        <PlaygroundSectionRoot>
            <PlaygroundSectionHeader
                description="Linked cards with orientation, semantic text slots, and auto-contrast typography."
                eyebrow="Linked surfaces"
                title="Card"
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
