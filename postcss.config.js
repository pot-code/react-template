const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./src/**/*.tsx'],
  whitelist: ['html', 'body', ':global'],
  defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || []
})

module.exports = {
  ident: 'postcss',
  plugins: [
    require('tailwindcss'),
    require('postcss-preset-env')({
      browsers: ['> 1%', 'last 2 versions']
    }),
    ...(process.env.NODE_ENV === 'production' ? [purgecss] : [])
  ]
}
