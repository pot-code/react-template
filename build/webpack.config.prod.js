const baseConfig = require('./webpack.config');
const { buildPath } = require('./path');

module.exports = {
  ...baseConfig,
  mode: 'production',
  output: {
    path: buildPath,
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js'
  },
}
