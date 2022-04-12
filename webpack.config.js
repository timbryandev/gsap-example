const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  devtool: 'inline-source-map',
  devServer: {
    static: './dist'
  },
  entry: ['./src/index.js', './src/index.scss'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: './src/index.html', to: 'index.html' }]
    })
  ]
}
