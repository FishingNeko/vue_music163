const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': { // 触发匹配路径
        target: 'https://lianghj.top:3000', // 代理跳转到的站点
        changeOrigin: true, // 允许跨域
        pathRewrite: { // 重写路径: 去掉路径中开头的'/api'
          '^/api': ''
        }
      }
    }
  }
})
