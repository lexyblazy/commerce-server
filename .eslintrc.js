module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "prettier/prettier": "error",
    "no-empty": "error",
    "no-unreachable": "error",
    "no-unused-vars": "error",
    eqeqeq: "error",
    "no-use-before-define": "error",
    "no-shadow": "error",
    "sort-imports": [
      "error",
      {
        ignoreCase: true,
        ignoreDeclarationSort: false,
        ignoreMemberSort: true,
        memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        allowSeparatedGroups: true,
      },
    ],
  },
};
