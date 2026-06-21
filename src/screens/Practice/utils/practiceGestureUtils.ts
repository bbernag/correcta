import type {PracticePhase} from "../types/practiceTypes";

export type PracticeSwipeDirection = "left" | "right";

export type PracticeSwipeAction = "continue" | "retry";

const MIN_SWIPE_DISTANCE = 64;
const MIN_FLING_DISTANCE = 24;
const MIN_FLING_VELOCITY = 0.35;
const MAX_VERTICAL_TO_HORIZONTAL_RATIO = 0.7;

export function getHorizontalSwipeDirection({
    translationX,
    translationY,
    velocityX,
}: {
    translationX: number;
    translationY: number;
    velocityX: number;
}): PracticeSwipeDirection | null {
    const horizontalDistance = Math.abs(translationX);
    const verticalDistance = Math.abs(translationY);
    const isDistanceSwipe = horizontalDistance >= MIN_SWIPE_DISTANCE;
    const isFlingSwipe =
        horizontalDistance >= MIN_FLING_DISTANCE &&
        Math.abs(velocityX) >= MIN_FLING_VELOCITY;
    const isMostlyVertical =
        verticalDistance >
        horizontalDistance * MAX_VERTICAL_TO_HORIZONTAL_RATIO;

    if ((!isDistanceSwipe && !isFlingSwipe) || isMostlyVertical) {
        return null;
    }

    return translationX < 0 ? "left" : "right";
}

export function getPracticeSwipeAction({
    canRetry,
    direction,
    hasResult,
    isChecking,
    phase,
}: {
    canRetry: boolean;
    direction: PracticeSwipeDirection | null;
    hasResult: boolean;
    isChecking: boolean;
    phase: PracticePhase;
}): PracticeSwipeAction | null {
    if (!direction || phase !== "feedback" || isChecking || !hasResult) {
        return null;
    }

    if (direction === "left") {
        return "continue";
    }

    return canRetry ? "retry" : null;
}
