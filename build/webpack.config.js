const path = require('path')
const { DefinePlugin } = require('webpack')

const { buildPath, node_modules, srcPath } = require('./path')
// const { printLoader } = require('./debug')
const { entry, html } = require('./entry')

exports.styleLoader = [
  {
    test: /\.less$/,
    include: srcPath,
    use: [
      {
        loader: 'css-loader',
        options: {
          modules: {
            // context 一定要配置，localIdentName 要和 babelrc 里的相同，否则 css-loader
            // 和 babel-loader 生成的类名不一致
            context: srcPath,
            localIdentName: '[name]-[local]__[hash:base64:5]'
          },
          importLoaders: 2 // css 里可能会使用 import
        }
      },
      // { loader: printLoader },
      'postcss-loader',
      'less-loader'
    ]
  },
  {
    test: /\.css$/,
    include: [...[].map((module) => path.resolve(node_modules, module)), srcPath],
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
    alias: {
      '@components': path.resolve(srcPath, 'components'),
      '@store': path.resolve(srcPath, 'store'),
      '@configs': path.resolve(srcPath, 'configs'),
      '@src': srcPath
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
