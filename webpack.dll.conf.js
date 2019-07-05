const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    // 想统一打包的类库
    vendor: ['react','antd']
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].dll.js',
    // 与 DllPlugin 的 name 保持一致
    library: '[name]-[hash]'
  },

  plugins: [
    new webpack.DllPlugin({
      // 与output.library 一致
      name: '[name]-[hash]',
      // 该属性需要与 DllReferencePlugin 中一致
      context: __dirname,
      path: path.resolve(__dirname, 'dist/manifest.json') 
    })
  ]
}