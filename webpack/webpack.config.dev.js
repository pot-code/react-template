const WebpackBar = require('webpackbar')
const { HotModuleReplacementPlugin } = require('webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const { base, style_loader } = require('./webpack.config')
const package = require('../package.json')
const { devEntry: entry } = require('./entry')
const { merge } = require('webpack-merge')
const { paths } = require('./config')

style_loader[0].use.unshift('style-loader')
style_loader[1].use.unshift('style-loader')

// const smp = new SpeedMeasurePlugin()
module.exports = merge(base, {
  entry,
  mode: 'development',
  output: {
    path: paths.build,
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new HotModuleReplacementPlugin(),
    new WebpackBar({
      color: '#75CA69'
    })
  ],
  devServer: {
    contentBase: paths.build,
    quiet: true,
    open: false
  },
  module: {
    rules: [
      ...style_loader,
      {
        test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)$/,
        loader: 'url-loader'
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader']
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)$/,
        loader: 'file-loader'
      }
    ]
  }
})
