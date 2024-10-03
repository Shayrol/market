module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["standard-with-typescript", "plugin:react/recommended", "prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "**/tsconfig.json",
  },
  plugins: ["react"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/consistent-type-imports": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-confusing-void-expression": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "no-unneeded-ternary": "off",
    "@typescript-eslint/restrict-plus-operands": "off",
    "react/display-name": "off",
  },
};
