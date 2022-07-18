import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 引入插件的依赖资源
import './plugins/element.js'
import VueLazyload from 'vue-lazyload'
import APlayer from '@moefe/vue-aplayer'
import 'nprogress/nprogress.css'

// 图片懒加载的配置
Vue.use(VueLazyload, {
  loading: require ('./assets/img/we.png')
})

// 播放器的配置
Vue.use(APlayer, {
  defaultCover: 'https://github.com/u3u.png',
  productionTip: true
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
