const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = function(paths) {
    return {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    include: paths,
                    use: ExtractTextPlugin.extract({
                        publicPath: '../',
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                  minimize: true,
                                  sourceMap: true
                                }
                            }
                        ],
                    })
                }
            ]
        }
    };
};
