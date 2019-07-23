// 用于处理文件路径和目录路径的实用工具
const path = require("path");

// 引入webpack
const webpack = require("webpack");

// 提供操作系统相关的实用方法
const os = require("os");

// 引入 happypack
const HappyPack = require("happypack");

const HtmlWebpackPlugin = require("html-webpack-plugin");

// 设置共享进程池根据当前系统的cpus数量 防止占用资源
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

// 指定loader需要处理的文件夹路径
const devPath = path.resolve(__dirname, "src");

// 清除旧文件生成新文件
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
  // 配置绝对路径
  resolve: {
    alias: {
      "@": devPath
    }
  },

  // 隐藏build后文件大小提醒
  performance: {
    hints: false
  },
  // webpack 打包的入口文件，index所在目录路径
  entry: path.resolve(__dirname, "src"),
  // webpack 打包的输出文件
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    //在上线时配置的是CDN的地址
    publicPath: "/"
  },

  // webpack dev server提供简单的web服务器和实时热更新的能力
  // 热更新如果在此处配置需要添加额外的插件
  devServer: {
    host: "localhost",
    port: "8000"
  },

  // 开启 sourceMap 方便调试
  devtool: "source-map",

  // 当为production的时候,会默认开启minification,tree shaking，Scope Hoisting
  // minification 取代(UglifyJS | webpack-parallel-uglify-plugin)
  // tree shaking 删除未被引用的代码
  // Scope Hoisting 分析模块之间的依赖关系，尽可能将模块合并到一个函数中
  mode: "development",

  // 放置loader
  module: {
    rules: [
      // 处理非标准 js 语法的 loader
      {
        // 匹配处理文件的扩展名的正则表达式
        test: /\.(js|jsx)$/,
        // loader名称
        // 补充 此处添加了happyPack实例调用多线程来减少打包时间
        use: "happypack/loader?id=happy-babel-loader",
        // 手动屏蔽的文件夹
        exclude: /node_modules/,
        // 手动指定包含的文件夹
        include: devPath
      },
      //使用不同的两个插件可以将css转成JS文件类型
      {
        test: /\.css/,
        use: ["css-loader", "style-loader"],
        exclude: /node_modules/,
        include: devPath,
        sideEffects: true
      },
      {
        test: /\.less/,
        use: ["style-loader", "css-loader", "less-loader"],
        exclude: /node_modules/,
        include: devPath,
        sideEffects: true
      },
      // 加载文件原始内容（utf-8)
      {
        test: /\.md$/,
        use: "raw-loader",
        exclude: /node_modules/,
        include: devPath
      }
    ]
  },

  // 放置插件
  plugins: [
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "src/template.index.ejs",
      favicon: "favicon.ico"
    }),
    // happypack实例
    new HappyPack({
      // 用id来标识对应的happypack
      id: "happy-babel-loader",
      loaders: [
        {
          //将babel-loader包裹
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  modules: false,
                  targets: {
                    browsers: [
                      "last 2 versions",
                      "safari >= 7",
                      "ie >= 9",
                      "chrome >= 52"
                    ]
                  }
                }
              ],
              ["@babel/preset-react"]
            ],
            plugins: [["@babel/plugin-proposal-object-rest-spread"]]
          }
        }
      ],
      // 共享进程池
      threadPool: happyThreadPool,
      //不允许 HappyPack 输出日志
      verbose: false
    }),

    // DllReferencePlugin实例
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname, "dist"),
      // 之前打包出来的json文件
      manifest: require("./dist/react-manifest.json")
    }),

    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname, "dist"),
      manifest: require("./dist/material-manifest.json")
    })
  ]
};

module.exports = config;
