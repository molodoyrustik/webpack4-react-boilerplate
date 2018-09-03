const path = require('path');
module.exports = function(paths) {
    return {
        module: {
            rules: [
                {
                    test: [/\.js$/, /\.jsx$/],
                    include: paths,
                    loader: 'babel-loader',
                    exclude: /node_modules/
                },
                {
                    test: [/\.js$/, /\.jsx$/],
                    include:  paths,
                    exclude: /node_modules/,
                    use: ['babel-loader', 'eslint-loader']
                }
            ]
        }
    };
};