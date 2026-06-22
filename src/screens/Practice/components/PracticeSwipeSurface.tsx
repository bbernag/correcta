import type {PropsWithChildren} from "react";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import type {
    AccessibilityActionEvent,
    AccessibilityActionInfo,
    StyleProp,
    ViewStyle,
} from "react-native";
import {Animated, Easing, useWindowDimensions, View} from "react-native";
import {Gesture, GestureDetector} from "react-native-gesture-handler";
import {StyleSheet} from "react-native-unistyles";

import {AppText, Icon} from "../../../components/common";
import {useReducedMotion} from "../../../hooks/useReducedMotion";
import {getHorizontalSwipeDirection} from "../utils/practiceGestureUtils";

const SWIPE_EXIT_DURATION_MS = 220;
const SWIPE_ENTER_DAMPING = 17;
const SWIPE_ENTER_STIFFNESS = 120;
const EXIT_OVERSHOOT = 48;
const NUDGE_OFFSET = -22;
const NUDGE_DURATION_MS = 200;
const HINT_FADE_DURATION_MS = 200;

type PracticeSwipeSurfaceProps = PropsWithChildren<{
    accessibilityActions?: AccessibilityActionInfo[];
    accessibilityHint?: string;
    accessibilityLabel?: string;
    animateLeftExit?: boolean;
    canSwipeLeft: boolean;
    canSwipeRight: boolean;
    nudgeToken?: number;
    onAccessibilityAction?: (event: AccessibilityActionEvent) => void;
    onInteract?: () => void;
    onSwipeLeft: () => void | Promise<void>;
    onSwipeRight: () => void | Promise<void>;
    revealSkipOnDragLeft?: boolean;
    showNextCardPeek?: boolean;
    skipHintVisible?: boolean;
    style?: StyleProp<ViewStyle>;
}>;

