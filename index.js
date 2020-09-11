'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./ainsley-loader.cjs.production.js')
} else {
  module.exports = require('./ainsley-loader.cjs.development.js')
}
