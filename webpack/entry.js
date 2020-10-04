const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const { paths } = require('./config')

const config = [
  {
    name: 'app',
    chunks: ['app', 'vendor'],
    entryPoint: './src/index.tsx',
    template: path.resolve(paths.template, 'app.html'),
    favicon: path.resolve(paths.project_root, 'favicon.ico'),
    htmlOutput: path.resolve(paths.build, 'index.html')
  }
]

function buildEntries(def) {
  const html = def.map((item) => {
    const { template, chunks, favicon, htmlOutput: filename } = item

    return new HtmlWebpackPlugin({
      inject: true,
      template,
      chunks,
      favicon,
      filename
    })
  })
  const entry = def.reduce((entry, item) => {
    entry[item.name] = item['entryPoint']
    return entry
  }, {})
  const devEntry = def.reduce((entry, item) => {
    entry[item.name] = ['webpack-hot-middleware/client?path=__hmr', item['entryPoint']]
    return entry
  }, {})

  return {
    devEntry,
    entry,
    html
  }
}

module.exports = { ...buildEntries(config), config }
