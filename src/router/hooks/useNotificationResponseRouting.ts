import type {NavigationContainerRefWithCurrent} from "@react-navigation/native";
import {useCallback, useEffect, useRef} from "react";

import {
    addNotificationResponseRouteListener,
    configureNotificationPresentation,
    getLastNotificationResponseRoute,
    type NotificationResponseRoute,
} from "../../native/notifications";
import type {RootStackParamList} from "../types";

export function useNotificationResponseRouting(
    navigationRef: NavigationContainerRefWithCurrent<RootStackParamList>
) {
    const pendingRouteRef = useRef<NotificationResponseRoute | null>(null);

    const navigateToNotificationRoute = useCallback(
        (route: NotificationResponseRoute) => {
            if (!navigationRef.isReady()) {
                pendingRouteRef.current = route;
                return;
            }

            navigationRef.navigate("MainTabs", {
                screen: route.routeName,
            });
        },
        [navigationRef]
    );

    const handleNavigationReady = useCallback(() => {
        const pendingRoute = pendingRouteRef.current;

        if (!pendingRoute) {
            return;
        }

        pendingRouteRef.current = null;
        navigateToNotificationRoute(pendingRoute);
    }, [navigateToNotificationRoute]);

    useEffect(() => {
        configureNotificationPresentation();

        const initialRoute = getLastNotificationResponseRoute();

        if (initialRoute) {
            navigateToNotificationRoute(initialRoute);
        }

        const subscription = addNotificationResponseRouteListener(
            navigateToNotificationRoute
        );

        return () => {
            subscription.remove();
        };
    }, [navigateToNotificationRoute]);

    return {handleNavigationReady};
}
