module.exports = {
  collectCoverage: true,
  cache: false,
  collectCoverageFrom: ['**/*.js', '!**/node_modules/**', '!**/coverage/**'],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/routes',
    '<rootDir>/src/server.js',
    '<rootDir>/src/config',
    '<rootDir>/.storybook',
    '<rootDir>/stories',
  ],
  testEnvironment: 'node',
  verbose: true,
};
