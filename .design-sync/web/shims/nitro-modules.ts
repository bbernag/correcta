// design-sync web shim for `react-native-nitro-modules`.
// Nitro is a native JSI bridge with no web implementation; its real module
// imports deep `react-native/Libraries/*` paths that react-native-web lacks.
// react-native-unistyles' web build only pulls Nitro transitively (it never
// calls into it for web style resolution), so a permissive no-op stub keeps
// the graph web-resolvable. Any property access / call / construction returns
// another callable proxy so nothing throws at module-eval time.
const handler: ProxyHandler<any> = {
    get: (_t, prop) => {
        if (prop === "prototype") return {};
        if (prop === Symbol.toPrimitive) return () => "";
        if (prop === "name") return "NitroStub";
        return makeStub();
    },
    apply: () => makeStub(),
    construct: () => makeStub(),
};

function makeStub(): any {
    return new Proxy(function nitroStub() {}, handler);
}

export const NitroModules: any = makeStub();
export const getHybridObjectConstructor: any = () => makeStub();
export const HybridObject: any = makeStub();
export const BoxedHybridObject: any = makeStub();
export const AnyMap: any = makeStub();
export const Sync: any = makeStub();
export const Int64: any = makeStub();

export default makeStub();
