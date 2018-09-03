const path = require('path');
const webpack = require('webpack');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const devserver            = require('./webpack/devserver');
const sass                 = require('./webpack/sass');
const extractCSS           = require('./webpack/css.extract');
const files               = require('./webpack/files');
const js                   = require('./webpack/js');
const prodPlugins          = require('./webpack/prod.plugins');
const devPlugins           = require('./webpack/dev.plugins');

var config = {
  module: {
    rules: [
      ...files(),
      ...js(),
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  }
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.entry= [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      './src/index.js',
      './src/components/sass/main.scss'
    ]
    config.output = {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js'
    }
    config.devtool = 'source-map';
    config.devServer = devserver();
    config.plugins = devPlugins();
    config.module.rules = config.module.rules.concat([
      ...sass()
    ])
  }

  if (argv.mode === 'production') {
    config.entry = [
      './src/index.js',
      './src/components/sass/main.scss'
    ]
    config.output = {
      path: path.resolve(__dirname, 'build'),
      filename: 'js/bundle.[hash].js'
    }
    config.plugins = [
      ...prodPlugins(),
    ]
    config.optimization = {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true
        })
      ]
    }
    config.module.rules = config.module.rules.concat([
      ...extractCSS()
    ])
  }
  return config;
};