export function PracticeSwipeSurface({
    accessibilityActions,
    accessibilityHint,
    accessibilityLabel,
    animateLeftExit = false,
    canSwipeLeft,
    canSwipeRight,
    children,
    nudgeToken,
    onAccessibilityAction,
    onInteract,
    onSwipeLeft,
    onSwipeRight,
    revealSkipOnDragLeft = false,
    showNextCardPeek = false,
    skipHintVisible,
    style,
}: PracticeSwipeSurfaceProps) {
    const {width} = useWindowDimensions();
    const isReducedMotionEnabled = useReducedMotion();
    const [translateX] = useState(() => {
        return new Animated.Value(0);
    });
    const [hintOpacity] = useState(() => {
        return new Animated.Value(0);
    });
    const startAbsoluteXRef = useRef(0);
    const startAbsoluteYRef = useRef(0);
    const latestTranslationXRef = useRef(0);
    const latestTranslationYRef = useRef(0);
    const latestVelocityXRef = useRef(0);
    const previousNudgeTokenRef = useRef(nudgeToken ?? 0);
    const [isAnimating, setIsAnimating] = useState(false);
    const surfaceWidth = Math.max(width, 320);
    const exitOffset = -(surfaceWidth + EXIT_OVERSHOOT);
    const rotate = translateX.interpolate({
        extrapolate: "clamp",
        inputRange: [-surfaceWidth, 0, surfaceWidth],
        outputRange: ["-4deg", "0deg", "4deg"],
    });
    const opacity = translateX.interpolate({
        extrapolate: "clamp",
        inputRange: [-surfaceWidth, 0, surfaceWidth],
        outputRange: [0.72, 1, 0.84],
    });
    const skipRevealOpacity = translateX.interpolate({
        extrapolate: "clamp",
        inputRange: [-120, -28, 0],
        outputRange: [1, 0, 0],
    });
    const peekOpacity = translateX.interpolate({
        extrapolate: "clamp",
        inputRange: [-surfaceWidth, -40, 0],
        outputRange: [0.85, 0.5, 0.32],
    });

    const springToRest = useCallback(() => {
        setIsAnimating(true);
        Animated.spring(translateX, {
            damping: SWIPE_ENTER_DAMPING,
            stiffness: SWIPE_ENTER_STIFFNESS,
            toValue: 0,
            useNativeDriver: true,
        }).start(() => {
            setIsAnimating(false);
        });
    }, [translateX]);

    const handleLeftSwipe = useCallback(() => {
        if (!animateLeftExit || isReducedMotionEnabled) {
            void onSwipeLeft();
            return;
        }

        setIsAnimating(true);
        Animated.timing(translateX, {
            duration: SWIPE_EXIT_DURATION_MS,
            easing: Easing.out(Easing.cubic),
            toValue: exitOffset,
            useNativeDriver: true,
        }).start(() => {
            translateX.setValue(surfaceWidth);
            Promise.resolve(onSwipeLeft()).finally(() => {
                setTimeout(springToRest, 0);
            });
        });
    }, [
        animateLeftExit,
        exitOffset,
        isReducedMotionEnabled,
        onSwipeLeft,
        springToRest,
        surfaceWidth,
        translateX,
    ]);

    const handleRightSwipe = useCallback(() => {
        void onSwipeRight();
        springToRest();
    }, [onSwipeRight, springToRest]);
    const isEnabled = (canSwipeLeft || canSwipeRight) && !isAnimating;

    // One-time discovery nudge: tug the card left, then settle back to center.
    // A touch interrupts it naturally — onBegin stops in-flight animations.
    useEffect(() => {
        const token = nudgeToken ?? 0;

        if (token === previousNudgeTokenRef.current) {
            return;
        }

        previousNudgeTokenRef.current = token;

        if (token === 0 || isReducedMotionEnabled) {
            return;
        }

        const nudge = Animated.sequence([
            Animated.timing(translateX, {
                duration: NUDGE_DURATION_MS,
                easing: Easing.out(Easing.cubic),
                toValue: NUDGE_OFFSET,
                useNativeDriver: true,
            }),
            Animated.spring(translateX, {
                damping: SWIPE_ENTER_DAMPING,
                stiffness: SWIPE_ENTER_STIFFNESS,
                toValue: 0,
                useNativeDriver: true,
            }),
        ]);

        nudge.start();

        return () => {
            nudge.stop();
        };
    }, [isReducedMotionEnabled, nudgeToken, translateX]);

    useEffect(() => {
        Animated.timing(hintOpacity, {
            duration: isReducedMotionEnabled ? 0 : HINT_FADE_DURATION_MS,
            toValue: skipHintVisible ? 1 : 0,
            useNativeDriver: true,
        }).start();
    }, [hintOpacity, isReducedMotionEnabled, skipHintVisible]);

    // RNGH stores these callbacks for native gesture events; ref reads/writes
    // happen after render when the gesture fires, not while rendering.
    /* eslint-disable react-hooks/refs */
    const panGesture = useMemo(() => {
        return Gesture.Pan()
            .enabled(isEnabled)
            .activeOffsetX([-16, 16])
            .runOnJS(true)
            .onBegin((event) => {
                startAbsoluteXRef.current = event.absoluteX;
                startAbsoluteYRef.current = event.absoluteY;
                latestTranslationXRef.current = 0;
                latestTranslationYRef.current = 0;
                latestVelocityXRef.current = 0;
                translateX.stopAnimation();
                onInteract?.();
            })
            .onUpdate((event) => {
                if (isReducedMotionEnabled) {
                    return;
                }

                latestTranslationXRef.current = getGestureTranslation({
                    absolutePosition: event.absoluteX,
                    fallbackTranslation: latestTranslationXRef.current,
                    startAbsolutePosition: startAbsoluteXRef.current,
                    translation: event.translationX,
                });
                latestTranslationYRef.current = getGestureTranslation({
                    absolutePosition: event.absoluteY,
                    fallbackTranslation: latestTranslationYRef.current,
                    startAbsolutePosition: startAbsoluteYRef.current,
                    translation: event.translationY,
                });
                latestVelocityXRef.current = event.velocityX;
                translateX.setValue(
                    getAllowedTranslationX({
                        canSwipeLeft,
                        canSwipeRight,
                        translationX: latestTranslationXRef.current,
                    })
                );
            })
            .onEnd((event) => {
                const translationX = getGestureTranslation({
                    absolutePosition: event.absoluteX,
                    fallbackTranslation: latestTranslationXRef.current,
                    startAbsolutePosition: startAbsoluteXRef.current,
                    translation: event.translationX,
                });
                const translationY = getGestureTranslation({
                    absolutePosition: event.absoluteY,
                    fallbackTranslation: latestTranslationYRef.current,
                    startAbsolutePosition: startAbsoluteYRef.current,
                    translation: event.translationY,
                });
                const velocityX = event.velocityX || latestVelocityXRef.current;
                const direction = getHorizontalSwipeDirection({
                    translationX,
                    translationY,
                    velocityX,
                });

                if (direction === "left" && canSwipeLeft) {
                    handleLeftSwipe();
                    return;
                }

                if (direction === "right" && canSwipeRight) {
                    handleRightSwipe();
                    return;
                }

                springToRest();
            })
            .onFinalize((_, success) => {
                if (success) {
                    return;
                }

                springToRest();
            });
    }, [
        canSwipeLeft,
        canSwipeRight,
        handleLeftSwipe,
        handleRightSwipe,
        isEnabled,
        isReducedMotionEnabled,
        onInteract,
        springToRest,
        translateX,
    ]);
    /* eslint-enable react-hooks/refs */

    return (
        <GestureDetector gesture={panGesture}>
            <Animated.View
                accessibilityActions={accessibilityActions}
                accessibilityHint={accessibilityHint}
                accessibilityLabel={accessibilityLabel}
                collapsable={false}
                onAccessibilityAction={onAccessibilityAction}
                style={[style, styles.container]}
            >
                {showNextCardPeek ? (
                    <Animated.View
                        pointerEvents="none"
                        style={[styles.peek, {opacity: peekOpacity}]}
                    />
                ) : null}
                {revealSkipOnDragLeft ? (
                    <Animated.View
                        pointerEvents="none"
                        style={[styles.skipReveal, {opacity: skipRevealOpacity}]}
                    >
                        <Icon name="skip" size="dense" tone="secondary" />
                        <AppText tone="secondary" variant="label">
                            Skip
                        </AppText>
                    </Animated.View>
                ) : null}
                <Animated.View
                    style={{
                        opacity,
                        transform: [{translateX}, {rotate}],
                    }}
                >
                    {children}
                </Animated.View>
                {skipHintVisible === undefined ? null : (
                    <Animated.View
                        accessibilityElementsHidden={!skipHintVisible}
                        importantForAccessibility={
                            skipHintVisible ? "auto" : "no-hide-descendants"
                        }
                        pointerEvents="none"
                        style={[styles.hintLayer, {opacity: hintOpacity}]}
                    >
                        <View style={styles.hintPill}>
                            <Icon name="skip" size="dense" tone="inverted" />
                            <AppText tone="inverted" variant="caption">
                                Swipe left to skip
                            </AppText>
                        </View>
                    </Animated.View>
                )}
            </Animated.View>
        </GestureDetector>
    );
}

