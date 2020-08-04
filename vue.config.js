const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  filenameHashing: false,
  productionSourceMap: false,

  pages: {
    app: {
      entry: 'src/app.ts',
      filename: 'nouse/app.html',
    },
    popup: {
      entry: 'src/popup/popup.ts',
      filename: 'nouse/popup.html',
    },
  },

  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          { from: 'popup/popup.html', to: 'popup.html', context: 'src' }
      ]})
    ]
  }
};