import {View} from "react-native";
import {StyleSheet} from "react-native-unistyles";

import {ExpoUiCatalogItem} from "./ExpoUiCatalogItem";
import {ExpoUiShowcaseSection} from "./ExpoUiShowcaseSection";
import type {ExpoUiCatalogSectionProps} from "../types/expoUiShowcaseTypes";

export function ExpoUiCatalogSection({section}: ExpoUiCatalogSectionProps) {
    return (
        <ExpoUiShowcaseSection
            description={section.description}
            eyebrow={section.eyebrow}
            title={section.title}
        >
            <View style={styles.grid}>
                {section.items.map((item) => (
                    <ExpoUiCatalogItem
                        item={item}
                        key={`${section.eyebrow}-${item.name}`}
                    />
                ))}
            </View>
        </ExpoUiShowcaseSection>
    );
}

const styles = StyleSheet.create((theme) => ({
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: theme.spacing.md,
    },
}));
