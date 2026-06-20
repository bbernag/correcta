import type {
    CardPerformanceItem,
    CardPerformanceVariant,
} from "../types/CardPerformanceTypes";
import {CardPerformanceExistingGroup} from "./CardPerformanceExistingGroup";
import {CardPerformancePocGroup} from "./CardPerformancePocGroup";

export function CardPerformanceCardGroup({
    item,
    variant,
}: {
    item: CardPerformanceItem;
    variant: CardPerformanceVariant;
}) {
    if (variant === "poc") {
        return <CardPerformancePocGroup item={item} />;
    }

    return <CardPerformanceExistingGroup item={item} />;
}
