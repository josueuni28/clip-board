const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true
    }
  },
  chainWebpack: config => {
    config.module
      .rule('loaders')
      .test(/\.node$/)
      .use('loader')
        .loader('node-loader')
        .end()
  }
})
