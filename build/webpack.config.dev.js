const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const { HotModuleReplacementPlugin } = require('webpack')

const { baseConfig, styleLoader } = require('./webpack.config')
const merge = require('webpack-merge')
const { buildPath } = require('./path')

styleLoader[0].use.unshift({
  loader: 'style-loader'
})
styleLoader[1].use.unshift('style-loader')
baseConfig.module.rules.push(...styleLoader)

module.exports = merge(baseConfig, {
  mode: 'development',
  entry: {
    app: ['webpack-hot-middleware/client?path=__hmr', './src/index.tsx']
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [new FriendlyErrorsWebpackPlugin(), new HotModuleReplacementPlugin()],
  devServer: {
    contentBase: buildPath,
    quiet: true,
    open: false
  }
})
