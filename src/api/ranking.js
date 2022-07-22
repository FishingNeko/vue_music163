// 排行榜相关 API

import { myAxios } from "@/lib/axios";

// 请求排行榜摘要
export const reqRankingList = () => {
 return myAxios({
  url: '/toplist/detail'
 })
}