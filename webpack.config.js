const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default
const siteName = 'curtiscampbell';

const htmlWebpack = new HtmlWebpackPlugin({
  template: './src/index.html',
});

const extractSass = new ExtractTextPlugin({
  filename: `${siteName}.css`,
});

const copyImages = new CopyWebpackPlugin([{
  from: './src/assets',
  to: 'assets'
}]);

const imagemin = new ImageminPlugin({
  test: /\.(jpe?g|png|gif|svg)$/i
});

module.exports = {
  entry: './src/ts/index.ts',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${siteName}.js`,
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
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
    copyImages,
    imagemin
  ],
}
