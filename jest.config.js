// Unit-test runner for pure TypeScript logic (services, utils, helpers).
// Uses a node environment and a minimal babel transform that bypasses the
// React Native unistyles/reanimated plugins in babel.config.js, which are only
// meaningful inside the native runtime.
module.exports = {
    testEnvironment: "node",
    testMatch: ["**/__tests__/**/*.test.ts"],
    transform: {
        "^.+\\.[jt]sx?$": [
            "babel-jest",
            {
                babelrc: false,
                configFile: false,
                presets: ["babel-preset-expo"],
            },
        ],
    },
};
