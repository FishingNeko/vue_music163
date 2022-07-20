// 歌单推荐 API
import { myAxios } from '@/lib/axios'

// 请求精品歌单
export const reqHighQuality = (limit = 2) => {
  return myAxios({
    url: '/top/playlist/highquality',
    params: { limit }
  })
}

// 获取推荐歌单
// limit: 获取数量
// cat: 类别
// offset: 偏移量
export const reqSongMenu = (limit = 12, cat = '全部', offset = 0) => {
  return myAxios({
    url: '/top/playlist',
    params: { limit, cat, offset }
  })
}
