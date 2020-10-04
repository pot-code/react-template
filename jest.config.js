module.exports = {
  testRegex: '/src/.*\\.(test|spec)?\\.(js|ts|tsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/__mocks__/svgrMock.js',
    '\\.s?css$': '<rootDir>/__mocks__/styleMock.js'
  }
}
