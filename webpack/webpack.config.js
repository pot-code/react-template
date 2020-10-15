const path = require('path')
const { DefinePlugin } = require('webpack')

const { paths, css_module } = require('./config')
const { entry, html } = require('./entry')

exports.style_loader = [
  {
    test: /\.s(c|a)ss$/,
    include: paths.src,
    use: [
      {
        loader: 'css-loader',
        options: {
          modules: {
            context: paths.src,
            localIdentName: css_module.pattern
          },
          importLoaders: 2
        }
      },
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

exports.base = {
  entry,
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
    // WARN: sync with tsconfig.json paths
    alias: {
      '@components': path.resolve(paths.src, 'components'),
      '@configs': path.resolve(paths.src, 'configs'),
      '@src': paths.src
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
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
}
