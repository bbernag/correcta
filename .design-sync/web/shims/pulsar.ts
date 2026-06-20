// design-sync web shim for `react-native-pulsar` (native haptics engine).
// Pulled in transitively by IconButton -> src/native -> haptics service.
// Haptics are non-critical, fire only on press (never during static preview
// render), and the call sites are already wrapped in try/catch. No-ops here.
const noop = (): void => {};

export const Presets = {
    System: {
        notificationError: noop,
        notificationSuccess: noop,
        notificationWarning: noop,
        impactLight: noop,
        impactMedium: noop,
        impactHeavy: noop,
        selection: noop,
    },
};

export const Settings = {
    enableHaptics: noop,
};

export default {Presets, Settings};
