const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { dirname, join, resolve } = require('path');

module.exports = function(cssName, paths) {
    return {
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    include: paths,
                    use: ExtractTextPlugin.extract({
                        publicPath: '../',
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: { minimize: true,  sourceMap: true }
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
                    }),
                },
                {
                    test: /\.css$/,
                    include: paths,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: { minimize: true}
                            }
                        ]
                    }),
                },
            ],
        },
        plugins: [
            new ExtractTextPlugin('styles.css'),
        ],
    };
};
