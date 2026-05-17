module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ["airbnb", "airbnb/hooks"],
  plugins: ["react"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "no-param-reassign": [
      "error",
      { props: true, ignorePropertyModificationsFor: ["state"] },
    ],
    "linebreak-style": "off",
    "react/jsx-one-expression-per-line": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "react/function-component-definition": "off",
    quotes: "off",
    "jsx-quotes": ["error", "prefer-double"],
  },
};
