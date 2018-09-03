const path = require('path');
module.exports = function(paths) {
    return (
      [
        {
          test: [/\.js$/, /\.jsx$/],
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: [/\.js$/, /\.jsx$/],
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader']
        },
      ]
    )

};
