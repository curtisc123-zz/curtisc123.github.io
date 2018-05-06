const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ImageminPlugin = require('imagemin-webpack-plugin').default
const siteName = 'curtiscampbell';

var IS_WDS = /webpack-dev-server/.test(process.env.npm_lifecycle_script);

const htmlWebpack = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: IS_WDS ? 'index.html' : './../index.html',
});

const extractSass = new ExtractTextPlugin({
  filename: `${siteName}.css`,
});

const imagemin = new ImageminPlugin({
  test: /\.(jpe?g|png|gif|svg)$/i
});

module.exports = {
  entry: './src/ts/index.ts',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    //publicPath: 'dist/',
    filename: `${siteName}.js`,
  },
  devServer: {
    contentBase: path.join(__dirname, ''),
    compress: true,
    port: 8080,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: extractSass.extract({
            use: [{
                loader: "css-loader"
            }, {
                loader: "fast-sass-loader"
            }],
            // use style-loader in development
            fallback: "style-loader"
        })
      },
      {
        test: /\.(|png|jpg|svg)$/,
        loader: 'file-loader'
      },
      {
        test: /\.html?$/,
        loader: 'html-loader',
      },
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.ts?$/,
        loader: 'tslint-loader',
        options: {
          emitErrors: true,
          failOnHint: true
        },
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js' ]
  },
  plugins: [
    htmlWebpack,
    extractSass,
    imagemin
  ],
}
