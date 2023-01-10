/**
 * @type {import('jest').Config}
 */

const nextJest = require("next/jest");

const createJestConfig = nextJest({ dir: "./renderer" });

const customJestConfig = {
  clearMocks: true,
  testEnvironment: "jest-environment-jsdom",
  moduleDirectories: ["node_modules", "renderer"],
  setupFilesAfterEnv: ["./jest.setup.js"],
};

module.exports = createJestConfig(customJestConfig);
