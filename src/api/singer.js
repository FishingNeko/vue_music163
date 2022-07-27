// 歌手相关 API

import { myAxios } from "@/lib/axios";

/**
 * @param  /artist/list 歌手分类列表
 * @param  type  -1:全部    1:男歌手    2:女歌手   3:乐队
 * @param  area  -1:全部     7: 华语   96: 欧美    8: 日本    16: 韩国    0:其他
 * @param  limit 返回数量，默认为 30
 * @param  offset 偏移数量，用于分页，如：如：（页数-1）*30，一个30为极限的值，默认为0
 * @param initial 按首字母索引查找参数，如/artist/list?type=1&area=96&initial=b返回内容名称可字段概要为b或者拼音开头为b为顺序排列,热门传-1,#传0
 * **/
// 获取歌手列表
export const reqSingerList = params => {
  return myAxios({
    url: '/artist/list',
    params
  })
}