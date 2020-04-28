const prodConfig = require('./webpack.config.prod')
const { inspect } = require('util')

console.log(inspect(prodConfig, false, 5, true))
