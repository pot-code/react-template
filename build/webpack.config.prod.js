const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const { baseConfig, styleLoader } = require('./webpack.config')
const { buildPath, srcPath } = require('./path')

styleLoader[0].use.unshift({
  loader: MiniCssExtractPlugin.loader
})
styleLoader[1].use.unshift(MiniCssExtractPlugin.loader)

baseConfig.plugins.push(
  new MiniCssExtractPlugin({
    filename: 'css/[name].[hash].css',
    chunkFilename: 'css/[name].[chunkhash].css',
  }),
  new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer: false
  })
)
baseConfig.module.rules.push(...styleLoader)

module.exports = {
  ...baseConfig,
  mode: 'production',
  output: {
    path: buildPath,
    filename: 'js/[name].[contenthash].js',
    chunkFilename: 'js/[name].[contenthash].js'
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin()],
    usedExports: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'all',
          name: 'vendor',
          test: /node_modules/
        }
      }
    }
  }
}
