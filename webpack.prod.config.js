const config = require('./webpack.config.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

config.plugins = [
  new webpack.DefinePlugin({
    '__DEV__': false,
    'COMMUNITY_LINK': `'http://supplychainasia.org/subscription-form'`,
    'GOOGLE_CAPTCHAR_KEY': `'6LdJdBwUAAAAACAxHqDTNu2Vny5l492NVuQ7-KZ8'`,
    'API_SCFP_SEND_ADMIN_EMAIL': `'https://us-central1-sca-fellowship-5d601.cloudfunctions.net/services-scfp-sendMailToAdmin'`
  }),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    compress: {
      sequences: true,
      dead_code: true,
      conditionals: true,
      booleans: true,
      unused: true,
      if_return: true,
      join_vars: true,
      drop_console: true
    },
    output: {
      comments: false
    }
  }),
  new HtmlWebpackPlugin({
    template: 'assets/index.ejs',
    hash: true, // Bust the cache in SCA hosting cloudflare
    baseUrl: 'http://scfp.supplychainasia.org/'
  })
]

module.exports = config
