// 搜索相关 API

import { myAxios } from "@/lib/axios"

// keywords 关键词 必选
// limit : 返回数量 , 默认为 30
// offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)\*30, 其中 30 为 limit 的值 , 默认为 0
// type: 搜索类型；默认为 1 即单曲 , 取值意义 :如下
// ---
// 歌曲:1
// 歌单:1000
// MV:1004
// ---

// 获取搜索结果
export const reqSearch = params => {
  return myAxios({
    url: '/search',
    params
  })
}