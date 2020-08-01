const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  filenameHashing: false,
  productionSourceMap: false,

  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          { from: 'popup/popup.html', to: 'popup/popup.html', context: 'src' }
      ]})
    ]
  }
};