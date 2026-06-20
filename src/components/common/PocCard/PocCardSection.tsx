import {use} from "react";
import type {ViewStyle} from "react-native";
import {View} from "react-native";
import FastSquircleView from "react-native-fast-squircle";
import {StyleSheet, useUnistyles} from "react-native-unistyles";

import {PocCardContext} from "./pocCardContext";
import type {PocCardSectionProps} from "./pocCardTypes";
import {getPocCardToneStyle} from "./pocCardTone";

export function PocCardSection({
    children,
    contentStyle,
    gradient,
    style,
    ...viewProps
}: PocCardSectionProps) {
    const {theme} = useUnistyles();
    const {orientation, tone} = use(PocCardContext);

    const gradientStyle: ViewStyle | null = gradient
        ? {
              experimental_backgroundImage: [
                  {
                      colorStops: [
                          {color: gradient.from},
                          {color: gradient.to},
                      ],
                      direction: "to bottom",
                      type: "linear-gradient",
                  },
              ],
          }
        : null;

    return (
        <FastSquircleView
            cornerSmoothing={theme.card.cornerSmoothing}
            style={[
                styles.root,
                gradientStyle ?? getPocCardToneStyle(tone),
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
