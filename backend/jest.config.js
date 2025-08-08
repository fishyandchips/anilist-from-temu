export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  maxWorkers: 1,

  transform: {
    '^.+\\.(ts|tsx|js)$': 'ts-jest'
  },
};
