const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = function(paths) {
    return {
        plugins: [
          new ExtractTextPlugin({
              filename  : 'styles.css',
              allChunks : true
          })
        ],
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
                                options: { minimize: true }
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    includePaths: [
                                         'node_modules'
                                    ]
                                }
                            }
                        ],
                    })
                }
            ]
        }
    };
};
