const WebpackPluginCopy    = require('webpack-plugin-copy');
const WebpackCleanPlugin   = require('webpack-clean-plugin');
const path = require('path');

module.exports = function() {
    return {
        plugins: [
            new WebpackCleanPlugin({
                on: "emit",
                path: [ './build' ]
            }),
            new WebpackPluginCopy([
                { from: path.join(__dirname, '../public'), to:  path.join(__dirname, '../build') },
            ]),
        ]
    };
};
