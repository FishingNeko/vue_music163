const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': { 
        target: 'https://lianghj.top:3000', 
        changeOrigin: true, // 允许跨域
        pathRewrite: { 
          '^/api': ''
        }
      }
    }
  }
})
