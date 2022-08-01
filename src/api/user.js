// 用户相关 API

import { myAxios } from '@/lib/axios'

// 获取登录状态
// export const reqLoginState = () => {
//   return myAxios({
//     url: '/login/status'
//   })
// }

// 使用手机号码登录
export const reqPhoneLogin = (params) => {
  return myAxios({
    method: 'POST',
    url: '/login/cellphone',
    params
  })
}

// 登出
export const reqLogout = (token) => {
  return myAxios({
    method: 'POST',
    url: '/logout',
    params: { token }
  })
}

// 获取用户订阅信息
// export const reqUserSub = () => {
//   return myAxios({
//     url: '/user/subcount'
//   })
// }

// 获取用户歌单
// export const reqUserPlayMenu = (uid) => {
//   return ajax({
//     url: '/user/playlist',
//     params: {
//       uid,
//       limit: 30,
//       offset: 0
//     }
//   })
// }
