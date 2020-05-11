const projectWebpackConfig = require('../build/webpack.config.dev')

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-knobs/register',
    '@storybook/addon-actions/register',
    '@storybook/addon-links/register',
    '@storybook/addon-backgrounds/register'
  ],
  webpackFinal: async (config) => {
    config.resolve.extensions.push('.ts', '.tsx')
    config.resolve.alias = { ...config.resolve.alias, ...projectWebpackConfig.resolve.alias }
    return {
      ...config,
      module: { ...config.module, rules: projectWebpackConfig.module.rules }
    }
  }
}
