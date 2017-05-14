// const {
//   NODE_ENV,
//   IS_PROD,
//   PATH_DIST,
//   PORT
// } = require('./config')

const path = require('path')

const NODE_ENV = process.env.NODE_ENV
const IS_PROD = NODE_ENV === 'production'
const PORT = process.env.PORT || 6789
const PATH_DIST = path.resolve(__dirname, 'public', 'dist')

module.exports = {
  NODE_ENV,
  IS_PROD,
  PORT,
  PATH_DIST
}
