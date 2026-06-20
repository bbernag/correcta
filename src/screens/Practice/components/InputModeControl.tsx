import {Pressable, View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, PressableMotionView} from "../../../components/common";
import type {PracticeInputMode} from "../../../types";

const INPUT_MODES = [
    {label: "Typing", value: "typing"},
    {label: "Builder", value: "sentenceBuilder"},
] satisfies {label: string; value: PracticeInputMode}[];

type InputModeControlProps = {
    onChange: (inputMode: PracticeInputMode) => void;
    value: PracticeInputMode;
};

export function InputModeControl({onChange, value}: InputModeControlProps) {
    return (
        <View style={styles.root}>
            <AppText variant="label">Input mode</AppText>
            <View accessibilityRole="tablist" style={styles.options}>
                {INPUT_MODES.map((option) => {
                    const isSelected = option.value === value;

                    return (
                        <Pressable
                            accessibilityLabel={`${option.label} input mode`}
                            accessibilityRole="tab"
                            accessibilityState={{selected: isSelected}}
                            key={option.value}
                            onPress={() => {
                                onChange(option.value);
                            }}
                            style={styles.optionFrame}
                        >
                            {({pressed}) => (
                                <PressableMotionView
                                    pressed={pressed}
                                    style={[
                                        styles.option,
                                        isSelected && styles.optionSelected,
                                    ]}
                                >
                                    <AppText
                                        variant="label"
                                        tone={
                                            isSelected ? "inverted" : "accent"
                                        }
                                    >
                                        {option.label}
                                    </AppText>
                                </PressableMotionView>
                            )}
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        gap: theme.spacing.sm,
    },
    options: {
        backgroundColor: theme.colors.accentPrimarySoft,
        borderRadius: theme.radii.md,
        flexDirection: "row",
        gap: theme.spacing.xs,
        padding: theme.spacing.xs,
    },
    optionFrame: {
        flex: 1,
    },
    option: {
        alignItems: "center",
        borderRadius: theme.radii.sm,
        minHeight: 44,
        justifyContent: "center",
        paddingHorizontal: theme.spacing.md,
    },
    optionSelected: {
        backgroundColor: theme.colors.accentPrimary,
    },
}));
