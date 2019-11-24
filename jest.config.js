module.exports = {
  resetMocks: true,
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.+)$': '<rootDir>/lib/$1',
  },
  testMatch: ['<rootDir>/lib/**/*.spec.ts'],
};
