module.exports = {
    "env": {
        "browser": true,
        "es2022": true,
        "node": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
    ],
    "globals": {
        "fetch": true,
    },
    "parserOptions": {
        "requireConfigFile": false,
        "ecmaFeatures": {
            "jsx": true
        },
        "sourceType": "module",
    },
    "plugins": [
        "react",
    ],
    "settings": {
        "react": {
          "pragma": "React",
          "version": "detect",
        }
    },
    "rules": {
        "no-console": "off",
        "indent": [
            "error", 4, { "SwitchCase": 1 },
        ],
        "no-use-before-define": "off",
        "react/jsx-filename-extension": "off",
        "react/prop-types": "off",
        "react/display-name": [
            0, { "ignoreTranspilerName": true }
        ],
        "comma-dangle": "off",
        "quotes": [
            "error", "single", { "avoidEscape": true }
        ],
        "semi": [
            "error", "always",
        ],
        "eqeqeq": "error",
        "no-trailing-spaces": "error",
        "object-curly-spacing": [
            "error", "always",
        ],
        "arrow-spacing": [
            "error", { "before": true, "after": true }
        ],
        "no-multi-spaces": [
            "error", { "ignoreEOLComments": true }
        ],
        "comma-spacing": [
            "error", { "before": false, "after": true },
        ],
        "no-multiple-empty-lines": [
            "error", { "max": 1 },
        ],
        "padding-line-between-statements": [
            "error",
            { blankLine: "always", prev: "*", next: "return" },
            { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
            { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] }
        ],
        "max-len": [
            "error", { "code": 200 },
        ],
        "no-unused-vars": [
            "error", { "argsIgnorePattern": "^_" },
        ],
        "no-warning-comments": [
            "error", { "terms": ["todo", "to-do", "fixme"] },
        ],
    },
};
