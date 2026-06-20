// Pre-builds a self-contained *web* dist of the React Native design system for
// design-sync. esbuild resolves react-native -> react-native-web (+ .web.*
// platform files), runs unistyles' web build, and swaps native-only modules for
// shims. react / react-dom / jsx-runtime stay external so the design-sync
// converter can re-point them at window.React / window.ReactDOM in its IIFE.
//
// Run from the repo root:  node .design-sync/web/build-web.mjs [--babel]
//
// --babel  also runs the react-native-unistyles babel plugin over repo source
//          (needed only if unistyles styles don't apply without it).
import {createRequire} from "node:module";
import {dirname, resolve} from "node:path";
import {fileURLToPath} from "node:url";
import {readFileSync, statSync} from "node:fs";

const require = createRequire(import.meta.url);
const root = process.cwd();
const here = dirname(fileURLToPath(import.meta.url));
const esbuild = require(resolve(root, ".ds-sync/node_modules/esbuild"));

const scratch = resolve(here, "web-deps/node_modules");
const repoNm = resolve(root, "node_modules");
const useBabel = process.argv.includes("--babel");

// IconButton -> src/native barrel re-exports runFoundationChecks, which pulls
// app infra (mmkv, nitro-fetch, @bernagl/react-native-date) that has nothing to
// do with the visual components and isn't tree-shaken (the app sets no
// sideEffects:false). Neutralize it so the component bundle stays lean.
function neutralizeFoundationChecks() {
    return {
        name: "neutralize-foundation",
        setup(b) {
            b.onLoad(
                {filter: /[/\\]src[/\\]native[/\\]foundationChecks\.[jt]sx?$/},
                () => ({
                    contents:
                        "export function runFoundationChecks(){return Promise.resolve({});}",
                    loader: "js",
                })
            );
        },
    };
}

// Optional esbuild plugin: run the unistyles babel plugin over repo `src/**`.
function unistylesBabelPlugin() {
    const babel = require(resolve(root, ".ds-sync/node_modules/@babel/core"));
    const srcRoot = resolve(root, "src");
    return {
        name: "unistyles-babel",
        setup(b) {
            b.onLoad({filter: /\.[jt]sx?$/}, (args) => {
                if (!args.path.startsWith(srcRoot)) return undefined;
                const code = readFileSync(args.path, "utf8");
                const out = babel.transformSync(code, {
                    filename: args.path,
                    babelrc: false,
                    configFile: false,
                    presets: [
                        [
                            require(
                                resolve(
                                    root,
                                    ".ds-sync/node_modules/@babel/preset-typescript"
                                )
                            ),
                            {isTSX: true, allExtensions: true},
                        ],
                    ],
                    plugins: [
                        [
                            require(
                                resolve(repoNm, "react-native-unistyles/plugin")
                            ),
                            {root: "src"},
                        ],
                    ],
                    sourceMaps: "inline",
                });
                return {contents: out.code, loader: "js"};
            });
        },
    };
}

try {
    const result = await esbuild.build({
        entryPoints: [resolve(here, "entry.ts")],
        outfile: resolve(here, "dist/index.mjs"),
        bundle: true,
        format: "esm",
        platform: "browser",
        target: "es2020",
        jsx: "automatic",
        nodePaths: [scratch, repoNm],
        resolveExtensions: [
            ".web.tsx",
            ".web.ts",
            ".web.jsx",
            ".web.js",
            ".tsx",
            ".ts",
            ".jsx",
            ".js",
            ".mjs",
            ".cjs",
            ".json",
        ],
        conditions: ["browser", "import", "module", "default"],
        external: [
            "react",
            "react-dom",
            "react/jsx-runtime",
            "react/jsx-dev-runtime",
        ],
        alias: {
            "react-native": "react-native-web",
            "react-native-fast-squircle": resolve(
                here,
                "shims/fast-squircle.tsx"
            ),
            "react-native-pulsar": resolve(here, "shims/pulsar.ts"),
            "react-native-nitro-modules": resolve(
                here,
                "shims/nitro-modules.ts"
            ),
            "lucide-react-native/icons": "lucide-react",
            "lucide-react-native": "lucide-react",
        },
        define: {__DEV__: "false", "process.env.NODE_ENV": '"development"'},
        loader: {
            ".png": "dataurl",
            ".jpg": "dataurl",
            ".jpeg": "dataurl",
            ".gif": "dataurl",
            ".webp": "dataurl",
            ".woff": "dataurl",
            ".woff2": "dataurl",
            ".ttf": "dataurl",
        },
        plugins: [
            neutralizeFoundationChecks(),
            ...(useBabel ? [unistylesBabelPlugin()] : []),
        ],
        metafile: true,
        logLevel: "warning",
        legalComments: "none",
    });

    const inputs = Object.keys(result.metafile.inputs ?? {});
    const pkgs = [
        ...new Set(
            inputs
                .map(
                    (p) =>
                        p.match(
                            /(?:^|\/)node_modules\/((?:@[^/]+\/)?[^/]+)\//
                        )?.[1]
                )
                .filter(Boolean)
        ),
    ].sort();
    const sizeKb = (
        statSync(resolve(here, "dist/index.mjs")).size / 1024
    ).toFixed(0);
    console.error(
        `[web-build] OK  babel=${useBabel}  ${sizeKb} KB  inputs=${inputs.length}`
    );
    console.error(
        `[web-build] inlined npm packages (${pkgs.length}): ${pkgs.join(", ")}`
    );
} catch (e) {
    console.error("[web-build] FAILED");
    if (e.errors)
        for (const er of e.errors)
            console.error(
                "  •",
                er.text,
                er.location ? `(${er.location.file}:${er.location.line})` : ""
            );
    else console.error(e);
    process.exit(1);
}
