import {Children, Fragment, isValidElement, type ReactNode} from "react";
import {View} from "react-native";
import {List as ExpoList, ListItem as ExpoListItem, RNHostView} from "@expo/ui";

import {NativeHost} from "../NativeHost";
import type {
    NativeListItemProps,
    NativeListItemSlotProps,
    NativeListItemSlots,
    NativeListProps,
} from "./nativeListTypes";

function NativeListRoot({
    children,
    onRefresh,
    style,
    testID,
    useViewportSizeMeasurement = true,
}: NativeListProps) {
    return (
        <NativeHost
            style={style}
            useViewportSizeMeasurement={useViewportSizeMeasurement}
        >
            <ExpoList onRefresh={onRefresh} testID={testID}>
                {children}
            </ExpoList>
        </NativeHost>
    );
}

function NativeListItem({children, onPress, testID}: NativeListItemProps) {
    const slots = extractNativeListItemSlots(children);

    return (
        <ExpoListItem
            leading={renderNativeSlot(slots.leading)}
            onPress={onPress}
            supportingText={renderNativeSlot(slots.supporting)}
            testID={testID}
            trailing={renderNativeSlot(slots.trailing)}
        >
            {slots.headline}
        </ExpoListItem>
    );
}

function NativeListItemLeading(_props: NativeListItemSlotProps) {
    return null;
}

function NativeListItemSupporting(_props: NativeListItemSlotProps) {
    return null;
}

function NativeListItemTrailing(_props: NativeListItemSlotProps) {
    return null;
}

function extractNativeListItemSlots(children: ReactNode): NativeListItemSlots {
    const headline: ReactNode[] = [];
    let leading: ReactNode;
    let supporting: ReactNode;
    let trailing: ReactNode;

    Children.forEach(children, (child) => {
        if (!isValidElement<NativeListItemSlotProps>(child)) {
            headline.push(child);
            return;
        }

        if (child.type === NativeListItemLeading) {
            leading = child.props.children;
            return;
        }

        if (child.type === NativeListItemSupporting) {
            supporting = child.props.children;
            return;
        }

        if (child.type === NativeListItemTrailing) {
            trailing = child.props.children;
            return;
        }

        headline.push(child);
    });

    return {
        headline:
            headline.length === 1 ? (
                headline[0]
            ) : (
                <Fragment>{headline}</Fragment>
            ),
        leading,
        supporting,
        trailing,
    };
}

function renderNativeSlot(node: ReactNode) {
    if (
        node == null ||
        typeof node === "boolean" ||
        typeof node === "string" ||
        typeof node === "number"
    ) {
        return node;
    }

    return (
        <RNHostView matchContents>
            <View>{node}</View>
        </RNHostView>
    );
}

export const NativeList = Object.assign(NativeListRoot, {
    Item: Object.assign(NativeListItem, {
        Leading: NativeListItemLeading,
        Supporting: NativeListItemSupporting,
        Trailing: NativeListItemTrailing,
    }),
});
