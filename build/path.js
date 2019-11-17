const path = require('path');

module.exports = {
  buildPath: path.resolve(__dirname, '../public'),
  templatePath: path.resolve(__dirname, '../template.html'),
  faviconPath: path.resolve(__dirname, '../favicon.ico'),
  src: path.resolve(__dirname, '../src'),
  node_modules: path.resolve(__dirname, '../node_modules')
}
