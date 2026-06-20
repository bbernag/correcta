import {use} from "react";
import {View} from "react-native";
import FastSquircleView from "react-native-fast-squircle";
import {StyleSheet, useUnistyles} from "react-native-unistyles";

import {PocCardContext} from "./PocCardContext";
import type {PocCardSectionProps} from "./PocCardTypes";
import {getPocCardToneStyle} from "./PocCardTone";

export function PocCardSection({
    children,
    contentStyle,
    style,
    ...viewProps
}: PocCardSectionProps) {
    const {theme} = useUnistyles();
    const {orientation, tone} = use(PocCardContext);

    return (
        <FastSquircleView
            cornerSmoothing={theme.card.cornerSmoothing}
            style={[
                styles.root,
                getPocCardToneStyle(tone),
                orientation === "horizontal" && styles.horizontalRoot,
                style,
            ]}
            {...viewProps}
        >
            <View style={[styles.content, contentStyle]}>{children}</View>
        </FastSquircleView>
    );
}

const styles = StyleSheet.create((theme) => ({
    root: {
        borderRadius: theme.card.radius.compact,
        overflow: "hidden",
        padding: theme.spacing.xl,
    },
    horizontalRoot: {
        flex: 1,
    },
    content: {
        gap: theme.spacing.sm,
    },
}));
