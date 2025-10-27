import stylistic from "@stylistic/eslint-plugin";

export default [
  {
    plugins: {
      "@stylistic": stylistic,
    },
    rules: {
      "@stylistic/semi": "error",
      "@stylistic/semi": "error",
      "@stylistic/jsx-indent": "error",
      "@stylistic/quotes": ["error", "single", { avoidEscape: true }],
    },
  },
];
