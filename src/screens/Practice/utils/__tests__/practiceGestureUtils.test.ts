import {
    getHorizontalSwipeDirection,
    getPracticeSwipeAction,
} from "../practiceGestureUtils";

describe("getHorizontalSwipeDirection", () => {
    it("returns left for a mostly horizontal left swipe", () => {
        expect(
            getHorizontalSwipeDirection({
                translationX: -80,
                translationY: 12,
                velocityX: -0.2,
            })
        ).toBe("left");
    });

    it("returns right for a mostly horizontal right swipe", () => {
        expect(
            getHorizontalSwipeDirection({
                translationX: 84,
                translationY: 10,
                velocityX: 0.2,
            })
        ).toBe("right");
    });

    it("allows short intentional flings", () => {
        expect(
            getHorizontalSwipeDirection({
                translationX: -30,
                translationY: 6,
                velocityX: -0.5,
            })
        ).toBe("left");
    });

    it("ignores mostly vertical movement", () => {
        expect(
            getHorizontalSwipeDirection({
                translationX: -80,
                translationY: 72,
                velocityX: -0.5,
            })
        ).toBeNull();
    });

    it("ignores small slow drags", () => {
        expect(
            getHorizontalSwipeDirection({
                translationX: -20,
                translationY: 4,
                velocityX: -0.1,
            })
        ).toBeNull();
    });
});

describe("getPracticeSwipeAction", () => {
    it("continues on left swipe during feedback", () => {
        expect(
            getPracticeSwipeAction({
                canRetry: true,
                direction: "left",
                hasResult: true,
                isChecking: false,
                phase: "feedback",
            })
        ).toBe("continue");
    });

    it("retries on right swipe only when retry is available", () => {
        expect(
            getPracticeSwipeAction({
                canRetry: true,
                direction: "right",
                hasResult: true,
                isChecking: false,
                phase: "feedback",
            })
        ).toBe("retry");
    });

    it("ignores right swipe when retry is unavailable", () => {
        expect(
            getPracticeSwipeAction({
                canRetry: false,
                direction: "right",
                hasResult: true,
                isChecking: false,
                phase: "feedback",
            })
        ).toBeNull();
    });

    it("ignores answering phase swipes", () => {
        expect(
            getPracticeSwipeAction({
                canRetry: true,
                direction: "left",
                hasResult: false,
                isChecking: false,
                phase: "answering",
            })
        ).toBeNull();
    });

    it("ignores swipes while checking", () => {
        expect(
            getPracticeSwipeAction({
                canRetry: true,
                direction: "left",
                hasResult: true,
                isChecking: true,
                phase: "feedback",
            })
        ).toBeNull();
    });
});
