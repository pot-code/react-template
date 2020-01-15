const projectWebpackConfig = require('../build/webpack.config')
const HappyPack = require('happypack')

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-knobs/register',
    '@storybook/addon-actions/register',
    '@storybook/addon-links/register',
    '@storybook/addon-backgrounds/register'
  ],
  webpackFinal: async config => {
    config.plugins.push(
      new HappyPack({
        id: 'tsx',
        loaders: [
          {
            loader: 'ts-loader',
            options: { transpileOnly: true, happyPackMode: true }
          },
          { loader: 'babel-loader' }
        ]
      })
    )
    config.resolve.extensions.push('.ts', '.tsx')
    return {
      ...config,
      module: { ...config.module, rules: projectWebpackConfig.module.rules }
    }
  }
}
