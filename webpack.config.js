const path = require('path')
const webpack = require('webpack')
const Extract = require('extract-text-webpack-plugin')
const { CheckerPlugin } = require('awesome-typescript-loader')

const {
  DllReferencePlugin,
  HashedModuleIdsPlugin,
  NamedModulesPlugin,
  DefinePlugin,
  LoaderOptionsPlugin,
  HotModuleReplacementPlugin,
  optimize: {
    CommonsChunkPlugin,
    UglifyJsPlugin
  }
} = webpack

const {
  NODE_ENV,
  IS_PROD,
  PATH_DIST,
  PORT
} = require('./config')

console.log(PORT)

const config = {
  performance: {
    hints: IS_PROD ? 'warning' : false
  },
  devtool: IS_PROD ? 'source-map' : 'cheap-module-eval-source-map', // https://webpack.js.org/configuration/devtool/
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  entry: {
    app: [
      !IS_PROD && 'react-hot-loader/patch',
      // 'webpack-dev-server/client?http://localhost:8080',
      // 'webpack/hot/only-dev-server',
      './src/index.tsx'
    ].filter(s => s),
  },
  output: {
    filename: `[name].js`,
    chunkFilename: `[name]${IS_PROD ? '.[chunkhash:8]' : ''}.chunk.js`,
    path: PATH_DIST,
    publicPath: '/dist/'
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.js$/,
      loader: 'source-map-loader'
    }, {
      test: /\.tsx?$/,
      loaders: [
        !IS_PROD && 'react-hot-loader/webpack',
        {
          loader: 'awesome-typescript-loader',
          options: {
            target: IS_PROD ? 'es5' : 'es6',
          }
        }
      ].filter(l => l),
      exclude: path.resolve(__dirname, 'node_modules'),
      include: path.resolve(__dirname, 'src'),
    }, {
      test: /\/src\/styles\/.*\.css$/,
      use: IS_PROD
        ? Extract.extract('css-loader?-url&sourceMap!postcss-loader?sourceMap')
        // insertAt=top is to ensure loading before CSS Modules
        : [
          'style-loader?insertAt=top&sourceMap',
          'css-loader?-url&sourceMap',
          'postcss-loader?sourceMap'
        ]
    }, {
      test: /\/components\/.*\.css$/,
      loaders: IS_PROD
        ? Extract.extract([
          'css-loader?-url&sourceMap&modules&importLoaders=1&localIdentName=[hash:base64:5]',
          'postcss-loader?sourceMap'
        ])
        : [
          'style-loader?sourceMap',
          'css-loader?-url&sourceMap&modules&importLoaders=1&localIdentName=[name]_[local]',
          'postcss-loader?sourceMap'
        ]
    }]
  },
  plugins: [
    new DllReferencePlugin({
      context: '.',
      manifest: require('./public/dist/dll-manifest.json')
    }),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
      }
    }),
    !IS_PROD && new HotModuleReplacementPlugin(),
    !IS_PROD && new CheckerPlugin(),
    new NamedModulesPlugin(),
    new CommonsChunkPlugin({
      async: 'common',
      minChunks(module, count) {
        return count >= 2
      },
    }),
    IS_PROD && new Extract({
      filename: '[name].css',
      allChunks: true
    }),
    IS_PROD && new LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    IS_PROD && new UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: true,
      semicolons: true,
      screw_ie8: false
    })
  ].filter(p => p),
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 0,
    poll: false
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    hot: true,
    port: PORT
  }
}

module.exports = config
