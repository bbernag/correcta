// design-sync web shim for `react-native-fast-squircle`.
// The native FastSquircleView draws iOS-style squircle (continuous-corner)
// rounding via a native view. On web there is no continuous-corner primitive,
// so we degrade to a plain react-native-web View — `borderRadius` from the
// passed style still produces rounded corners (circular, not squircle).
// `cornerSmoothing` is accepted and ignored. This is the documented
// best-effort web fidelity loss for Surface / Card / PocCard.
import * as React from "react";
import {View, type ViewProps} from "react-native";

type FastSquircleViewProps = ViewProps & {
    cornerSmoothing?: number;
    preserveSmoothing?: boolean;
    borderRadius?: number;
};

const FastSquircleView = React.forwardRef<View, FastSquircleViewProps>(
    function FastSquircleView(
        {
            cornerSmoothing: _cs,
            preserveSmoothing: _ps,
            borderRadius,
            style,
            ...props
        },
        ref
    ) {
        const radiusStyle = borderRadius == null ? null : {borderRadius};
        return <View ref={ref} style={[radiusStyle, style]} {...props} />;
    }
);

export default FastSquircleView;
export {FastSquircleView};
