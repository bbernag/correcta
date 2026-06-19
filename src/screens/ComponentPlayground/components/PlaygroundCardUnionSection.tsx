import {StyleSheet} from "react-native-unistyles";

import {PlaygroundCardUnionCanvasExample} from "./PlaygroundCardUnionCanvasExample";
import {PlaygroundCardUnionSpanExamples} from "./PlaygroundCardUnionSpanExamples";
import {PlaygroundSectionBody} from "./PlaygroundSectionBody";
import {PlaygroundSectionHeader} from "./PlaygroundSectionHeader";
import {PlaygroundSectionRoot} from "./PlaygroundSectionRoot";

export function PlaygroundCardUnionSection() {
    return (
        <PlaygroundSectionRoot>
            <PlaygroundSectionHeader
                description="Opaque linked cards with internal bridges, cut-ins, and native press handling."
                eyebrow="Linked surfaces"
                title="CardUnion"
            />
            <PlaygroundSectionBody style={styles.root}>
                <PlaygroundCardUnionCanvasExample />
                <PlaygroundCardUnionSpanExamples />
            </PlaygroundSectionBody>
        </PlaygroundSectionRoot>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        gap: theme.spacing.xl,
    },
}));
