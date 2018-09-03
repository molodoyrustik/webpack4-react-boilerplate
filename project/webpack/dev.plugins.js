const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function() {
    return [
      new webpack.NamedModulesPlugin(),
      new ExtractTextPlugin(
        {filename: 'styles.css', disable: false, allChunks: true}
      ),
      new webpack.HotModuleReplacementPlugin()
    ]
};
