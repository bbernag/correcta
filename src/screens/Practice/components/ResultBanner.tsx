import {View} from "react-native";
import {EaseView, type Transition} from "react-native-ease";
import {StyleSheet} from "react-native-unistyles";

import {
    AppText,
    FeedbackHighlight,
    ResultBadge,
} from "../../../components/common";
import {motion} from "../../../theme";
import {usePracticeAnimations} from "../hooks/usePracticeAnimations";
import type {PracticeResult} from "../types/practiceTypes";
import {
    formatScore,
    getFeedbackTone,
    getResultBadgeTone,
    getStatusLabel,
} from "../utils/practiceUtils";

const BADGE_TRANSITION = {
    damping: motion.spring.emphasis.damping,
    mass: motion.spring.emphasis.mass,
    stiffness: motion.spring.emphasis.stiffness,
    type: "spring",
} satisfies Transition;

const REDUCED_MOTION_TRANSITION = {
    type: "none",
} satisfies Transition;

type ResultBannerProps = {
    result: PracticeResult;
};

export function ResultBanner({result}: ResultBannerProps) {
    const animations = usePracticeAnimations();
    const status = result.validation.status;

    return (
        <EaseView
            animate={animations.visible}
            initialAnimate={animations.initialFadeSlide}
            transition={animations.entryTransition}
        >
            <FeedbackHighlight
                message={result.feedback.simpleExplanation}
                title={getStatusLabel(status)}
                tone={getFeedbackTone(status)}
            >
                <View style={styles.content}>
                    <View style={styles.badgeRow}>
                        <EaseView
                            animate={{opacity: 1, scale: 1}}
                            initialAnimate={{
                                opacity: animations.isReducedMotionEnabled
                                    ? 1
                                    : 0,
                                scale: animations.isReducedMotionEnabled
                                    ? 1
                                    : 0.9,
                            }}
                            transition={
                                animations.isReducedMotionEnabled
                                    ? REDUCED_MOTION_TRANSITION
                                    : BADGE_TRANSITION
                            }
                        >
                            <ResultBadge
                                label={formatScore(result.validation.score)}
                                tone={getResultBadgeTone(status)}
                            />
                        </EaseView>
                        <AppText tone="secondary" variant="bodySmall">
                            Teacher feedback
                        </AppText>
                    </View>
                    <AppText tone="secondary">
                        {result.feedback.explanation}
                    </AppText>
                </View>
            </FeedbackHighlight>
        </EaseView>
    );
}

const styles = StyleSheet.create((theme) => ({
    content: {
        gap: theme.spacing.sm,
    },
    badgeRow: {
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: theme.spacing.sm,
    },
}));
