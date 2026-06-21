import {useEffect, useRef, useState} from "react";

import {useReducedMotion} from "../../../hooks/useReducedMotion";
import {motion} from "../../../theme";
import {AppText} from "../AppText";
import type {AppTextProps} from "../AppText";

type AnimatedCounterProps = Omit<AppTextProps, "children"> & {
    durationMs?: number;
    format?: (value: number) => string;
    value: number;
};

export function AnimatedCounter({
    durationMs = motion.duration.emphasis,
    format,
    value,
    ...textProps
}: AnimatedCounterProps) {
    const isReducedMotionEnabled = useReducedMotion();
    const isAnimated = !isReducedMotionEnabled && durationMs > 0;
    const [displayValue, setDisplayValue] = useState(isAnimated ? 0 : value);
    const fromRef = useRef(isAnimated ? 0 : value);
    const frameRef = useRef<number | null>(null);

    useEffect(() => {
        if (!isAnimated) {
            return;
        }

        const from = fromRef.current;
        if (from === value) {
            return;
        }

        let startTimestamp: number | null = null;

        function step(timestamp: number) {
            if (startTimestamp === null) {
                startTimestamp = timestamp;
            }

            const progress = Math.min(
                (timestamp - startTimestamp) / durationMs,
                1
            );
            const eased = 1 - Math.pow(1 - progress, 3);
            const next = Math.round(from + (value - from) * eased);
            fromRef.current = next;
            setDisplayValue(next);

            if (progress < 1) {
                frameRef.current = requestAnimationFrame(step);
            }
        }

        frameRef.current = requestAnimationFrame(step);

        return () => {
            if (frameRef.current !== null) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, [value, durationMs, isAnimated]);

    const rendered = isAnimated ? displayValue : value;

    return (
        <AppText {...textProps}>
            {format ? format(rendered) : String(rendered)}
        </AppText>
    );
}
