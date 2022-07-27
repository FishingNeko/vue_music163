// 最新 MV API

import { myAxios } from '@/lib/axios'

// 获取最新 MV
// 1. `area`: 地区,可选值为：全部、内地、港台、欧美、日本、韩国、不填则为全部
// 2. `type`: 类型,可选值为：全部、官方版、原生、现场版、网易出品,不填则为全部
// 3. `order`: 排序,可选值为：上升最快、最热、最新、不填则为上升最快
// 4. `limit`: 取出数量 , 默认为 30
// 5. `offset`: 偏移数量 , 用于分页 , 如 :( 页数 -1)\*50, 其中 50 为 limit 的值 , 默认 为 0
export const reqNewMv = (area, type, order, limit, offset) => {
  return myAxios({
    url: '/mv/all',
    params: { area, type, order, limit, offset }
  })
}

// 获取 MV 地址
export const reqMvUrl = (id) => {
  return myAxios({
    url: '/mv/url',
    params: { id }
  })
}

// 获取 MV 详情
export const reqMvDetail = (mvid) => {
  return myAxios({
    url: 'mv/detail',
    params: { mvid }
  })
}

// 获取相似 MV 信息
export const reqMvSimilar = (mvid) => {
  return myAxios({
    url: 'simi/mv',
    params: { mvid }
  })
}

// 获取 MV 评论
export const reqMvComment = params => {
  return myAxios({
    url: '/comment/mv',
    params
  })
}

// 获取 mv 点赞转发评论数数据
export const reqMvInfo = (mvid) => {
  return myAxios({
    url: '/mv/detail/info',
    params: { mvid }
  })
}
