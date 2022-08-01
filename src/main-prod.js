import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 样式引入
import './assets/iconfont/iconfont.css'
import '@/assets/css/globe.css'

// 引入插件的依赖资源
// import './plugins/element.js'
import VueLazyload from 'vue-lazyload'
import APlayer from '@moefe/vue-aplayer'
import 'nprogress/nprogress.css'

// $bus 事件总线的导入
Vue.prototype.$bus = new Vue()

// 图片懒加载的配置
Vue.use(VueLazyload, {
  loading: require('./assets/img/we.webp')
})

// 播放器的配置
Vue.use(APlayer, {
  defaultCover: 'https://image.xumaobin.xyz/2022/07/28/327b7251de041.jpg',
  productionTip: false
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
