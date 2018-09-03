const path = require('path');
const contentBase = path.join(__dirname, "../public");

module.exports = function() {
  return (
    {
      inline: true,
      contentBase: 'public',
      compress: true,
      hot: true,
      port:3000,
      historyApiFallback: true,
      proxy: {
      '/api': 'http://localhost:3002'
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      }
    }
  )
};
