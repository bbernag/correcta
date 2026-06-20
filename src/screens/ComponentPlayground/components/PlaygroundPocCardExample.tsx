import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { AppText, PocCard } from "../../../components/common";

export function PlaygroundPocCardExample() {
  return (
    <View style={styles.root}>
      <View style={styles.demo}>
        <AppText variant="caption" tone="muted">
          Vertical
        </AppText>
        <View style={styles.canvas}>
          <PocCard>
            <PocCard.Section
              contentStyle={styles.sequenceContent}
              style={styles.sequenceSection}
            >
              <AppText variant="bodySmall">Sequence rush</AppText>
              <AppText
                variant="caption"
                tone="muted"
                style={styles.chevronText}
              >
                v
              </AppText>
            </PocCard.Section>
            <PocCard.Section
              contentStyle={styles.scoreContent}
              style={styles.scoreSection}
            >
              <View style={styles.statsRow}>
                <View style={styles.stat}>
                  <AppText variant="bodySmall">
                    Best score
                  </AppText>
                  <AppText variant="caption" tone="muted">
                    Expert game mode
                  </AppText>
                  <AppText variant="heading">2,435</AppText>
                </View>
                <View style={styles.stat}>
                  <AppText variant="bodySmall">
                    Reaction speed
                  </AppText>
                  <AppText variant="caption" tone="muted">
                    Average time
                  </AppText>
                  <AppText variant="heading">319 ms</AppText>
                </View>
              </View>
            </PocCard.Section>
          </PocCard>
        </View>
      </View>

      <View style={styles.demo}>
        <AppText variant="caption" tone="muted">
          Horizontal
        </AppText>
        <View style={styles.canvas}>
          <PocCard bridgeSpan={0.4} orientation="horizontal">
            <PocCard.Section
              contentStyle={styles.horizontalSectionContent}
              style={styles.horizontalSection}
            >
              <View style={styles.stat}>
                <AppText variant="caption" tone="muted">
                  Saved terms
                </AppText>
                <AppText variant="heading">48</AppText>
              </View>
            </PocCard.Section>
            <PocCard.Section
              contentStyle={styles.horizontalSectionContent}
              style={styles.horizontalSection}
            >
              <View style={styles.stat}>
                <AppText variant="caption" tone="muted">
                  Review pace
                </AppText>
                <AppText variant="heading">6m</AppText>
              </View>
            </PocCard.Section>
          </PocCard>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: {
    gap: theme.spacing.lg,
  },
  demo: {
    gap: theme.spacing.sm,
  },
  canvas: {
    backgroundColor: theme.colors.canvas,
    borderRadius: theme.radii.sheet,
    padding: theme.spacing.sm,
  },
  sequenceSection: {
    justifyContent: "center",
    minHeight: 64,
  },
  sequenceContent: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  chevronText: {
    textTransform: "uppercase",
  },
  scoreSection: {
    justifyContent: "center",
    minHeight: 112,
  },
  scoreContent: {
    width: "100%",
  },
  statsRow: {
    flexDirection: "row",
    gap: theme.spacing.xl,
  },
  stat: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  horizontalSection: {
    justifyContent: "center",
    minHeight: 112,
  },
  horizontalSectionContent: {
    width: "100%",
  },
}));
