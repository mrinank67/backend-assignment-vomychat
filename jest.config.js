module.exports = {
  testEnvironment: "node", // Use Node.js environment for testing
  setupFilesAfterEnv: ["<rootDir>/__tests__/setup.js"], // Runs setup before tests
  testMatch: ["**/__tests__/**/*.test.js"], // Look for test files
  coverageDirectory: "coverage", // Store test coverage reports
  collectCoverage: true, // Enable coverage collection
  verbose: true, // Display detailed test results
};
