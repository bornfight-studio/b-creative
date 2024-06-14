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
        ignores: ["**/node_modules/", "**/bower_components/", "static/js/vendor/**/*.js", "**/dist/"],
    },
    ...compat.extends("eslint:recommended", "plugin:prettier/recommended", "prettier"),
    {
        plugins: {
            prettier,
        },
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.commonjs,
                ...globals.node,
                document: true,
                frontend_rest_object: true,
                window: true,
                wp: true,
            },
            ecmaVersion: "latest",
            sourceType: "module",
        },
        rules: {
            "babel/no-invalid-this": 0,
            "import/no-anonymous-default-export": 0,
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
