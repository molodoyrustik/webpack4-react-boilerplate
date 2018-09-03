const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = function(paths) {
    return [
      {
        test: /\.scss$/,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use: [
             {
               loader: 'css-loader',
               options: {
               url: false,
                 minimize: true,
                 sourceMap: true
               },
             },
             {
               loader: 'sass-loader',
               options: {
                 url: false,
                 minimize: true,
                 sourceMap: true
                }
              }
            ]
           }
         )
       )
      }
    ]
};
