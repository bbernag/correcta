type RgbChannels = {b: number; g: number; r: number};

/**
 * How far the deep stop blends the soft fill toward its strong tone. Blending
 * toward the tone keeps the gradient on-hue (a richer, deeper version of the
 * same color) instead of multiplicative darkening, which desaturates a pale
 * fill into a gray shadow.
 */
const DEEP_BLEND = 0.3;
const SEAM_POSITION = 0.42;

export type NoticeCardGradient = {
    bottom: string;
    seam: string;
    top: string;
};

/**
 * Builds a vertical feedback gradient from a tone's soft fill and its strong
 * accent. The deep stop is the soft color blended toward the strong tone, so it
 * stays the same hue. Orientation follows luminance, so the darker stop is
 * always on top and the lighter on the bottom in both light and dark themes.
 * The shared seam is reused by the title base, bridge, and body top so the
 * linked card reads as one continuous surface.
 */
export function getNoticeCardGradient(
    soft: string,
    strong: string
): NoticeCardGradient {
    const deep = mix(soft, strong, DEEP_BLEND);
    const softIsDarker = luminance(soft) <= luminance(deep);
    const top = softIsDarker ? soft : deep;
    const bottom = softIsDarker ? deep : soft;

    return {
        bottom,
        seam: mix(top, bottom, SEAM_POSITION),
        top,
    };
}

function mix(from: string, to: string, ratio: number): string {
    const a = parseHex(from);
    const b = parseHex(to);
    const blend = (start: number, end: number) => start + (end - start) * ratio;

    return toHex({
        b: blend(a.b, b.b),
        g: blend(a.g, b.g),
        r: blend(a.r, b.r),
    });
}

function luminance(hex: string): number {
    const {b, g, r} = parseHex(hex);

    return 0.299 * r + 0.587 * g + 0.114 * b;
}

function parseHex(hex: string): RgbChannels {
    const normalized = hex.replace("#", "");

    return {
        b: parseInt(normalized.slice(4, 6), 16),
        g: parseInt(normalized.slice(2, 4), 16),
        r: parseInt(normalized.slice(0, 2), 16),
    };
}

function toHex({b, g, r}: RgbChannels): string {
    return `#${channelToHex(r)}${channelToHex(g)}${channelToHex(b)}`;
}

function channelToHex(value: number): string {
    return Math.max(0, Math.min(255, Math.round(value)))
        .toString(16)
        .padStart(2, "0");
}
