import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, SquircleSurface} from "../../../components/common";
import {COMPONENT_PLAYGROUND_SQUIRCLE_EXAMPLES} from "../constants/componentPlaygroundConstants";
import {PlaygroundComponentSample} from "./PlaygroundComponentSample";
import {PlaygroundSectionBody} from "./PlaygroundSectionBody";
import {PlaygroundSectionHeader} from "./PlaygroundSectionHeader";
import {PlaygroundSectionRoot} from "./PlaygroundSectionRoot";

export function PlaygroundShapeSurfaceSection() {
    return (
        <PlaygroundSectionRoot>
            <PlaygroundSectionHeader
                description="Direct radius wrappers used by compact controls and platform-native surface shells."
                eyebrow="Containers"
                title="Shape surfaces"
            />
            <PlaygroundSectionBody style={styles.stack}>
                <AppText variant="label">SquircleSurface</AppText>
                <View style={styles.sampleGrid}>
                    {COMPONENT_PLAYGROUND_SQUIRCLE_EXAMPLES.map((item) => (
                        <PlaygroundComponentSample
                            key={item.radius}
                            title={`SquircleSurface / ${item.radius}`}
                            style={styles.sample}
                        >
                            <SquircleSurface
                                radius={item.radius}
                                style={[
                                    styles.squircleSample,
                                    item.radius === "pill"
                                        ? styles.pillSquircleSample
                                        : undefined,
                                ]}
                            >
                                <AppText variant="label">{item.label}</AppText>
                            </SquircleSurface>
                        </PlaygroundComponentSample>
                    ))}
                </View>
            </PlaygroundSectionBody>
        </PlaygroundSectionRoot>
    );
}

const styles = StyleSheet.create((theme) => ({
    stack: {
        gap: theme.spacing.lg,
    },
    sampleGrid: {
        alignItems: "flex-start",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: theme.spacing.lg,
    },
    sample: {
        minWidth: 132,
    },
    squircleSample: {
        backgroundColor: theme.colors.surfaceElevated,
        borderColor: theme.colors.borderSubtle,
        borderWidth: 1,
        minWidth: 132,
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
    },
    pillSquircleSample: {
        alignItems: "center",
        minWidth: 148,
    },
}));
