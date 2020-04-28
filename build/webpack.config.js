const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const svgToMiniDataURI = require('mini-svg-data-uri')
const postcssPresetEnv = require('postcss-preset-env')
const WebpackBar = require('webpackbar')

const { buildPath, templatePath, faviconPath, node_modules, srcPath } = require('./path')

const postCSSLoader = {
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

exports.styleLoader = [
  {
    test: /\.less$/,
    include: srcPath,
    sideEffects: true,
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
      postCSSLoader,
      'less-loader'
    ]
  },
  {
    test: /\.css$/,
    sideEffects: true,
    include: [...['normalize'].map(module => path.join(node_modules, module)), srcPath],
    use: ['css-loader', postCSSLoader]
  }
]

exports.baseConfig = {
  entry: {
    app: './src/index.tsx'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
    alias: {
      '@components': path.resolve(srcPath, 'components'),
      '@store': path.resolve(srcPath, 'store')
    }
  },
  output: {
    path: buildPath,
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js'
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
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.svg$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'img/[name].[hash:7].[ext]',
          generator: content => svgToMiniDataURI(content.toString())
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: templatePath,
      favicon: faviconPath,
      filename: path.join(buildPath, 'index.html')
    }),
    new WebpackBar({
      color: '#75CA69'
    })
  ]
}
