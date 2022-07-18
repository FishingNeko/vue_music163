// 发现音乐 API
import { myAxios } from '@/lib/axios'

// 获取轮播图
export const reqBanner = () => {
  return myAxios({
    url: '/banner'
  })
}
