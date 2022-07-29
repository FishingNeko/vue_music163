// 用户相关 API

import { myAxios } from '@/lib/axios'

// 获取登录状态
export const reqLoginState = () => {
  return myAxios({
    url: '/login/status'
  })
}

// 使用手机号码登录
export const reqPhoneLogin = (data) => {
  return myAxios({
    method: 'POST',
    url: '/login/cellphone',
    data
  })
}

// 获取用户订阅信息
export const reqUserSub = () => {
  return myAxios({
    url: '/user/subcount'
  })
}

// 获取用户歌单
export const reqUserPlayMenu = (uid) => {
  return ajax({ 
    url: '/user/playlist',
    params: {
      uid,
      limit: 30,
      offset: 0
    }
  })
}
