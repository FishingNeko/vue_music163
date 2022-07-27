// 歌单 API
import { myAxios } from '@/lib/axios'

// 获取精品歌单
export const reqHighQuality = (limit = 2) => {
  return myAxios({
    url: '/top/playlist/highquality',
    params: { limit }
  })
}

// 获取歌单中的歌曲信息
// 接口要求 ID 组
export const reqSongDetail = (...ids) => {
  return myAxios({
    url: `/song/detail?ids=${ids}`
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

// 获取热门评论
// id 歌曲id
// type 歌曲类型 0: 歌曲 1: mv 2: 歌单 3: 专辑 : 电台 5: 视频
// limit 数据限制
// offset 分页用
export const reqCommentHot = params => {
  return myAxios({
    url: '/comment/hot',
    params
  })
}

// 获取最新评论
// id 歌曲id
// type 歌曲类型 0: 歌曲 1: mv 2: 歌单 3: 专辑 : 电台 5: 视频
// limit 数据限制
// offset 分页用
export const reqCommentNew = params => {
  return myAxios({
    url: '/comment/playlist',
    params
  })
}

// 请求发送评论
/**
 * @param  t: 0 删除, 1 发送, 2 回复 发送评论
 * @param  0: 歌曲 1: mv   2: 歌单 3: 专辑   4: 电台   5: 视频 6: 动态|
 * @param id: 对应资源 id - 用户
 * @param content :要发送的内容
 * @param commentId :回复的评论id (回复评论时必填)

 * **/
 export const reqSendComment = params => {
  return myAxios({
    method: 'GET',
    url: '/comment',
    params
  })
}
