const path = require('path');

module.exports = {
  devtool: 'source-map', // 开启 sourceMap 方便调试
  mode: 'development', // webpack 打包模式，build 的时候可以改为 production
  devServer: { // webpack dev server 的一些配置参数，注意热更新如果在此处配置需要添加额外的插件，所以直接通过命令行的方式添加
    host: 'localhost',
    port: '8000',
  },
  entry: './src/entry', // webpack 打包的入口文件，这里的路径就是上面写的 index.js 在项目里面的路径
  output: { // webpack 打包的输出文件
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },
  module: { // 处理非标准 js 语法的 loader
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  }
};