var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: {
    main:'./src/main.js',
    vendor:['vue','vue-router','vuex','muse-ui','vue-awesome-swiper','axios','lrz']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist/',
    filename: '[name].js',
    chunkFilename: '[name].min.js' // 设置require.ensure 文件名
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor' // 指定公共 bundle 的名字。
            })
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
        /*写法为style-loader!css-loader!。从右向左开始使用，转为css字符串->使用style将代码放到页面style标签中。 
        css-loader——将样式打包成字符串 
        style-load——将样式字符串添加到页面的style标签中 */
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
       {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    inline:true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#cheap-module-source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"' //全局标识，其他部分的代码也可以直接访问这个标识，这里用于标注生产环境？
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,//意味着当你的js编译压缩后，需要继续读取原始脚本信息的行数，位置，警告等有效调试信息时，你需要手动开启UglifyJsPlugin 的配置项：sourceMap: true 。
      compress: {
        warnings: false//意味着当你想在编译压缩的时候查看一部分js的警告信息时，你需要将compress.warnings 手动设置为 true。
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
      //UglifyJsPlugin 将不再支持让 Loaders 最小化文件的模式。debug 选项已经被移除。Loaders 不能从 webpack 的配置中读取到他们的配置项。
      //loader的最小化文件模式将会在webpack 3或者后续版本中被彻底取消掉.
      //为了兼容部分旧式loader，你可以通过 LoaderOptionsPlugin 的配置项来提供这些功能。
    })
  ])
}


