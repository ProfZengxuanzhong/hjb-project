/** @type {import("jest").Config} */
module.exports = {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.js$": [
      "babel-jest",
      {
        presets: [
          ["@babel/preset-env", { targets: { node: "current" } }],
        ],
      },
    ],
  },
  transformIgnorePatterns: [],
  testMatch: ["**/tests/**/*.test.js"],
  collectCoverageFrom: [
    "src/js/**/*.js",
    "!**/node_modules/**",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
};
