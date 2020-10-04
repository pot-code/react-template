const path = require('path')
const { DefinePlugin } = require('webpack')

const { paths } = require('./config')
// const { printLoader } = require('./debug')
const { entry, html } = require('./entry')

exports.styleLoader = [
  {
    test: /\.scss$/,
    include: paths.src,
    use: [
      {
        loader: 'css-loader',
        options: {
          modules: {
            // WARN: sync with .babelrc react-css-modules
            context: paths.src,
            localIdentName: '[name]-[local]__[hash:base64:5]'
          },
          importLoaders: 2 // css 里可能会使用 import
        }
      },
      // { loader: printLoader },
      'postcss-loader',
      'sass-loader'
    ]
  },
  {
    test: /\.css$/,
    include: [paths.src],
    use: [
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1
        }
      },
      'postcss-loader'
    ]
  }
]

exports.baseConfig = {
  entry,
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
    // WARN: sync with tsconfig.json paths
    alias: {
      Components: path.resolve(paths.src, 'components'),
      Configs: path.resolve(paths.src, 'configs')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        sideEffects: false,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false
            }
          },
          // { loader: path.resolve(rootPath, 'build/print-loader.js') },
          {
            loader: 'ts-loader',
            options: { transpileOnly: true }
          }
        ]
      }
    ]
  },
  plugins: [
    ...html,
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.BUILD_STAGE': JSON.stringify(process.env.BUILD_STAGE)
    })
  ]
}
