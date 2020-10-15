const path = require('path')

module.exports.paths = {
  build: path.resolve(__dirname, '../dist'),
  src: path.resolve(__dirname, '../src'),
  project_root: path.resolve(__dirname, '../'),
  template: path.resolve(__dirname, '../template'),
  tsconfig: path.resolve(__dirname, '../tsconfig.json')
}

module.exports.css_module = {
  pattern: '[name]-[local]__[hash:base64:5]'
}
