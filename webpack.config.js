const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const config = {
  context: path.join(__dirname, '/app'),
  entry: ['babel-polyfill', './index.js'],
  devServer: {
    historyApiFallback: true,
    contentBase: './public',
    port: 8000
  },

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/public')
  },

  resolve: {
    modules: ['node_modules', 'app']
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.less/,
        loader: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      '__DEV__': true,
      'COMMUNITY_LINK': `'http://supplychainasia.org/subscription-form'`,
      'GOOGLE_CAPTCHAR_KEY': `'6LdJdBwUAAAAACAxHqDTNu2Vny5l492NVuQ7-KZ8'`,
      'API_SCFP_SEND_ADMIN_EMAIL': `'https://us-central1-sca-fellowship-5d601.cloudfunctions.net/services-scfp-sendMailToAdmin'`
    }),
    new HtmlWebpackPlugin({
      template: 'assets/index.ejs',
      baseUrl: 'http://localhost:8000/'
    })
  ]
}
module.exports = config
