module.exports = {
  testRegex: '/src/.*\\.(test|spec)?\\.(js|ts|tsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/__mocks__/svgrMock.js',
    '\\.s?css$': '<rootDir>/__mocks__/styleMock.js',
    // WARN: sync with webpack alias
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@configs(.*)$': '<rootDir>/src/configs$1',
    '^@src(.*)$': '<rootDir>/src$1'
  }
}