function getAllowedTranslationX({
    canSwipeLeft,
    canSwipeRight,
    translationX,
}: {
    canSwipeLeft: boolean;
    canSwipeRight: boolean;
    translationX: number;
}) {
    if (canSwipeLeft && canSwipeRight) {
        return translationX;
    }

    if (canSwipeLeft) {
        return Math.min(0, translationX);
    }

    if (canSwipeRight) {
        return Math.max(0, translationX);
    }

    return 0;
}

function getGestureTranslation({
    absolutePosition,
    fallbackTranslation,
    startAbsolutePosition,
    translation,
}: {
    absolutePosition: number;
    fallbackTranslation: number;
    startAbsolutePosition: number;
    translation: number;
}) {
    if (translation !== 0) {
        return translation;
    }

    const absoluteTranslation = absolutePosition - startAbsolutePosition;

    if (absoluteTranslation !== 0) {
        return absoluteTranslation;
    }

    return fallbackTranslation;
}

const styles = StyleSheet.create((theme) => ({
    container: {
        position: "relative",
    },
    peek: {
        backgroundColor: theme.colors.surfaceTonal,
        borderColor: theme.colors.borderSubtle,
        borderRadius: theme.radii.card,
        borderWidth: 1,
        bottom: theme.spacing.lg,
        left: theme.spacing.xl,
        position: "absolute",
        right: -theme.spacing.xs,
        top: theme.spacing.lg,
    },
    skipReveal: {
        alignItems: "center",
        bottom: 0,
        flexDirection: "row",
        gap: theme.spacing.xs,
        justifyContent: "center",
        position: "absolute",
        right: theme.spacing.xl,
        top: 0,
    },
    hintLayer: {
        alignItems: "center",
        bottom: theme.spacing.lg,
        left: 0,
        position: "absolute",
        right: 0,
    },
    hintPill: {
        alignItems: "center",
        backgroundColor: theme.colors.surfaceInverse,
        borderRadius: theme.radii.pill,
        flexDirection: "row",
        gap: theme.spacing.xs,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
        ...theme.shadows.surface,
    },
}));
