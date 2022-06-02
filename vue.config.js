const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: true,
    proxy: {
    '/API': {
        target: `http://localhost:3001`,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
        '^/API': ''
        },
    }
  }
  }
})
