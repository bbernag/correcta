import {Pressable, ScrollView} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {AppText, PressableMotionView} from "../../../components/common";
import {LIBRARY_FILTERS} from "../constants/libraryConstants";
import type {LibraryFilter} from "../types/libraryTypes";
import {getFilterLabel} from "../utils/libraryUtils";

type LibraryFilterBarProps = {
    value: LibraryFilter;
    onChange: (filter: LibraryFilter) => void;
};

export function LibraryFilterBar({onChange, value}: LibraryFilterBarProps) {
    return (
        <ScrollView
            contentContainerStyle={styles.content}
            horizontal
            showsHorizontalScrollIndicator={false}
        >
            {LIBRARY_FILTERS.map((filter) => {
                const isSelected = value === filter;

                return (
                    <Pressable
                        accessibilityLabel={`${getFilterLabel(filter)} history filter`}
                        accessibilityRole="button"
                        accessibilityState={{selected: isSelected}}
                        key={filter}
                        onPress={() => {
                            onChange(filter);
                        }}
                    >
                        {({pressed}) => (
                            <PressableMotionView
                                pressed={pressed}
                                style={[
                                    styles.chip,
                                    isSelected && styles.chipSelected,
                                ]}
                            >
                                <AppText
                                    variant="label"
                                    tone={isSelected ? "inverted" : "accent"}
                                >
                                    {getFilterLabel(filter)}
                                </AppText>
                            </PressableMotionView>
                        )}
                    </Pressable>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create((theme) => ({
    content: {
        gap: theme.spacing.sm,
    },
    chip: {
        backgroundColor: theme.colors.accentPrimarySoft,
        borderRadius: theme.radii.lg,
        minHeight: 44,
        minWidth: 44,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
    },
    chipSelected: {
        backgroundColor: theme.colors.accentPrimary,
    },
}));
