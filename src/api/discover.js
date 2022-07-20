// 发现音乐 API
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

// 通过 ID 获取播放歌曲
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
