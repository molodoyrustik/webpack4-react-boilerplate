const webpack = require('webpack');

module.exports = function(useSourceMap) {
    return {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
              cache: true,
              parallel: true,
              sourceMap: false
            })
        ]
    };
};
