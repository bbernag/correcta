import type {PropsWithChildren} from "react";
import {useMemo} from "react";
import type {StyleProp, ViewStyle} from "react-native";
import {PanResponder, View} from "react-native";

import {getHorizontalSwipeDirection} from "../utils/practiceGestureUtils";

type PracticeSwipeSurfaceProps = PropsWithChildren<{
    canSwipeLeft: boolean;
    canSwipeRight: boolean;
    onSwipeLeft: () => void;
    onSwipeRight: () => void;
    style?: StyleProp<ViewStyle>;
}>;

export function PracticeSwipeSurface({
    canSwipeLeft,
    canSwipeRight,
    children,
    onSwipeLeft,
    onSwipeRight,
    style,
}: PracticeSwipeSurfaceProps) {
    const panResponder = useMemo(() => {
        return PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) => {
                const direction = getHorizontalSwipeDirection({
                    translationX: gestureState.dx,
                    translationY: gestureState.dy,
                    velocityX: gestureState.vx,
                });

                return canHandleDirection({
                    canSwipeLeft,
                    canSwipeRight,
                    direction,
                });
            },
            onPanResponderRelease: (_, gestureState) => {
                const direction = getHorizontalSwipeDirection({
                    translationX: gestureState.dx,
                    translationY: gestureState.dy,
                    velocityX: gestureState.vx,
                });

                if (direction === "left") {
                    onSwipeLeft();
                    return;
                }

                if (direction === "right") {
                    onSwipeRight();
                }
            },
            onPanResponderTerminationRequest: () => {
                return true;
            },
        });
    }, [canSwipeLeft, canSwipeRight, onSwipeLeft, onSwipeRight]);
    const isEnabled = canSwipeLeft || canSwipeRight;

    return (
        <View
            style={style}
            {...(isEnabled ? panResponder.panHandlers : undefined)}
        >
            {children}
        </View>
    );
}

function canHandleDirection({
    canSwipeLeft,
    canSwipeRight,
    direction,
}: {
    canSwipeLeft: boolean;
    canSwipeRight: boolean;
    direction: "left" | "right" | null;
}) {
    if (direction === "left") {
        return canSwipeLeft;
    }

    if (direction === "right") {
        return canSwipeRight;
    }

    return false;
}
