import type {PracticePhase} from "../types/practiceTypes";

export type PracticeSwipeDirection = "left" | "right";

export type PracticeSwipeAction = "continue" | "retry" | "skip";

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
    const isMostlyVertical =
        verticalDistance >
        horizontalDistance * MAX_VERTICAL_TO_HORIZONTAL_RATIO;

    if (isMostlyVertical) {
        return null;
    }

    // Honor the direction the finger is actually moving at release: a fling
    // only commits when its velocity agrees with the displacement, and an
    // opposing fling cancels an otherwise-committed distance swipe so the user
    // can drag or fling back toward center before letting go.
    const velocityAgreesWithDrag =
        Math.sign(velocityX) === Math.sign(translationX);
    const isReversing =
        Math.abs(velocityX) >= MIN_FLING_VELOCITY && !velocityAgreesWithDrag;
    const isFlingSwipe =
        horizontalDistance >= MIN_FLING_DISTANCE &&
        Math.abs(velocityX) >= MIN_FLING_VELOCITY &&
        velocityAgreesWithDrag;
    const isDistanceSwipe =
        horizontalDistance >= MIN_SWIPE_DISTANCE && !isReversing;

    if (!isDistanceSwipe && !isFlingSwipe) {
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
    if (!direction || isChecking) {
        return null;
    }

    if (phase === "answering") {
        return direction === "left" ? "skip" : null;
    }

    if (phase !== "feedback" || !hasResult) {
        return null;
    }

    if (direction === "left") {
        return "continue";
    }

    return canRetry ? "retry" : null;
}
