const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var config = {
  module: {
    rules: [
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
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]'
            }
          }
        ],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              mimetype: 'application/font-woff',
              name: 'fonts/[name].[ext]',
            }
          }
        ],
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              mimetype: 'application/octet-stream',
              name: 'fonts/[name].[ext]',
            }
          }
        ],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              mimetype: 'image/svg+xml',
              name: 'images/[name].[ext]',
            }
          }
        ],
      }
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
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './src/index.js',
      './src/components/sass/main.scss'
    ]
    config.output = {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js'
    }
    config.devtool = 'source-map';
    config.devServer = {
    	contentBase: 'public',
    	port:8080,
      hot: true,
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
    config.plugins = [
      new webpack.NamedModulesPlugin(),
      new ExtractTextPlugin(
        {filename: 'styles.css', disable: false, allChunks: true}
      ),
      new webpack.HotModuleReplacementPlugin()
    ]
    config.module.rules = config.module.rules.concat([
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
    ])
  }

  if (argv.mode === 'production') {
    config.entry = [
      './src/index.js',
      './src/components/sass/main.scss'
    ]
    config.output = {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.[hash].js'
    }
    config.plugins = [
      new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
      new CleanWebpackPlugin('build', {}),
      new CopyWebpackPlugin([
        { from: './public/', to: './', force: true }
      ], {}),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new ManifestPlugin(),
      new ExtractTextPlugin({
        filename: 'styles.[hash].css', disable: false, allChunks: true
      }),
      new HtmlWebpackPlugin({
        body: true,
        inject: false,
        hash: true,
        template: './utils/index_prod.html',
        filename: 'index.html'
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      })
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
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            { loader: 'sass-loader', query: { sourceMap: false } },
          ],
          publicPath: '../'
        }),
      }
    ])
  }
  return config;
};
