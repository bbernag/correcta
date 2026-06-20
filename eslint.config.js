const {defineConfig} = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
    ...expoConfig,
    {
        ignores: [
            "dist/**",
            "web-build/**",
            "ios/**",
            "android/**",
            ".ds-sync/**",
            ".design-sync/web/dist/**",
            ".design-sync/web/web-deps/**",
        ],
    },
]);
