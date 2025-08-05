import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import importPlugin from "eslint-plugin-import";
import configLove from 'eslint-config-love';
import testingLibrary from "eslint-plugin-testing-library";
import perfectionist from 'eslint-plugin-perfectionist'
import jestDom from "eslint-plugin-jest-dom";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: [
        "commitlint.test.js",
        "commitlint.config.js",
        "**/configureTotoWidget.js",
        "eslint.config.mjs",
        ".lintstagedrc.cjs",
        ".prettierrc.cjs",
        "**/.DS_Store",
        "**/node_modules",
        "build",
        "dist",
        "hooks",
        ".env.*",
        "coverage",
        ".husky",
        "**/*.d.ts",
        "**/package-lock.json",
    ],
}, ...fixupConfigRules(compat.extends(
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "plugin:testing-library/react",
)), {
    plugins: {
        react: fixupPluginRules(react),
        "react-hooks": fixupPluginRules(reactHooks),
        "eslint-config-love": configLove,
        import: fixupPluginRules(importPlugin),
        "@typescript-eslint": fixupPluginRules(typescriptEslint),
        prettier: fixupPluginRules(prettier),
        "testing-library": fixupPluginRules(testingLibrary),
        "jest-dom": jestDom,
        perfectionist
    },
    languageOptions: {
        globals: {
            ...globals.browser,
            cy: true,
        },
        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",
        parserOptions: {
            project: "tsconfig.json",
            sourceType: "module",
        },
    },
    settings: {
        react: {
            version: "detect",
        },
    },
    rules: {
        '@typescript-eslint/consistent-type-imports': ['error', {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports'
      }],
        "@typescript-eslint/prefer-nullish-coalescing": 0,
        "@typescript-eslint/explicit-function-return-type": 0,
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-misused-promises": 0,
        "@typescript-eslint/promise-function-async": 0,
        "@typescript-eslint/restrict-plus-operands": 0,
        "@typescript-eslint/strict-boolean-expressions": 0,
        "@typescript-eslint/triple-slash-reference": 0,

        'arrow-body-style': ['error', 'as-needed'],
        "no-unused-vars": 0,
        "@typescript-eslint/no-unused-vars": [
            "error",
            {
                "argsIgnorePattern": "^_",
                "ignoreRestSiblings": true
            }
        ],
        "perfectionist/sort-array-includes": ["error", {
            order: "asc",
            type: "alphabetical",
        }],
        "perfectionist/sort-enums": ["off", {
            order: "asc",
            type: "alphabetical",
        }],
        "perfectionist/sort-exports": ["error", {
            order: "asc",
            type: "line-length",
        }],
        "perfectionist/sort-imports": ["error", {
            groups: [
                "type",
                ["react", "redux", "mui", "permify", "tanstack", "lodash", "js-cookie"],
                ["builtin", "external"],
                ["internal-type", "internal", "internal-index"],
                ["parent-type", "sibling-type", "index-type"],
                ["parent", "sibling", "index"],
                "side-effect",
                "style",
                "object",
                "unknown",
            ],
            "internalPattern": [
                "@api/**",
                "@components/**",
                "@constants",
                "@contexts/**",
                "@examples/**",
                "@features/**",
                "@hooks",
                "@layout/**",
                "@menu/**",
                "@modules/**",
                "@pages/**",
                "@routes/**",
                "@shared/**",
                "@store/**",
                "@themes/**",
                "@utils/**",
            ],
            "newlinesBetween": "always",
            order: "asc",
            type: "natural",
        }],
        "perfectionist/sort-interfaces": ["off", {
            order: "asc",
            type: "alphabetical",
        }],
        "perfectionist/sort-named-exports": ["error", {
            order: "asc",
            type: "line-length",
        }],
        "perfectionist/sort-named-imports": ["error", {
            order: "asc",
            type: "alphabetical",
        }],
        "perfectionist/sort-objects": ["error", {
            order: "asc",
            type: "alphabetical",
            groups: ["id", "unknown"],

            "customGroups": {
                id: "id",
            },
        }],
        "perfectionist/sort-object-types": ["error", {
            order: "asc",
            type: "alphabetical",
        }],
        "perfectionist/sort-union-types": ["error", {
            order: "asc",
            type: "alphabetical",
        }],
        "perfectionist/sort-jsx-props": ["error", {
            type: "alphabetical",
            order: "asc",
            groups: ["shorthand", "multiline", "unknown"],
        }],
        "react/display-name": 0,
        "react/prop-types": 0,
        "react/react-in-jsx-scope": 0,
        "testing-library/no-node-access": 0,
        "testing-library/no-render-in-setup": 0,
    },
}];