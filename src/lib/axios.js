// axios 的基本配置
import nProgress from 'nprogress'
import axios from 'axios'

export function myAxios(config) {
  // 实例化 axios
  const instance = axios.create({
    baseURL: 'https://lianghj.top:3000',
    // baseURL: 'http://43.138.78.53:3000',
    timeout: 3000
  })
  // 默认配置
  instance.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
  // 请求开始前做的事
  instance.interceptors.request.use((req) => {
    nProgress.start()
    req.headers.Authorization = window.sessionStorage.getItem('token')
    return req
  })
  // 得到响应后做的事
  instance.interceptors.response.use((res) => {
    nProgress.done()
    return res
  })
  return instance(config)
}
