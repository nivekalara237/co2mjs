import { defaults } from "jest-config";

const config = {
  verbose: true,
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  moduleFileExtensions: [...defaults.moduleFileExtensions, "mts", "cts"],
  coverageThreshold: {
    global: {
      branches: 80,
      function: 80,
      lines: 80,
      statements: 60,
    },
  },
  extensionsToTreatAsEsm: [".ts"],
  // forceCoverageMatch: ['**/*.spec.ts','**/*.spec.js','**/*.test.ts','**/*.test.js'],
  modulePaths: ["<rootDir>/src"],
  notify: true,
  preset: "ts-jest",
  testEnvironment: "jsdom",
  coverageDirectory: "<rootDir>/coverage",
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    // '<rootDir>/tests/**/*.{ts|js|cjs}'
  ],
  testPathIgnorePatterns: ["<rootDir>/node_modules"],
  coverageReporters: ["json", "html"],
  testMatch: ["<rootDir>/src/tests/**/*.spec.ts", "<rootDir>/src/tests/**/*.test.ts"],
};

export default config;
