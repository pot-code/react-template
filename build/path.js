const path = require('path')

module.exports = {
  buildPath: path.resolve(__dirname, '../dist'),
  srcPath: path.resolve(__dirname, '../src'),
  templatePath: path.resolve(__dirname, '../template'),
  rootPath: path.resolve(__dirname, '../'),
  node_modules: path.resolve(__dirname, '../node_modules')
}
