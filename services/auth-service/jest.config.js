/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: "node",
  transform: {
    "^.+\.tsx?$": ["ts-jest",{}],
  },
  testMatch: ["**/tests/**/*.test.ts", "**/*.spec.ts", "**/*.test.ts"],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
};