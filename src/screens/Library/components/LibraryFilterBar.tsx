import {ScrollView} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {Chip} from "../../../components/common";
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
                    <Chip
                        accessibilityLabel={`${getFilterLabel(filter)} history filter`}
                        key={filter}
                        label={getFilterLabel(filter)}
                        onPress={() => {
                            onChange(filter);
                        }}
                        selected={isSelected}
                        size="small"
                        variant="accent"
                    />
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create((theme) => ({
    content: {
        gap: theme.spacing.sm,
    },
}));
