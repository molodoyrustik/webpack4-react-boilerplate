module.exports = function() {
  return {
    module: {
      rules: [
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                mimetype: 'image/png',
                name: 'images/[name].[ext]',
              }
            }
          ],
        }
      ],
    },
  };
};
