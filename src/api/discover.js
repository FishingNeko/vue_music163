// 个性推荐 API
import { myAxios } from '@/lib/axios'

// 获取轮播图
export const reqBanner = () => {
  return myAxios({
    url: '/banner'
  })
}

// 获取推荐歌单
export const reqRecommendList = () => {
  return myAxios({
    url: '/personalized?limit=8'
  })
}

// 获取每日推荐
export const reqDailyRecommend = () => {
  return myAxios({
    url: '/personalized?limit=8'
  })
}

// 获取最新音乐
export const reqNewMusic = () => {
  return myAxios({
    url: '/personalized/newsong?limit=9'
  })
}

// 根据 ID 获取歌单详情
export const reqSongMenuDettail = (id) => {
  return myAxios({
    url: '/playlist/detail',
    params: { id }
  })
}

// 通过 ID 获取播放歌曲 url
export const reqSongById = (id) => {
  return myAxios({
    url: '/song/url',
    params: { id }
  })
}

// 获取最新MV
export const reqNewMV = () => {
  return myAxios({
    url: '/personalized/mv'
  })
}
