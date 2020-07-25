const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const svgToMiniDataURI = require('mini-svg-data-uri')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { merge } = require('webpack-merge')

const { baseConfig, styleLoader } = require('./webpack.config')
const { buildPath, srcPath } = require('./path')

styleLoader[0].use.unshift({
  loader: MiniCssExtractPlugin.loader
})
styleLoader[1].use.unshift(MiniCssExtractPlugin.loader)

baseConfig.plugins.push(
  new MiniCssExtractPlugin({
    filename: 'css/[name].[hash].css',
    chunkFilename: 'css/[name].[chunkhash].css'
  }),
  new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer: false
  }),
  new CleanWebpackPlugin()
)
baseConfig.module.rules.push(
  ...styleLoader,
  {
    test: /\.(png|jpg|gif)$/,
    loader: 'url-loader',
    options: {
      limit: 8192,
      name: 'img/[name].[hash:7].[ext]'
    }
  },
  {
    test: /\.svg$/,
    use: [
      '@svgr/webpack',
      {
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'img/[name].[hash:7].[ext]',
          generator: (content) => svgToMiniDataURI(content.toString())
        }
      }
    ]
  },
  {
    test: /\.(eot|ttf|woff|woff2)$/,
    loader: 'file-loader',
    options: {
      name: 'fonts/[name].[hash:7].[ext]'
    }
  }
)

module.exports = merge(baseConfig, {
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
})
