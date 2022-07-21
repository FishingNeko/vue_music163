// 歌单推荐 API
import { myAxios } from '@/lib/axios'

// 请求最新音乐
// `type`: 地区类型 id,对应以下:

// 全部:0

// 华语:7

// 欧美:96

// 日本:8

// 韩国:16
export const reqNewSong = (type) => {
  return myAxios({
    url: '/top/song',
    params: { type }
  })
}

// 获取新歌的 url
export const reqNewSongUrl = (id) => {
  return myAxios({
    url: '/song/url',
    params: { id }
  })
}