const pkg = require('./package');

module.exports = {
  rootDir: './',
  name: pkg.name,
  displayName: pkg.name.toUpperCase(),
  testEnvironment: '<rootDir>/test/environment/mongodb',
  testPathIgnorePatterns: ['/node_modules/', './dist'],
  coverageReporters: ['lcov', 'html'],
  resetModules: false,
  reporters: ['default'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)?$': '<rootDir>/test/babel-transformer',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|jsx|ts|tsx)?$',
  moduleFileExtensions: ['ts', 'js', 'tsx'],
};
