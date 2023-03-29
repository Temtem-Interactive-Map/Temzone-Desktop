const nextJest = require("next/jest");

const createJestConfig = nextJest({ dir: "./renderer" });

module.exports = createJestConfig({
  clearMocks: true,
  testEnvironment: "jest-environment-jsdom",
  moduleDirectories: ["node_modules", "renderer"],
  setupFilesAfterEnv: ["./jest.setup.js"],
});
