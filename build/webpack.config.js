const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const postcssPresetEnv = require('postcss-preset-env')
const WebpackBar = require('webpackbar')

const { buildPath, templatePath, faviconPath, node_modules, src } = require('./path')

const postCSSLoaderConfig = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: () => [
      postcssPresetEnv({
        browsers: ['> 1%', 'last 2 versions', 'not ie <= 8']
      })
    ]
  }
}

module.exports = {
  entry: {
    app: './src/index.tsx'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
    alias: {
      '@components': path.resolve(src, 'components'),
      '@store': path.resolve(src, 'store')
    }
  },
  output: {
    path: buildPath,
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          },
          {
            loader: 'ts-loader',
            options: { transpileOnly: true }
          }
        ],
        exclude: node_modules
      },
      {
        test: /\.less$/,
        include: src,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[name]-[local]__[hash:base64:5]'
              },
              localsConvention: 'dashes',
              importLoaders: 2 // 为了支持 CSS Modules，因为 css 里可能会使用 import
            }
          },
          postCSSLoaderConfig,
          'less-loader'
        ]
      },
      {
        test: /\.css$/,
        include: [...['normalize'].map(module => path.join(node_modules, module)), src],
        use: ['style-loader', 'css-loader', postCSSLoaderConfig]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'assets'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'react-scaffold',
      inject: true,
      template: templatePath,
      favicon: faviconPath
    }),
    new WebpackBar({
      color: '#c9753d'
    })
  ],
  optimization: {
    runtimeChunk: {
      name: 'boostrap'
    },
    splitChunks: {
      cacheGroups: {
        vendors: false,
        default: false,
        vendor: {
          chunks: 'all',
          name: 'vendor',
          test: /node_modules/
        }
      }
    }
  }
}
