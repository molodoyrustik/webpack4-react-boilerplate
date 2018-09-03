const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { dirname, join, resolve } = require('path');

module.exports = function(cssName, paths) {
    return [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: [
                  'node_modules'
                ],
                sourceMap: true
              }
            }
          ],
          publicPath: '../'
        }),
      },
      {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [
                  {
                      loader: 'css-loader',
                      options: { minimize: true}
                  }
              ]
          }),
      }
    ]
};
