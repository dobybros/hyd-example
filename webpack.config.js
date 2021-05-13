const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const fs = require('fs')
const CopyPlugin = require('copy-webpack-plugin');


const config = (_, args) => {
  const { mode, conf_target } = args || {}
  let merged = merge({
    mode,
    devtool: 'source-map',
    output: {
      filename: '[name].[hash:10].js',
      path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
      minimize: false
    },
    devServer: {
      contentBase: './dist',
      // host: '192.168.80.4',
      host: '0.0.0.0',
      // inline: true,
      // hot: true,
      https: {
        key: fs.readFileSync(path.resolve(__dirname, 'cert/2099842_odev.itsroyal.me.key')),
        cert: fs.readFileSync(path.resolve(__dirname, 'cert/2099842_odev.itsroyal.me.pem')),
        ca: fs.readFileSync(path.resolve(__dirname, 'cert/2099842_odev.itsroyal.me.pem')),
      }
    },
    resolve: {
      alias: {
        'vue': 'vue/dist/vue.js',
      }
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: "vue-loader"
        },
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.feature.js$/,
          loader: "hyd-loader"
        },
        {
          test: /\.(png|jpeg|jpg|gif|svg)$/,
          loader: 'url-loader'
        },
        {
          test: /\.(proto|mp4|woff|ttf)$/,
          use: {
            loader: 'file-loader'
          }
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        process: {
          env: {
            ...env(mode)
          }
        }
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new VueLoaderPlugin(),
      new CopyPlugin([
        { from: 'src/asset/proto', to: '' },
        { from: 'static', to: '' }
      ]),
    ],
    externals: {
      vue: 'Vue',
      "hyd-framework": 'hyd'
    }
  }, branch(conf_target))
  return merged
}


const env = (mode) => {
  switch (mode) {
    case 'development':
      return Object.assign({}, dev, {
        'buildDate': Date.now()
      })
      break;
    case 'production':
      return Object.assign({}, prod, {
        'buildDate': Date.now()
      });
      break
    default:
      break;
  }
}

const branch = (target) => {
  let config = {}
  switch (target) {
    case 'web':
      config.entry = {
        hyd: 'hyd-framework/dist/hyd.js',
        main: path.resolve(__dirname, 'main.js'),
        monitor: path.resolve(__dirname, 'monitor.js'),
        participants: path.resolve(__dirname, 'participants.js'),
        clientGeneral: path.resolve(__dirname, 'client_general.js')
      }
      config.plugins = [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: './public/index.html',
          inject: true,
          chunks: ['hyd', 'clientGeneral', 'main'],
          chunksSortMode: 'manual',
          minify: {
            removeComments: true,
            collapseWhitespace: true
          }
        }),
        new HtmlWebpackPlugin({
          filename: 'monitor.html',
          template: './public/monitor.html',
          inject: true,
          chunks: ['hyd', 'monitor'],
          chunksSortMode: 'manual',
          minify: {
            removeComments: true,
            collapseWhitespace: true
          }
        }),
        new HtmlWebpackPlugin({
          filename: 'participants.html',
          template: './public/index.html',
          inject: true,
          chunks: ['hyd', 'participants'],
          chunksSortMode: 'manual',
          minify: {
            removeComments: true,
            collapseWhitespace: true
          }
        })
      ]

      break;
    case 'client':
      config.entry = {
        clientMain: path.resolve(__dirname, 'main.js'),
        client: path.resolve(__dirname, 'client'),
        hydElectronRenderer: 'hyd-framework/src/hydElectron/HydElectronRenderer.js',
        hyd: 'hyd-framework/dist/hyd.js',
        "sideBarChat.feature": path.resolve(__dirname, 'SideBarChatMain.js'),
        "sideBarParticipants.feature": path.resolve(__dirname, 'SideBarParticipantsMain.js')
      }
      config.plugins = [
        new HtmlWebpackPlugin({
          filename: 'client.html',
          template: './public/client.html',
          inject: true,
          chunks: ['hyd', 'hydElectronRenderer', 'clientMain', 'client'],
          chunksSortMode: 'manual',
          minify: {
            removeComments: true,
            collapseWhitespace: true
          }
        }), new ScriptExtHtmlWebpackPlugin({
          custom: [{
            test: /\.js$/,
            attribute: 'onerror',
            value: 'scriptResourceLoadError()'
          }]
        }),]
      config.target = "electron-renderer" // web
      break;
    default:
      break;
  }
  return config
}


// webpack(config(null, {mode: 'development', target: 'client'}), error => {
//   console.log(error)
// })
module.exports = (_, args) => {
  return {
    mode: args.mode || 'development',
    devtool: 'source-map',
    entry: {
      main: path.join(__dirname, './src/entrys/index.js'),
      hyd: 'hyd-framework/dist/hyd.js',
    },
    output: {
      filename: '[name].[hash:10].js',
      path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
      minimize: false
    },
    devServer: {
      contentBase: './dist',
      // host: '192.168.80.4',
      port: 6432,
      // inline: true,
      // hot: true,
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: "vue-loader"
        },
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.feature.js$/,
          loader: "hyd-loader"
        },
        {
          test: /\.(png|jpeg|jpg|gif|svg)$/,
          loader: 'url-loader'
        },
        {
          test: /\.(proto|mp4|woff|ttf)$/,
          use: {
            loader: 'file-loader'
          }
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        process: {
          env: {
            // 设置 process.env 环境变量
          }
        }
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new VueLoaderPlugin(),
      new CopyPlugin([
        { from: 'static', to: '' }
      ]),
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './public/index.html',
        inject: true,
        chunks: ['hyd', 'main'],
        chunksSortMode: 'manual',
        minify: {
          removeComments: true,
          collapseWhitespace: true
        }
      }),
    ],
    externals: {
      vue: 'Vue',
      "hyd-framework": 'hyd'
    }
  }
}
