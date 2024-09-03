import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  { files: ["src/**/*.{js,mjs,cjs,ts}"] },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended.map((conf) => ({
    ...conf,
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  })),
  {
    ignores: ["dist/*", "**/*.spec.ts", "coverage/*"],
  },
];
