import prettier from "eslint-plugin-prettier";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    {
        ignores: ["**/coverage", "**/templates"],
    },
    ...compat.extends("eslint:recommended", "plugin:prettier/recommended", "prettier"),
    {
        plugins: {
            prettier,
        },
        languageOptions: {
            globals: {
                ...Object.fromEntries(Object.entries(globals.browser).map(([key]) => [key, "off"])),
                ...Object.fromEntries(Object.entries(globals.commonjs).map(([key]) => [key, "off"])),
                ...globals.node,
            },
            ecmaVersion: "latest",
            sourceType: "module",
        },

        rules: {
            "babel/no-invalid-this": 0,
            "import/no-anonymous-default-export": 0,
            "import/no-unresolved": [
                "error",
                {
                    ignore: ["^jquery"],
                },
            ],
            "no-alert": 0,
            "no-console": 0,
            "no-new": 0,
            "node/shebang": 0,
            "prettier/prettier": ["error"],
            "sort-imports": [
                "error",
                {
                    ignoreDeclarationSort: true,
                },
            ],
        },
    },
];
