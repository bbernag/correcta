import {MenuView as ExpoMenuView} from "@expo/ui/community/menu";
import type {MenuAction} from "@expo/ui/community/menu";

import type {NativeMenuAction, NativeMenuProps} from "./nativeMenuTypes";

export function NativeMenu({
    actions,
    children,
    onAction,
    onClose,
    onOpen,
    shouldOpenOnLongPress,
    style,
    testID,
    title,
}: NativeMenuProps) {
    return (
        <ExpoMenuView
            actions={actions.map(mapNativeMenuAction)}
            onCloseMenu={onClose}
            onOpenMenu={onOpen}
            onPressAction={(event) => onAction?.(event.nativeEvent.event)}
            shouldOpenOnLongPress={shouldOpenOnLongPress}
            style={style}
            testID={testID}
            title={title}
        >
            {children}
        </ExpoMenuView>
    );
}

function mapNativeMenuAction(action: NativeMenuAction): MenuAction {
    return {
        attributes:
            action.destructive || action.disabled || action.hidden
                ? {
                      destructive: action.destructive,
                      disabled: action.disabled,
                      hidden: action.hidden,
                  }
                : undefined,
        displayInline: action.displayInline,
        id: action.id,
        state: action.selected ? "on" : undefined,
        subactions: action.subactions?.map(mapNativeMenuAction),
        title: action.title,
    } as const;
}
