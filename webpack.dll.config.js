const path = require('path')
const webpack = require('webpack')

module.exports = {
  name: 'vendor',
  entry: {
    // 想统一打包的类库
    react: ['react'],
    material: ['@material-ui/core']
  },

  output: {
    // 与 DllPlugin 的 name 保持一致
    library: '[name]-[hash]',
    // 将输出文件放在dist目录下
    path: path.resolve(__dirname, 'dist'),
    // 文件名称
    filename: '[name].dll.js'
  },

  plugins: [
    new webpack.DllPlugin({
      // 与output.library 一致
      name: '[name]-[hash]',
      // manifest文件中请求的上下文
      context: __dirname,
      path: path.resolve(__dirname, 'dist/[name]-manifest.json') 
    })
  ]
}